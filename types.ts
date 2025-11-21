
export interface GithubAuthor {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GithubAsset {
  id: number;
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
  updated_at: string;
}

export interface GithubRelease {
  id: number;
  tag_name: string;
  name: string;
  html_url: string;
  prerelease: boolean;
  published_at: string;
  body: string;
  assets: GithubAsset[];
  author: GithubAuthor;
}

export enum MirrorSource {
  GITHUB = "GitHub (官方)",
  GHPROXY = "GhProxy (推荐)",
  KGITHUB = "KGithub",
}

export const PROXY_MAP: Record<MirrorSource, (url: string) => string> = {
  [MirrorSource.GITHUB]: (url) => url,
  [MirrorSource.GHPROXY]: (url) => `https://mirror.ghproxy.com/${url}`,
  [MirrorSource.KGITHUB]: (url) => url.replace('github.com', 'kkgithub.com'),
};
