import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Check } from 'lucide-react';

const Preloader = ({ onLoaded }) => {
  const { i18n } = useTranslation();
  const [languageSelected, setLanguageSelected] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  
  const languages = [
    { 
      code: 'id', 
      name: 'Indonesia', 
      flag: '🇮🇩',
      subtitle: 'Bahasa Indonesia'
    },
    { 
      code: 'en', 
      name: 'English', 
      flag: '🇬🇧',
      subtitle: 'English Language'
    }
  ];

  const handleLanguageSelect = async (langCode) => {
    setSelectedLang(langCode);
    await i18n.changeLanguage(langCode);
    
    // Small delay for visual feedback
    setTimeout(() => {
      setLanguageSelected(true);
    }, 300);
  };
  
  useEffect(() => {
    if (!languageSelected) return;

    const loadResources = async () => {
      // Detect mobile and reduce preloaded data
      const isMobile = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      // On mobile: only preload critical data, lazy-load the rest
      const resources = isMobile ? [
        '/data/flood_points.geojson',
        '/data/flood_impact.geojson',
        '/data/rivers.geojson'
      ] : [
        '/data/flood_points.geojson',
        '/data/flood_impact.geojson',
        '/data/rivers.geojson',
        '/data/admin_boundaries.geojson',
        '/data/radius.geojson',
        '/data/river_buffers.geojson',
        '/data/population.geojson',
        '/data/kelurahan_boundaries.geojson'
      ];
      
      let loaded = 0;
      const total = resources.length;
      
      const loadingTextMap = {
        id: 'Memuat',
        en: 'Loading'
      };
      
      for (const resource of resources) {
        try {
          setLoadingText(`${loadingTextMap[i18n.language]}: ${resource.split('/').pop()}`);
          const response = await fetch(resource);
          if (!response.ok) {
            console.warn(`Failed to load: ${resource}`);
          }
          loaded++;
          setProgress(Math.round((loaded / total) * 100));
          
          // Small delay for better UX
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`Error loading ${resource}:`, error);
          loaded++;
          setProgress(Math.round((loaded / total) * 100));
        }
      }
      
      setLoadingText(i18n.language === 'id' ? 'Selesai!' : 'Complete!');
      setTimeout(() => {
        onLoaded();
      }, 500);
    };
    
    loadResources();
  }, [languageSelected, onLoaded, i18n]);
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 z-50 flex items-center justify-center">
      <div className="text-center px-6 max-w-2xl mx-auto">
        {/* Logo / Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Banjir Bali 2025
        </h1>
        <p className="text-blue-200 text-lg mb-12">
          Data storytelling yang disusun berdasarkan jeritan warga dan laporan formalitas aparat di sosial media.
        </p>
        
        {!languageSelected ? (
          /* Language Selection Screen */
          <div className="animate-slide-up">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-400/30">
                <Languages className="w-10 h-10 text-blue-300" />
              </div>
            </div>

            {/* Instruction */}
            <h2 className="text-2xl font-semibold text-white mb-3">
              Select Your Language
            </h2>
            <p className="text-blue-300 mb-8">
              Choose your preferred language to continue
            </p>
            
            {/* Language Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedLang === language.code
                      ? 'bg-blue-500/30 border-blue-400 shadow-xl shadow-blue-500/20'
                      : 'bg-blue-950/30 border-blue-700/30 hover:bg-blue-800/20 hover:border-blue-500/50'
                  }`}
                  disabled={selectedLang !== null}
                >
                  {/* Flag */}
                  <div className="text-5xl mb-3">{language.flag}</div>
                  
                  {/* Language Name */}
                  <div className="text-xl font-semibold text-white mb-1">
                    {language.name}
                  </div>
                  <div className="text-sm text-blue-300">
                    {language.subtitle}
                  </div>

                  {/* Check Icon when selected */}
                  {selectedLang === language.code && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-300"></div>
                </button>
              ))}
            </div>

            {/* Hint Text */}
            <p className="text-blue-400/60 text-xs mt-8">
              Pilih bahasa Anda / Select your language
            </p>
          </div>
        ) : (
          /* Loading Screen */
          <div className="animate-slide-up">
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto">
              <div className="bg-blue-950/50 rounded-full h-3 mb-4 overflow-hidden border border-blue-700/30">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  <div className="h-full w-full bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              {/* Progress Text */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-300">{loadingText}</span>
                <span className="text-cyan-400 font-semibold">{progress}%</span>
              </div>
            </div>
            
            {/* Loading Animation */}
            <div className="mt-12 flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            
            {/* Info Text */}
            <p className="text-blue-300/70 text-xs mt-8">
              {i18n.language === 'id' 
                ? 'Memuat peta dan data geospasial...' 
                : 'Loading maps and geospatial data...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preloader;
