// To parse this data:
//
//   import { Convert, JetBrains } from "./file";
//
//   const jetBrains = Convert.toJetBrains(json);

export interface JetBrains {
    name:         string;
    dark:         boolean;
    author:       string;
    editorScheme: string;
    colors:       Colors;
    ui:           Ui;
    icons:        Icons;
}

export interface Colors {
    rosewater:                   string;
    flamingo:                    string;
    mauve:                       string;
    pink:                        string;
    maroon:                      string;
    red:                         string;
    peach:                       string;
    yellow:                      string;
    green:                       string;
    teal:                        string;
    blue:                        string;
    sky:                         string;
    sapphire:                    string;
    lavender:                    string;
    crust:                       string;
    mantle:                      string;
    base:                        string;
    surface0:                    string;
    surface1:                    string;
    surface2:                    string;
    overlay0:                    string;
    overlay1:                    string;
    overlay2:                    string;
    text:                        string;
    subtext0:                    string;
    subtext1:                    string;
    accentColor:                 string;
    secondaryAccentColor:        string;
    primaryForeground:           string;
    primaryBackground:           string;
    secondaryBackground:         string;
    hoverBackground:             string;
    selectionBackground:         string;
    selectionInactiveBackground: string;
    borderColor:                 string;
    separatorColor:              string;
}

export interface Icons {
    ColorPalette: ColorPalette;
}

export interface ColorPalette {
    "Actions.Blue":            string;
    "Actions.Green":           string;
    "Actions.Orange":          string;
    "Actions.Purple":          string;
    "Actions.Red":             string;
    "Actions.Yellow":          string;
    "Actions.Gray":            string;
    "Actions.White":           string;
    "Actions.Black":           string;
    "Actions.Grey":            string;
    "Actions.GreyInline.Dark": string;
    "Actions.GreyInline":      string;
    "Objects.Blue":            string;
    "Objects.Green":           string;
    "Objects.GreenAndroid":    string;
    "Objects.Grey":            string;
    "Objects.Pink":            string;
    "Objects.Purple":          string;
    "Objects.Red":             string;
    "Objects.RedStatus":       string;
    "Objects.Yellow":          string;
    "Objects.YellowDark":      string;
    "Objects.BlackText":       string;
    "Tree.iconColor":          string;
}

export interface Ui {
    "*":                       Empty;
    Borders:                   Borders;
    ActionButton:              ActionButton;
    Bookmark:                  Bookmark;
    BookmarkMnemonicAssigned:  BookmarkMnemonic;
    BookmarkMnemonicAvailable: BookmarkMnemonicAvailable;
    BookmarkMnemonicCurrent:   BookmarkMnemonic;
    Button:                    Button;
    Counter:                   Counter;
    ComboBox:                  ComboBox;
    CompletionPopup:           CompletionPopup;
    Component:                 Component;
    DragAndDrop:               DragAndDrop;
    Editor:                    Editor;
    EditorTabs:                EditorTabs;
    FileColor:                 FileColor;
    Link:                      Link;
    Notification:              Notification;
    PasswordField:             PasswordField;
    Plugins:                   Plugins;
    ProgressBar:               ProgressBar;
    Popup:                     Popup;
    ScrollBar:                 ScrollBar;
    SearchEverywhere:          SearchEverywhere;
    SearchMatch:               SearchMatch;
    Separator:                 Separator;
    SidePanel:                 PasswordField;
    StatusBar:                 StatusBar;
    TabbedPane:                TabbedPane;
    Table:                     Table;
    TableHeader:               TableHeader;
    TextField:                 PasswordField;
    TextArea:                  PasswordField;
    ToggleButton:              ToggleButton;
    ToolBar:                   ToolBar;
    ToolWindow:                UiToolWindow;
    Tree:                      Tree;
    ValidationTooltip:         ValidationTooltip;
    VersionControl:            VersionControl;
    WelcomeScreen:             WelcomeScreen;
}

export interface Empty {
    arc:                         string;
    background:                  string;
    selectionForeground:         string;
    selectionInactiveForeground: string;
    selectionBackground:         string;
    selectionInactiveBackground: string;
    inactiveBackground:          string;
    disabledBackground:          string;
    borderColor:                 string;
    separatorColor:              string;
}

export interface ActionButton {
    hoverBackground:    string;
    hoverBorderColor:   string;
    pressedBackground:  string;
    pressedBorderColor: string;
}

export interface Bookmark {
    iconBackground: string;
    Mnemonic:       Mnemonic;
}

export interface Mnemonic {
    iconForeground:  string;
    iconBackground:  string;
    iconBorderColor: string;
}

export interface BookmarkMnemonic {
    foreground:  string;
    background:  string;
    borderColor: string;
}

export interface BookmarkMnemonicAvailable {
}

export interface Borders {
    color:               string;
    ContrastBorderColor: string;
}

export interface Button {
    foreground:           string;
    startBorderColor:     string;
    endBorderColor:       string;
    startBackground:      string;
    endBackground:        string;
    focusedBorderColor:   string;
    disabledBorderColor?: string;
    default?:             Button;
    focusColor?:          string;
}

export interface ComboBox {
    modifiedItemForeground: string;
    ArrowButton:            ArrowButton;
    selectionBackground:    string;
    nonEditableBackground:  string;
}

export interface ArrowButton {
    background:            string;
    nonEditableBackground: string;
    disabledIconColor:     string;
    iconColor:             string;
}

export interface CompletionPopup {
    selectionBackground:         string;
    selectionInactiveBackground: string;
    matchForeground:             string;
}

