
import React from 'react';

const PersonalNotice: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8 mb-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">关于本站</h3>
        <p className="text-gray-600 mb-3">
          默认反代节点 (654678.xyz) 由个人维护，资源有限，<span className="font-bold text-red-500">请勿滥用</span>。
        </p>
        <p className="text-gray-500 text-sm italic mb-6">
          本人初中生，用爱发电，不喜勿喷 (●'◡'●)
        </p>
        
        <a 
          href="https://chsm666.top" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
        >
          访问我的博客 (chsm666.top)
        </a>
      </div>
    </div>
  );
};

export default PersonalNotice;
