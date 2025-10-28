# Data Documentation

## Overview
This project uses several GeoJSON datasets to visualize the September 10, 2025 Denpasar flood event. Data was collected through Instagram crowdsourcing methodology, resulting in 80 videos and 78 screenshots from 38 accounts.

## Data Files

### 1. flood_points.geojson
- **Description**: 57 documented flood points (reduced from 59 after validation). Note: no `Ketinggian` field on points; severity classifications live in `flood_impact.geojson`.
- **Fields**:
  - `No`: Unique ID
  - `Lokasi`: Location name
  - `field_3`: Administrative area (Denpasar/Badung)
  - `X`, `Y`: Coordinates (WGS84)
  - `Dampak`: Impact description
  - `Jenis Salu`: Infrastructure type (Sungai, Selokan, Jalan, etc.)
  - `Dokumentas`: Documentation/source notes (may be null)

### 2. flood_impact.geojson
- **Description**: Polygonized impact zones labeled by severity
- **Fields**:
  - `Ketinggian`: Flood depth classification (rendah/sedang/tinggi)

### 3. rivers.geojson
- **Description**: River network data (including Tukad Badung)
- **Fields**:
  - `NAME`: River name

### 4. admin_boundaries.geojson
- **Description**: Administrative boundaries for Denpasar and Badung
- **Fields**:
  - `Kab_Kota`: Administrative area name

### 5. radius.geojson
- **Description**: City-scale radius/buffer geometry for contextual flood shading
- **Fields**: Geometry only (no attributes required)

### 6. river_buffers.geojson
- **Description**: Multiple buffer zones around rivers used for impact analysis
- **Fields**:
  - `distance`: Buffer distance in meters (e.g., 10, 50, 100)

### 7. Collage images (ImageKit, managed in code)
- **Description**: ImageKit-hosted screenshots used by the chaotic collage system
- **Source**: Instagram crowdsourcing from 38 accounts
- **Location**: Managed directly in `src/components/sections/CollageSection.jsx` via the `collageImagePaths` array
- **Mobile optimization**: On mobile, only ~25% of images are rendered to preserve performance (see `RevealingCollage.jsx`)

## Data Processing Notes

1. **Coordinate Systems**: All data has been standardized to WGS84 (EPSG:4326) for web compatibility

2. **Crowdsourcing Validation**:
   - Cross-verified with BMKG meteorological data
   - Verified against BNPB official reports
   - Location identification using visual cues (street signs, landmarks, GPS tags)
   - Flood depth estimation using scale comparisons (human height, vehicles, infrastructure)

3. **Severity Classification**:
   - Rendah (Low): 0.1-0.5m depth
   - Sedang (Medium): 0.5-1.2m depth
   - Tinggi (High): 1.2-2.0m depth
   - Kritis (Critical): 1.5-3.0m+ or structural failure

4. **Infrastructure Types**:
   - Sungai: Rivers
   - Selokan: Drains
   - Jalan: Roads
   - Underpass: Road underpasses
   - Basement: Underground structures

5. **Image Quality Control**:
   - Images are hosted on ImageKit and validated for accessibility
   - Collage uses 70+ images; on mobile, a reduced subset is shown for stability
   - Recommended display size ~350px height (desktop), up to 1000px width

## Data Sources
- **Primary**: Citizen crowdsourced flood points via Instagram (38 accounts)
- **Validation**: BMKG meteorological records, BNPB official reports
- **Infrastructure**: Government infrastructure data
- **Geospatial**: Administrative boundaries from BPS/ESRI
- **Media**: Cross-verification with online news sources

## Research Methodology
The project employs Instagram-based crowdsourcing methodology:
- **Data Collection**: 9-11 September 2025 posts from 38 verified accounts
- **Account Types**: Local info (@infodenpasar), government (@poldabali), community accounts
- **Analysis Framework**: Location identification → depth estimation → chronology reconstruction
- **Validation**: Triangulation with official sources and media reports
- **Ethical Considerations**: Public posts only, no private data collection

## Recent Updates (2025-10-28)
- ✅ Confirmed 57 flood points (no `Ketinggian` field on points; severity in polygons)
- ✅ Added `radius.geojson` and `river_buffers.geojson` to map context/analysis
- ✅ Collage images managed in code (ImageKit), with mobile optimization
- ✅ Updated documentation for data ownership and processing pipeline