# Banjir Denpasar Scrollytelling Project

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with your Mapbox token:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and set your environment variables:
   - `VITE_MAPBOX_TOKEN` (required) — get it at https://account.mapbox.com/
   - `VITE_INSTAGRAM_TOKEN` (optional) — required for Instagram oEmbed in `SocialEmbeds.jsx`; if not set, graceful fallback cards are used

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to http://localhost:4343

## Project Structure

- `src/` - Source code
- `data/` - GeoJSON data files
- `public/` - Static assets
- `docs/` - Documentation

## Data Sources

The project uses several GeoJSON files for visualization:
- `flood_points.geojson` - 57 documented flood points
- `flood_impact.geojson` - Flood impact areas with severity classifications
- `rivers.geojson` - River network data
- `admin_boundaries.geojson` - Administrative boundaries for Denpasar and Badung
 - `radius.geojson` - City-scale contextual buffer
 - `river_buffers.geojson` - Multi-distance river buffer zones
 - Optional: `kelurahan_boundaries.geojson`, `population.geojson` for population choropleth/3D layers

## Development

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```
The preview server runs at http://localhost:4344