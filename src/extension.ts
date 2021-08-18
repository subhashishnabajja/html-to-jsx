import * as vscode from "vscode";
import handleConversion from "./lib/converToJsx";

export function activate(context: vscode.ExtensionContext) {
  console.log("extension is now up and runing");

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
}

export function deactivate() {
  vscode.window.showInformationMessage("Successfully disable");
}
