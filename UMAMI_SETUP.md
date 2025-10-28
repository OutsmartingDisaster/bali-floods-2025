# 🔒 Umami Analytics Setup Guide

## What is Umami?

**Umami** is a simple, fast, privacy-focused, open-source analytics solution. Perfect for projects that prioritize user privacy and data ownership.

### Why Umami?

✅ **Privacy-first** - No cookies, GDPR compliant by default  
✅ **Self-hosted** - You own your data  
✅ **Open source** - Free forever  
✅ **Lightweight** - < 2KB script  
✅ **Simple** - Clean, easy-to-use dashboard  
✅ **No tracking** - Respects Do Not Track  

---

## 🚀 Quick Start (3 Options)

### Option 1: Umami Cloud (Easiest) ⭐ Recommended

1. Go to https://cloud.umami.is/
2. Sign up for free account
3. Create a new website
4. Get your **Website ID** and **Script URL**
5. Add to `.env.local` (see Step 3 below)

**Pricing:** Free tier available, paid plans from $9/month

---

### Option 2: Deploy to Vercel (Free, 5 minutes)

#### Step 1: Fork Umami Repository

1. Go to https://github.com/umami-software/umami
2. Click "Fork" to create your own copy

#### Step 2: Deploy to Vercel

1. Go to https://vercel.com/
2. Click "New Project"
3. Import your forked Umami repository
4. Add environment variables:
   ```
   DATABASE_URL=your_postgres_connection_string
   ```
5. Click "Deploy"

#### Step 3: Get Database (Free Options)

**Option A: Vercel Postgres**
- Go to Vercel project → Storage → Create Database
- Copy connection string

**Option B: Supabase (Recommended)**
- Go to https://supabase.com/
- Create new project
- Go to Settings → Database
- Copy connection string (use "Connection pooling" URL)

**Option C: Railway**
- Go to https://railway.app/
- Create PostgreSQL database
- Copy connection string

#### Step 4: Configure Umami

1. Visit your deployed Umami URL (e.g., `https://your-app.vercel.app`)
2. Login with default credentials:
   - Username: `admin`
   - Password: `umami`
3. **Change password immediately!**
4. Go to Settings → Websites → Add Website
5. Enter website details:
   - Name: "Bali Floods 2025"
   - Domain: your-domain.com
6. Copy the **Website ID** and **Script URL**

---

### Option 3: Self-Host with Docker (Advanced)

```bash
# Clone Umami
git clone https://github.com/umami-software/umami.git
cd umami

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://username:password@localhost:5432/umami
DATABASE_TYPE=postgresql
APP_SECRET=$(openssl rand -hex 32)
EOF

# Run with Docker Compose
docker-compose up -d

# Access at http://localhost:3000
```

---

## 📝 Step 3: Configure Your Project

### Add to .env.local

Create or edit `.env.local`:

```env
# Umami Analytics
VITE_UMAMI_WEBSITE_ID=your-website-id-here
VITE_UMAMI_SRC=https://your-umami-domain.com/script.js
```

**Example:**
```env
VITE_UMAMI_WEBSITE_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
VITE_UMAMI_SRC=https://analytics.yourdomain.com/script.js
```

### Initialize in App.jsx

Add to `src/App.jsx`:

```javascript
import { useEffect } from 'react';
import { loadUmami } from './utils/umami';
import { useUmamiScrollDepth } from './hooks/useUmamiScrollDepth';

function App() {
  // Initialize Umami on mount
  useEffect(() => {
    loadUmami();
  }, []);

  // Track scroll depth automatically
  useUmamiScrollDepth();

  // Rest of your app...
}
```

---

## 📊 What Gets Tracked

### Automatic Tracking (No Code Needed):

✅ **Page views** - Every page visit  
✅ **Referrers** - Where users come from  
✅ **Countries** - Geographic location  
✅ **Devices** - Desktop, mobile, tablet  
✅ **Browsers** - Chrome, Firefox, Safari, etc.  
✅ **Operating Systems** - Windows, Mac, Linux, iOS, Android  

### Custom Events (With Simple Code):

```javascript
import { trackUmamiEvent } from './utils/umami';

// Track any custom event
trackUmamiEvent('button-click', { button: 'Download Report' });
trackUmamiEvent('section-view', { section: 'Denpasar' });
trackUmamiEvent('language-change', { language: 'id' });
```

