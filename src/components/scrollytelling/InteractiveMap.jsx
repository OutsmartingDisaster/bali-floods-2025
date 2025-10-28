import { useState, useEffect, useRef, memo, forwardRef } from 'react';
import { Map, Source, Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

/**
 * InteractiveMap Component - Style Agnostic Map Renderer
 * 
 * This component is designed to be completely style-agnostic and configuration-driven.
 * It should NEVER contain hardcoded styles or interfere with section-specific styling.
 * 
 * Styling Control:
 * - All layer styles are controlled via mapState.layerStyles
 * - Default fallback styles are provided only as safety nets
 * - Sections have complete control over their visual appearance
 * 
 * Configuration Structure:
 * mapState = {
 *   center: [lng, lat],
 *   zoom: number,
 *   pitch?: number,
 *   bearing?: number,
 *   mapStyle?: string,
 *   interactive?: boolean,
 *   layers: { layerName: boolean },
 *   layerStyles?: {
 *     floodPoints: { color, size, opacity },
 *     floodImpact: { color, opacity },
 *     rivers: { color, width, opacity },
 *     buildings: { color, opacity, outlineColor },
 *     buildings3D: { color, opacity },
 *     adminBoundaries: { color, width, opacity }
 *   },
 *   marker?: { coordinates, title, description }
 * }
 */

const InteractiveMap = forwardRef(({ 
  activeEvent = null, 
  onEventClick = () => {},
  mapState = null,
  currentStep = 0,
  mapStyle = "mapbox://styles/mapbox/satellite-streets-v12" 
}, ref) => {
  // Validate that sections provide their own styles (development helper)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && mapState?.layers) {
      const enabledLayers = Object.entries(mapState.layers)
        .filter(([_, enabled]) => enabled)
        .map(([layer, _]) => layer);
      
      const hasCustomStyles = mapState.layerStyles && Object.keys(mapState.layerStyles).length > 0;
      
      if (enabledLayers.length > 0 && !hasCustomStyles) {
        console.warn('InteractiveMap: Section should provide layerStyles for enabled layers:', enabledLayers);
      }
    }
  }, [mapState]);
  const [viewState, setViewState] = useState({
    longitude: 115.2126,
    latitude: -8.6705,
    zoom: 12
  });

  const [floodPoints, setFloodPoints] = useState(null);
  const [floodImpact, setFloodImpact] = useState(null);
  const [rivers, setRivers] = useState(null);
  const [adminBoundaries, setAdminBoundaries] = useState(null);
  const [floodRadius, setFloodRadius] = useState(null);
  const [riverBuffers, setRiverBuffers] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [populationPoints, setPopulationPoints] = useState(null);
  const [kelurahanBoundaries, setKelurahanBoundaries] = useState(null);
  const [webglLost, setWebglLost] = useState(false);
  const mapInstanceRef = useRef(null);

  // Detect mobile for optimization
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

  // WebGL context loss handler
  useEffect(() => {
    const handleContextLost = (e) => {
      console.error('WebGL context lost. Attempting recovery...');
      e.preventDefault();
      setWebglLost(true);
      
      // Attempt to recover after a delay
      setTimeout(() => {
        setWebglLost(false);
        window.location.reload();
      }, 2000);
    };

    const canvas = document.querySelector('.mapboxgl-canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      return () => canvas.removeEventListener('webglcontextlost', handleContextLost);
    }
  }, []);

  // Load GeoJSON data
  useEffect(() => {
    const loadData = async () => {
      try {
        const pointsResponse = await fetch('/data/flood_points.geojson');
        const pointsData = await pointsResponse.json();
        setFloodPoints(pointsData);

        const impactResponse = await fetch('/data/flood_impact.geojson');
        const impactData = await impactResponse.json();
        setFloodImpact(impactData);

        const riversResponse = await fetch('/data/rivers.geojson');
        const riversData = await riversResponse.json();
        setRivers(riversData);

        const adminResponse = await fetch('/data/admin_boundaries.geojson');
        const adminData = await adminResponse.json();
        setAdminBoundaries(adminData);

        const radiusResponse = await fetch('/data/radius.geojson');
        const radiusData = await radiusResponse.json();
        setFloodRadius(radiusData);

        const bufferResponse = await fetch('/data/river_buffers.geojson');
        const bufferData = await bufferResponse.json();
        setRiverBuffers(bufferData);

        const popResponse = await fetch('/data/population.geojson');
        const popData = await popResponse.json();
        setPopulationPoints(popData);

        const kelurahanResponse = await fetch('/data/Data Populasi Kota Denpasar 2020.geojson');
        const kelurahanData = await kelurahanResponse.json();
        setKelurahanBoundaries(kelurahanData);
      } catch (error) {
        console.error('Error loading GeoJSON data:', error);
      }
    };

    loadData();
  }, []);

  // Update map view when mapState changes (scroll-driven)
  useEffect(() => {
    if (mapState && mapState.center) {
      setViewState(prev => ({
        ...prev,
        longitude: mapState.center[0],
        latitude: mapState.center[1],
        zoom: mapState.zoom,
        pitch: mapState.pitch || 0,
        bearing: mapState.bearing || 0,
        transitionDuration: 1500
      }));
    }
  }, [mapState]);

  // Update map view when active event changes (click-driven)
  useEffect(() => {
    if (activeEvent && activeEvent.coordinates) {
      setViewState(prev => ({
        ...prev,
        longitude: activeEvent.coordinates[0],
        latitude: activeEvent.coordinates[1],
        zoom: 14,
        transitionDuration: 1000
      }));
    }
  }, [activeEvent]);

  // Show error state if WebGL is lost
  if (webglLost) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-6">
          <div className="text-xl font-bold mb-2">Recovering map...</div>
          <div className="text-sm text-gray-400">Please wait</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Map
        ref={ref}
        {...viewState}
        onLoad={(e) => {
          mapInstanceRef.current = e.target;
          // Reduce quality on mobile
          if (isMobile && e.target) {
            e.target.setMaxPitch(30);
          }
        }}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        mapStyle={mapState?.mapStyle || mapStyle}
        onMove={evt => setViewState(evt.viewState)}
        maxPitch={isMobile ? 30 : 85}
        maxZoom={isMobile ? 16 : 22}
        antialias={!isMobile}
        preserveDrawingBuffer={false}
        onClick={(e) => {
          const feature = e.features?.[0];
          if (feature && feature.properties) {
            onEventClick(feature.properties);
          }
        }}
        scrollZoom={mapState?.interactive !== false}
        dragPan={mapState?.interactive !== false}
        dragRotate={mapState?.interactive !== false}
        doubleClickZoom={mapState?.interactive !== false}
        touchZoomRotate={mapState?.interactive !== false}
        terrain={mapState?.layers?.terrain ? { source: 'mapbox-terrain', exaggeration: mapState?.layerStyles?.terrain?.exaggeration || 1.5 } : undefined}
      >
        {/* Terrain Source - Always present to avoid removal issues */}
        <Source id="mapbox-terrain" type="raster-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" />

        {/* Hillshade Layer */}
        {(mapState?.layers?.hillshade ?? false) && (
          <Layer
            id="hillshade"
            type="hillshade"
            source="mapbox-terrain"
            paint={{
              'hillshade-illumination-direction': 315,
              'hillshade-exaggeration': mapState?.layerStyles?.hillshade?.exaggeration || 0.5
            }}
          />
        )}

        {adminBoundaries && (mapState?.layers?.adminBoundaries ?? true) && (
          <Source id="admin-boundaries" type="geojson" data={adminBoundaries}>
            <Layer
              id="admin-boundaries-fill"
              type="fill"
              paint={{
                'fill-color': '#ffffff',
                'fill-opacity': 0.1
              }}
            />
            <Layer
              id="admin-boundaries-line"
              type="line"
              paint={{
                'line-color': mapState?.layerStyles?.adminBoundaries?.color || '#000000',
                'line-width': mapState?.layerStyles?.adminBoundaries?.width || 2,
                'line-opacity': mapState?.layerStyles?.adminBoundaries?.opacity || 0.5
              }}
            />
          </Source>
        )}

        {/* LAYER ORDER (bottom to top): Population → InaRISK → Rivers → Flood Points */}
        
        {/* 1. Population Choropleth - BOTTOM LAYER (50% opacity, blue palette) */}
        {kelurahanBoundaries && (mapState?.layers?.populationChoropleth ?? false) && (
          <Source 
            id="population-choropleth-bottom" 
            type="geojson" 
            data={kelurahanBoundaries}
          >
            <Layer
              id="population-choropleth-fill-bottom"
              type="fill"
              paint={{
                'fill-color': mapState?.layerStyles?.populationChoropleth?.colors ? [
                  'interpolate',
                  ['linear'],
                  ['to-number', ['get', 'Export_D_3']],
                  5000, mapState.layerStyles.populationChoropleth.colors[5000],
                  10000, mapState.layerStyles.populationChoropleth.colors[10000],
                  15000, mapState.layerStyles.populationChoropleth.colors[15000],
                  20000, mapState.layerStyles.populationChoropleth.colors[20000],
                  25000, mapState.layerStyles.populationChoropleth.colors[25000],
                  30000, mapState.layerStyles.populationChoropleth.colors[30000],
                  35000, mapState.layerStyles.populationChoropleth.colors[35000]
                ] : [
                  'interpolate',
                  ['linear'],
                  ['to-number', ['get', 'Export_D_3']],
                  5000, '#dbeafe',
                  10000, '#bfdbfe',
                  15000, '#93c5fd',
                  20000, '#60a5fa',
                  25000, '#3b82f6',
                  30000, '#2563eb',
                  35000, '#1e40af'
                ],
                'fill-opacity': mapState?.layerStyles?.populationChoropleth?.opacity || 0.5
              }}
            />
            <Layer
              id="population-choropleth-outline-bottom"
              type="line"
              paint={{
                'line-color': '#ffffff',
                'line-width': 1,
                'line-opacity': 0.5
              }}
            />
          </Source>
        )}

        {rivers && (mapState?.layers?.rivers ?? false) && (
          <Source id="rivers" type="geojson" data={rivers}>
            {/* River Buffer Zone */}
            {(mapState?.layers?.riverBuffer ?? false) && (
              <Layer
                id="rivers-buffer"
                type="line"
                paint={{
                  'line-color': '#3b82f6',
                  'line-width': 12,
                  'line-opacity': 0.3,
                  'line-blur': 2
                }}
              />
            )}
            {/* Main River Line */}
            <Layer
              id="rivers-line"
              type="line"
              paint={{
                'line-color': mapState?.layerStyles?.rivers?.color || '#1d4ed8',
                'line-width': mapState?.layerStyles?.rivers?.width || 10,
                'line-opacity': mapState?.layerStyles?.rivers?.opacity || 0.9
              }}
            />
          </Source>
        )}

        {floodImpact && (mapState?.layers?.floodImpact ?? false) && (
          <Source id="flood-impact" type="geojson" data={floodImpact}>
            <Layer
              id="flood-impact-fill"
              type="fill"
              paint={{
                'fill-color': mapState?.layerStyles?.floodImpact?.colorByDepth ? [
                  'match',
                  ['get', 'Ketinggian'],
                  'tinggi', mapState.layerStyles.floodImpact.colors.high,
                  'sedang', mapState.layerStyles.floodImpact.colors.medium,
                  'rendah', mapState.layerStyles.floodImpact.colors.low,
                  mapState.layerStyles.floodImpact.colors.low // default
                ] : (mapState?.layerStyles?.floodImpact?.color || '#CC9900'),
                'fill-opacity': mapState?.layerStyles?.floodImpact?.opacity || 0.2,
                'fill-outline-color': '#ffffff'
              }}
            />
          </Source>
        )}

        {/* Flood Radius (1km buffer) */}
        {floodRadius && (mapState?.layers?.floodRadius ?? false) && (
          <Source id="flood-radius" type="geojson" data={floodRadius}>
            <Layer
              id="flood-radius-fill"
              type="fill"
              paint={{
                'fill-color': mapState?.layerStyles?.floodRadius?.color || '#f59e0b',
                'fill-opacity': mapState?.layerStyles?.floodRadius?.opacity || 0.3,
                'fill-outline-color': '#f59e0b'
              }}
            />
            <Layer
              id="flood-radius-line"
              type="line"
              paint={{
                'line-color': '#f59e0b',
                'line-width': 1,
                'line-opacity': 0.5
              }}
            />
          </Source>
        )}


        {/* Flood Points Heatmap */}
        {floodPoints && (mapState?.layers?.floodHeatmap ?? false) && (
          <Source id="flood-heatmap" type="geojson" data={floodPoints}>
            <Layer
              id="flood-heatmap-layer"
              type="heatmap"
              filter={mapState?.layerStyles?.floodHeatmap?.filter || null}
              paint={{
                'heatmap-weight': mapState?.layerStyles?.floodHeatmap?.weight || 1,
                'heatmap-intensity': mapState?.layerStyles?.floodHeatmap?.intensity || 1,
                'heatmap-color': mapState?.layerStyles?.floodHeatmap?.color || [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(33,102,172,0)',
                  0.2, 'rgb(103,169,207)',
                  0.4, 'rgb(209,229,240)',
                  0.6, 'rgb(253,219,199)',
                  0.8, 'rgb(239,138,98)',
                  1, 'rgb(178,24,43)'
                ],
                'heatmap-radius': mapState?.layerStyles?.floodHeatmap?.radius || 20,
                'heatmap-opacity': mapState?.layerStyles?.floodHeatmap?.opacity || 0.8
              }}
            />
          </Source>
        )}

        {/* Building Footprints */}
        {(mapState?.layers?.buildings ?? false) && !mapState?.layers?.buildings3D && (
          <Source id="mapbox-buildings" type="vector" url="mapbox://mapbox.mapbox-streets-v8">
            <Layer
              id="building-footprints"
              source-layer="building"
              type="fill"
              paint={{
                'fill-color': mapState?.layerStyles?.buildings?.color || '#d1d5db',
                'fill-opacity': mapState?.layerStyles?.buildings?.opacity || 0.7,
                'fill-outline-color': mapState?.layerStyles?.buildings?.outlineColor || '#9ca3af'
              }}
            />
          </Source>
        )}

        {/* 3D Buildings */}
        {(mapState?.layers?.buildings3D ?? false) && (
          <Source id="mapbox-buildings-3d" type="vector" url="mapbox://mapbox.mapbox-streets-v8">
            <Layer
              id="building-3d"
              source-layer="building"
              type="fill-extrusion"
              paint={{
                'fill-extrusion-color': mapState?.layerStyles?.buildings3D?.color || [
                  'case',
                  ['has', 'height'],
                  '#aaa',
                  '#ddd'
                ],
                'fill-extrusion-height': [
                  'case',
                  ['has', 'height'],
                  ['get', 'height'],
                  ['*', ['get', 'levels'], 3]
                ],
                'fill-extrusion-base': 0,
                'fill-extrusion-opacity': mapState?.layerStyles?.buildings3D?.opacity || 0.8
              }}
            />
          </Source>
        )}

        {/* River Buffers (10m, 50m, 100m) */}
        {riverBuffers && (mapState?.layers?.riverBuffers ?? false) && (
          <Source id="river-buffers" type="geojson" data={riverBuffers}>
            <Layer
              id="river-buffers-fill"
              type="fill"
              paint={{
                'fill-color': [
                  'match',
                  ['get', 'distance'],
                  10, mapState?.layerStyles?.riverBuffers?.colors?.['10m'] || '#93c5fd',
                  50, mapState?.layerStyles?.riverBuffers?.colors?.['50m'] || '#60a5fa',
                  100, mapState?.layerStyles?.riverBuffers?.colors?.['100m'] || '#3b82f6',
                  '#93c5fd'
                ],
                'fill-opacity': mapState?.layerStyles?.riverBuffers?.opacity || 0.3
              }}
            />
            <Layer
              id="river-buffers-line"
              type="line"
              paint={{
                'line-color': '#2563eb',
                'line-width': 1,
                'line-opacity': 0.4
              }}
            />
          </Source>
        )}

        {/* 3D Population Extrusion using Kelurahan Boundaries */}
        {kelurahanBoundaries && (mapState?.layers?.population3D ?? false) && (
          <Source 
            id="population-3d" 
            type="geojson" 
            data={kelurahanBoundaries}
          >
            <Layer
              id="population-3d-extrusion"
              type="fill-extrusion"
              paint={{
                'fill-extrusion-color': [
                  'interpolate',
                  ['linear'],
                  ['to-number', ['get', 'Export_D_3']],
                  5000, '#e9d5ff',
                  10000, '#d8b4fe',
                  15000, '#c084fc',
                  20000, '#a855f7',
                  25000, '#9333ea',
                  30000, '#7e22ce',
                  35000, '#6b21a8'
                ],
                'fill-extrusion-height': [
                  '*',
                  ['to-number', ['get', 'Export_D_3']],
                  mapState?.layerStyles?.population3D?.heightMultiplier || 2
                ],
                'fill-extrusion-base': 0,
                'fill-extrusion-opacity': mapState?.layerStyles?.population3D?.opacity || 0.7
              }}
            />
          </Source>
        )}

        {/* InaRISK Flood Risk Layer (BNPB) */}
        {(mapState?.layers?.inariskLayer ?? false) && (
          <Source
            id="inarisk-layer"
            type="raster"
            tiles={[
              'https://gis.bnpb.go.id/server/rest/services/inarisk/layer_risiko_banjir/ImageServer/exportImage?bbox={bbox-epsg-3857}&bboxSR=3857&size=256,256&imageSR=3857&format=png&transparent=true&f=image'
            ]}
            tileSize={256}
          >
            <Layer
              id="inarisk-raster"
              type="raster"
              paint={{
                'raster-opacity': mapState?.layerStyles?.inariskLayer?.opacity || 0.6,
                'raster-fade-duration': 300
              }}
            />
          </Source>
        )}

        {/* Flood Points - Rendered Last to be on top of all layers */}
        {floodPoints && (mapState?.layers?.floodPoints ?? true) && (
          <Source id="flood-points" type="geojson" data={floodPoints}>
            <Layer
              id="flood-points-circle"
              type="circle"
              paint={{
                'circle-radius': mapState?.layerStyles?.floodPoints?.size || [
                  'match',
                  ['get', 'Ketinggian'],
                  'tinggi', 8,
                  'sedang', 6,
                  'rendah', 4,
                  5
                ],
                'circle-color': mapState?.layerStyles?.floodPoints?.color || [
                  'match',
                  ['get', 'Ketinggian'],
                  'tinggi', '#dc2626',
                  'sedang', '#ea580c',
                  'rendah', '#65a30d',
                  '#6b7280'
                ],
                'circle-stroke-color': '#ffffff',
                'circle-stroke-width': 2,
                'circle-opacity': mapState?.layerStyles?.floodPoints?.opacity || 0.8
              }}
            />
          </Source>
        )}

        {/* Custom Marker */}
        {mapState?.marker && (
          <Marker
            longitude={mapState.marker.coordinates[0]}
            latitude={mapState.marker.coordinates[1]}
            anchor="bottom"
          >
            <div className="flex flex-col items-center">
              <div className="bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg text-sm font-semibold mb-1 whitespace-nowrap">
                {mapState.marker.title}
              </div>
              <div className="w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </Marker>
        )}
      </Map>
    </div>
  );
});

InteractiveMap.displayName = 'InteractiveMap';

export default memo(InteractiveMap);