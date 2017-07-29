# Fuzzy File Search Extension for Visual Studio Code

[![Build Status](https://travis-ci.org/gayanhewa/vscode-fuzzysearch.svg?branch=master)](https://travis-ci.org/gayanhewa/vscode-fuzzysearch)
[![](https://vsmarketplacebadge.apphb.com/version/gayanhewa.fuzzysearch.svg)](https://marketplace.visualstudio.com/items?itemName=gayanhewa.fuzzysearch) [![](https://vsmarketplacebadge.apphb.com/installs/gayanhewa.fuzzysearch.svg)](https://marketplace.visualstudio.com/items?itemName=gayanhewa.fuzzysearch) [![](https://vsmarketplacebadge.apphb.com/rating/gayanhewa.fuzzysearch.svg)](https://marketplace.visualstudio.com/items?itemName=gayanhewa.fuzzysearch)


Since VSCodes `CMD + P` tends to be quite slow sometimes. This extension can be used as a replacement where we use the operating system built in `find` command to search for files within the workspace.

## Features

- Ability to fuzzy search trough the project files
- Last 5 open files gets higher priority in the initial result set for quick opens.

![Alt text](/assets/fuzzy-demo.gif?raw=true "Demo 1")

![Alt text](/assets/fuzzy-demo-2.gif?raw=true "Demo 2")

## Requirements

- As of now only requirement is shelljs `.find()` method works on your enviorment. Since this extension has only been tested on Linux and OSX support for Windows it yet to be added once significant test data is present. PR's are welcom.

## Known Issues

- Might not work on Windows Operating systems.
- The `QuickPicker` performs slow with larger projects (30k files), since th Visual Studio API doesn't offer a dynamic update for the input selection as of today. We are still looking out for a suitable solution to make it work best.

## Release Notes

This is a pre-release of the extension and the extension is still under development. Please expect failures.

Please report issues or raise a PR for any contributions against https://github.com/gayanhewa/vscode-fuzzysearch

**Enjoy!**