---

## 🎯 Track Scrollytelling Events

### Track Section Views

In your scrollytelling sections:

```javascript
import { trackUmamiSectionView } from '../../utils/umami';

const onStepEnter = ({ data }) => {
  trackUmamiSectionView(`Denpasar - Step ${data}`);
  // Your existing logic...
};
```

### Track Language Changes

In `LanguageSwitcher.jsx`:

```javascript
import { trackUmamiLanguageChange } from '../../utils/umami';

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  trackUmamiLanguageChange(lng);
};
```

### Track Map Interactions

In your map component:

```javascript
import { trackUmamiMapInteraction } from '../../utils/umami';

const handleMarkerClick = (location) => {
  trackUmamiMapInteraction('marker-click', location.name);
};

const handleLayerToggle = (layer, isActive) => {
  trackUmamiMapInteraction(
    isActive ? 'layer-enabled' : 'layer-disabled',
    layer
  );
};
```

---

## 📈 View Your Analytics

### Access Umami Dashboard

1. Go to your Umami URL (e.g., `https://your-app.vercel.app`)
2. Login with your credentials
3. Select your website

### Dashboard Overview

**Real-time Stats:**
- Current visitors
- Page views today
- Top pages
- Top referrers

**Time-based Charts:**
- Visitors over time
- Page views over time
- Events over time

**Detailed Reports:**
- **Pages** - Most viewed pages
- **Referrers** - Traffic sources
- **Browsers** - Browser distribution
- **OS** - Operating system distribution
- **Devices** - Device type breakdown
- **Countries** - Geographic distribution
- **Events** - Custom event tracking

---

## 🎨 Custom Events You Can Track

### Pre-configured Events:

```javascript
import {
  trackUmamiSectionView,
  trackUmamiLanguageChange,
  trackUmamiMapInteraction,
  trackUmamiVideoPlay,
  trackUmamiChartInteraction,
  trackUmamiScrollDepth,
  trackUmamiOutboundLink,
  trackUmamiTimeOnSection,
  trackUmamiSocialShare,
} from './utils/umami';

// Section views
trackUmamiSectionView('Hero');
trackUmamiSectionView('Denpasar - Kampung Jawa');

// Language changes
trackUmamiLanguageChange('id'); // Indonesian
trackUmamiLanguageChange('en'); // English

// Map interactions
trackUmamiMapInteraction('marker-click', 'Pasar Badung');
trackUmamiMapInteraction('layer-toggle', 'Flood Radius');

// Video plays
trackUmamiVideoPlay('Denpasar Flood Video');

// Chart interactions
trackUmamiChartInteraction('Weather Chart', 'toggle-temperature');

// Scroll depth
trackUmamiScrollDepth(50); // 50% scrolled

// Outbound links
trackUmamiOutboundLink('https://bmkg.go.id', 'BMKG Website');

// Time on section
trackUmamiTimeOnSection('Methodology', 45); // 45 seconds

// Social shares
trackUmamiSocialShare('twitter', 'Bali Floods Article');
```

---

## 🔍 Comparing Umami vs Google Analytics

| Feature | Umami | Google Analytics |
|---------|-------|------------------|
| **Privacy** | ✅ Excellent | ⚠️ Tracks users |
| **GDPR** | ✅ Compliant | ⚠️ Requires consent |
| **Cookies** | ✅ No cookies | ❌ Uses cookies |
| **Data Ownership** | ✅ You own it | ❌ Google owns it |
| **Script Size** | ✅ < 2KB | ❌ ~45KB |
| **Setup** | ⚠️ Requires hosting | ✅ Easy |
| **Cost** | ✅ Free (self-hosted) | ✅ Free |
| **Features** | ⚠️ Basic | ✅ Advanced |
| **Real-time** | ✅ Yes | ✅ Yes |
| **Custom Events** | ✅ Yes | ✅ Yes |

---

## 🔒 Privacy Features

### What Umami Does NOT Track:

❌ No cookies  
❌ No personal data  
❌ No cross-site tracking  
❌ No fingerprinting  
❌ No IP addresses stored  
❌ No user identification  

### What Umami DOES Track:

✅ Page views (anonymized)  
✅ Referrer sources  
✅ Country (from IP, then discarded)  
✅ Device type  
✅ Browser type  
✅ Operating system  
✅ Custom events  

