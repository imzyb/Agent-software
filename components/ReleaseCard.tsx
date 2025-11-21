import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { GithubRelease, MirrorSource } from '../types';
import AssetList from './AssetList';
import { SparklesIcon, ChevronDownIcon, ChevronUpIcon } from './Icons';
import { summarizeChangelog } from '../services/geminiService';

interface ReleaseCardProps {
  release: GithubRelease;
  isLatest: boolean;
  mirrorSource: MirrorSource;
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({ release, isLatest, mirrorSource }) => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  
  // Default collapse update log for all versions as requested
  const [showFullLog, setShowFullLog] = useState(false);
  
  // Default collapse download files for versions other than latest
  const [showAssets, setShowAssets] = useState(isLatest);

  const handleAiSummarize = useCallback(async () => {
    if (summary) return;
    setIsSummarizing(true);
    try {
      const result = await summarizeChangelog(release.body);
      setSummary(result);
    } finally {
      setIsSummarizing(false);
    }
  }, [release.body, summary]);

  const publishedDate = new Date(release.published_at).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8 ${isLatest ? 'ring-2 ring-primary ring-opacity-50' : ''}`}>
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {release.name || release.tag_name}
              </h2>
              {isLatest && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  最新版本
                </span>
              )}
              {release.prerelease && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                  预览版
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <span>发布于 {publishedDate}</span>
              <span className="mx-2">•</span>
              <a href={release.html_url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                GitHub 原文
              </a>
            </div>
          </div>
          
          <button
            onClick={handleAiSummarize}
            disabled={isSummarizing || !!summary}
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              summary 
                ? 'bg-purple-50 text-purple-700 cursor-default'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
            } disabled:opacity-70`}
          >
            <SparklesIcon className={`h-4 w-4 mr-2 ${isSummarizing ? 'animate-spin' : ''}`} />
            {isSummarizing ? 'AI 解读中...' : summary ? 'AI 已解读' : 'AI 智能摘要'}
          </button>
        </div>

        {/* AI Summary Section */}
        {summary && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="text-sm font-semibold text-purple-900 flex items-center mb-2">
              <SparklesIcon className="h-4 w-4 mr-1.5 text-purple-600" />
              更新摘要 (AI)
            </h3>
            <div className="prose prose-sm prose-purple max-w-none text-purple-800 leading-relaxed whitespace-pre-line">
              {summary}
            </div>
          </div>
        )}

        {/* Changelog */}
        <div className="mt-6">
          <button 
             onClick={() => setShowFullLog(!showFullLog)}
             className="flex items-center text-base font-semibold text-gray-900 mb-3 hover:text-primary focus:outline-none"
          >
            更新日志
            {showFullLog ? (
              <ChevronUpIcon className="ml-1 h-4 w-4" />
            ) : (
               <ChevronDownIcon className="ml-1 h-4 w-4" />
            )}
            <span className="ml-2 text-xs font-normal text-gray-500">
              {showFullLog ? '点击收起' : '点击展开'}
            </span>
          </button>
          
           {showFullLog && (
             <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100 overflow-auto">
               <ReactMarkdown>{release.body}</ReactMarkdown>
             </div>
           )}
        </div>

        {/* Assets */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <button 
            onClick={() => setShowAssets(!showAssets)}
            className="w-full flex items-center justify-between text-left focus:outline-none group py-2"
          >
             <div className="flex items-center">
               <h3 className="text-base font-semibold text-gray-900">下载文件</h3>
               <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                 加速源: {mirrorSource}
               </span>
               <span className="ml-2 text-xs text-gray-400 font-normal hidden sm:inline">
                  ({release.assets.length} 个文件)
               </span>
             </div>
             {showAssets ? (
               <ChevronUpIcon className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
             ) : (
               <ChevronDownIcon className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
             )}
          </button>
          
          {showAssets && (
            <div className="mt-2">
              <AssetList assets={release.assets} mirrorSource={mirrorSource} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReleaseCard;