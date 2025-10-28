# 📊 Analytics Implementation Guide

## Overview

This guide covers how to add analytics tracking to your scrollytelling website to understand user behavior, engagement, and impact.

---

## 🎯 Recommended Analytics Tools

### 1. **Google Analytics 4 (GA4)** - Most Popular
- **Pros:** Free, comprehensive, industry standard
- **Cons:** Google privacy concerns, complex interface
- **Best for:** General website analytics

### 2. **Plausible Analytics** - Privacy-Focused
- **Pros:** Privacy-friendly, simple, lightweight, GDPR compliant
- **Cons:** Paid ($9/month), fewer features
- **Best for:** Privacy-conscious projects

### 3. **Umami** - Self-Hosted
- **Pros:** Open source, self-hosted, privacy-friendly, free
- **Cons:** Requires server setup
- **Best for:** Technical teams wanting full control

### 4. **Mixpanel** - Event-Focused
- **Pros:** Detailed event tracking, user journey analysis
- **Cons:** Expensive for high volume
- **Best for:** Deep user behavior analysis

---

## 📈 Option 1: Google Analytics 4 (Recommended)

### Step 1: Create GA4 Account

1. Go to https://analytics.google.com/
2. Click "Start measuring"
3. Create an account name (e.g., "Bali Floods 2025")
4. Create a property name (e.g., "Bali Floods Website")
5. Select your timezone and currency
6. Choose "Web" as platform
7. Enter your website URL
8. Get your **Measurement ID** (format: G-XXXXXXXXXX)

### Step 2: Install GA4 in Your React App

#### Method A: Using react-ga4 (Recommended)

```bash
npm install react-ga4
```

Create a new file: `src/utils/analytics.js`

```javascript
import ReactGA from 'react-ga4';

// Initialize GA4
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (measurementId) {
    ReactGA.initialize(measurementId, {
      gaOptions: {
        anonymizeIp: true, // Privacy-friendly
      },
      gtagOptions: {
        send_page_view: false, // We'll send manually
      },
    });
    console.log('Google Analytics initialized');
  } else {
    console.warn('GA Measurement ID not found');
  }
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track custom events
export const trackEvent = (category, action, label = '', value = 0) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Track scroll depth
export const trackScrollDepth = (depth) => {
  ReactGA.event({
    category: 'Engagement',
    action: 'Scroll Depth',
    label: `${depth}%`,
    value: depth,
  });
};

// Track section views (for scrollytelling)
export const trackSectionView = (sectionName) => {
  ReactGA.event({
    category: 'Scrollytelling',
    action: 'Section View',
    label: sectionName,
  });
};

// Track language change
export const trackLanguageChange = (language) => {
  ReactGA.event({
    category: 'Interaction',
    action: 'Language Change',
    label: language,
  });
};

// Track map interactions
export const trackMapInteraction = (action, label) => {
  ReactGA.event({
    category: 'Map',
    action,
    label,
  });
};

// Track video plays
export const trackVideoPlay = (videoName) => {
  ReactGA.event({
    category: 'Media',
    action: 'Video Play',
    label: videoName,
  });
};

// Track chart interactions
export const trackChartInteraction = (chartName, action) => {
  ReactGA.event({
    category: 'Data Visualization',
    action,
    label: chartName,
  });
};
```

### Step 3: Add Environment Variable

Create `.env.local` file in project root:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Add to `.gitignore`:
```
.env.local
```

### Step 4: Initialize in App.jsx

```javascript
import { useEffect } from 'react';
import { initGA, trackPageView } from './utils/analytics';

function App() {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
    
    // Track initial page view
    trackPageView(window.location.pathname);
  }, []);

  // Rest of your app...
}
```

### Step 5: Track Scrollytelling Events

Update your scrollytelling sections to track views:

```javascript
import { trackSectionView } from '../../utils/analytics';

const DenpasarSection = () => {
  const onStepEnter = ({ data }) => {
    // Track when user enters a section
    trackSectionView(`Denpasar - ${data.step}`);
    
    // Your existing logic...
  };

  return (
    <Scrollama onStepEnter={onStepEnter}>
      {/* Your content */}
    </Scrollama>
  );
};
```

### Step 6: Track Language Changes

Update your LanguageSwitcher:

```javascript
import { trackLanguageChange } from '../../utils/analytics';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    trackLanguageChange(lng); // Track the change
  };

  // Rest of component...
};
```

### Step 7: Track Map Interactions

In your map component:

```javascript
import { trackMapInteraction } from '../../utils/analytics';

const FloodMap = () => {
  const handleMarkerClick = (location) => {
    trackMapInteraction('Marker Click', location.name);
  };

  const handleLayerToggle = (layerName, isActive) => {
    trackMapInteraction(
      isActive ? 'Layer Enabled' : 'Layer Disabled',
      layerName
    );
  };

  // Rest of component...
};
```

