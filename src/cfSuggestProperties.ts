'use strict';

import vscode = require('vscode');


export class CfSuggestProperties {

  private schema: any;
  private data: any;

  public constructor(schema: any, data: any) {
    this.schema = schema.PropertyTypes;
    this.data = data;
  }

  /**
   * The last element of parsed yaml is the wished root node.
   */
  public isUsable(): boolean {
    let types = Object.keys(this.data).reverse();

    if (types[0] === 'Properties') {
      return true;
    } else {
      return false;
    }  }


  public getCompletions(): Array<vscode.CompletionItem> {
    console.log('PropertyCompletion started...');

    let completions = Array<vscode.CompletionItem>();

    return completions;
  }
}

