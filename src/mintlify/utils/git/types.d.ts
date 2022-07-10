import { Uri, Event, Disposable, ProviderResult } from 'vscode';
export { ProviderResult } from 'vscode';

export interface IRawFileChange {
	filename: string;
	previous_filename?: string;
	additions: number;
	deletions: number;
	changes: number;
	status: string;
	raw_url: string;
	blob_url: string;
	patch: string;
}

export interface API {
	/**
	 * Register a [git provider](#IGit)
	 */
	registerGitProvider(provider: IGit): Disposable;

	/**
	 * Returns the [git provider](#IGit) that contains a given uri.
	 *
	 * @param uri An uri.
	 * @return A git provider or `undefined`
	 */
	getGitProvider(uri: Uri): IGit | undefined;
}

export interface InputBox {
	value: string;
}

export interface Ref {
	readonly type: RefType;
	readonly name?: string;
	readonly commit?: string;
	readonly remote?: string;
}

export interface UpstreamRef {
	readonly remote: string;
	readonly name: string;
}

export interface Branch extends Ref {
	readonly upstream?: UpstreamRef;
	readonly ahead?: number;
	readonly behind?: number;
}

export interface Commit {
	readonly hash: string;
	readonly message: string;
	readonly parents: string[];
	readonly authorDate?: Date;
	readonly authorName?: string;
	readonly authorEmail?: string;
	readonly commitDate?: Date;
}

export interface Submodule {
	readonly name: string;
	readonly path: string;
	readonly url: string;
}

export interface Remote {
	readonly name: string;
	readonly fetchUrl?: string;
	readonly pushUrl?: string;
	readonly isReadOnly: boolean;
}

export const enum Status {
	INDEX_MODIFIED,
	INDEX_ADDED,
	INDEX_DELETED,
	INDEX_RENAMED,
	INDEX_COPIED,

	MODIFIED,
	DELETED,
	UNTRACKED,
	IGNORED,
	INTENT_TO_ADD,

	ADDED_BY_US,
	ADDED_BY_THEM,
	DELETED_BY_US,
	DELETED_BY_THEM,
	BOTH_ADDED,
	BOTH_DELETED,
	BOTH_MODIFIED,
}

export interface Change {
	/**
	 * Returns either `originalUri` or `renameUri`, depending
	 * on whether this change is a rename change. When
	 * in doubt always use `uri` over the other two alternatives.
	 */
	readonly uri: Uri;
	readonly originalUri: Uri;
	readonly renameUri: Uri | undefined;
	readonly status: Status;
}

export interface RepositoryState {
	readonly HEAD: Branch | undefined;
	readonly refs: Ref[];
	readonly remotes: Remote[];
	readonly submodules: Submodule[];
	readonly rebaseCommit: Commit | undefined;

	readonly mergeChanges: Change[];
	readonly indexChanges: Change[];
	readonly workingTreeChanges: Change[];

	readonly onDidChange: Event<void>;
}

export interface RepositoryUIState {
	readonly selected: boolean;
	readonly onDidChange: Event<void>;
}

export interface CommitOptions {
	all?: boolean | 'tracked';
	amend?: boolean;
	signoff?: boolean;
	signCommit?: boolean;
	empty?: boolean;
}

export interface FetchOptions {
	remote?: string;
	ref?: string;
	all?: boolean;
	prune?: boolean;
	depth?: number;
}

export interface BranchQuery {
	readonly remote?: boolean;
	readonly pattern?: string;
	readonly count?: number;
	readonly contains?: string;
}

export interface Repository {
	readonly inputBox: InputBox;
	readonly rootUri: Uri;
	readonly state: RepositoryState;
	readonly ui: RepositoryUIState;

