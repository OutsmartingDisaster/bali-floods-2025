import React from 'react';
import { useTranslation } from 'react-i18next';

const FloatingLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = (i18n.language || 'id').startsWith('id') ? 'id' : 'en';

  const baseBtn = 'flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400';

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-full px-2 py-1">
        <button
          aria-label="Switch to Indonesian"
          onClick={() => i18n.changeLanguage('id')}
          className={`${baseBtn} ${current === 'id' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
        >
          <span className="mr-1">🇮🇩</span>
          ID
        </button>
        <span className="text-gray-400 font-bold">/</span>
        <button
          aria-label="Switch to English"
          onClick={() => i18n.changeLanguage('en')}
          className={`${baseBtn} ${current === 'en' ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
        >
          <span className="mr-1">🇬🇧</span>
          EN
        </button>
      </div>
    </div>
  );
};

export default FloatingLanguageSwitcher;
