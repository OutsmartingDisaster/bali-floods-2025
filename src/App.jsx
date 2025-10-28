import { useState, lazy, Suspense, useEffect } from 'react'
import { useScrollama } from './hooks/useScrollama'
import ScrollStep from './components/scrollytelling/ScrollStep'
import HeroSection from './components/sections/HeroSection';
import IntroSection from './components/sections/IntroSection';
import CollageSection from './components/sections/CollageSection';
import FloodPreloader from './components/FloodPreloader';
import FloatingLanguageSwitcher from './components/FloatingLanguageSwitcher';
import { floodStatistics, severityDistribution } from './data/floodData'
import { useTranslation } from 'react-i18next';
import { loadUmami } from './utils/umami';
import { useUmamiScrollDepth } from './hooks/useUmamiScrollDepth';

// Lazy load heavy components
const DenpasarSection = lazy(() => import('./components/sections/DenpasarSection'));
const BadungSection = lazy(() => import('./components/sections/BadungSection'));
const FloodImpactSection = lazy(() => import('./components/sections/FloodImpactSection'));
const FloodBarChart = lazy(() => import('./components/scrollytelling/Charts').then(m => ({ default: m.FloodBarChart })));
const SeverityPieChart = lazy(() => import('./components/scrollytelling/Charts').then(m => ({ default: m.SeverityPieChart })));
const WeatherChart = lazy(() => import('./components/charts/WeatherChart'));

// Collage images moved to CollageSection component