	/**
	 * GH PR saves pull request related information to git config when users checkout a pull request.
	 * There are two mandatory config for a branch
	 * 1. `remote`, which refers to the related github repository
	 * 2. `github-pr-owner-number`, which refers to the related pull request
	 *
	 * There is one optional config for a remote
	 * 1. `github-pr-remote`, which indicates if the remote is created particularly for GH PR review. By default, GH PR won't load pull requests from remotes created by itself (`github-pr-remote=true`).
	 *
	 * Sample config:
	 * ```git
	 * [remote "pr"]
	 * url = https://github.com/pr/vscode-pull-request-github
	 * fetch = +refs/heads/*:refs/remotes/pr/*
	 * github-pr-remote = true
	 * [branch "fix-123"]
	 * remote = pr
	 * merge = refs/heads/fix-123
	 * github-pr-owner-number = "Microsoft#vscode-pull-request-github#123"
	 * ```
	 */
	getConfigs(): Promise<{ key: string; value: string }[]>;

	/**
	 * Git providers are recommended to implement a minimal key value lookup for git config but you can only provide config for following keys to activate GH PR successfully
	 * 1. `branch.${branchName}.github-pr-owner-number`
	 * 2. `remote.${remoteName}.github-pr-remote`
	 * 3. `branch.${branchName}.remote`
	 */
	getConfig(key: string): Promise<string>;

	/**
	 * The counterpart of `getConfig`
	 */
	setConfig(key: string, value: string): Promise<string>;
	getGlobalConfig(key: string): Promise<string>;

	getObjectDetails(treeish: string, path: string): Promise<{ mode: string; object: string; size: number }>;
	detectObjectType(object: string): Promise<{ mimetype: string; encoding?: string }>;
	buffer(ref: string, path: string): Promise<Buffer>;
	show(ref: string, path: string): Promise<string>;
	getCommit(ref: string): Promise<Commit>;

	clean(paths: string[]): Promise<void>;

	apply(patch: string, reverse?: boolean): Promise<void>;
	diff(cached?: boolean): Promise<string>;
	diffWithHEAD(): Promise<Change[]>;
	diffWithHEAD(path: string): Promise<string>;
	diffWith(ref: string): Promise<Change[]>;
	diffWith(ref: string, path: string): Promise<string>;
	diffIndexWithHEAD(): Promise<Change[]>;
	diffIndexWithHEAD(path: string): Promise<string>;
	diffIndexWith(ref: string): Promise<Change[]>;
	diffIndexWith(ref: string, path: string): Promise<string>;
	diffBlobs(object1: string, object2: string): Promise<string>;
	diffBetween(ref1: string, ref2: string): Promise<Change[]>;
	diffBetween(ref1: string, ref2: string, path: string): Promise<string>;

	hashObject(data: string): Promise<string>;

	createBranch(name: string, checkout: boolean, ref?: string): Promise<void>;
	deleteBranch(name: string, force?: boolean): Promise<void>;
	getBranch(name: string): Promise<Branch>;
	getBranches(query: BranchQuery): Promise<Ref[]>;
	setBranchUpstream(name: string, upstream: string): Promise<void>;
	getMergeBase(ref1: string, ref2: string): Promise<string>;

	status(): Promise<void>;
	checkout(treeish: string): Promise<void>;

	addRemote(name: string, url: string): Promise<void>;
	removeRemote(name: string): Promise<void>;
	renameRemote(name: string, newName: string): Promise<void>;

	fetch(options?: FetchOptions): Promise<void>;
	fetch(remote?: string, ref?: string, depth?: number): Promise<void>;
	pull(unshallow?: boolean): Promise<void>;
	push(remoteName?: string, branchName?: string, setUpstream?: boolean): Promise<void>;

	blame(path: string): Promise<string>;
	log(options?: LogOptions): Promise<Commit[]>;

	commit(message: string, opts?: CommitOptions): Promise<void>;
}

/**
 * Log options.
 */
export interface LogOptions {
	/** Max number of log entries to retrieve. If not specified, the default is 32. */
	readonly maxEntries?: number;
	readonly path?: string;
}

