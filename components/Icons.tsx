import React from 'react';

export const DownloadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

export const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM9 15a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 019 15z" clipRule="evenodd" />
  </svg>
);

export const GitHubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export const ServerIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
  </svg>
);

export const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9l6 6 6-6"/></svg>
);

export const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 15l-6-6-6 6"/></svg>
);

export const AndroidIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.523 15.3414C17.523 16.7157 16.4034 17.8307 15.0223 17.8307C13.6413 17.8307 12.5216 16.7157 12.5216 15.3414C12.5216 13.9671 13.6413 12.8521 15.0223 12.8521C16.4034 12.8521 17.523 13.9671 17.523 15.3414ZM6.47663 15.3414C6.47663 16.7157 5.35701 17.8307 3.97591 17.8307C2.59482 17.8307 1.4752 16.7157 1.4752 15.3414C1.4752 13.9671 2.59482 12.8521 3.97591 12.8521C5.35701 12.8521 6.47663 13.9671 6.47663 15.3414ZM19.6527 6.78691L21.9388 2.82716C22.0389 2.65375 21.9794 2.43238 21.8052 2.33281C21.6309 2.23324 21.4084 2.29243 21.3083 2.46584L19.008 6.44986C17.1266 5.58684 14.978 5.10082 12.6935 5.10082C10.409 5.10082 8.2604 5.58684 6.37898 6.44986L4.07868 2.46584C3.97859 2.29243 3.75606 2.23324 3.58183 2.33281C3.4076 2.43238 3.3481 2.65375 3.44819 2.82716L5.7343 6.78691C2.50992 8.54416 0.26321 11.8761 0.0323899 15.7926H25.3546C25.1238 11.8761 22.8771 8.54416 19.6527 6.78691Z"/>
  </svg>
);

export const WindowsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M0 3.449L9.889 2.109V11.609H0V3.449ZM9.893 12.493H0V20.555L9.893 19.211V12.493ZM10.982 1.962L24 0.201001V11.611H10.982V1.962ZM10.982 12.492H24V23.802L10.982 22.042V12.492Z"/>
  </svg>
);

export const AppleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.34 14.82a5.37 5.37 0 0 1-2.09-3.24a5.39 5.39 0 0 1 .4-3.3a4.7 4.7 0 0 1 2.37-2.52a5 5 0 0 0-2.4-2.14a4.84 4.84 0 0 0-3.3 1.25a5.32 5.32 0 0 0-2 3.65a4.78 4.78 0 0 0 .52 2.62a4.57 4.57 0 0 0-1.73 2.19a4.87 4.87 0 0 0 .15 3.86a4.82 4.82 0 0 0 2.36 2.52a5.06 5.06 0 0 0 3.32-1.12a5.28 5.28 0 0 0 2.39-4.17M13.82 3.23a2.46 2.46 0 0 1 1.54-.84a2.53 2.53 0 0 1 1.22.43a2.44 2.44 0 0 0-1.57.87a2.52 2.52 0 0 0-1.19-.46Z"/>
    </svg>
);

export const QuestionMarkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10 19v-2h4v2zm2-4a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4h2a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2v2z"/>
    </svg>
);