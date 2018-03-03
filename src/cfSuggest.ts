'use strict';

import vscode = require('vscode');

export class CfCompletionItemProvider implements vscode.CompletionItemProvider {

  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
    console.log("Nothing here...");

    return new Promise((resolve, reject) => {

    });
  }
}

