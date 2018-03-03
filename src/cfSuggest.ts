'use strict';

import vscode = require('vscode');

export class CfCompletionItemProvider implements vscode.CompletionItemProvider {

	public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
		console.log("nuescht gibts.");
		
		return new Promise((resolve, reject) => {

		});
	}
}

