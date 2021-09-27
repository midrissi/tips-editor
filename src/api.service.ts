import { Octokit } from '@octokit/core';

import { TIPS_URL } from './store/constants.store';
import { TItem } from './store/interfaces.store';
import { getRepoInfo } from './utils/utils';

export const fetchItems = (): Promise<TItem[]> =>
  fetch(TIPS_URL).then((res) => res.json() as Promise<TItem[]>);

export const update = async (
  items: TItem[],
  message: string,
  auth: string,
): Promise<boolean> => {
  const octokit = new Octokit({ auth });
  const repo_info = getRepoInfo();

  if (!repo_info) {
    throw new Error('Repository not specified');
  }

  const { branch, owner, path, repo } = repo_info;
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      repo,
      owner,
      path,
    },
  );

  const content = Buffer.from(
    JSON.stringify(items, null, 2),
  ).toString('base64');

  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    sha: (data as any).sha,
    repo,
    path,
    owner,
    branch,
    message,
    content,
  });

  return true;
};