export interface IGit {
	readonly repositories: Repository[];
	readonly onDidOpenRepository: Event<Repository>;
	readonly onDidCloseRepository: Event<Repository>;

	// Used by the actual git extension to indicate it has finished initializing state information
	readonly state?: APIState;
	readonly onDidChangeState?: Event<APIState>;
	readonly onDidPublish?: Event<PublishEvent>;
}

export interface API {
	/**
	 * Register a [git provider](#IGit)
	 */
	registerGitProvider(provider: IGit): Disposable;

	/**
	 * Returns the [git provider](#IGit) that contains a given uri.
	 *
	 * @param uri An uri.
	 * @return A git provider or `undefined`
	 */
	getGitProvider(uri: Uri): IGit | undefined;
}


export interface Git {
	readonly path: string;
}

export interface InputBox {
	value: string;
}

export const enum ForcePushMode {
	Force,
	ForceWithLease
}

export const enum RefType {
	Head,
	RemoteHead,
	Tag
}

export interface Ref {
	readonly type: RefType;
	readonly name?: string;
	readonly commit?: string;
	readonly remote?: string;
}

export interface UpstreamRef {
	readonly remote: string;
	readonly name: string;
}

export interface Branch extends Ref {
	readonly upstream?: UpstreamRef;
	readonly ahead?: number;
	readonly behind?: number;
}

export interface Commit {
	readonly hash: string;
	readonly message: string;
	readonly parents: string[];
	readonly authorDate?: Date;
	readonly authorName?: string;
	readonly authorEmail?: string;
	readonly commitDate?: Date;
}

export interface Submodule {
	readonly name: string;
	readonly path: string;
	readonly url: string;
}

export interface Remote {
	readonly name: string;
	readonly fetchUrl?: string;
	readonly pushUrl?: string;
	readonly isReadOnly: boolean;
}

export interface Change {

	/**
	 * Returns either `originalUri` or `renameUri`, depending
	 * on whether this change is a rename change. When
	 * in doubt always use `uri` over the other two alternatives.
	 */
	readonly uri: Uri;
	readonly originalUri: Uri;
	readonly renameUri: Uri | undefined;
	readonly status: Status;
}

export interface RepositoryState {
	readonly HEAD: Branch | undefined;
	readonly refs: Ref[];
	readonly remotes: Remote[];
	readonly submodules: Submodule[];
	readonly rebaseCommit: Commit | undefined;

	readonly mergeChanges: Change[];
	readonly indexChanges: Change[];
	readonly workingTreeChanges: Change[];

	readonly onDidChange: Event<void>;
}

export interface RepositoryUIState {
	readonly selected: boolean;
	readonly onDidChange: Event<void>;
}

/**
 * Log options.
 */
export interface LogOptions {
	/** Max number of log entries to retrieve. If not specified, the default is 32. */
	readonly maxEntries?: number;
	readonly path?: string;
}

export interface CommitOptions {
	all?: boolean | 'tracked';
	amend?: boolean;
	signoff?: boolean;
	signCommit?: boolean;
	empty?: boolean;
	noVerify?: boolean;
	requireUserConfig?: boolean;
}

export interface FetchOptions {
	remote?: string;
	ref?: string;
	all?: boolean;
	prune?: boolean;
	depth?: number;
}

export interface BranchQuery {
	readonly remote?: boolean;
	readonly pattern?: string;
	readonly count?: number;
	readonly contains?: string;
}

export interface RemoteSource {
	readonly name: string;
	readonly description?: string;
	readonly url: string | string[];
}

export interface RemoteSourceProvider {
	readonly name: string;
	readonly icon?: string; // codicon name
	readonly supportsQuery?: boolean;
	getRemoteSources(query?: string): ProviderResult<RemoteSource[]>;
	getBranches?(url: string): ProviderResult<string[]>;
	publishRepository?(repository: Repository): Promise<void>;
}

