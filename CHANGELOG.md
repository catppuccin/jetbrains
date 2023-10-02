# Changelog

## [Unreleased]

### Added
- Add background color for plugin tags

### Changed

### Deprecated

### Removed

### Fixed

- Improve Nix syntax highlighting
- (Go): Make references in comments distinguishable
- (Go): Fix template syntax highlighting

### Security

## 2.2.0 - 2023-06-07

### Added
- Support 2023.2 EAP

## 2.1.0 - 2023-04-02

### Added
- Add styles to checkboxes and radio buttons
- Add selection background for tool window buttons
- Add styles to memory indicator
- Add styles to main toolbar
- Add styles to scrollbar on macOS
- Theme `Indent Guides` via Rainbow Brackets plugin

### Changed
- Braces, Brackets, Commas, Dots, Parenthesis & Semicolon now default to `overlay2` instead of `text`
- Hyperlinks are now `blue` instead of `rosewater`. Followed hyperlinks are now `lavender` instead of `mauve`
- Comments are now `overlay0` instead of `surface2`. This matches other Catppuccin IDEs and means that selection
  highlights have more contrast
- (Markdown): Add rainbow highlighted headings
- (Markdown): Inline HTML blocks now default to `text` instead of `red`
- (Markdown): List items now default to `text` instead of `teal`
- (VCS): Match diff colours with Catppuccin VSCode

### Fixed
- (#55): Add project selection color to welcome screen
- (#57): Fix terminal text colour on Latte
- (#60): Fix R Markdown Chunks

## 2.0.9 - 2023-02-13

### Added
- (#53): Highlight Python binary strings
- (#54): Apply Catppuccin to semantic highlights

### Changed
- (HTML): Align highlights with TOML/JSON/XML/YAML
- (Rust): Lower opacity of conditionally disabled code
- (Rust): Highlight parameters to be same as language default
- (Debugger): No background highlighting on normal breakpoints
- (Debugger): Current line that is stopped is background highlighted
- If you would like to edit the debugging highlights yourself, they are
  located in `Settings - Editor -> Color Scheme -> Debugger`

### Fixed
- Don't force italics on CSS Keywords

## 2.0.8 - 2023-01-26

### Added
- Support 2023.1 EAP

## 2.0.7 - 2023-01-02

### Added
- Improve Scala highlights

### Changed
- Update TOML keys to blue, aligning it with JSON/XML/YAML

### Fixed
- (#42): Make RunConfigurations readable in Latte
- (#39): Make quick-fix error messages readable

## 2.0.6 - 2022-11-27

### Added
- Support Erlang
- Highlight FileTree to be darker in New UI

### Fixed
- Revert changes from 2.0.5

## 2.0.5 - 2022-11-22

### Added
- (#27): Better support for New UI

### Changed
- (#35): Matching braces now have a border when hovered.

### Fixed
- Terminal colors now follow the Catppuccin style guide

## 2.0.4 - 2022-11-12

### Added
- [AndroidStudio] Add highlights for composable functions

### Changed
- (#31): Improved Ruby highlights
- Improve visibility of ignored files when using Latte

### Fixed
- (#32): Update button text is now readable
- (#28): Improve visibility of tabs
- (#29): GitHub Copilot suggestion highlights are now the same as comments

## 2.0.3 - 2022-11-03

### Fixed
- Cursor line highlights are now readable

## 2.0.2 - 2022-10-30

### Changed
- Warnings are not bold anymore
- When cursor is over identifier, highlights are now only bordered

### Fixed
- Comments are now readable when selected with cursor

## 2.0.1 - 2022-10-24
- Fixed file colour highlights on Latte
- Improved cursor selection background highlights on all flavours

## 2.0.0 - 2022-10-22
- All four flavours of Catppuccin v2 palette are now available!
- View your IDE in Latte, Frappe, Macchiato or Mocha!

## 1.0.9 - 2022-08-09
- row tree height fix

## 1.0.8 - 2022-06-20
- XAML support
- selectionInactiveBackground visibility fix

## 1.0.7 - 2022-06-03
- Compatibility with 2022.2

## 1.0.6 - 2022-04-30
- Make TODO and FIXME comments more visible

## 1.0.5 - 2022-04-07
- Compatibility with 2022.1

## 1.0.4 - 2022-02-27
- Added missing description in plugin.xml

## 1.0.3 - 2022-02-24
- First Marketplace release 🎉
- Fixed low contrast issues in various spots

## 1.0.1 - 2022-01-30
- Checkbox readability improved
- Editor color scheme uses colors from palette
