import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "html-to-jsx" is now active!');

  let disposable = vscode.commands.registerCommand(
    "html-to-jsx.convertToJsx",
    () => {}
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
