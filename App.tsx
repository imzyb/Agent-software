
import React, { useEffect, useState, useMemo } from 'react';
import { fetchReleases } from './services/githubService';
import { GithubRelease, MirrorSource } from './types';
import ReleaseCard from './components/ReleaseCard';
import { ServerIcon, GitHubIcon, AndroidIcon, WindowsIcon, AppleIcon, QuestionMarkIcon } from './components/Icons';

interface RepoConfig {
  id: string;
  displayName: string;
  owner: string;
  repo: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  colorClass: string;
  platform: string;
  recommendedAssetPattern?: RegExp;
}

const REPO_CONFIG: RepoConfig[] = [
  // Windows Clients
  {
    id: 'v2rayN',
    displayName: 'v2rayN',
    owner: '2dust',
    repo: 'v2rayN',
    Icon: WindowsIcon,
    colorClass: 'bg-primary',
    platform: 'Windows (PC)',
    recommendedAssetPattern: /v2rayN-Core\.zip$/i,
  },
  {
    id: 'nekoray',
    displayName: 'Nekoray',
    owner: 'MatsuriDayo',
    repo: 'nekoray',
    Icon: WindowsIcon,
    colorClass: 'bg-cyan-500',
    platform: 'Windows/Linux',
    recommendedAssetPattern: /nekoray.*\.zip$/i,
  },
  {
    id: 'flyclash-windows',
    displayName: 'FlyClash',
    owner: 'GtxFury',
    repo: 'FlyClash',
    Icon: WindowsIcon,
    colorClass: 'bg-indigo-500',
    platform: 'Windows (PC)',
    recommendedAssetPattern: /FlyClash.*\.exe$/i,
  },
  {
    id: 'flclash',
    displayName: 'FlClash',
    owner: 'chen08209',
    repo: 'FlClash',
    Icon: WindowsIcon,
    colorClass: 'bg-pink-500',
    platform: 'Windows (PC)',
    recommendedAssetPattern: /FlClash.*\.exe$/i,
  },
  {
    id: 'hiddify-next-windows',
    displayName: 'Hiddify',
    owner: 'hiddify',
    repo: 'Hiddify-Next',
    Icon: WindowsIcon,
    colorClass: 'bg-yellow-500',
    platform: 'Windows (PC)',
    recommendedAssetPattern: /Hiddify-Next-Setup.*\.exe$/i,
  },

  // Android Clients
  {
    id: 'v2rayNG',
    displayName: 'v2rayNG',
    owner: '2dust',
    repo: 'v2rayNG',
    Icon: AndroidIcon,
    colorClass: 'bg-green-500',
    platform: 'Android (手机)',
    recommendedAssetPattern: /universal-release\.apk$/i,
  },
  {
    id: 'nekobox-android',
    displayName: 'NekoBoxForAndroid',
    owner: 'MatsuriDayo',
    repo: 'NekoBoxForAndroid',
    Icon: AndroidIcon,
    colorClass: 'bg-teal-500',
    platform: 'Android (手机)',
    recommendedAssetPattern: /NekoBoxForAndroid.*\.apk$/i,
  },
  {
    id: 'flyclash-android',
    displayName: 'FlyClash',
    owner: 'GtxFury',
    repo: 'FlyClash-Android',
    Icon: AndroidIcon,
    colorClass: 'bg-orange-500',
    platform: 'Android (手机)',
    recommendedAssetPattern: /FlyClash.*\.apk$/i,
  },
  {
    id: 'sing-box-android',
    displayName: 'sing-box',
    owner: 'SagerNet',
    repo: 'sing-box-for-android',
    Icon: AndroidIcon,
    colorClass: 'bg-green-600',
    platform: 'Android (手机)',
    recommendedAssetPattern: /SFA.*universal-release\.apk$/i,
  },
  {
    id: 'hiddify-next-android',
    displayName: 'Hiddify',
    owner: 'hiddify',
    repo: 'Hiddify-Next',
    Icon: AndroidIcon,
    colorClass: 'bg-yellow-600',
    platform: 'Android (手机)',
    recommendedAssetPattern: /Hiddify-Next.*\.apk$/i,
  },

  // macOS Clients
  {
    id: 'hiddify-next-macos',
    displayName: 'Hiddify',
    owner: 'hiddify',
    repo: 'Hiddify-Next',
    Icon: AppleIcon,
    colorClass: 'bg-neutral-800',
    platform: 'macOS (电脑)',
    recommendedAssetPattern: /Hiddify-Next.*\.dmg$/i,
  },
];