function App() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeEvent, setActiveEvent] = useState(null)
  const [collageProgress, setCollageProgress] = useState(0)

  // Initialize Umami Analytics
  useEffect(() => {
    loadUmami();
  }, []);

  // Track scroll depth automatically
  useUmamiScrollDepth();

  const { currentStep } = useScrollama({
    onStepEnter: (response) => {
      const { index } = response;
      console.log(`Entered step ${index}`);

      // Update collage progress based on the current step in the intro sequence (steps 0-4)
      const introSteps = 5;
      if (index < introSteps) {
        const progress = (index + 1) / introSteps;
        setCollageProgress(progress);
      } else {
        setCollageProgress(0);
      }
    },
  });

  if (isLoading) {
    return (
      <>
        <FloodPreloader onLoaded={() => setIsLoading(false)} />
        <FloatingLanguageSwitcher />
      </>
    );
  }

  return (
    <div className="bg-white">
      <FloatingLanguageSwitcher />
      {/* Hero Section */}
      <HeroSection />

      {/* Intro Section */}
      <IntroSection />

      {/* Collage Section */}
      <CollageSection />
      {/* Spacer below collage to avoid overlap */}
      <div className="h-16 md:h-24"></div>

      {/* Research Methodology Section */}
      <section className="relative z-10 bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {t('researchMethodology.title')}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
              <p className="mb-4">
                {t('researchMethodology.paragraph1')}
              </p>
              <p className="mb-4">
                {t('researchMethodology.paragraph2')}
              </p>
              <p className="mb-4">
                {t('researchMethodology.paragraph3')}
              </p>
              <p className="mb-4">
                {t('researchMethodology.paragraph4')}
              </p>
              <p className="mb-4">
                {t('researchMethodology.paragraph5')}
              </p>
              <p className="mb-4">
                {t('researchMethodology.paragraph6')}
              </p>
              <p>
                {t('researchMethodology.paragraph7')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Denpasar Section */}
      <section className="bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Denpasar Hero */}
        <div className="min-h-screen flex flex-col justify-center items-center relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Denpasar
              <span className="text-blue-400 block text-3xl md:text-4xl mt-2">The Heart of the Crisis</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              As Bali's capital and most densely populated city, Denpasar bore the brunt of the September 10th flooding
            </p>
          </div>
        </div>

        {/* Denpasar Custom Scrolly Section with 5 Steps */}
        <div className="min-h-screen bg-gray-50">
          <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="text-gray-600">Loading...</div></div>}>
            <DenpasarSection />
          </Suspense>
        </div>
      </section>

      {/* Badung Section */}
      <section className="bg-gradient-to-b from-green-900 to-green-800 text-white">
        {/* Badung Hero */}
        <div className="min-h-screen flex flex-col justify-center items-center relative">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Badung Regency
              <span className="text-green-400 block text-3xl md:text-4xl mt-2">Rural Communities Under Water</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Beyond the urban chaos of Denpasar, rural Badung faced its own unique challenges during the September 10th flooding
            </p>
          </div>
        </div>

        {/* Badung Custom Scrolly Section with 3 Steps */}
        <div className="min-h-screen bg-gray-50">
          <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="text-gray-600">Loading...</div></div>}>
            <BadungSection />
          </Suspense>
        </div>
      </section>

      {/* Flood Impact Analysis Section */}
      <section className="relative">
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="text-gray-600">Loading...</div></div>}>
          <FloodImpactSection />
        </Suspense>
      </section>

      {/* Data Visualization Section */}
      <ScrollStep className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
            {t('dataVisualization.title')}
          </h2>
          
          {/* Weather Data Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('dataVisualization.weatherTitle')}
            </h3>
            <div className="prose prose-xl max-w-none leading-relaxed mb-8">
              <p className="text-center text-black text-lg font-semibold">
                {t('dataVisualization.weatherParagraph1')}
              </p>
              <p className="text-center text-black text-lg font-semibold">
                {t('dataVisualization.weatherParagraph2')}
              </p>
            </div>
            <Suspense fallback={<div className="flex items-center justify-center p-8"><div className="text-gray-700">Loading chart...</div></div>}>
              <WeatherChart />
            </Suspense>
          </div>

          {/* Flood Impact Data */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('dataVisualization.floodImpactTitle')}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Suspense fallback={<div className="flex items-center justify-center p-8"><div className="text-gray-700">Loading chart...</div></div>}>
                <FloodBarChart 
                  data={floodStatistics} 
                  title={t('dataVisualization.floodPointsChart')} 
                />
              </Suspense>
              <Suspense fallback={<div className="flex items-center justify-center p-8"><div className="text-gray-700">Loading chart...</div></div>}>
                <SeverityPieChart 
                  data={severityDistribution} 
                  title={t('dataVisualization.severityChart')} 
                />
              </Suspense>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('dataVisualization.statisticsTitle')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-4xl font-bold text-blue-700">{t('dataVisualization.stat1Value')}</div>
                <div className="text-black font-bold mt-2">{t('dataVisualization.stat1Label')}</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <div className="text-4xl font-bold text-orange-700">{t('dataVisualization.stat2Value')}</div>
              <div className="text-black font-bold mt-2">{t('dataVisualization.stat2Label')}</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <div className="text-4xl font-bold text-green-700">{t('dataVisualization.stat3Value')}</div>
                <div className="text-black font-bold mt-2">{t('dataVisualization.stat3Label')}</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollStep>

      {/* Recommendation and Findings Section */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Main Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t('irony.title')}
            </h2>
            <p className="text-2xl md:text-3xl text-slate-300 font-light">
              {t('irony.subtitle')}
            </p>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg prose-invert max-w-none mb-16">
            <p className="text-xl text-slate-200 leading-relaxed text-justify">
              {t('irony.intro1')}
            </p>
            <p className="text-xl text-slate-200 leading-relaxed text-justify">
              {t('irony.intro2')}
            </p>
          </div>

          {/* Parade Forum Global */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-blue-300">
              {t('irony.forumTitle')}
            </h3>
            <p className="text-lg text-slate-200 leading-relaxed mb-8">
              {t('irony.forumIntro')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
                <h4 className="text-xl font-bold text-blue-400 mb-3">{t('irony.forum1Title')}</h4>
                <p className="text-slate-300 text-sm">
                  {t('irony.forum1Desc')}
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
                <h4 className="text-xl font-bold text-blue-400 mb-3">{t('irony.forum2Title')}</h4>
                <p className="text-slate-300 text-sm">
                  {t('irony.forum2Desc')}
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
                <h4 className="text-xl font-bold text-blue-400 mb-3">{t('irony.forum3Title')}</h4>
                <p className="text-slate-300 text-sm">
                  {t('irony.forum3Desc')}
                </p>
              </div>

              <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
                <h4 className="text-xl font-bold text-blue-400 mb-3">{t('irony.forum4Title')}</h4>
                <p className="text-slate-300 text-sm">
                  {t('irony.forum4Desc')}
                </p>
              </div>
            </div>

            <p className="text-lg text-slate-200 leading-relaxed">
              {t('irony.forumImplementation')}
            </p>
            <p className="text-xl text-blue-300 font-semibold text-center mt-6">
              {t('irony.forumConclusion')}
            </p>
          </div>

          {/* Ujian Brutal */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-red-400">
              {t('irony.realityTitle')}
            </h3>
            <div className="bg-red-950 bg-opacity-30 backdrop-blur-sm rounded-lg p-8 border border-red-900 mb-8">
              <p className="text-lg text-slate-200 leading-relaxed mb-4 text-justify">
                {t('irony.reality1')}
              </p>
              <p className="text-lg text-slate-200 leading-relaxed mb-4 text-justify">
                {t('irony.reality2')}
              </p>
              <p className="text-xl text-red-300 font-semibold">
                {t('irony.reality3')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-red-900 bg-opacity-40 backdrop-blur-sm rounded-lg p-6 text-center border border-red-800">
                <div className="text-4xl font-bold text-red-300 mb-2">{t('irony.stat1')}</div>
                <div className="text-slate-300">{t('irony.stat1Label')}</div>
              </div>
              <div className="bg-orange-900 bg-opacity-40 backdrop-blur-sm rounded-lg p-6 text-center border border-orange-800">
                <div className="text-4xl font-bold text-orange-300 mb-2">{t('irony.stat2')}</div>
                <div className="text-slate-300">{t('irony.stat2Label')}</div>
              </div>
              <div className="bg-yellow-900 bg-opacity-40 backdrop-blur-sm rounded-lg p-6 text-center border border-yellow-800">
                <div className="text-4xl font-bold text-yellow-300 mb-2">{t('irony.stat3')}</div>
                <div className="text-slate-300">{t('irony.stat3Label')}</div>
              </div>
            </div>

            <p className="text-lg text-slate-200 leading-relaxed">
              {t('irony.realityConclusion')}
            </p>
          </div>

          {/* Kesenjangan Nyata */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-yellow-400">
              {t('irony.gapTitle')}
            </h3>
            <div className="bg-yellow-950 bg-opacity-20 backdrop-blur-sm rounded-lg p-8 border border-yellow-900">
              <p className="text-xl text-slate-200 leading-relaxed mb-6 font-semibold text-justify">
                {t('irony.gap1')}
              </p>
              <p className="text-lg text-slate-200 leading-relaxed mb-4 text-justify">
                {t('irony.gap2')}
              </p>
              <p className="text-lg text-red-300 leading-relaxed mb-4 text-justify">
                {t('irony.gap3')}
              </p>
              <p className="text-xl text-slate-100 leading-relaxed font-semibold italic text-center mt-8">
                {t('irony.gapConclusion')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Conclusion */}
      <ScrollStep className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-8 text-center">
            {t('conclusion.title')}
          </h2>
          <p className="text-xl text-blue-200 mb-8 leading-relaxed text-justify">
            {t('conclusion.content1')}
          </p>
          <p className="text-xl text-blue-200 mb-8 leading-relaxed text-justify">
            {t('conclusion.content2')}
          </p>
          <p className="text-xl text-blue-200 mb-8 leading-relaxed text-justify">
            {t('conclusion.content3')}
          </p>
          <p className="text-xl text-blue-200 mb-8 leading-relaxed text-justify">
            {t('conclusion.content4')}
          </p>
          <p className="text-base text-blue-100 italic leading-relaxed text-justify">
            {t('conclusion.reflection')}
          </p>
        </div>
      </ScrollStep>

      {/* Credits Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('credits.title')}</h2>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-baseline border-b border-gray-700 pb-3">
              <span className="text-blue-400 font-semibold md:w-1/3">{t('credits.crowdsourcing')}</span>
              <span className="text-white text-lg md:w-2/3">U-INSPIRE Indonesia</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline border-b border-gray-700 pb-3">
              <span className="text-blue-400 font-semibold md:w-1/3">{t('credits.analysis')}</span>
              <span className="text-white text-lg md:w-2/3">Ida Bagus Oka Agastya</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline border-b border-gray-700 pb-3">
              <span className="text-blue-400 font-semibold md:w-1/3">{t('credits.storyline')}</span>
              <span className="text-white text-lg md:w-2/3">Giovanni Cynthia Pradipta</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline border-b border-gray-700 pb-3">
              <span className="text-blue-400 font-semibold md:w-1/3">{t('credits.editor')}</span>
              <span className="text-white text-lg md:w-2/3">Ni Nyoman Era Jumantini</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline border-b border-gray-700 pb-3">
              <span className="text-blue-400 font-semibold md:w-1/3">{t('credits.developer')}</span>
              <span className="text-white text-lg md:w-2/3">Hilman Arioaji</span>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              {t('credits.copyright')}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App