---

## 📊 What to Track (Recommended Events)

### Essential Events

```javascript
// 1. Page Views
trackPageView('/');

// 2. Section Views (Scrollytelling)
trackSectionView('Hero');
trackSectionView('Denpasar - Kampung Jawa');
trackSectionView('Data Analysis');

// 3. Language Changes
trackLanguageChange('id'); // Indonesian
trackLanguageChange('en'); // English

// 4. Map Interactions
trackMapInteraction('Marker Click', 'Pasar Badung');
trackMapInteraction('Layer Toggle', 'Flood Radius');
trackMapInteraction('Zoom', 'Level 15');

// 5. Media Engagement
trackVideoPlay('Denpasar Flood Video');
trackEvent('Media', 'Image View', 'Hero Image');

// 6. Data Visualization
trackChartInteraction('Weather Chart', 'Toggle to Temperature');
trackChartInteraction('Flood Statistics', 'Hover on Data Point');

// 7. Scroll Depth
trackScrollDepth(25); // 25% of page
trackScrollDepth(50); // 50% of page
trackScrollDepth(75); // 75% of page
trackScrollDepth(100); // 100% of page

// 8. External Links
trackEvent('Outbound', 'Click', 'BMKG Website');
trackEvent('Outbound', 'Click', 'YouTube Video');

// 9. Time on Section
trackEvent('Engagement', 'Time on Section', 'Methodology', 45); // 45 seconds

// 10. Social Shares (if you add share buttons)
trackEvent('Social', 'Share', 'Twitter');
```

---

## 🔍 How to View Analytics

### Google Analytics 4 Dashboard

1. **Go to:** https://analytics.google.com/
2. **Select your property:** "Bali Floods Website"

### Key Reports to Check:

#### 1. **Real-Time Report**
- **Path:** Reports → Realtime
- **Shows:** Current active users, pages they're viewing
- **Use for:** Monitoring launches, checking if tracking works

#### 2. **Engagement Overview**
- **Path:** Reports → Engagement → Overview
- **Shows:** Page views, average engagement time, events
- **Key Metrics:**
  - Total users
  - Sessions
  - Average engagement time
  - Events per session

#### 3. **Pages and Screens**
- **Path:** Reports → Engagement → Pages and screens
- **Shows:** Most viewed pages/sections
- **Look for:**
  - Which sections get most views
  - Where users drop off
  - Average time on each section

#### 4. **Events Report**
- **Path:** Reports → Engagement → Events
- **Shows:** All custom events you're tracking
- **Look for:**
  - Section views (scrollytelling engagement)
  - Map interactions
  - Language changes
  - Video plays

#### 5. **User Acquisition**
- **Path:** Reports → Acquisition → User acquisition
- **Shows:** Where users come from
- **Look for:**
  - Direct traffic
  - Social media referrals
  - Search engines
  - Referring websites

#### 6. **Demographics**
- **Path:** Reports → User → Demographics
- **Shows:** User location, language, device
- **Look for:**
  - Geographic distribution
  - Mobile vs desktop usage
  - Browser types

---

## 📱 Custom Dashboard Setup

### Create a Custom Dashboard for Scrollytelling

1. Go to **Explore** → **Create new exploration**
2. Add these metrics:

**Engagement Metrics:**
- Total users
- Sessions
- Average engagement time
- Scroll depth events

**Scrollytelling Metrics:**
- Section view events (by section name)
- Time spent per section
- Completion rate (% reaching conclusion)

**Interaction Metrics:**
- Map clicks
- Language switches
- Video plays
- Chart interactions

**Geographic Data:**
- Users by country
- Users by city

### Sample Custom Report Query

```
Dimension: Event name
Metrics: Event count, Total users
Filter: Event name contains "Section View"
Sort by: Event count (descending)
```

This shows which sections are most viewed.

---

## 🎨 Advanced Tracking: Scroll Depth

Implement automatic scroll depth tracking:

```javascript
// src/hooks/useScrollDepth.js
import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '../utils/analytics';

export const useScrollDepth = () => {
  const trackedDepths = useRef(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      
      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !trackedDepths.current.has(milestone)
        ) {
          trackedDepths.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Use in App.jsx
import { useScrollDepth } from './hooks/useScrollDepth';

function App() {
  useScrollDepth(); // Automatically tracks scroll depth
  
  // Rest of app...
}
```

---

## 🔒 Privacy Considerations

### GDPR Compliance

1. **Add Cookie Consent Banner:**

```bash
npm install react-cookie-consent
```

