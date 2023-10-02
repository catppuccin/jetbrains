// To parse this data:
//
//   import { Convert, JBTheme } from "./file";
//
//   const jBTheme = Convert.toJBTheme(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface JBTheme {
  name: string;
  dark: boolean;
  additionalEditorSchemes?: any[];
  /**
   * The author of the theme
   */
  author: string;
  editorScheme?: string;
  background?: BackgroundImage;
  /**
   * Define common colors here and use color names in 'ui' section instead of #rrggbb values
   */
  colors?: { [key: string]: string };
  /**
   * If 'true' then Darcula theme will be used as the base for modification, otherwise Light
   * theme will be used.
   */
  emptyFrameBackground?: BackgroundImage;
  /**
   * Provides a way to change icon colors under focused selection. Provide a map of colors to
   * colors. When the icon under active selection, the key color will be replaced by the value
   * color.
   */
  iconColorsOnSelection?: { [key: string]: string };
  icons?: Icons;
  /**
   * Theme name
   */
  ui: { [key: string]: any };
}

/**
 * Background image for entire window
 */
export interface BackgroundImage {
  /**
   * Background image anchor. One of the following values: top_left, top_center, top_right,
   * middle_left, center, middle_right, bottom_left, bottom_center, bottom_right
   */
  anchor?: BackgroundImageAnchor;
  /**
   * Background image filling options. One of the following values: plain, scale, tile
   */
  fill?: BackgroundImageFillingOptions;
  /**
   * Path to the background image starting with '/'
   */
  image: string;
  /**
   * An integer from 0 to 100.
   */
  transparency?: number;
}

/**
 * Background image anchor. One of the following values: top_left, top_center, top_right,
 * middle_left, center, middle_right, bottom_left, bottom_center, bottom_right
 */
export enum BackgroundImageAnchor {
  BottomCenter = "bottom_center",
  BottomLeft = "bottom_left",
  BottomRight = "bottom_right",
  Center = "center",
  MiddleLeft = "middle_left",
  MiddleRight = "middle_right",
  TopCenter = "top_center",
  TopLeft = "top_left",
  TopRight = "top_right",
}

/**
 * Background image filling options. One of the following values: plain, scale, tile
 */
export enum BackgroundImageFillingOptions {
  Plain = "plain",
  Scale = "scale",
  Tile = "tile",
}

export interface Icons {
  ColorPalette?: ColorPalette;
  [key: `/${string}`]: string;
}

/**
 * Color palette for deuteranopia vision deficiency
 *
 * Color palette for protanopia vision deficiency
 */
export interface ColorPalette {
  /**
   * Color palette for deuteranopia vision deficiency
   */
  Deuteranopia?: ColorPaletteBase;
  /**
   * Color palette for protanopia vision deficiency
   */
  Protanopia?: ColorPaletteBase;
  "Actions.Blue"?: string;
  "Actions.Green"?: string;
  "Actions.Grey"?: string;
  /**
   * Light-gray icons at the right side in input fields and combo boxes
   */
  "Actions.GreyInline"?: string;
  /**
   * Use for dark themes
   */
  "Actions.GreyInline.Dark"?: string;
  /**
   * Action colors are for icons that appear on toolbars
   */
  "Actions.Red"?: string;
  "Actions.Yellow"?: string;
  /**
   * An unchecked checkbox or radio button
   */
  "Checkbox.Background.Default"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Background.Default.Dark"?: string;
  /**
   * A disabled checkbox or radio button
   */
  "Checkbox.Background.Disabled"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Background.Disabled.Dark"?: string;
  /**
   * A checked checkbox or radio button
   */
  "Checkbox.Background.Selected"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Background.Selected.Dark"?: string;
  "Checkbox.Border.Default"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Border.Default.Dark"?: string;
  "Checkbox.Border.Disabled"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Border.Disabled.Dark"?: string;
  "Checkbox.Border.Selected"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Border.Selected.Dark"?: string;
  /**
   * 1px inner border in the focused state
   */
  "Checkbox.Focus.Thin.Default"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Focus.Thin.Default.Dark"?: string;
  "Checkbox.Focus.Thin.Selected"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Focus.Thin.Selected.Dark"?: string;
  /**
   * 2px outer border in the focused state
   */
  "Checkbox.Focus.Wide"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Focus.Wide.Dark"?: string;
  "Checkbox.Foreground.Disabled"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Foreground.Disabled.Dark"?: string;
  "Checkbox.Foreground.Selected"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Foreground.Selected.Dark"?: string;
  "Objects.BlackText"?: string;
  "Objects.Blue"?: string;
  "Objects.Green"?: string;
  /**
   * Object colors are for icons in lists and trees
   */
  "Objects.Grey"?: string;
  "Objects.Pink"?: string;
  "Objects.Purple"?: string;
  "Objects.Red"?: string;
  "Objects.RedStatus"?: string;
  "Objects.Yellow"?: string;
  "Objects.YellowDark"?: string;
  /**
   * Color of expand/collapse icons
   */
  "Tree.iconColor"?: string;
}

