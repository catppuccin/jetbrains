#!/usr/bin/env -S deno run --allow-write --allow-read --allow-env
import {colormath, Handlebars, path, variants} from "./deps.ts";

const handlebarsIsLatte = (
  lightCol: string,
  darkCol: string,
  context: any
): string => {
  return context.data.root.isLatte ? lightCol : darkCol;
};

const calculateOpacity = (
  color: string,
  opacity: number,
  context: any,
): string => {
  const base = context.data.root.base;
  return colormath
    .mixColor(colormath.hex.toRgb(color), colormath.hex.toRgb(base), opacity)
    .hex.toLowerCase();
};

const handlebarsOpacity = (
  color: string,
  opacity: number,
  context: any,
) => {
  return calculateOpacity(color, opacity, context).replace("#", "")
}

const handlebarsOpacityWithHex = (
  color: string,
  opacity: number,
  context: any,
) => {
  return calculateOpacity(color, opacity, context)
}

const mix = (
  color1: string,
  color2: string,
  amount: number,
): string => {
  return colormath
    .mixColor(colormath.hex.toRgb(color1), colormath.hex.toRgb(color2), amount)
    .hex.toLowerCase()
};

const handlebarsMix = (
  color1: string,
  color2: string,
  amount: number,
): string => {
  return mix(color1, color2, amount).replace("#", "");
};

const handlebarsMixWithHex = (
  color1: string,
  color2: string,
  amount: number,
): string => {
  return mix(color1, color2, amount)
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

Handlebars.registerHelper("isLatte", handlebarsIsLatte);
Handlebars.registerHelper("opacity", handlebarsOpacity);
Handlebars.registerHelper("opacityWithHex", handlebarsOpacityWithHex);
Handlebars.registerHelper("mix", handlebarsMix);
Handlebars.registerHelper("mixWithHex", handlebarsMixWithHex);

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const themePath = path.join(__dirname, "../src/main/resources/themes/");
const editorPath = path.join(__dirname, "editor.xml");
const uiPath = path.join(__dirname, "ui.theme.json");
Deno.mkdirSync(themePath, {recursive: true});

Deno.readTextFile(uiPath).then((data) => {
  Object.entries(variants).forEach(([key, value]) => {
    const isDark = key !== "latte";
    const hexValues = Object.entries(value)
      .map(([key, value]) => {
        return {
          [key]: value.hex.toUpperCase(),
        };
      })
      .reduce((acc, curr) => ({...acc, ...curr}), {});
    const options = {
      name: `Catppuccin ${capitalize(key)}`,
      editorScheme: `/themes/${key}.xml`,
      isDark: isDark,
      isLatte: !isDark,

      // strive to only use these values inside of `ui.theme.json`
      accentColor: hexValues.mauve,
      secondaryAccentColor: hexValues.yellow,
      primaryForeground: hexValues.text,
      primaryBackground: hexValues.base,
      secondaryBackground: hexValues.surface0,
      panelBackground: hexValues.mantle,
      hoverBackground: hexValues.surface0,
      selectionBackground: hexValues.surface0,
      selectionInactiveBackground: hexValues.base,
      borderColor: isDark ? hexValues.base : hexValues.crust,
      separatorColor: hexValues.surface0,

      // normal palette
      ...hexValues,
    };

    // TODO: Switch to `whiskers` at some point
    // Using handlebars syntax in the 'ui.theme.json` has the potential to conflict with valid json/yaml
    // This currently parses the string, converts it to a boolean, and then writes it into a file
    const output = Handlebars.compile(data)(options);
    const parsed = JSON.parse(output);
    parsed.dark = (parsed.dark === "true");
    const fileName = `${key}.theme.json`;

    Deno.writeTextFileSync(path.join(themePath, fileName), JSON.stringify(parsed, null, 2));
  });
});

Deno.readTextFile(editorPath).then((data) => {
  Object.entries(variants).forEach(([key, value]) => {
    const isLight = key === "latte";
    const italicsVersions = [true, false];
    const hexValues = Object.entries(value)
      .map(([key, value]) => {
        const hex = value.hex.replace("#", "").toLowerCase();
        return {
          [key]: hex,
        };
      })
      .reduce((acc, curr) => ({...acc, ...curr}), {});

    italicsVersions.forEach((italics) => {
      const options = {
        name: `Catppuccin ${capitalize(key)}${!italics ? " (no italics)" : ""}`,
        italics: italics,
        isLatte: isLight,
        parent_scheme: isLight ? "Default" : "Darcula",
        ...hexValues,
      };
      const output = Handlebars.compile(data)(options);
      const suffix = italics ? "" : "-no-italics";
      const fileName = `${key}${suffix}.xml`;
      Deno.writeTextFileSync(path.join(themePath, fileName), output);
    });
  });
});
