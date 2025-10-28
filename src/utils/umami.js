/**
 * Umami Analytics Utility
 * Privacy-focused, self-hosted analytics
 * 
 * Setup Instructions:
 * 1. Deploy Umami instance (see UMAMI_SETUP.md)
 * 2. Add VITE_UMAMI_WEBSITE_ID to .env.local
 * 3. Add VITE_UMAMI_SRC to .env.local (your Umami script URL)
 */

let umamiLoaded = false;

/**
 * Load Umami tracking script
 */
export const loadUmami = () => {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  const scriptSrc = import.meta.env.VITE_UMAMI_SRC;

  if (!websiteId || !scriptSrc) {
    console.warn('⚠️ Umami not configured. Add VITE_UMAMI_WEBSITE_ID and VITE_UMAMI_SRC to .env.local');
    return;
  }

  if (umamiLoaded) {
    console.log('ℹ️ Umami already loaded');
    return;
  }

  // Create script element
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = scriptSrc;
  script.setAttribute('data-website-id', websiteId);
  script.setAttribute('data-auto-track', 'true'); // Auto track page views
  script.setAttribute('data-do-not-track', 'true'); // Respect DNT header
  script.setAttribute('data-cache', 'true'); // Cache for performance

  // Add to document
  document.head.appendChild(script);
  
  umamiLoaded = true;
  console.log('✅ Umami Analytics loaded');
};

/**
 * Track custom event
 * @param {string} eventName - Name of the event
 * @param {object} eventData - Optional event data
 */
export const trackUmamiEvent = (eventName, eventData = {}) => {
  if (window.umami) {
    window.umami.track(eventName, eventData);
    console.log('📊 Umami event tracked:', eventName, eventData);
  } else {
    console.warn('⚠️ Umami not loaded yet');
  }
};

/**
 * Track page view (auto-tracked by default)
 * @param {string} url - Page URL
 * @param {string} referrer - Referrer URL
 */
export const trackUmamiPageView = (url, referrer = '') => {
  if (window.umami) {
    window.umami.track((props) => ({
      ...props,
      url,
      referrer,
    }));
    console.log('📄 Umami page view tracked:', url);
  }
};

/**
 * Track section view (scrollytelling)
 */
export const trackUmamiSectionView = (sectionName) => {
  trackUmamiEvent('section-view', {
    section: sectionName,
  });
};

/**
 * Track language change
 */
export const trackUmamiLanguageChange = (language) => {
  trackUmamiEvent('language-change', {
    language,
  });
};

/**
 * Track map interaction
 */
export const trackUmamiMapInteraction = (action, label) => {
  trackUmamiEvent('map-interaction', {
    action,
    label,
  });
};

/**
 * Track video play
 */
export const trackUmamiVideoPlay = (videoName) => {
  trackUmamiEvent('video-play', {
    video: videoName,
  });
};

/**
 * Track chart interaction
 */
export const trackUmamiChartInteraction = (chartName, action) => {
  trackUmamiEvent('chart-interaction', {
    chart: chartName,
    action,
  });
};

/**
 * Track scroll depth
 */
export const trackUmamiScrollDepth = (depth) => {
  trackUmamiEvent('scroll-depth', {
    depth: `${depth}%`,
    value: depth,
  });
};

/**
 * Track outbound link
 */
export const trackUmamiOutboundLink = (url, label) => {
  trackUmamiEvent('outbound-link', {
    url,
    label,
  });
};

/**
 * Track time on section
 */
export const trackUmamiTimeOnSection = (sectionName, seconds) => {
  trackUmamiEvent('time-on-section', {
    section: sectionName,
    seconds,
  });
};

/**
 * Track social share
 */
export const trackUmamiSocialShare = (platform, content) => {
  trackUmamiEvent('social-share', {
    platform,
    content,
  });
};

/**
 * Identify user (optional, for logged-in users)
 * @param {string} userId - User identifier
 * @param {object} userData - User properties
 */
export const identifyUmamiUser = (userId, userData = {}) => {
  if (window.umami) {
    window.umami.identify({
      userId,
      ...userData,
    });
    console.log('👤 Umami user identified:', userId);
  }
};

export default {
  loadUmami,
  trackUmamiEvent,
  trackUmamiPageView,
  trackUmamiSectionView,
  trackUmamiLanguageChange,
  trackUmamiMapInteraction,
  trackUmamiVideoPlay,
  trackUmamiChartInteraction,
  trackUmamiScrollDepth,
  trackUmamiOutboundLink,
  trackUmamiTimeOnSection,
  trackUmamiSocialShare,
  identifyUmamiUser,
};
