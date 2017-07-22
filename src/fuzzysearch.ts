'use strict';

import * as vscode from 'vscode';
import * as shelljs from 'shelljs';

let cache = [];

export function activate(context: vscode.ExtensionContext) {
    let ch = vscode.window.createOutputChannel('Fuzzy Search Logs');

    let disposableFuzzySearchCommand = vscode.commands.registerCommand('extension.fuzzySearch', async () => {

        // Populate a recently viewed file list for the QuickPick dropdown
        vscode.workspace.onDidOpenTextDocument((file) => {
            console.log(file);

            let fileName = file.fileName;

            if (!shelljs.test('-f', fileName)) {
                console.log(shelljs.test('-f', fileName));
                console.log('Path is not a valid filename', fileName);
                return;
            }

            const item = {
                'label' : "Recent: "+fileName.split('/')[fileName.split('/').length-1],
                'description' : fileName.split('/').splice(0,fileName.split('/').length-1).join('/'),
                'detail': fileName
            };

            let files = context.workspaceState.get('modified_files', []);

            let updated = false;

            files.forEach((v,i) => {
                if (files[i].label === item.label) {
                    updated = true;
                    files[i] = item;
                }
            });

            if (!updated) {
                files.push(item);
            }

            context.workspaceState.update('modified_files', files.slice(-5));
        });

        // if (vscode.workspace.rootPath === undefined) {
        //     vscode.window.showErrorMessage('Unable to use Fuzzy search extension without an active project open.');
        //     return;
        // }

        ch.appendLine("Fetching files ...");

        let all_filelist = await getFileList(context.asAbsolutePath('/'));
        let recent_filelist = context.workspaceState.get('modified_files', []);

        let filelist = recent_filelist.concat(all_filelist);

        ch.appendLine("Number of files in the project : "+filelist.length );

        vscode.window.showQuickPick(
            filelist,
            {
                placeHolder: 'Enter filename',
                ignoreFocusOut: true,
                matchOnDescription: true,
                matchOnDetail: true
            }
        ).then((file_selection) => {
            console.log(file_selection);
            ch.appendLine('Selected File to open : ' + file_selection.label);
            if (file_selection.detail !== undefined) {
                let file_path = (shelljs.test('-f', context.asAbsolutePath(file_selection.detail))) ? context.asAbsolutePath(file_selection.detail): file_selection.detail;
                const selectedFile = vscode.Uri.file(file_path);
                vscode.workspace.openTextDocument(selectedFile).then((document) => {
                    vscode.window.showTextDocument(document);
                });
            }
        });

    });

    let disposableFuzzySearchFlushCommand = vscode.commands.registerCommand('extension.fuzzySearchFlush', () => {
        cache = [];
        context.workspaceState.update('modified_files', []);
    });

    context.subscriptions.push(disposableFuzzySearchCommand);
    context.subscriptions.push(disposableFuzzySearchFlushCommand);
}

export function getFileList(path) {

    // if (cache.length>0) {
    //     console.log('cached result');
    //     return cache;
    // }

    shelljs.cd(path);
    let filelist = shelljs.find('.').filter((file) => {
        return shelljs.test('-f', file) && !shelljs.test('-L', file) && file.indexOf('.git') < 0 && file.indexOf('.vscode') && file !== '.';
    });

    filelist.forEach((element,index) => {
        let item = {
            'label' : element.split('/')[element.split('/').length-1],
            'description' : element.split('/').splice(0,element.split('/').length-1).join('/'),
            'detail': element
        }

        filelist[index] = item;
    });

    cache = filelist;
    return cache;
}

export function deactivate(context: vscode.ExtensionContext) {
    cache = [];
    context.workspaceState.update('modified_files', []);
}
