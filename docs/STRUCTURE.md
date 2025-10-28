# Project Structure

## Overview
This document describes the file structure and organization of the Banjir Denpasar scrollytelling project.

## Directory Structure
```
banjirbali_2025/
├── data/                  # GeoJSON, CSV, and supporting datasets
├── dist/                  # Built production files (generated)
├── docs/                  # Documentation files
├── public/                # Static assets (img/, vids/)
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── sections/      # Section components (Hero, Intro, Collage, Denpasar, Badung, etc.)
│   │   ├── scrollytelling/ # Scrollytelling-specific components (InteractiveMap, ScrollStep, etc.)
│   │   └── charts/        # Chart components (e.g., WeatherChart.jsx)
│   ├── data/              # JavaScript data files (e.g., floodData.js)
│   ├── hooks/             # Custom React hooks (e.g., useScrollama.js)
│   ├── i18n/              # Localization
│   ├── lib/               # Helpers/libs
│   ├── utils/             # Utility functions
│   ├── assets/            # Images and other assets
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global CSS styles
├── IMPLEMENTATION_PLAN.md # Development roadmap
├── package.json           # Project dependencies and scripts
├── README.md              # Project overview
├── vite.config.js         # Vite configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## Key Components

### Section Components
 - `HeroSection.jsx`: Landing page with title and background
 - `IntroSection.jsx`: Introduction with scroll-triggered animations
 - `CollageSection.jsx`: Punk zine-style collage with 70+ images
 - `DenpasarSection.jsx`: City-specific scrollytelling with integrated sticky map and videos
 - `BadungSection.jsx`: Rural community impact analysis
 - `FloodImpactSection.jsx`: Narrative analysis of flood impacts
 - `MapSection.jsx` (optional example): Standalone map section (not used by default)

### Scrollytelling Components
- `ScrollStep.jsx`: Individual scrollable sections
- `StickyContainer.jsx`: Fixed-position container for visualizations
- `InteractiveMap.jsx`: Mapbox GL JS integration
- `RevealingCollage.jsx`: Chaotic collage animation system
- `Charts.jsx`: Data visualization components

### Hooks
- `useScrollama.js`: Scrollama integration for scroll-based interactions

### Data Files
- `floodData.js`: Flood event data and statistics
- Collage images are defined directly in `CollageSection.jsx` via `collageImagePaths`

## Website Flow (Updated 2025-10-28)

1. **Hero Section** - Landing page
2. **Intro Section** - Background with animations  
3. **Collage Section** - Punk zine collage background
4. **Research Methodology** - Crowdsourcing explanation
5. **Denpasar Section** - Integrated sticky map with multi-step narrative and videos
6. **Badung Section** - Rural community analysis
7. **Flood Impact Analysis** - Narrative and stats
8. **Data Visualization** - Charts and statistics
9. **Recommendations & Findings** - Strategic analysis
10. **Conclusion** - Reflections
11. **Credits**

## Recent Updates (2025-10-28)

- ✅ **Integrated Sticky Map**: DenpasarSection manages map states per step via `mapState` and `layerStyles`; `InteractiveMap` is style-agnostic
- ✅ **Collage Mobile Optimization**: `RevealingCollage` renders a reduced subset on mobile for stability
- ✅ **New Charts**: WeatherChart built with Recharts; data toggles and insights added
- ✅ **Content Flow**: Added Recommendations & Findings and Credits sections; refined spacing

## Development Workflow
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Edit files in `src/` to make changes
4. Run `npm run build` to create a production build

## Deployment
The project can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Traditional web servers