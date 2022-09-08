#!/usr/bin/env deno run --allow-write
import {variants, JetBrains} from "./deps.ts"

const opacity = (color: string, opacity: number): string => {
  const opacityHex = Math.floor(255 * opacity);
  return `${color}${opacityHex.toString(16)}`;
};

const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

Object.entries(variants).forEach(([key, value]) => {
    const isLatte = key === "latte";

    const theme: JetBrains = {
      name: `Catppuccin ${capitalize(key)}`,
      dark: !isLatte,
      author: "Catppuccin Org <releases@catppucin.com>",
      editorScheme: `/themes/Catppuccin-${capitalize(key)}.xml`,
      colors: {
        rosewater: value.rosewater.hex,
        flamingo: value.flamingo.hex,
        mauve: value.mauve.hex,
        pink: value.pink.hex,
        maroon: value.maroon.hex,
        red: value.red.hex,
        peach: value.peach.hex,
        yellow: value.yellow.hex,
        green: value.green.hex,
        teal: value.teal.hex,
        blue: value.blue.hex,
        sky: value.sky.hex,
        sapphire: value.sapphire.hex,
        lavender: value.lavender.hex,
        crust: value.crust.hex,
        mantle: value.mantle.hex,
        base: value.base.hex,
        surface0: value.surface0.hex,
        surface1: value.surface1.hex,
        surface2: value.surface2.hex,
        overlay0: value.overlay0.hex,
        overlay1: value.overlay1.hex,
        overlay2: value.overlay2.hex,
        text: value.text.hex,
        subtext0: value.subtext0.hex,
        subtext1: value.subtext1.hex,
        accentColor: value.mauve.hex,
        secondaryAccentColor: value.yellow.hex,
        primaryForeground: value.text.hex,
        primaryBackground: value.base.hex,
        secondaryBackground: value.surface0.hex,
        hoverBackground: value.surface1.hex,
        selectionBackground: value.surface1.hex,
        selectionInactiveBackground: value.base.hex,
        borderColor: value.surface1.hex,
        separatorColor: value.surface1.hex,
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
          Yellow: "#243944ff",
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
          bottomSeparatorColor: "prmaryBackground",
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

    Deno.writeTextFileSync(`./src/main/resources/themes/Catppuccin-${key}.json`, JSON.stringify(theme, null, 2));
})
