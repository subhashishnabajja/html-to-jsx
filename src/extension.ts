import * as vscode from "vscode";
import handleConversion from "./lib/handleConversion";
import handlePaste from "./lib/handlePaste";

export function activate(context: vscode.ExtensionContext) {
  //Convert HTML to JSx
  let convertToJsx = vscode.commands.registerCommand(
    "html-to-jsx.convertToJsx",
    () => {
      handleConversion("JSX");
    }
  );
  context.subscriptions.push(convertToJsx);

  //Convert JSX to HTML
  let convertToHTML = vscode.commands.registerCommand(
    "html-to-jsx.convertToHtml",
    () => {
      handleConversion("HTML");
    }
  );
  context.subscriptions.push(convertToHTML);

  //Paste as per the extension of the file
  let pasteAsJsx = vscode.commands.registerCommand(
    "html-to-jsx.pasteAsJsx",
    handlePaste
  );
  context.subscriptions.push(pasteAsJsx);
}

export function deactivate() {
  vscode.window.showInformationMessage("Successfully disabled");
}
