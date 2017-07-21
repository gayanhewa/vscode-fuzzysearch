'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as shelljs from 'shelljs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "filelist" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed
        let input = vscode.window.showInputBox().then((input) => {
            shelljs.cd('/Users/gayan.hewa/Workspace/filelist');
            // shelljs.cd(vscode.workspace.rootPath);
            const filelist = shelljs.find('.').filter((file) => {
                return file.indexOf(input) != -1;
            });

            vscode.window.showQuickPick(filelist).then((file_selection) => {
                console.log('Selected file to open :' + file_selection);
                const selectedFile = vscode.Uri.file(context.asAbsolutePath(file_selection));
                console.log(selectedFile);
                vscode.workspace.openTextDocument(selectedFile).then((document) => {
                    vscode.window.showTextDocument(document);
                });

            });
        });

    });

    context.subscriptions.push(disposable);
}

// this method is cal`led when your extension is deactivated
export function deactivate() {
}