/**
 * Color palette for deuteranopia vision deficiency
 *
 * Color palette for protanopia vision deficiency
 */
export interface ColorPaletteBase {
  "Actions.Blue"?: string;
  "Actions.Green"?: string;
  "Actions.Grey"?: string;
  /**
   * Light-gray icons at the right side in input fields and combo boxes
   */
  "Actions.GreyInline"?: string;
  /**
   * Use for dark themes
   */
  "Actions.GreyInline.Dark"?: string;
  /**
   * Action colors are for icons that appear on toolbars
   */
  "Actions.Red"?: string;
  "Actions.Yellow"?: string;
  /**
   * An unchecked checkbox or radio button
   */
  "Checkbox.Background.Default"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Background.Default.Dark"?: string;
  /**
   * A disabled checkbox or radio button
   */
  "Checkbox.Background.Disabled"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Background.Disabled.Dark"?: string;
  /**
   * A checked checkbox or radio button
   */
  "Checkbox.Background.Selected"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Background.Selected.Dark"?: string;
  "Checkbox.Border.Default"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Border.Default.Dark"?: string;
  "Checkbox.Border.Disabled"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Border.Disabled.Dark"?: string;
  "Checkbox.Border.Selected"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Border.Selected.Dark"?: string;
  /**
   * 1px inner border in the focused state
   */
  "Checkbox.Focus.Thin.Default"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Focus.Thin.Default.Dark"?: string;
  "Checkbox.Focus.Thin.Selected"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Focus.Thin.Selected.Dark"?: string;
  /**
   * 2px outer border in the focused state
   */
  "Checkbox.Focus.Wide"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Focus.Wide.Dark"?: string;
  "Checkbox.Foreground.Disabled"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Foreground.Disabled.Dark"?: string;
  "Checkbox.Foreground.Selected"?: string;
  /**
   * Use for dark themes
   */
  "Checkbox.Foreground.Selected.Dark"?: string;
  "Objects.BlackText"?: string;
  "Objects.Blue"?: string;
  "Objects.Green"?: string;
  /**
   * Object colors are for icons in lists and trees
   */
  "Objects.Grey"?: string;
  "Objects.Pink"?: string;
  "Objects.Purple"?: string;
  "Objects.Red"?: string;
  "Objects.RedStatus"?: string;
  "Objects.Yellow"?: string;
  "Objects.YellowDark"?: string;
  /**
   * Color of expand/collapse icons
   */
  "Tree.iconColor"?: string;
}

export interface RunWidget {
  "separatorColor": string,
  "foreground": string,
  "background": string
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toJBTheme(json: string): JBTheme {
    return cast(JSON.parse(json), r("JBTheme"));
  }

