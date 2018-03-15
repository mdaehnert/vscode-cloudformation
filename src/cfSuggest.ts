'use strict';

import vscode = require('vscode');
import yaml = require('js-yaml');

export class CfCompletionItemProvider implements vscode.CompletionItemProvider {
  
  private START_POS: vscode.Position = new vscode.Position(0, 0); 


  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {    
    return new Promise((resolve, reject) => {
      let where = this.whereAmI(document, position);
      console.log(where);

      let suggestions = Array<vscode.CompletionItem>();
      suggestions.push(new vscode.CompletionItem("text1"));
      suggestions.push(new vscode.CompletionItem("text2"));

      return resolve(suggestions);
    });
  }

  private whereAmI(document: vscode.TextDocument, curPosition: vscode.Position): String {
    let text = document.getText();
    let word = document.getWordRangeAtPosition(curPosition);
    
    let textUntilCursor = document.getText(new vscode.Range(this.START_POS, curPosition));

    let doc = yaml.safeLoad(textUntilCursor);
    console.log(doc);
    console.log(yaml.safeDump(doc));

    return "";
  }

}