**All data is aggregated and anonymized!**

---

## 🎯 Sample Analytics Report

After 1 week, you'll see:

```
UMAMI ANALYTICS REPORT
Website: Bali Floods 2025
Period: Last 7 days

OVERVIEW:
- Unique Visitors: 1,247
- Page Views: 4,856
- Bounce Rate: 28%
- Avg Visit Duration: 4:32

TOP PAGES:
1. / (Home) - 1,247 views
2. #denpasar - 892 views
3. #data-analysis - 654 views

TOP REFERRERS:
1. twitter.com - 45%
2. Direct - 30%
3. facebook.com - 15%

TOP COUNTRIES:
1. Indonesia - 68%
2. United States - 12%
3. Australia - 8%

DEVICES:
- Desktop: 58%
- Mobile: 38%
- Tablet: 4%

BROWSERS:
- Chrome: 62%
- Safari: 18%
- Firefox: 12%
- Edge: 8%

CUSTOM EVENTS (Top 10):
1. section-view: Denpasar - 892 events
2. scroll-depth: 50% - 778 events
3. language-change: id - 456 events
4. map-interaction: marker-click - 234 events
5. section-view: Data Analysis - 654 events
```

---

## 🔧 Troubleshooting

### Not seeing data?

1. **Check browser console** for "✅ Umami Analytics loaded"
2. **Verify environment variables** in `.env.local`
3. **Check Umami dashboard** - is the website added?
4. **Disable ad blockers** when testing
5. **Check network tab** - is script loading?

### Script not loading?

```javascript
// Add debug logging
console.log('Umami Website ID:', import.meta.env.VITE_UMAMI_WEBSITE_ID);
console.log('Umami Script URL:', import.meta.env.VITE_UMAMI_SRC);
```

### Events not tracking?

```javascript
// Check if Umami is loaded
if (window.umami) {
  console.log('✅ Umami is loaded');
} else {
  console.log('❌ Umami not loaded');
}
```

---

## 🚀 Deployment Checklist

- [ ] Deploy Umami instance (Vercel/Cloud/Self-hosted)
- [ ] Create website in Umami dashboard
- [ ] Get Website ID and Script URL
- [ ] Add to `.env.local`
- [ ] Initialize in App.jsx
- [ ] Add scroll depth tracking
- [ ] Add custom event tracking
- [ ] Test in development
- [ ] Deploy to production
- [ ] Verify tracking works
- [ ] Monitor for 1 week

---

## 📚 Resources

- **Umami Website:** https://umami.is/
- **Umami Cloud:** https://cloud.umami.is/
- **Documentation:** https://umami.is/docs
- **GitHub:** https://github.com/umami-software/umami
- **Demo:** https://app.umami.is/share/8rmHaheU/umami.is

---

## 💡 Pro Tips

### 1. Use Both Umami + Google Analytics

You can use both! Umami for privacy-focused users, GA for detailed analysis:

```javascript
// In App.jsx
import { initGA } from './utils/analytics';
import { loadUmami } from './utils/umami';

useEffect(() => {
  initGA();      // Google Analytics
  loadUmami();   // Umami
}, []);
```

### 2. Share Public Dashboard

Umami allows you to create public dashboards:
1. Go to Settings → Websites
2. Click "Share URL"
3. Share the link with stakeholders

### 3. Set Up Alerts

Use Umami API to create custom alerts:
- Traffic spikes
- Error rate increases
- Conversion goals

### 4. Export Data

Export your analytics data:
- CSV export
- API access
- Database queries

---

## ✅ Quick Setup Summary

```bash
# 1. Install package (already done)
npm install @umami/node

# 2. Deploy Umami (choose one):
# - Umami Cloud: https://cloud.umami.is/
# - Vercel: https://vercel.com/new
# - Docker: docker-compose up

# 3. Add to .env.local
VITE_UMAMI_WEBSITE_ID=your-id
VITE_UMAMI_SRC=https://your-domain.com/script.js

# 4. Initialize in App.jsx
import { loadUmami } from './utils/umami';
useEffect(() => { loadUmami(); }, []);

# 5. Test
npm run dev

# 6. Deploy and monitor!
```

---

**Need help?** Check the Umami documentation or ask in their Discord: https://discord.gg/4dz4zcXYrQ
