import * as vscode from 'vscode';
import { GitApiImpl } from './gitApiImpl';
import { API, APIState, GitAPI, GitExtension, IGit, PublishEvent, Repository } from './types';

export const doRegisterBuiltinGitProvider = async (context: vscode.ExtensionContext, apiImpl: GitApiImpl): Promise<boolean> => {
	const builtInGitProvider = await registerBuiltinGitProvider(apiImpl);
	if (builtInGitProvider != null) {
		context.subscriptions.push(builtInGitProvider);
		return true;
	}
	return false;
};

export const registerBuiltinGitProvider = async (
	apiImpl: API,
): Promise<vscode.Disposable | undefined> => {
	const builtInGitProvider = await BuiltinGitProvider.createProvider();
	if (builtInGitProvider != null) {
		apiImpl.registerGitProvider(builtInGitProvider);
		return builtInGitProvider;
	}
};

export class BuiltinGitProvider implements IGit, vscode.Disposable {
	get repositories(): Repository[] {
		return this._gitAPI.repositories as any[];
	}

	get state(): APIState {
		return this._gitAPI.state;
	}

	private _onDidOpenRepository = new vscode.EventEmitter<Repository>();
	readonly onDidOpenRepository: vscode.Event<Repository> = this._onDidOpenRepository.event;
	private _onDidCloseRepository = new vscode.EventEmitter<Repository>();
	readonly onDidCloseRepository: vscode.Event<Repository> = this._onDidCloseRepository.event;
	private _onDidChangeState = new vscode.EventEmitter<APIState>();
	readonly onDidChangeState: vscode.Event<APIState> = this._onDidChangeState.event;
	private _onDidPublish = new vscode.EventEmitter<PublishEvent>();
	readonly onDidPublish: vscode.Event<PublishEvent> = this._onDidPublish.event;

	private _gitAPI: GitAPI;
	private _disposables: vscode.Disposable[];

	private constructor(extension: vscode.Extension<GitExtension>) {
		const gitExtension = extension.exports;

		try {
			this._gitAPI = gitExtension.getAPI(1);
		} catch (e) {
			// The git extension will throw if a git model cannot be found, i.e. if git is not installed.
			vscode.window.showErrorMessage('Activating the Pull Requests and Issues extension failed. Please make sure you have git installed.');
			throw e;
		}

		this._disposables = [];
		this._disposables.push(this._gitAPI.onDidCloseRepository(e => this._onDidCloseRepository.fire(e as any)));
		this._disposables.push(this._gitAPI.onDidOpenRepository(e => this._onDidOpenRepository.fire(e as any)));
		this._disposables.push(this._gitAPI.onDidChangeState(e => this._onDidChangeState.fire(e)));
		this._disposables.push(this._gitAPI.onDidPublish(e => this._onDidPublish.fire(e)));
	}

	static async createProvider(): Promise<BuiltinGitProvider | undefined> {
		const extension = vscode.extensions.getExtension<GitExtension>('vscode.git');
		if (extension != null) {
			await extension.activate();
			return new BuiltinGitProvider(extension);
		}
		return undefined;
	}

	dispose() {
		this._disposables.forEach(disposable => disposable.dispose());
	}
}
