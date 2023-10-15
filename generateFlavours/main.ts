#!/usr/bin/env -S deno run --allow-write --allow-read --allow-env
import {colormath, Handlebars, path, variants} from "./deps.ts";
import type {JBTheme} from "./types.ts";

const handlebarsIsLatte = (
  lightCol: string,
  darkCol: string,
  context: any
): string => {
  return context.data.root.isLatte ? lightCol : darkCol;
};

const handlebarsOpacity = (
  color: string,
  opacity: number,
  context: any
): string => {
  const base = context.data.root.base;

  return colormath
    .mixColor(colormath.hex.toRgb(color), colormath.hex.toRgb(base), opacity)
    .hex.toLowerCase()
    .replace("#", "");
};

const handlebarsMix = (
  color1: string,
  color2: string,
  amount: number,
): string => {
  return colormath
    .mixColor(colormath.hex.toRgb(color1), colormath.hex.toRgb(color2), amount)
    .hex.toLowerCase()
    .replace("#", "");
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const themePath = path.join(__dirname, "../src/main/resources/themes/");
const templatePath = path.join(__dirname, "template.xml");
Deno.mkdirSync(themePath, { recursive: true });

Object.entries(variants).forEach(([key, value]) => {
  const isLatte = key === "latte";

  const colors = Object.entries(value)
    .map(([key, value]) => {
      const hex = value.hex.toUpperCase();
      return {
        [key]: hex,
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const opacity = (color: string, val: number): string => {
    // mimic the context available in handlebars,
    // pass in the colors for the current iteration
    return handlebarsOpacity(color, val, {
      data: {
        root: {
          ...colors,
        },
      },
    });
  };

  const theme: JBTheme = {
    name: `Catppuccin ${capitalize(key)}`,
    dark: !isLatte,
    author: "Catppuccin Org <releases@catppuccin.com>",
    editorScheme: `/themes/${key}.xml`,
    colors: {
      rosewater: colors.rosewater,
      flamingo: colors.flamingo,
      mauve: colors.mauve,
      pink: colors.pink,
      maroon: colors.maroon,
      red: colors.red,
      peach: colors.peach,
      yellow: colors.yellow,
      green: colors.green,
      teal: colors.teal,
      blue: colors.blue,
      sky: colors.sky,
      sapphire: colors.sapphire,
      lavender: colors.lavender,
      crust: colors.crust,
      mantle: colors.mantle,
      base: colors.base,
      surface0: colors.surface0,
      surface1: colors.surface1,
      surface2: colors.surface2,
      overlay0: colors.overlay0,
      overlay1: colors.overlay1,
      overlay2: colors.overlay2,
      text: colors.text,
      subtext0: colors.subtext0,
      subtext1: colors.subtext1,
      accentColor: colors.mauve,
      secondaryAccentColor: colors.yellow,
      primaryForeground: colors.text,
      primaryBackground: colors.base,
      secondaryBackground: colors.surface0,
      hoverBackground: colors.surface0,
      selectionBackground: colors.surface0,
      selectionInactiveBackground: colors.base,
      borderColor: colors.base,
      separatorColor: colors.surface0,
    },
    ui: {
      "*": {
        arc: "7",
        background: "primaryBackground",
        selectionForeground: "primaryForeground",
        selectionInactiveForeground: "primaryForeground",
        selectionBackground: "selectionBackground",
        selectionInactiveBackground: "selectionInactiveBackground",
        inactiveBackground: "primaryBackground",
        disabledBackground: "primaryBackground",
        borderColor: "borderColor",
        separatorColor: "separatorColor",
      },
      List: {
        rowHeight: "24",
        border: "4,0,4,0",
        background: "mantle",
        Button: {
          separatorInset: 4,
          leftRightInset: 8,
        }
      },
      Banner: {
        informativeForeground: "primaryForeground",
        informativeBackground: "#" + opacity(value.blue.hex, 0.1),
        informativeBorderColor: "#" + opacity(value.blue.hex, 0.15),
        errorForeground: "primaryForeground",
        errorBackground: "#" + opacity(value.red.hex, 0.1),
        errorBorderColor: "#" + opacity(value.red.hex, 0.15),
        warningForeground: "primaryForeground",
        warningBackground: "#" + opacity(value.peach.hex, 0.1),
        warningBorderColor: "#" + opacity(value.peach.hex, 0.15),
      },
      Borders: {
        color: "borderColor",
        ContrastBorderColor: "separatorColor",
      },
      ActionButton: {
        hoverBackground: "hoverBackground",
        hoverBorderColor: "hoverBackground",
        pressedBackground: "hoverBackground",
        pressedBorderColor: "hoverBackground",
      },
      Bookmark: {
        iconBackground: "accentColor",
        Mnemonic: {
          iconForeground: "primaryForeground",
          iconBackground: "secondaryBackground",
          iconBorderColor: "accentColor",
        },
        MnemonicAssigned: {
          foreground: "primaryForeground",
          background: "secondaryBackground",
          borderColor: "secondaryAccentColor",
        },
        MnemonicAvailable: {},
        MnemonicCurrent: {
          foreground: "primaryForeground",
          background: "selectionBackground",
          borderColor: "accentColor",
        },
      },
      Button: {
        foreground: "primaryForeground",
        startBorderColor: "secondaryBackground",
        endBorderColor: "secondaryBackground",
        startBackground: "secondaryBackground",
        endBackground: "secondaryBackground",
        focusedBorderColor: "secondaryBackground",
        disabledBorderColor: "primaryBackground",
        default: {
          foreground: "surface1",
          startBackground: "accentColor",
          endBackground: "accentColor",
          startBorderColor: "accentColor",
          endBorderColor: "accentColor",
          focusColor: "accentColor",
          focusedBorderColor: "surface1",
        },
      },
      Counter: {
        foreground: "primaryBackground",
        background: "accentColor",
      },
      ComboBox: {
        modifiedItemForeground: "accentColor",
        ArrowButton: {
          background: "secondaryBackground",
          nonEditableBackground: "secondaryBackground",
          disabledIconColor: "lavender",
          iconColor: "accentColor",
        },
        selectionBackground: "selectionBackground",
        nonEditableBackground: "secondaryBackground",
      },
      CompletionPopup: {
        foreground: "text",
        selectionBackground: "surface1",
        selectionInactiveBackground: "surface0",
        matchForeground: "mauve",
      },
      Component: {
        focusColor: "accentColor",
        borderColor: "primaryBackground",
        focusedBorderColor: "selectionBackground",
        disabledBorderColor: "selectionBackground",
        errorFocusColor: "red",
        inactiveErrorFocusColor: "red",
        warningFocusColor: "yellow",
        inactiveWarningFocusColor: "yellow",
      },
      RunWidget: {
        separatorColor: "separatorColor",
        foreground: "text",
        background: "secondaryBackground"
      },
      DragAndDrop: {
        borderColor: "selectionBackground",
      },
      Editor: {
        background: "primaryBackground",
        shortcutForeground: "accentColor",
      },
      EditorPane: {
        splitBorder: "separatorColor"
      },
      EditorTabs: {
        underlineArc: 4,
        unselectedBlend: 0.7,
        background: "base",
        underlinedTabBackground: "mantle",
        underlineColor: "accentColor",
        underlineHeight: 1,
        hoverBackground: "base",
        inactiveUnderlineColor: "lavender",
        inactiveHoverBackground: "red",
        underTabsBorderColor: "separatorColor",
      },
      FileColor: {
        Blue: '#' + (isLatte
          ? opacity(value.blue.hex, 0.15)
          : opacity(value.blue.hex, 0.10)),
        Green: '#' + (isLatte
          ? opacity(value.green.hex, 0.15)
          : opacity(value.green.hex, 0.10)),
        Orange: '#' + (isLatte
          ? opacity(value.peach.hex, 0.15)
          : opacity(value.peach.hex, 0.10)),
        Yellow: '#' + (isLatte
          ? opacity(value.yellow.hex, 0.15)
          : opacity(value.yellow.hex, 0.10)),
        Rose: '#' + (isLatte
          ? opacity(value.red.hex, 0.15)
          : opacity(value.red.hex, 0.10)),
        Violet: '#' + (isLatte
          ? opacity(value.lavender.hex, 0.15)
          : opacity(value.lavender.hex, 0.10)),
      },
      Link: {
        activeForeground: "accentColor",
        hoverForeground: "accentColor",
        visitedForeground: "secondaryAccentColor",
        pressedForeground: "secondaryAccentColor",
      },
      MainToolbar: {
        background: "crust",
        inactiveBackground: "mantle",
        Icon: {
          hoverBackground: "hoverBackground",
          pressedBackground: "hoverBackground",
          insets: "5,5,5,5",
        },
        Dropdown: {
          hoverBackground: "hoverBackground",
          pressedBackground: "hoverBackground",
          maxWidth: 350,
        },
      },
      MemoryIndicator: {
        allocatedBackground: "surface0",
        usedBackground: "surface1",
      },
      NotificationsToolwindow: {
        newNotification: {
          background: "primaryBackground",
          hoverBackground: "hoverBackground",
        },
      },
      Notification: {
        background: "mantle",
        borderColor: "surface0",
        errorBorderColor: "red",
        errorBackground: "primaryBackground",
        errorForeground: "primaryForeground",
        ToolWindow: {
          warningForeground: "primaryForeground",
          warningBackground: "primaryBackground",
          warningBorderColor: "peach",
          errorForeground: "primaryForeground",
          errorBorderColor: "red",
          errorBackground: "primaryBackground",
          informativeForeground: "primaryForeground",
          informativeBackground: "primaryBackground",
          informativeBorderColor: "secondaryAccentColor",
        },
      },
      Panel: {
        background: "mantle"
      },
      PasswordField: {
        background: "secondaryBackground",
      },
      Plugins: {
        SearchField: {
          background: "secondaryBackground",
        },
        SectionHeader: {
          foreground: "primaryForeground",
        },
        hoverBackground: "hoverBackground",
        lightSelectionBackground: "hoverBackground",
        tagBackground: "secondaryBackground",
        Button: {
          installBorderColor: "secondaryAccentColor",
          installForeground: "secondaryAccentColor",
          installBackground: "primaryBackground",
          installFillForeground: "primaryBackground",
          installFillBackground: "secondaryAccentColor",
          installFocusedBackground: "primaryBackground",
          updateBorderColor: "accentColor",
          updateForeground: "primaryBackground",
          updateBackground: "accentColor",
        },
        Tab: {
          selectedBackground: "hoverBackground",
          selectedForeground: "primaryForeground",
          hoverBackground: "hoverBackground",
        },
      },
      ProgressBar: {
        failedEndColor: "maroon",
        failedColor: "red",
        trackColor: "selectionBackground",
        progressColor: "accentColor",
        indeterminateStartColor: "accentColor",
        indeterminateEndColor: "secondaryAccentColor",
        passedEndColor: "teal",
        passedColor: "green",
      },
      Popup: {
        borderWidth: 1,
        paintBorder: true,
        borderColor: "separatorColor",
        inactiveBorderColor: "separatorColor",
        Advertiser: {
          background: "mantle",
          foreground: "text",
          fontSizeOffset: -1
        },
        Header: {
          activeBackground: "mantle",
          inactiveBackground: "mantle",
        },
      },
      ScrollBar: {
        Mac: {
          hoverThumbColor: "secondaryAccentColor",
          Transparent: {
            hoverThumbColor: "secondaryAccentColor",
          },
        },
      },
      SearchEverywhere: {
        SearchField: {
          background: "secondaryBackground",
        },
        Tab: {
          selectedBackground: "secondaryBackground",
          selectedForeground: "primaryForeground",
        },
      },
      SearchMatch: {
        startBackground: "accentColor",
        endBackground: "accentColor",
      },
      Separator: {
        separatorColor: "separatorColor",
      },
      SidePanel: {
        background: "mantle",
      },
      StatusBar: {
        background: "mantle",
        borderColor: "borderColor",
        hoverBackground: "hoverBackground",
        Breadcrumbs: {
          chevronInset: 0,
        }
      },
      TabbedPane: {
        tabHeight: 40,
        tabSelectionArc: 4,
        tabSelectionHeight: 1,
        focusColor: "hoverBackground",
        hoverColor: "hoverBackground",
        underlineColor: "accentColor",
        contentAreaColor: "primaryBackground",
      },
      Table: {
        gridColor: "hoverBackground",
        hoverBackground: "selectionBackground",
        lightSelectionBackground: "secondaryBackground",
      },
      TableHeader: {
        bottomSeparatorColor: "primaryBackground",
      },
      TextField: {
        background: "secondaryBackground",
      },
      TextArea: {
        background: "mantle",
      },
      ToggleButton: {
        onBackground: "green",
        onForeground: "hoverBackground",
        offBackground: "selectionBackground",
        offForeground: "hoverBackground",
        buttonColor: "primaryForeground",
      },
      ToolBar: {
        background: "mantle",
        borderHandleColor: "secondaryAccentColor",
      },
      ToolWindow: {
        background: "mantle",
        Button: {
          hoverBackground: "hoverBackground",
          selectedBackground: "hoverBackground",
        },
        Header: {
          background: "mantle",
          inactiveBackground: "mantle",
          borderColor: "borderColor",
        },
        HeaderTab: {
          underlineColor: "accentColor",
          inactiveUnderlineColor: "text",
          underlineHeight: 1,
          hoverBackground: "surface0",
        },
      },
      Tree: {
        rowHeight: 24,
        border: "4,12,4,12",
        background: "mantle",
        modifiedItemForeground: "accentColor",
        hoverBackground: "secondaryBackground",
        selectionBackground: "selectionBackground",
        selectionInactiveBackground: "selectionBackground",
      },
      ValidationTooltip: {
        errorBackground: "mantle",
        errorBorderColor: "red",
        warningBackground: "mantle",
        warningBorderColor: "yellow",
      },
      VersionControl: {
        FileHistory: {
          Commit: {
            selectedBranchBackground: "secondaryBackground",
          },
        },
        GitLog: {
          headIconColor: "yellow",
          localBranchIconColor: "green",
          remoteBranchIconColor: "secondaryAccentColor",
          tagIconColor: "accentColor",
          otherIconColor: "teal",
        },
        Log: {
          Commit: {
            hoveredBackground: "selectionBackground",
            currentBranchBackground: "secondaryBackground",
          },
        },
        RefLabel: {
          foreground: "primaryForeground",
        },
      },
      WelcomeScreen: {
        SidePanel: {
          background: "mantle",
        },
        separatorColor: "separatorColor",
        Projects: {
          background: "hoverBackground",
          selectionBackground: "secondaryBackground",
          selectionInactiveBackground: "secondaryBackground",
          actions: {
            background: "hoverBackground",
          },
        },
      },
      CheckBox: {
        background: "mantle",
      }
    },
    icons: {
      ColorPalette: {
        "Actions.Blue": colors.blue,
        "Actions.Green": colors.green,
        "Actions.Red": colors.red,
        "Actions.Yellow": colors.yellow,
        "Actions.Grey": colors.overlay0,
        "Actions.GreyInline.Dark": colors.blue,
        "Actions.GreyInline": colors.blue,
        "Objects.Blue": colors.blue,
        "Objects.Green": colors.green,
        "Objects.Grey": colors.overlay0,
        "Objects.Pink": colors.pink,
        "Objects.Purple": colors.mauve,
        "Objects.Red": colors.red,
        "Objects.RedStatus": colors.red,
        "Objects.Yellow": colors.yellow,
        "Objects.YellowDark": colors.flamingo,
        "Objects.BlackText": colors.surface0,
        "Tree.iconColor": colors.text,
        "Checkbox.Background.Default": colors.surface1,
        "Checkbox.Background.Selected": colors.surface1,
        "Checkbox.Background.Disabled": colors.surface0,
        "Checkbox.Foreground.Selected": colors.mauve,
        "Checkbox.Foreground.Disabled": colors.overlay0,
        "Checkbox.Border.Default": colors.surface0,
        "Checkbox.Border.Selected": colors.surface0,
        "Checkbox.Border.Disabled": colors.surface0,
      },
    },
  }

  Deno.writeTextFileSync(
    path.join(themePath, `${key}.theme.json`),
    JSON.stringify(theme, null, 2)
  );
});

// adds the opacity function to Handlebars.js
// USAGE:
// {{opacity color opacity}}
// EXAMPLE:
// {{opacity rosewater 0.5}}
Handlebars.registerHelper("isLatte", handlebarsIsLatte);
Handlebars.registerHelper("opacity", handlebarsOpacity);
Handlebars.registerHelper("mix", handlebarsMix);

Deno.readTextFile(templatePath).then((data) => {
  Object.entries(variants).forEach(([key, value]) => {
    const isLatte = key === "latte";
    const italicsVersions = [true, false];

    const hexValues = Object.entries(value)
      .map(([key, value]) => {
        const hex = value.hex.replace("#", "").toLowerCase();
        return {
          [key]: hex,
        };
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    italicsVersions.forEach((italics) => {
      const options = {
        name: `Catppuccin ${capitalize(key)}${!italics ? " (no italics)" : ""}`,
        italics: italics,
        isLatte: isLatte,
        parent_scheme: isLatte ? "Default" : "Darcula",
        ...hexValues,
      };
      const output = Handlebars.compile(data)(options);

      const suffix = italics ? "" : "-no-italics";
      const fileName = `${key}${suffix}.xml`;
      Deno.writeTextFileSync(path.join(themePath, fileName), output);
    });
  });
});
