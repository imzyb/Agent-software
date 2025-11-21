import { GithubRelease } from '../types';

const REPO_OWNER = '2dust';

export const fetchReleases = async (repoName: string = 'v2rayN'): Promise<GithubRelease[]> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${repoName}/releases`);
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch releases", error);
    throw error;
  }
};