export interface Credentials {
	readonly username: string;
	readonly password: string;
}

export interface CredentialsProvider {
	getCredentials(host: Uri): ProviderResult<Credentials>;
}

export interface PushErrorHandler {
	handlePushError(repository: Repository, remote: Remote, refspec: string, error: Error & { gitErrorCode: GitErrorCodes }): Promise<boolean>;
}

export type APIState = 'uninitialized' | 'initialized';

export interface PublishEvent {
	repository: Repository;
	branch?: string;
}

export interface GitAPI {
	readonly state: APIState;
	readonly onDidChangeState: Event<APIState>;
	readonly onDidPublish: Event<PublishEvent>;
	readonly git: Git;
	readonly repositories: Repository[];
	readonly onDidOpenRepository: Event<Repository>;
	readonly onDidCloseRepository: Event<Repository>;

	toGitUri(uri: Uri, ref: string): Uri;
	getRepository(uri: Uri): Repository | null;
	init(root: Uri): Promise<Repository | null>;
	openRepository(root: Uri): Promise<Repository | null>

	registerRemoteSourceProvider(provider: RemoteSourceProvider): Disposable;
	registerCredentialsProvider(provider: CredentialsProvider): Disposable;
	registerPushErrorHandler(handler: PushErrorHandler): Disposable;
}

export interface GitExtension {

	readonly enabled: boolean;
	readonly onDidChangeEnablement: Event<boolean>;

	/**
	 * Returns a specific API version.
	 *
	 * Throws error if git extension is disabled. You can listed to the
	 * [GitExtension.onDidChangeEnablement](#GitExtension.onDidChangeEnablement) event
	 * to know when the extension becomes enabled/disabled.
	 *
	 * @param version Version number.
	 * @returns API instance
	 */
	getAPI(version: 1): GitAPI;
}

export const enum GitErrorCodes {
	BadConfigFile = 'BadConfigFile',
	AuthenticationFailed = 'AuthenticationFailed',
	NoUserNameConfigured = 'NoUserNameConfigured',
	NoUserEmailConfigured = 'NoUserEmailConfigured',
	NoRemoteRepositorySpecified = 'NoRemoteRepositorySpecified',
	NotAGitRepository = 'NotAGitRepository',
	NotAtRepositoryRoot = 'NotAtRepositoryRoot',
	Conflict = 'Conflict',
	StashConflict = 'StashConflict',
	UnmergedChanges = 'UnmergedChanges',
	PushRejected = 'PushRejected',
	RemoteConnectionError = 'RemoteConnectionError',
	DirtyWorkTree = 'DirtyWorkTree',
	CantOpenResource = 'CantOpenResource',
	GitNotFound = 'GitNotFound',
	CantCreatePipe = 'CantCreatePipe',
	PermissionDenied = 'PermissionDenied',
	CantAccessRemote = 'CantAccessRemote',
	RepositoryNotFound = 'RepositoryNotFound',
	RepositoryIsLocked = 'RepositoryIsLocked',
	BranchNotFullyMerged = 'BranchNotFullyMerged',
	NoRemoteReference = 'NoRemoteReference',
	InvalidBranchName = 'InvalidBranchName',
	BranchAlreadyExists = 'BranchAlreadyExists',
	NoLocalChanges = 'NoLocalChanges',
	NoStashFound = 'NoStashFound',
	LocalChangesOverwritten = 'LocalChangesOverwritten',
	NoUpstreamBranch = 'NoUpstreamBranch',
	IsInSubmodule = 'IsInSubmodule',
	WrongCase = 'WrongCase',
	CantLockRef = 'CantLockRef',
	CantRebaseMultipleBranches = 'CantRebaseMultipleBranches',
	PatchDoesNotApply = 'PatchDoesNotApply',
	NoPathFound = 'NoPathFound',
	UnknownPath = 'UnknownPath',
}
