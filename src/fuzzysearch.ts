'use strict';

import * as vscode from 'vscode';
import * as shelljs from 'shelljs';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('extension.fuzzySearch', async () => {

        if (vscode.workspace.rootPath === undefined) {
            vscode.window.showErrorMessage('Unable to use Fuzzy search extension without an active project open.');
            return;
        }

        const filelist = await getFileList(vscode.workspace.rootPath);

        if (filelist.length < 1) {
            vscode.window.showInformationMessage("Empty workspace");
            return;
        }

        vscode.window.showQuickPick(filelist).then((file_selection) => {
            if (file_selection !== undefined) {
                const selectedFile = vscode.Uri.file(context.asAbsolutePath(file_selection));
                vscode.workspace.openTextDocument(selectedFile).then((document) => {
                    vscode.window.showTextDocument(document);
                });
            }
        });

    });

    context.subscriptions.push(disposable);
}

export function getFileList(path) {
    shelljs.cd(path);
    // shelljs.cd(vscode.workspace.rootPath);
    const filelist = shelljs.find('.').filter((file) => {
        return file.indexOf('.git') < 0 && file.indexOf('.vscode') < 0 && file !== '.';
    });

    return filelist;
}

export function deactivate() {
    console.log('Disabled filelist');

}