  public static jBThemeToJson(value: JBTheme): string {
    return JSON.stringify(uncast(value, r("JBTheme")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ""): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${
        JSON.stringify(typ)
      } but got ${JSON.stringify(val)}`,
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ""): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "JBTheme": o([
    {
      json: "additionalEditorSchemes",
      js: "additionalEditorSchemes",
      typ: u(undefined, a("any")),
    },
    { json: "author", js: "author", typ: "" },
    {
      json: "background",
      js: "background",
      typ: u(undefined, r("BackgroundImage")),
    },
    { json: "colors", js: "colors", typ: u(undefined, m("")) },
    { json: "dark", js: "dark", typ: true },
    { json: "editorScheme", js: "editorScheme", typ: u(undefined, "") },
    {
      json: "emptyFrameBackground",
      js: "emptyFrameBackground",
      typ: u(undefined, r("BackgroundImage")),
    },
    {
      json: "iconColorsOnSelection",
      js: "iconColorsOnSelection",
      typ: u(undefined, m("")),
    },
    { json: "icons", js: "icons", typ: u(undefined, r("Icons")) },
    { json: "name", js: "name", typ: "" },
    { json: "ui", js: "ui", typ: m("any") },
  ], "any"),
  "BackgroundImage": o([
    {
      json: "anchor",
      js: "anchor",
      typ: u(undefined, r("BackgroundImageAnchor")),
    },
    {
      json: "fill",
      js: "fill",
      typ: u(undefined, r("BackgroundImageFillingOptions")),
    },
    { json: "image", js: "image", typ: "" },
    { json: "transparency", js: "transparency", typ: u(undefined, 0) },
  ], "any"),
  "Icons": o([
    {
      json: "ColorPalette",
      js: "ColorPalette",
      typ: u(undefined, r("ColorPalette")),
    },
  ], "any"),
  "ColorPalette": o([
    {
      json: "Deuteranopia",
      js: "Deuteranopia",
      typ: u(undefined, r("ColorPaletteBase")),
    },
    {
      json: "Protanopia",
      js: "Protanopia",
      typ: u(undefined, r("ColorPaletteBase")),
    },
    { json: "Actions.Blue", js: "Actions.Blue", typ: u(undefined, "") },
    { json: "Actions.Green", js: "Actions.Green", typ: u(undefined, "") },
    { json: "Actions.Grey", js: "Actions.Grey", typ: u(undefined, "") },
    {
      json: "Actions.GreyInline",
      js: "Actions.GreyInline",
      typ: u(undefined, ""),
    },
    {
      json: "Actions.GreyInline.Dark",
      js: "Actions.GreyInline.Dark",
      typ: u(undefined, ""),
    },
    { json: "Actions.Red", js: "Actions.Red", typ: u(undefined, "") },
    { json: "Actions.Yellow", js: "Actions.Yellow", typ: u(undefined, "") },
    {
      json: "Checkbox.Background.Default",
      js: "Checkbox.Background.Default",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Background.Default.Dark",
      js: "Checkbox.Background.Default.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Background.Disabled",
      js: "Checkbox.Background.Disabled",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Background.Disabled.Dark",
      js: "Checkbox.Background.Disabled.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Background.Selected",
      js: "Checkbox.Background.Selected",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Background.Selected.Dark",
      js: "Checkbox.Background.Selected.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Default",
      js: "Checkbox.Border.Default",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Default.Dark",
      js: "Checkbox.Border.Default.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Disabled",
      js: "Checkbox.Border.Disabled",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Disabled.Dark",
      js: "Checkbox.Border.Disabled.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Selected",
      js: "Checkbox.Border.Selected",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Selected.Dark",
      js: "Checkbox.Border.Selected.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Thin.Default",
      js: "Checkbox.Focus.Thin.Default",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Thin.Default.Dark",
      js: "Checkbox.Focus.Thin.Default.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Thin.Selected",
      js: "Checkbox.Focus.Thin.Selected",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Thin.Selected.Dark",
      js: "Checkbox.Focus.Thin.Selected.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Wide",
      js: "Checkbox.Focus.Wide",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Wide.Dark",
      js: "Checkbox.Focus.Wide.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Foreground.Disabled",
      js: "Checkbox.Foreground.Disabled",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Foreground.Disabled.Dark",
      js: "Checkbox.Foreground.Disabled.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Foreground.Selected",
      js: "Checkbox.Foreground.Selected",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Foreground.Selected.Dark",
      js: "Checkbox.Foreground.Selected.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Objects.BlackText",
      js: "Objects.BlackText",
      typ: u(undefined, ""),
    },
    { json: "Objects.Blue", js: "Objects.Blue", typ: u(undefined, "") },
    { json: "Objects.Green", js: "Objects.Green", typ: u(undefined, "") },
    { json: "Objects.Grey", js: "Objects.Grey", typ: u(undefined, "") },
    { json: "Objects.Pink", js: "Objects.Pink", typ: u(undefined, "") },
    { json: "Objects.Purple", js: "Objects.Purple", typ: u(undefined, "") },
    { json: "Objects.Red", js: "Objects.Red", typ: u(undefined, "") },
    {
      json: "Objects.RedStatus",
      js: "Objects.RedStatus",
      typ: u(undefined, ""),
    },
    { json: "Objects.Yellow", js: "Objects.Yellow", typ: u(undefined, "") },
    {
      json: "Objects.YellowDark",
      js: "Objects.YellowDark",
      typ: u(undefined, ""),
    },
    { json: "Tree.iconColor", js: "Tree.iconColor", typ: u(undefined, "") },
  ], "any"),
  "ColorPaletteBase": o([
    { json: "Actions.Blue", js: "Actions.Blue", typ: u(undefined, "") },
    { json: "Actions.Green", js: "Actions.Green", typ: u(undefined, "") },
    { json: "Actions.Grey", js: "Actions.Grey", typ: u(undefined, "") },
    {
      json: "Actions.GreyInline",
      js: "Actions.GreyInline",
      typ: u(undefined, ""),
    },
    {
      json: "Actions.GreyInline.Dark",
      js: "Actions.GreyInline.Dark",
      typ: u(undefined, ""),
    },
    { json: "Actions.Red", js: "Actions.Red", typ: u(undefined, "") },
    { json: "Actions.Yellow", js: "Actions.Yellow", typ: u(undefined, "") },
    {
      json: "Checkbox.Background.Default",
      js: "Checkbox.Background.Default",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Background.Default.Dark",
      js: "Checkbox.Background.Default.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Background.Disabled",
      js: "Checkbox.Background.Disabled",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Background.Disabled.Dark",
      js: "Checkbox.Background.Disabled.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Background.Selected",
      js: "Checkbox.Background.Selected",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Background.Selected.Dark",
      js: "Checkbox.Background.Selected.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Default",
      js: "Checkbox.Border.Default",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Default.Dark",
      js: "Checkbox.Border.Default.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Disabled",
      js: "Checkbox.Border.Disabled",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Disabled.Dark",
      js: "Checkbox.Border.Disabled.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Selected",
      js: "Checkbox.Border.Selected",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Border.Selected.Dark",
      js: "Checkbox.Border.Selected.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Thin.Default",
      js: "Checkbox.Focus.Thin.Default",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Thin.Default.Dark",
      js: "Checkbox.Focus.Thin.Default.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Thin.Selected",
      js: "Checkbox.Focus.Thin.Selected",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Thin.Selected.Dark",
      js: "Checkbox.Focus.Thin.Selected.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Wide",
      js: "Checkbox.Focus.Wide",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Focus.Wide.Dark",
      js: "Checkbox.Focus.Wide.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Foreground.Disabled",
      js: "Checkbox.Foreground.Disabled",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Foreground.Disabled.Dark",
      js: "Checkbox.Foreground.Disabled.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Foreground.Selected",
      js: "Checkbox.Foreground.Selected",
      typ: u(undefined, ""),
    },
    {
      json: "Checkbox.Foreground.Selected.Dark",
      js: "Checkbox.Foreground.Selected.Dark",
      typ: u(undefined, ""),
    },
    {
      json: "Objects.BlackText",
      js: "Objects.BlackText",
      typ: u(undefined, ""),
    },
    { json: "Objects.Blue", js: "Objects.Blue", typ: u(undefined, "") },
    { json: "Objects.Green", js: "Objects.Green", typ: u(undefined, "") },
    { json: "Objects.Grey", js: "Objects.Grey", typ: u(undefined, "") },
    { json: "Objects.Pink", js: "Objects.Pink", typ: u(undefined, "") },
    { json: "Objects.Purple", js: "Objects.Purple", typ: u(undefined, "") },
    { json: "Objects.Red", js: "Objects.Red", typ: u(undefined, "") },
    {
      json: "Objects.RedStatus",
      js: "Objects.RedStatus",
      typ: u(undefined, ""),
    },
    { json: "Objects.Yellow", js: "Objects.Yellow", typ: u(undefined, "") },
    {
      json: "Objects.YellowDark",
      js: "Objects.YellowDark",
      typ: u(undefined, ""),
    },
    { json: "Tree.iconColor", js: "Tree.iconColor", typ: u(undefined, "") },
  ], "any"),
  "BackgroundImageAnchor": [
    "bottom_center",
    "bottom_left",
    "bottom_right",
    "center",
    "middle_left",
    "middle_right",
    "top_center",
    "top_left",
    "top_right",
  ],
  "BackgroundImageFillingOptions": [
    "plain",
    "scale",
    "tile",
  ],
};
