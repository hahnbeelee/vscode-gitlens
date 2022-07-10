// import { URLSearchParams } from 'url';
import * as vscode from 'vscode';
import { ViewProvider } from './viewProvider';

export const registerAuthRoute = (provider: ViewProvider) => {
  // vscode.window.registerUriHandler({
  //   handleUri: async function(uri: vscode.Uri) {
  //     if (uri.path === '/auth') {
  //       try {
  //         const query = new URLSearchParams(uri.query);
  //         const userRaw = query.get('user');
  //         if (userRaw == null) {
  //           await vscode.window.showErrorMessage('Unable to authenticate. Try again later');
  //           return;
  //         }

  //         const user = JSON.parse(userRaw);
  //         if (user.email == null) {
  //           await vscode.window.showErrorMessage('User has insufficient credentials. Try again later');
  //           return;
  //         }

  //         await provider.authenticate(user);
  //         await vscode.window.showInformationMessage(`🙌 Successfully signed in with ${user.email}`);
  //       } catch (err) {
  //         await vscode.window.showErrorMessage('Error authenticating user');
  //       }
  //     } else if (uri.path === '/prefill-doc') {
  //       const query = new URLSearchParams(uri.query);
  //       const docId = query.get('docId');
  //       if (!docId) {
  //         await vscode.window.showErrorMessage('No document identifier selected');
  //         return;
  //       }

  //       provider.prefillDocWithDocId(docId);
  //     }
  //   }
  // });

  vscode.commands.registerCommand('mintlify.login', async () => {
    await provider.displaySignin();
  });

  vscode.commands.registerCommand('mintlify.logout', async () => {
    await provider.logout();
  });
};

export const openLogin = (endpoint: string) => {
  return vscode.env.openExternal(vscode.Uri.parse(`${endpoint}/api/login/vscode`));
};
