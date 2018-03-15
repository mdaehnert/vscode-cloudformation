'use strict';

import vscode = require('vscode');
import yaml = require('js-yaml');
import fs = require('fs');

export class CfCompletionItemProvider implements vscode.CompletionItemProvider {
  
  private START_POS: vscode.Position = new vscode.Position(0, 0); 


  public provideCompletionItems(document: vscode.TextDocument, curPosition: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {    
    return new Promise((resolve, reject) => {
      let schema  = this.getJsonSchema();
      let data    = this.getYamlUntilCursor(document, curPosition);
      // console.log(schema);
      // console.log(data);

      let completions = this.getCompletions(schema, data);

      return resolve(completions);
    });
  }

  private getCompletions(schema: any, data: any): Array<vscode.CompletionItem> {
    let completions = Array<vscode.CompletionItem>();

    if (data instanceof yaml.YAMLException) {
      completions.push(this.getYamlErrorCompletion(data));
      return completions;
    }

    completions.push(new vscode.CompletionItem("text1"));
    completions.push(new vscode.CompletionItem("text2"));

    return completions;
  }


  private getYamlErrorCompletion(data: yaml.YAMLException): vscode.CompletionItem {
    let brokenEntry           = new vscode.CompletionItem(data.name);
    brokenEntry.detail        = data.message;
    brokenEntry.documentation = data.stack;

    return brokenEntry;
  }


  private getJsonSchema(): any {
    let cfJson = fs.readFileSync(`${__dirname}/resources/CloudFormationResourceSpecification.json`);

    return JSON.parse(cfJson.toString());
  }

  private getYamlUntilCursor(document: vscode.TextDocument, curPosition: vscode.Position): any {
//    let text = document.getText();
//    let word = document.getWordRangeAtPosition(curPosition);
    
    let textUntilCursor = document.getText(new vscode.Range(this.START_POS, curPosition));

    try {
      return yaml.safeLoad(textUntilCursor);
    } catch (e) {
      return e;
    }
  }

}