const App: React.FC = () => {
  const [releases, setReleases] = useState<GithubRelease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [mirrorSource, setMirrorSource] = useState<MirrorSource>(MirrorSource.GHPROXY);
    const [currentRepoId, setCurrentRepoId] = useState<string>(REPO_CONFIG[0].id);
    const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
    const [sortOrder, setSortOrder] = useState('default');
  
    const filteredRepos = useMemo(() => {
      let repos = REPO_CONFIG;
  
      if (searchTerm) {
        repos = repos.filter(repo =>
          repo.displayName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      if (sortOrder === 'az') {
        repos = [...repos].sort((a, b) => a.displayName.localeCompare(b.displayName));
      }
      
      return repos;
    }, [searchTerm, sortOrder]);
  
    const groupedRepos = useMemo(() => {
      return filteredRepos.reduce((acc, repo) => {
        const platform = repo.platform;
        if (!acc[platform]) {
          acc[platform] = [];
        }
        acc[platform].push(repo);
        return acc;
      }, {} as Record<string, RepoConfig[]>);
    }, [filteredRepos]);
  
    const currentConfig = useMemo(() => {
      return REPO_CONFIG.find(c => c.id === currentRepoId) || REPO_CONFIG[0];
    }, [currentRepoId]);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          setLoading(true);
          setReleases([]); // Clear previous data
          const data = await fetchReleases(currentConfig.owner, currentConfig.repo);
          setReleases(data);
          setError(null);
        } catch (err) {
          setError('无法获取版本信息，可能是 GitHub API 速率限制。请稍后再试。');
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }, [currentConfig]);
  
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                   <ServerIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 leading-none">Agent-Software</h1>
                  <p className="text-xs text-gray-500 mt-1">GitHub Release Mirror</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-md">
                    <span className="font-medium">加速节点:</span>
                    <select 
                      value={mirrorSource}
                      onChange={(e) => setMirrorSource(e.target.value as MirrorSource)}
                      className="bg-transparent border-none focus:ring-0 text-gray-900 font-medium cursor-pointer text-sm outline-none"
                    >
                      {Object.values(MirrorSource).map((src) => (
                        <option key={src} value={src}>{src}</option>
                      ))}
                    </select>
                 </div>
                 <a href={`https://github.com/${currentConfig.owner}/${currentConfig.repo}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                    <GitHubIcon className="h-6 w-6" />
                 </a>
              </div>
            </div>
          </div>
        </nav>
  
        {/* Mobile Mirror Selector */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
               <span className="text-sm font-medium text-gray-600">下载加速线路:</span>
               <select 
                  value={mirrorSource}
                  onChange={(e) => setMirrorSource(e.target.value as MirrorSource)}
                  className="form-select block pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                >
                  {Object.values(MirrorSource).map((src) => (
                    <option key={src} value={src}>{src}</option>
                  ))}
                </select>
            </div>
        </div>
  
        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header / Intro */}
          <div className="text-center mb-8">
             <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
               获取最新 {currentConfig.displayName}
             </h2>
             
             {/* Search and Sort Controls */}
             <div className="max-w-xl mx-auto mt-6 mb-4 flex gap-2">
                <input
                  type="text"
                  placeholder="搜索软件名称..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="default">默认排序</option>
                  <option value="az">名称排序 (A-Z)</option>
                </select>
              </div>
  
             {/* Platform Switcher */}
              <div className="mt-6 space-y-8">
                {Object.keys(groupedRepos).length > 0 ? (
                  Object.entries(groupedRepos).map(([platform, repos]) => (
                    <div key={platform} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-left px-1">{platform}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {repos.map((config) => {
                          const isSelected = config.id === currentRepoId;
                          const Icon = config.Icon || QuestionMarkIcon;
                          return (
                            <button
                              key={config.id}
                              onClick={() => setCurrentRepoId(config.id)}
                              className={`flex items-center justify-center text-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                isSelected
                                  ? `${config.colorClass} text-white shadow-md`
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <Icon className={`h-5 w-5 mr-2 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                              {config.displayName}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 mt-8">未找到匹配的软件。</p>
                )}
              </div>
           <p className="max-w-2xl mx-auto text-gray-500 mt-6">
             国内高速下载镜像，同步 GitHub 官方发布。
           </p>
        </div>

        {/* Status Handling */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-500">正在从 GitHub 获取 {currentConfig.displayName} 版本信息...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Release Cards */}
        {!loading && !error && (
          <div className="space-y-8">
            {releases.map((release, index) => (
              <React.Fragment key={release.id}>
                <ReleaseCard 
                  release={release} 
                  isLatest={index === 0}
                  mirrorSource={mirrorSource}
                  recommendedAssetPattern={currentConfig.recommendedAssetPattern}
                />
              </React.Fragment>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p className="mt-2">Agent-Software by Google Gemini</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