```javascript
import CookieConsent from 'react-cookie-consent';

function App() {
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        onAccept={() => {
          initGA(); // Only initialize after consent
        }}
        style={{ background: "#2B373B" }}
        buttonStyle={{ background: "#3b82f6", color: "#fff", fontSize: "13px" }}
      >
        This website uses cookies to enhance the user experience and analyze traffic.
      </CookieConsent>
      
      {/* Rest of app */}
    </>
  );
}
```

2. **Anonymize IP Addresses** (already included in our setup)

3. **Add Privacy Policy Page**

---

## 📊 Alternative: Plausible Analytics (Privacy-Focused)

### Setup Plausible

1. Sign up at https://plausible.io/
2. Add your domain
3. Get your script

### Install in React:

```bash
npm install plausible-tracker
```

```javascript
// src/utils/analytics.js
import Plausible from 'plausible-tracker';

const plausible = Plausible({
  domain: 'your-domain.com',
  trackLocalhost: true, // For testing
});

export const initPlausible = () => {
  plausible.enableAutoPageviews();
};

export const trackPlausibleEvent = (eventName, props = {}) => {
  plausible.trackEvent(eventName, { props });
};

// Usage
trackPlausibleEvent('Section View', { section: 'Denpasar' });
```

### View Plausible Analytics:

1. Go to https://plausible.io/your-domain.com
2. See real-time stats, top pages, sources, countries
3. **Advantages:**
   - Simple, clean interface
   - Privacy-friendly (no cookies)
   - Lightweight (< 1KB script)
   - GDPR compliant by default

---

## 🎯 Key Metrics to Monitor

### Success Indicators:

1. **Engagement Rate:**
   - Average time on site > 3 minutes = Good
   - Average time on site > 5 minutes = Excellent

2. **Scroll Depth:**
   - 50% reach conclusion = Good
   - 70% reach conclusion = Excellent

3. **Section Completion:**
   - Track how many users view each scrollytelling section
   - Identify drop-off points

4. **Language Distribution:**
   - English vs Indonesian usage
   - Helps understand audience

5. **Geographic Reach:**
   - Where your story is being read
   - Identify impact areas

6. **Referral Sources:**
   - Social media effectiveness
   - Media coverage impact

7. **Device Usage:**
   - Mobile vs desktop
   - Optimize accordingly

---

## 📈 Sample Analytics Report Template

```
WEEKLY ANALYTICS REPORT
Week of: [Date Range]

OVERVIEW:
- Total Users: [number]
- Total Sessions: [number]
- Average Engagement Time: [minutes:seconds]
- Bounce Rate: [percentage]

TOP SECTIONS VIEWED:
1. [Section Name] - [views]
2. [Section Name] - [views]
3. [Section Name] - [views]

ENGAGEMENT:
- Reached Conclusion: [percentage]
- Average Scroll Depth: [percentage]
- Language Preference: EN [%] / ID [%]

INTERACTIONS:
- Map Clicks: [number]
- Video Plays: [number]
- Chart Interactions: [number]

TRAFFIC SOURCES:
- Direct: [percentage]
- Social Media: [percentage]
- Referrals: [percentage]
- Search: [percentage]

GEOGRAPHIC DISTRIBUTION:
- Indonesia: [percentage]
- United States: [percentage]
- Other: [percentage]

DEVICES:
- Mobile: [percentage]
- Desktop: [percentage]
- Tablet: [percentage]
```

---

## 🚀 Quick Start Checklist

- [ ] Choose analytics platform (GA4 recommended)
- [ ] Create account and get tracking ID
- [ ] Install react-ga4 package
- [ ] Create analytics.js utility file
- [ ] Add environment variable
- [ ] Initialize in App.jsx
- [ ] Add section view tracking
- [ ] Add language change tracking
- [ ] Add map interaction tracking
- [ ] Add scroll depth tracking
- [ ] Test in development
- [ ] Deploy and verify tracking works
- [ ] Set up custom dashboard
- [ ] Schedule weekly report reviews

---

## 🔧 Troubleshooting

### Analytics Not Showing Data?

1. **Check browser console** for initialization messages
2. **Use GA4 DebugView:**
   - Go to Admin → DebugView
   - Install Google Analytics Debugger extension
   - See events in real-time

3. **Verify Measurement ID** is correct
4. **Check ad blockers** aren't blocking GA
5. **Wait 24-48 hours** for data to populate reports

### Testing Locally:

```javascript
// Enable debug mode
ReactGA.initialize(measurementId, {
  gaOptions: {
    debug_mode: true,
  },
});
```

---

**Need Help?** Check the GA4 documentation: https://developers.google.com/analytics/devguides/collection/ga4
