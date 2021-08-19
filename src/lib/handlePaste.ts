import * as vscode from "vscode";
import converter from "./converter";
const handlePaste = async () => {
  const editor = vscode.window.activeTextEditor;
  const clipboard = await vscode.env.clipboard.readText();
  const selection = vscode.window.activeTextEditor
    ?.selection as vscode.Selection;
  const start = selection.start; //start of the selection

  if (clipboard) {
    const newBlock = converter(clipboard.split("\n"), "JSX");
    editor?.edit((editBuilder) => {
      editBuilder.insert(start, newBlock.join("\n"));
    });
  }
};

export default handlePaste;
