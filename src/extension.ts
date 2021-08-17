import * as vscode from "vscode";
import matchAll = require("string.prototype.matchall");
import attributes from "./dataset";

//Handle the conversion
const handleConversion = () => {
  //The active text editor
  const editor = vscode.window.activeTextEditor;
  //The selection
  const selection = vscode.window.activeTextEditor
    ?.selection as vscode.Selection;
  //The edited block
  const newBlock: string[] = [];
  //Loop through multiple selections

  const start = selection.start; //start of the selection
  const end = selection.end; //end of the selection
  //Selection is empty
  if (start.character === end.character && start.line === end.line) {
    vscode.window.showErrorMessage("Selection is empty");
  }
  //Selection Range
  const selectionRange = new vscode.Range(start, end);

  //Get the selection text
  const textBlock = vscode.window.activeTextEditor?.document
    .getText(selectionRange)
    .split("\n") as string[];
  console.log("start of the text");

  //Loop through each line of the selection
  for (const line of textBlock) {
    const regex =
      /([^\r\n\t\f\v= '"]+)(?:=(["'])?((?:.(?!\2?\s+(?:\S+)=|\2))+.)\2?)?/g;
    const matches = [...matchAll(line, regex)];
    let newLine: string = "";

    for (const match of matches) {
      const attribute = attributes.find(({ plain }) => {
        return plain === match[1];
      });
      if (attribute) {
        newLine = line.replace(attribute?.plain, attribute?.jsx);
      }
    }
    newBlock.push(newLine);
  }
  //Edit the block in the editor
  editor?.edit((editorBuilder: vscode.TextEditorEdit) => {
    editorBuilder.replace(selection, newBlock.join("\n"));
  });
};

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "html-to-jsx.convertToJsx",
    handleConversion
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {
  vscode.window.showInformationMessage("Successfully disable");
}