export interface Component {
    focusColor:                string;
    borderColor:               string;
    focusedBorderColor:        string;
    disabledBorderColor:       string;
    errorFocusColor:           string;
    inactiveErrorFocusColor:   string;
    warningFocusColor:         string;
    inactiveWarningFocusColor: string;
}

export interface Counter {
    foreground: string;
    background: string;
}

export interface DragAndDrop {
    borderColor: string;
}

export interface Editor {
    background:         string;
    shortcutForeground: string;
}

export interface EditorTabs {
    background?:                 string;
    underlinedTabBackground:     string;
    underlineColor:              string;
    underlineHeight:             number;
    hoverBackground:             string;
    inactiveUnderlineColor:      string;
    selectedInactiveBackground?: string;
}

export interface FileColor {
    Blue:   string;
    Green:  string;
    Orange: string;
    Yellow: string;
    Rose:   string;
    Violet: string;
}

export interface Link {
    activeForeground:  string;
    hoverForeground:   string;
    visitedForeground: string;
    pressedForeground: string;
}

export interface NewNotification {
  background: string
}

export interface NotificationsToolwindow {
  newNotification: NewNotification
}

export interface Notification {
    background:       string;
    errorBorderColor: string;
    errorBackground:  string;
    errorForeground:  string;
    ToolWindow:       NotificationToolWindow;
}

export interface NotificationToolWindow {
    warningForeground:      string;
    warningBackground:      string;
    warningBorderColor:     string;
    errorForeground:        string;
    errorBorderColor:       string;
    errorBackground:        string;
    informativeForeground:  string;
    informativeBackground:  string;
    informativeBorderColor: string;
}

export interface PasswordField {
    background: string;
}

export interface Plugins {
    SearchField:              PasswordField;
    SectionHeader:            SectionHeader;
    hoverBackground:          string;
    lightSelectionBackground: string;
    Button:                   PluginsButton;
    Tab:                      PluginsTab;
}

export interface PluginsButton {
    installBorderColor:       string;
    installForeground:        string;
    installBackground:        string;
    installFillForeground:    string;
    installFillBackground:    string;
    installFocusedBackground: string;
    updateBorderColor:        string;
    updateForeground:         string;
    updateBackground:         string;
}

export interface SectionHeader {
    foreground: string;
}

export interface PluginsTab {
    selectedBackground: string;
    selectedForeground: string;
    hoverBackground:    string;
}

export interface Popup {
    Header: PopupHeader;
}

export interface PopupHeader {
    activeBackground:   string;
    inactiveBackground: string;
}

export interface ProgressBar {
    failedEndColor:          string;
    failedColor:             string;
    trackColor:              string;
    progressColor:           string;
    indeterminateStartColor: string;
    indeterminateEndColor:   string;
    passedEndColor:          string;
    passedColor:             string;
}

export interface ScrollBar {
    Mac: Mac;
}

export interface Mac {
    hoverThumbColor: string;
    Transparent:     Transparent;
}

export interface Transparent {
    hoverThumbColor: string;
}

export interface SearchEverywhere {
    "Advertiser.foreground": string;
    SearchField:             PasswordField;
    Tab:                     SearchEverywhereTab;
}

export interface SearchEverywhereTab {
    selectedBackground: string;
    selectedForeground: string;
}

export interface SearchMatch {
    startBackground: string;
    endBackground:   string;
}

export interface Separator {
    separatorColor: string;
}

export interface StatusBar {
    borderColor:     string;
    hoverBackground: string;
}

export interface TabbedPane {
    tabSelectionHeight: number;
    focusColor:         string;
    hoverColor:         string;
    underlineColor:     string;
    contentAreaColor:   string;
}

export interface Table {
    gridColor:       string;
    hoverBackground: string;
}

export interface TableHeader {
    bottomSeparatorColor: string;
}

export interface ToggleButton {
    onBackground:  string;
    onForeground:  string;
    offBackground: string;
    offForeground: string;
    buttonColor:   string;
}

export interface ToolBar {
    background:        string;
    borderHandleColor: string;
}

export interface UiToolWindow {
    Button:    ToolWindowButton;
    Header:    ToolWindowHeader;
    HeaderTab: EditorTabs;
}

export interface ToolWindowButton {
    hoverBackground: string;
}

export interface ToolWindowHeader {
    background:         string;
    inactiveBackground: string;
    borderColor:        string;
}

export interface Tree {
    rowHeight:                   number;
    background:                  string;
    modifiedItemForeground:      string;
    hoverBackground:             string;
    selectionBackground:         string;
    selectionInactiveBackground: string;
}

export interface ValidationTooltip {
    errorBackground:    string;
    errorBorderColor:   string;
    warningBackground:  string;
    warningBorderColor: string;
}

export interface VersionControl {
    FileHistory: FileHistory;
    GitLog:      GitLog;
    Log:         Log;
    RefLabel:    SectionHeader;
}

export interface FileHistory {
    Commit: FileHistoryCommit;
}

export interface FileHistoryCommit {
    selectedBranchBackground: string;
}

export interface GitLog {
    headIconColor:         string;
    localBranchIconColor:  string;
    remoteBranchIconColor: string;
    tagIconColor:          string;
    otherIconColor:        string;
}

export interface Log {
    Commit: LogCommit;
}

export interface LogCommit {
    hoveredBackground:       string;
    currentBranchBackground: string;
}

export interface WelcomeScreen {
    SidePanel:      PasswordField;
    separatorColor: string;
    Projects:       Projects;
}

export interface Projects {
    background:                  string;
    selectionBackground:         string;
    selectionInactiveBackground: string;
    actions:                     PasswordField;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toJetBrains(json: string): JetBrains {
        return JSON.parse(json);
    }

    public static jetBrainsToJson(value: JetBrains): string {
        return JSON.stringify(value);
    }
}
