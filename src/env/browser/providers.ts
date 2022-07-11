import { Container } from '../../container';
import { GitCommandOptions } from '../../git/commandOptions';
import { GitProvider } from '../../git/gitProvider';

export function git(_options: GitCommandOptions, ..._args: any[]): Promise<string | Buffer> {
	return Promise.resolve('');
}

export async function getSupportedGitProviders(container: Container): Promise<GitProvider[]> {
	return [];
}
