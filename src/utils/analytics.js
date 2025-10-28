import ReactGA from 'react-ga4';

/**
 * Analytics Utility
 * Centralized tracking for Google Analytics 4
 */

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (measurementId) {
    ReactGA.initialize(measurementId, {
      gaOptions: {
        anonymizeIp: true, // Privacy-friendly
      },
      gtagOptions: {
        send_page_view: false, // We'll send manually for better control
      },
    });
    console.log('✅ Google Analytics initialized');
  } else {
    console.warn('⚠️ GA Measurement ID not found. Add VITE_GA_MEASUREMENT_ID to .env.local');
  }
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
  console.log('📄 Page view tracked:', path);
};

// Track custom events
export const trackEvent = (category, action, label = '', value = 0) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
  console.log('📊 Event tracked:', { category, action, label, value });
};

// Track scroll depth (25%, 50%, 75%, 100%)
export const trackScrollDepth = (depth) => {
  ReactGA.event({
    category: 'Engagement',
    action: 'Scroll Depth',
    label: `${depth}%`,
    value: depth,
  });
  console.log('📜 Scroll depth tracked:', `${depth}%`);
};

// Track section views (for scrollytelling)
export const trackSectionView = (sectionName) => {
  ReactGA.event({
    category: 'Scrollytelling',
    action: 'Section View',
    label: sectionName,
  });
  console.log('👁️ Section view tracked:', sectionName);
};

// Track language change
export const trackLanguageChange = (language) => {
  ReactGA.event({
    category: 'Interaction',
    action: 'Language Change',
    label: language,
  });
  console.log('🌐 Language change tracked:', language);
};

// Track map interactions
export const trackMapInteraction = (action, label) => {
  ReactGA.event({
    category: 'Map',
    action,
    label,
  });
  console.log('🗺️ Map interaction tracked:', { action, label });
};

// Track video plays
export const trackVideoPlay = (videoName) => {
  ReactGA.event({
    category: 'Media',
    action: 'Video Play',
    label: videoName,
  });
  console.log('▶️ Video play tracked:', videoName);
};

// Track chart interactions
export const trackChartInteraction = (chartName, action) => {
  ReactGA.event({
    category: 'Data Visualization',
    action,
    label: chartName,
  });
  console.log('📈 Chart interaction tracked:', { chartName, action });
};

// Track external link clicks
export const trackOutboundLink = (url, label) => {
  ReactGA.event({
    category: 'Outbound',
    action: 'Click',
    label: label || url,
  });
  console.log('🔗 Outbound link tracked:', url);
};

// Track time spent on section
export const trackTimeOnSection = (sectionName, seconds) => {
  ReactGA.event({
    category: 'Engagement',
    action: 'Time on Section',
    label: sectionName,
    value: seconds,
  });
  console.log('⏱️ Time on section tracked:', { sectionName, seconds });
};

// Track social shares (if you add share buttons)
export const trackSocialShare = (platform, content) => {
  ReactGA.event({
    category: 'Social',
    action: 'Share',
    label: `${platform} - ${content}`,
  });
  console.log('📱 Social share tracked:', { platform, content });
};

export default {
  initGA,
  trackPageView,
  trackEvent,
  trackScrollDepth,
  trackSectionView,
  trackLanguageChange,
  trackMapInteraction,
  trackVideoPlay,
  trackChartInteraction,
  trackOutboundLink,
  trackTimeOnSection,
  trackSocialShare,
};
