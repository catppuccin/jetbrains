#!/usr/bin/env deno run --allow-write --allow-read --allow-env
import { Handlebars, JetBrains, path, variants } from "./deps.ts";

const opacity = (color: string, opacity: number): string => {
  const opacityHex = Math.floor(255 * opacity);
  return (color + opacityHex.toString(16)).toUpperCase();
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const basePath = "src/main/resources/themes/";

Object.entries(variants).forEach(([key, value]) => {
  const isLatte = key === "latte";

  const colors = Object.entries(value).map(([key, value]) => {
    const hex = value.hex.toUpperCase();
    return {
      [key]: hex,
    };
  }).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const theme: JetBrains = {
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
      hoverBackground: colors.surface1,
      selectionBackground: colors.surface1,
      selectionInactiveBackground: colors.base,
      borderColor: colors.surface1,
      separatorColor: colors.surface1,
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
        borderColor: "primaryBackground",
        separatorColor: "separatorColor",
      },
      Borders: {
        color: "primaryBackground",
        ContrastBorderColor: "secondaryBackground",
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
      },
      BookmarkMnemonicAssigned: {
        foreground: "primaryForeground",
        background: "secondaryBackground",
        borderColor: "secondaryAccentColor",
      },
      BookmarkMnemonicAvailable: {},
      BookmarkMnemonicCurrent: {
        foreground: "primaryForeground",
        background: "selectionBackground",
        borderColor: "accentColor",
      },
      Button: {
        foreground: "primaryForeground",
        startBorderColor: "secondaryBackground",
        endBorderColor: "secondaryBackground",
        startBackground: "secondaryBackground",
        endBackground: "secondaryBackground",
        focusedBorderColor: "accentColor",
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
        selectionBackground: "selectionBackground",
        selectionInactiveBackground: "selectionInactiveBackground",
        matchForeground: "flamingo",
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
      DragAndDrop: {
        borderColor: "selectionBackground",
      },
      Editor: {
        background: "primaryBackground",
        shortcutForeground: "accentColor",
      },
      EditorTabs: {
        background: "primaryBackground",
        underlinedTabBackground: "secondaryBackground",
        underlineColor: "accentColor",
        underlineHeight: 1,
        hoverBackground: "mantle",
        inactiveUnderlineColor: "accentColor",
      },
      FileColor: {
        Blue: "#96CDFB50",
        Green: "#27403B50",
        Orange: "#F8BD9650",
        Yellow: opacity(value.surface0.hex, 0.5),
        Rose: "#F5E0DC50",
        Violet: "#DDB6F250",
      },
      Link: {
        activeForeground: "accentColor",
        hoverForeground: "accentColor",
        visitedForeground: "secondaryAccentColor",
        pressedForeground: "secondaryAccentColor",
      },
      Notification: {
        background: "mantle",
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
        Button: {
          installBorderColor: "secondaryAccentColor",
          installForeground: "secondaryAccentColor",
          installBackground: "primaryBackground",
          installFillForeground: "primaryBackground",
          installFillBackground: "secondaryAccentColor",
          installFocusedBackground: "primaryBackground",
          updateBorderColor: "accentColor",
          updateForeground: "primaryForeground",
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
        Header: {
          activeBackground: "secondaryBackground",
          inactiveBackground: "secondaryBackground",
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
        "Advertiser.foreground": "primaryForeground",
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
        borderColor: "borderColor",
        hoverBackground: "hoverBackground",
      },
      TabbedPane: {
        tabSelectionHeight: 1,
        focusColor: "hoverBackground",
        hoverColor: "hoverBackground",
        underlineColor: "accentColor",
        contentAreaColor: "primaryBackground",
      },
      Table: {
        gridColor: "hoverBackground",
        hoverBackground: "selectionBackground",
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
        background: "primaryBackground",
        borderHandleColor: "secondaryAccentColor",
      },
      ToolWindow: {
        Button: {
          hoverBackground: "hoverBackground",
        },
        Header: {
          background: "primaryBackground",
          inactiveBackground: "primaryBackground",
          borderColor: "secondaryBackground",
        },
        HeaderTab: {
          underlineColor: "pink",
          inactiveUnderlineColor: "text",
          underlineHeight: 1,
          underlinedTabBackground: "surface1",
          selectedInactiveBackground: "base",
          hoverBackground: "hoverBackground",
        },
      },
      Tree: {
        rowHeight: 24,
        background: "mantle",
        modifiedItemForeground: "accentColor",
        hoverBackground: "secondaryBackground",
        selectionBackground: "selectionBackground",
        selectionInactiveBackground: "selectionInactiveBackground",
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
          background: "secondaryBackground",
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
    },
    // TODO: MAKE THESE COLOURS THE SAME AS THE V2 PALETTE
    icons: {
      ColorPalette: {
        "Actions.Blue": "#96CDFB",
        "Actions.Green": "#ABE9B3",
        "Actions.Orange": "#F8BD96",
        "Actions.Purple": "#DDB6F2",
        "Actions.Red": "#F28FAD",
        "Actions.Yellow": "#FAE3B0",
        "Actions.Gray": "#6E6C7E",
        "Actions.White": "#D9E0EE",
        "Actions.Black": "#161320",
        "Actions.Grey": "#6E6C7E",
        "Actions.GreyInline.Dark": "#96CDFB",
        "Actions.GreyInline": "#96CDFB",
        "Objects.Blue": "#96CDFB",
        "Objects.Green": "#ABE9B3",
        "Objects.GreenAndroid": "#ABE9B3",
        "Objects.Grey": "#6E6C7E",
        "Objects.Pink": "#F5C2E7",
        "Objects.Purple": "#DDB6F2",
        "Objects.Red": "#F28FAD",
        "Objects.RedStatus": "#F28FAD",
        "Objects.Yellow": "#FAE3B0",
        "Objects.YellowDark": "#F8BD96",
        "Objects.BlackText": "#302D41",
        "Tree.iconColor": "#96CDFB",
      },
    },
  };

  Deno.writeTextFileSync(
    path.join(Deno.cwd(), basePath, `${key}.json`),
    JSON.stringify(theme, null, 2),
  );
});

// adds the opacity function to Handlebars.js
// USAGE:
// {{opacity color opacity}}
// EXAMPLE:
// {{opacity rosewater 0.5}}
Handlebars.registerHelper("opacity", opacity);

const templatePath = path.join(Deno.cwd(), "generateScheme", "template.xml");

Deno.readTextFile(templatePath).then((data) => {
    Object.entries(variants).forEach(([key, value]) => {
      const isLatte = key === "latte";
    const italicsVersions = [true, false];

      const hexValues = Object.entries(value).map(([key, value]) => {
      const hex = value.hex.replace("#", "").toUpperCase();
        return {
        [key]: hex,
        };
      }).reduce((acc, curr) => ({...acc, ...curr}), {});

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
      Deno.writeTextFileSync(path.join(Deno.cwd(), basePath, fileName), output);
      });
    });
});
