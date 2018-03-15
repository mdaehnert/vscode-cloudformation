'use strict';

import vscode = require('vscode');

export class CfCompletionItemProvider implements vscode.CompletionItemProvider {
  
  private START_POS: vscode.Position = new vscode.Position(0, 0); 


  public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {    
    return new Promise((resolve, reject) => {
//      let where = this.whereAmI(document, position);
//      console.log(where);

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
    let revLines: Array<string> = textUntilCursor.split("\n");
    let lastLine = revLines.shift() || "";

    let intendationLines: Array<String> = [];

    // Check space and tabs, then (nullsafe) count their occurences.
    let lastIntendation = (lastLine.match(/^[\t\s]*/) || [""])[0].length;

    for (let curIntendation=lastIntendation; curIntendation>=0; --curIntendation) {  
      while(true) {
        let curLine = revLines.shift() || "";
        let curIntendation = (curLine.match(/^[\t\s]*/) || [""])[0].length;
        if (curIntendation === curIntendation) {
          intendationLines.push(curLine);
          break;
        }
      }
    }

    console.log(intendationLines);

    return "nix";
  }

}

