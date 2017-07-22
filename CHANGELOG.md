# Change Log
Fuzzy File Search Visual Studio Code Extension ChangeLog

## [v0.0.1a]
- Integrated with ShellJS to look for workspace files for quicker search experience and better fuzzy search
- Experience is more similar to how Sublime Text of fzf extension works on zsh or bash
- Only tested on Linux / OSX enviorments, ideally might be unstable within windows enviorments.
- By default the extension ignores .git and .vscode directories. But doesn't ignore vendor directories. This is intentional for now. Will be introducing excluded directories via settings in the future.


## [v0.2.0]
- Added a demo screencapture
- Introduce recently opened files option with 5 hard coded recent files
- Introduce an output channel for logging
- Update the `QuickPick` results to display `Label`, `Description` and `Details`
- Ability to search all three fields Label, Description and Details for a file entry
- Disabled caching until a better caching mechanism is introduced.
