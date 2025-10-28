# 🚀 Quick Analytics Setup

## Step-by-Step Guide to Add Analytics

### 1. Install Dependencies

```bash
npm install react-ga4
```

### 2. Get Your Google Analytics ID

1. Go to https://analytics.google.com/
2. Create account → "Bali Floods 2025"
3. Create property → "Bali Floods Website"
4. Select "Web" platform
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Add to Environment Variables

Create `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your ID:

```env
VITE_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID-HERE
```

### 4. Initialize in App.jsx

Add to the top of `src/App.jsx`:

```javascript
import { useEffect } from 'react';
import { initGA, trackPageView } from './utils/analytics';
import { useScrollDepth } from './hooks/useScrollDepth';

function App() {
  // Initialize analytics on mount
  useEffect(() => {
    initGA();
    trackPageView(window.location.pathname);
  }, []);

  // Track scroll depth automatically
  useScrollDepth();

  // Rest of your app...
}
```

### 5. Track Language Changes

In `src/components/ui/LanguageSwitcher.jsx`:

```javascript
import { trackLanguageChange } from '../../utils/analytics';

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  trackLanguageChange(lng); // Add this line
};
```

### 6. Track Section Views

In your scrollytelling sections (e.g., `DenpasarSection.jsx`):

```javascript
import { trackSectionView } from '../../utils/analytics';

const onStepEnter = ({ data }) => {
  // Track section view
  trackSectionView(`Denpasar - Step ${data}`);
  
  // Your existing logic...
};
```

### 7. Test It Works

```bash
npm run dev
```

Open browser console and look for:
- ✅ Google Analytics initialized
- 📄 Page view tracked
- 📜 Scroll depth tracked

### 8. View Analytics

1. Go to https://analytics.google.com/
2. Select your property
3. Check **Realtime** report to see live users
4. Wait 24-48 hours for full reports

---

## 📊 What Gets Tracked Automatically

Once set up, you'll track:

✅ **Page views** - Every page load  
✅ **Scroll depth** - 25%, 50%, 75%, 100%  
✅ **Section views** - Each scrollytelling section  
✅ **Language changes** - EN ↔ ID switches  
✅ **Time on site** - How long users stay  
✅ **Device type** - Mobile, desktop, tablet  
✅ **Location** - Country and city  
✅ **Traffic sources** - Where users come from  

---

## 🎯 Key Metrics to Watch

### In Google Analytics Dashboard:

1. **Realtime → Overview**
   - See current active users
   - What sections they're viewing

2. **Reports → Engagement → Events**
   - Section views (which parts are most popular)
   - Scroll depth (how far people read)
   - Language preference

3. **Reports → Engagement → Pages**
   - Average engagement time
   - Bounce rate

4. **Reports → Acquisition**
   - Where traffic comes from
   - Social media effectiveness

---

## 🔧 Troubleshooting

### Not seeing data?

1. **Check console** for "✅ Google Analytics initialized"
2. **Verify ID** in `.env.local` is correct
3. **Disable ad blockers** when testing
4. **Use Realtime report** for instant feedback
5. **Wait 24-48 hours** for historical reports

### Still not working?

Enable debug mode in `src/utils/analytics.js`:

```javascript
ReactGA.initialize(measurementId, {
  gaOptions: {
    debug_mode: true, // Add this
    anonymizeIp: true,
  },
});
```

---

## 📈 Advanced Tracking (Optional)

### Track Map Clicks

```javascript
import { trackMapInteraction } from '../../utils/analytics';

const handleMarkerClick = (location) => {
  trackMapInteraction('Marker Click', location.name);
};
```

### Track Video Plays

```javascript
import { trackVideoPlay } from '../../utils/analytics';

const handleVideoPlay = () => {
  trackVideoPlay('Denpasar Flood Video');
};
```

### Track Chart Interactions

```javascript
import { trackChartInteraction } from '../../utils/analytics';

const handleChartToggle = (chartType) => {
  trackChartInteraction('Weather Chart', `Toggle to ${chartType}`);
};
```

---

## 📚 Full Documentation

See `docs/ANALYTICS_GUIDE.md` for:
- Complete implementation details
- Privacy considerations (GDPR)
- Alternative analytics platforms
- Custom dashboard setup
- Report templates

---

## ✅ Setup Checklist

- [ ] Install react-ga4
- [ ] Get GA4 Measurement ID
- [ ] Add to .env.local
- [ ] Initialize in App.jsx
- [ ] Add scroll depth tracking
- [ ] Add language tracking
- [ ] Test in browser console
- [ ] Check Realtime report
- [ ] Deploy to production
- [ ] Monitor for 1 week
- [ ] Review first analytics report

---

**Need help?** Check the full guide in `docs/ANALYTICS_GUIDE.md`
