import { useTranslation } from 'react-i18next';
import WeatherChart from '../charts/WeatherChart';

/**
 * IntroSection - Introduction Section with Historical Context
 * 
 * This section provides:
 * - Historical context of flooding in Bali
 * - Rainfall data and meteorological background
 * - Smooth gradient transition from hero section
 * - Typography-focused design with multilingual support
 */

const IntroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-black">
      {/* Smooth Transition Gradient - Larger for better blend */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/20 via-black/60 to-black"></div>
      
      {/* Content Container */}
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Large spacer for scroll breathing room */}
          <div className="h-96"></div>
          <div className="h-96"></div>
                  
          {/* Image Section */}
          <div className="mb-12">
            <img 
              src="/img/banjir2025.jpeg" 
              alt={t('intro.altText')} 
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Main Content */}
          <div className="mb-20">
            <div className="prose prose-lg max-w-none text-white/90 leading-relaxed space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                {t('intro.title')}
              </h2>
              
              <p className="text-xl text-blue-300 font-semibold">
                {t('intro.year')}
              </p>

              <p>
                {t('intro.content1')}
              </p>
              
              <p>
                {t('intro.content2')}
              </p>
              
              <p>
                {t('intro.content3')}
              </p>
            </div>
          </div>

          {/* Social Media Voices Section */}
          <div className="mb-20 bg-slate-900/50 backdrop-blur-sm rounded-lg p-8 border border-slate-700">
            <div className="space-y-4 mb-6">
              <blockquote className="text-slate-300 italic border-l-4 border-blue-500 pl-4">
                "{t('intro.voice1')}"
              </blockquote>
              <blockquote className="text-slate-300 italic border-l-4 border-blue-500 pl-4">
                "{t('intro.voice2')}"
              </blockquote>
              <blockquote className="text-slate-300 italic border-l-4 border-blue-500 pl-4">
                "{t('intro.voice3')}"
              </blockquote>
              <blockquote className="text-slate-300 italic border-l-4 border-blue-500 pl-4">
                "{t('intro.voice4')}"
              </blockquote>
            </div>
            <p className="text-slate-400 text-sm text-center mb-4">
              {t('intro.voicesCaption')}
            </p>
            <p className="text-red-300 text-sm font-semibold text-center">
              {t('intro.panicNote')}
            </p>
          </div>

          {/* Bottom spacing for smooth transition */}
          <div className="h-32"></div>

          {/* Transition Element */}
          <div className="text-center">
            <div className="w-1 h-16 bg-gradient-to-b from-white/60 to-transparent mx-auto"></div>
            <p className="text-white/60 text-sm mt-4">
              {t('intro.year')}
            </p>
          </div>
          
          {/* Additional bottom spacing */}
          <div className="h-20"></div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
