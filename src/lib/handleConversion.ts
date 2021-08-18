import * as vscode from "vscode";
import matchAll = require("string.prototype.matchall");
import attributes from "./dataset";
import converter from "./converter";

/**
 * Convert jsx to html and vice-versa
 * @param {"HTML"|"JSX"} to
 */
const handleConversion = (to: "HTML" | "JSX") => {
  //The active text editor
  const editor = vscode.window.activeTextEditor;
  //TODO:Remove this log
  console.log(to);

  //The selection
  const selection = vscode.window.activeTextEditor
    ?.selection as vscode.Selection;

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

  //The edited block
  const newBlock = converter(textBlock, to);

  //Edit the block in the editor
  editor?.edit((editorBuilder: vscode.TextEditorEdit) => {
    console.log(newBlock);

    editorBuilder.replace(selection, newBlock.join("\n"));
  });
};

export default handleConversion;
