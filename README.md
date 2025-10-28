# Banjir Denpasar Scrollytelling

A Washington Post-style scrollytelling visualization of the September 10, 2025 Denpasar flood disaster, incorporating real-time documentation, casualty data, and infrastructure impact analysis.

## Project Structure

- `src/` - Main source code
- `data/` - Processed flood data in GeoJSON format
- `public/` - Static assets (images, videos)
- `docs/` - Documentation and analysis

## Features

- Interactive sticky map (Mapbox GL via react-map-gl)
- Scroll-driven narrative with embedded videos (ImageKit, YouTube)
- Optional social media embeds (Instagram, TikTok) with safe fallbacks
- Data visualizations of flood impact (Recharts)
- Language switcher (i18next)

## Data Sources

- 57 georeferenced flood points
- Citizen videos and social media documentation
- BMKG meteorological records

## Implementation

Based on the Washington Post FEMA flood maps article analysis and using modern scrollytelling techniques with:
- Scrollama.js (via custom `useScrollama` hook) for scroll interactions
- Mapbox GL JS with react-map-gl for interactive maps
- React for UI components and Tailwind CSS for styling
- Recharts for data visualizations