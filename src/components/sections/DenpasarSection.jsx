import { useState, useEffect, useRef, useMemo } from 'react';
import { useScrollama } from '../../hooks/useScrollama';
import InteractiveMap from '../scrollytelling/InteractiveMap';
import StickyContainer from '../scrollytelling/StickyContainer';
import ScrollStep from '../scrollytelling/ScrollStep';
import { useTranslation } from 'react-i18next';

/**
 * DenpasarSection - Independent Section Component
 * 
 * This section manages its own:
 * - Map states and configurations
 * - Layer styling (via layerStyles)
 * - Scroll behavior and step management
 * - Content and layout
 * 
 * It does NOT depend on or interfere with:
 * - Global app state
 * - Other section configurations
 * - InteractiveMap component defaults
 */

const DenpasarSection = () => {
  const [activeEvent, setActiveEvent] = useState(null);
  const [mapState, setMapState] = useState(null);
  const mapRef = useRef();
  const { t } = useTranslation();

  // Detect mobile to reduce WebGL load
  const isMobile = useMemo(() => {
    return window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  // Helper to shift center right on desktop
  const adjustCenter = (lng, lat) => {
    // Shift ~0.001 degrees east on desktop (roughly 100px visual shift right)
    return isMobile ? [lng, lat] : [lng + 0.001, lat];
  };

  // Denpasar-specific map states for 6 sub-sections
  const denpasarMapStates = {
    0: { // Kampung Jawa - Jalan Ayani (Video Section)
      center: adjustCenter(115.212136, -8.644669),
      zoom: isMobile ? 15 : 18.8,
      pitch: isMobile ? 0 : 60,
      bearing: isMobile ? 0 : -30,
      layers: {
        floodPoints: false,
        floodImpact: true,
        rivers: true,
        adminBoundaries: false,
        riverBuffer: false,
        buildings: false,
        buildings3D: false,
        terrain: false,
        hillshade: false
      },
      layerStyles: {
        floodImpact: { color: '#CC9900', opacity: 0.6 },
        rivers: { color: '#1d4ed8', width: 12, opacity: 0.9 },
        buildings: { color: '#d1d5db', opacity: 0.8, outlineColor: '#9ca3af' },
        buildings3D: { color: '#e5e7eb', opacity: 0.9 },
        terrain: { exaggeration: 2.0 },
        hillshade: { exaggeration: 0.8 }
      },
      marker: {
        coordinates: [115.212136, -8.644669],
        title: "Kampung Jawa",
        description: "Flooded houses below bridge level"
      },
      interactive: false,
      mapStyle: isMobile ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/satellite-streets-v12"
    },
    1: { // Pasar Badung
      center: adjustCenter(115.21242, -8.65669),
      zoom: isMobile ? 14.5 : 18.20,
      pitch: isMobile ? 0 : 62.50,
      bearing: isMobile ? 0 : -24,
      layers: {
        floodPoints: true,
        floodImpact: true,
        rivers: true,
        adminBoundaries: false,
        buildings: false,
        buildings3D: false
      },
      layerStyles: {
        floodPoints: { color: '#dc2626', size: 8, opacity: 0.8 },
        floodImpact: { color: '#f59e0b', opacity: 0.7 },
        rivers: { color: '#2563eb', width: 12, opacity: 0.8 },
        buildings: { color: '#d1d5db', opacity: 0.8, outlineColor: '#9ca3af' },
        buildings3D: { color: '#e5e7eb', opacity: 0.9 }
      },
      marker: {
        coordinates: [115.21242, -8.65669],
        title: "Pasar Badung",
        description: "Traditional market affected by flooding"
      },
      interactive: false,
      mapStyle: isMobile ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/satellite-streets-v12"
    },
    2: { // Jalan Hasanudin - Building Collapse
      center: adjustCenter(115.21319, -8.658618),
      zoom: isMobile ? 14.5 : 18,
      pitch: isMobile ? 0 : 50,
      bearing: isMobile ? 0 : -20,
      layers: {
        floodPoints: true,
        floodImpact: true,
        rivers: true,
        adminBoundaries: false,
        buildings: false,
        buildings3D: false
      },
      layerStyles: {
        floodPoints: { color: '#dc2626', size: 10, opacity: 0.9 },
        floodImpact: { color: '#ef4444', opacity: 0.7 },
        rivers: { color: '#2563eb', width: 15, opacity: 0.8 },
        buildings: { color: '#d1d5db', opacity: 0.8, outlineColor: '#9ca3af' },
        buildings3D: { color: '#e5e7eb', opacity: 0.9 }
      },
      marker: {
        coordinates: [115.21319, -8.658618],
        title: "Jalan Hasanudin",
        description: "Building collapse - 2 people missing"
      },
      interactive: false,
      mapStyle: isMobile ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/satellite-streets-v12"
    },
    3: { // Soputan - Road Flooding
      center: adjustCenter(115.186899, -8.687336),
      zoom: isMobile ? 14 : 17,
      pitch: isMobile ? 0 : 45,
      bearing: isMobile ? 0 : -10,
      layers: {
        floodPoints: true,
        floodImpact: true,
        rivers: true,
        adminBoundaries: false,
        buildings: false,
        buildings3D: false
      },
      layerStyles: {
        floodPoints: { color: '#ea580c', size: 8, opacity: 0.8 },
        floodImpact: { color: '#f59e0b', opacity: 0.7 },
        rivers: { color: '#2563eb', width: 10, opacity: 0.8 },
        buildings: { color: '#d1d5db', opacity: 0.8, outlineColor: '#9ca3af' },
        buildings3D: { color: '#e5e7eb', opacity: 0.9 }
      },
      marker: {
        coordinates: [115.186899, -8.687336],
        title: "Jalan Soputan",
        description: "Road flooding - 1m average depth"
      },
      interactive: false,
      mapStyle: isMobile ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/satellite-streets-v12"
    },
    4: { // Pura Demak - Chronic Flooding
      center: adjustCenter(115.193307, -8.661699),
      zoom: isMobile ? 14.5 : 17.5,
      pitch: isMobile ? 0 : 45,
      bearing: isMobile ? 0 : -15,
      layers: {
        floodPoints: true,
        floodImpact: true,
        rivers: true,
        adminBoundaries: false,
        buildings: false,
        buildings3D: false
      },
      layerStyles: {
        floodPoints: { color: '#dc2626', size: 9, opacity: 0.85 },
        floodImpact: { color: '#f59e0b', opacity: 0.7 },
        rivers: { color: '#2563eb', width: 12, opacity: 0.8 },
        buildings: { color: '#d1d5db', opacity: 0.8, outlineColor: '#9ca3af' },
        buildings3D: { color: '#e5e7eb', opacity: 0.9 }
      },
      marker: {
        coordinates: [115.193307, -8.661699],
        title: "Pura Demak",
        description: "30m radius flooding, 1-2m depth"
      },
      interactive: false,
      mapStyle: "mapbox://styles/mapbox/satellite-streets-v12"
    },
    5: { // Denpasar Flood Impact - Heatmap Conclusion
      center: [115.2126, -8.6705],
      zoom: 13,
      pitch: 0,
      bearing: 0,
      layers: {
        floodPoints: false,
        floodHeatmap: true,
        floodImpact: false,
        rivers: true,
        adminBoundaries: true,
        buildings: false
      },
      layerStyles: {
        floodHeatmap: {
          filter: ['==', ['get', 'field_3'], 'Denpasar'],
          weight: 1,
          intensity: [
            'interpolate',
            ['linear'],
            ['zoom'],
            10, 1,
            13, 2,
            15, 3
          ],
          color: [
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
          radius: [
            'interpolate',
            ['linear'],
            ['zoom'],
            10, 10,
            13, 25,
            15, 40
          ],
          opacity: 0.9
        },
        rivers: { color: '#0ea5e9', width: 3, opacity: 0.7 },
        adminBoundaries: { color: '#1f2937', width: 2, opacity: 0.6 }
      },
      interactive: true,
      mapStyle: "mapbox://styles/mapbox/light-v11"
    }
  };

  const { currentStep } = useScrollama({
    onStepEnter: (response) => {
      const { index } = response;
      console.log(`Denpasar section - Entered step ${index}`);
      
      // Map step indices to map states (accounting for previous App.jsx steps)
      let mapStateIndex;
      if (index === 5) {
        mapStateIndex = 0; // Blank step - start with Kampung Jawa
      } else if (index === 6) {
        mapStateIndex = 0; // Kampung Jawa Video
      } else if (index === 7) {
        mapStateIndex = 0; // Blank step - stay on Kampung Jawa
      } else if (index === 8) {
        mapStateIndex = 1; // Pasar Badung Video
      } else if (index === 9) {
        mapStateIndex = 1; // Blank step - stay on Pasar Badung
      } else if (index === 10) {
        mapStateIndex = 2; // Jalan Hasanudin Video
      } else if (index === 11) {
        mapStateIndex = 2; // Blank step - stay on Jalan Hasanudin
      } else if (index === 12) {
        mapStateIndex = 3; // Soputan Video
      } else if (index === 13) {
        mapStateIndex = 3; // Blank step - stay on Soputan
      } else if (index === 14) {
        mapStateIndex = 4; // Pura Demak Video
      } else if (index === 15) {
        mapStateIndex = 4; // Blank step - stay on Pura Demak
      } else if (index === 16) {
        mapStateIndex = 5; // Denpasar Flood Impact Conclusion - Heatmap
      } else if (index === 17) {
        mapStateIndex = 5; // Blank step - stay on Heatmap
      }
      
      if (denpasarMapStates[mapStateIndex]) {
        const newMapState = denpasarMapStates[mapStateIndex];
        
        // Use flyTo for smooth transitions in Denpasar section only
        if (mapRef.current && mapState) {
          const map = mapRef.current.getMap();
          map.flyTo({
            center: newMapState.center,
            zoom: newMapState.zoom,
            pitch: newMapState.pitch || 0,
            bearing: newMapState.bearing || 0,
            duration: 2000,
            essential: true
          });
        }
        
        setMapState(newMapState);
      }
    },
    offset: 0.5,
    debug: false
  });

  // Initialize with first step
  useEffect(() => {
    setMapState(denpasarMapStates[0]);
  }, []);

  return (
    <section className="relative">
      {/* Full-width Sticky Map Container */}
      <div className="sticky top-0 w-full h-screen">
        <InteractiveMap 
          ref={mapRef}
          activeEvent={activeEvent}
          onEventClick={setActiveEvent}
          mapState={mapState}
          currentStep={currentStep}
        />
      </div>

      {/* Scrolling Content with Overlay Boxes */}
      <div className="relative">
        {/* Blank Step 1: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 1: Kampung Jawa Video */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[600px] border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('denpasar.kampungJawaTitle')}
            </h3>
            
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              {t('denpasar.kampungJawaDesc')}
            </p>
            
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <iframe 
                  className="w-64 h-96 rounded-lg shadow-md"
                  src="https://imagekit.io/player/embed/8qi5mzhkq/dps_01.mp4?updatedAt=1758533264758&thumbnail=https%3A%2F%2Fik.imagekit.io%2F8qi5mzhkq%2Fdps_01.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1758533264758&updatedAt=1758533264758" 
                  title="ImageKit video player" 
                  frameBorder="0" 
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                ></iframe>
                {/* CSS overlay to hide the title */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent pointer-events-none rounded-t-lg"></div>
              </div>
            </div>
          </div>
        </ScrollStep>

        {/* Blank Step 2: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 2: Pasar Badung */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[600px] border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('denpasar.pasarBadungTitle')}
            </h3>
            
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              {t('denpasar.pasarBadungDesc')}
            </p>
            
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <iframe 
                  className="w-64 h-96 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/fPJkFib6Vms" 
                  title="Pasar Badung Flooding" 
                  frameBorder="0" 
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                ></iframe>
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent pointer-events-none rounded-t-lg"></div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-900 mb-2 text-sm">{t('denpasar.impactTitle')}</h4>
              <ul className="text-yellow-800 space-y-1 text-xs">
                {t('denpasar.pasarBadungImpact', { returnObjects: true }).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollStep>

        {/* Blank Step 3: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 3: Jalan Hasanudin */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[600px] border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('denpasar.hasanudinTitle')}
            </h3>
            
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              {t('denpasar.hasanudinDesc')}
            </p>
            
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <iframe 
                  className="w-64 h-96 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/SdaCeO-9igc" 
                  title="Jalan Hasanudin Building Collapse" 
                  frameBorder="0" 
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                ></iframe>
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent pointer-events-none rounded-t-lg"></div>
              </div>
            </div>
            
            <div className="bg-red-50 p-3 rounded border-l-4 border-red-600">
              <h4 className="font-semibold text-red-900 mb-2 text-sm">{t('denpasar.criticalImpactTitle')}</h4>
              <ul className="text-red-800 space-y-1 text-xs">
                {t('denpasar.hasanudinImpact', { returnObjects: true }).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollStep>

        {/* Blank Step 4: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 4: Soputan */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[600px] border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('denpasar.soputanTitle')}
            </h3>
            
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              {t('denpasar.soputanDesc')}
            </p>
            
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <iframe 
                  className="w-64 h-96 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/A9XEEzweGoA" 
                  title="Jalan Soputan Flooding" 
                  frameBorder="0" 
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                ></iframe>
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent pointer-events-none rounded-t-lg"></div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900 mb-2 text-sm">{t('denpasar.impactTitle')}</h4>
              <ul className="text-orange-800 space-y-1 text-xs">
                {t('denpasar.soputanImpact', { returnObjects: true }).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollStep>

        {/* Blank Step 5: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 5: Pura Demak */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[600px] border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('denpasar.puraDemakTitle')}
            </h3>
            
            <p className="text-base text-gray-700 leading-relaxed mb-3">
              {t('denpasar.puraDemakDesc')}
            </p>
            
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <iframe 
                  className="w-64 h-96 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/ESE9xMHfI94" 
                  title="Pura Demak Flooding" 
                  frameBorder="0" 
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                ></iframe>
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent pointer-events-none rounded-t-lg"></div>
              </div>
            </div>
            
            <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
              <h4 className="font-semibold text-red-900 mb-2 text-sm">{t('denpasar.chronicFloodingTitle')}</h4>
              <ul className="text-red-800 space-y-1 text-xs">
                {t('denpasar.puraDemakImpact', { returnObjects: true }).map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollStep>

        {/* Blank Step 6: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 6: Denpasar Flood Impact - Conclusion */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[500px] border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('denpasar.conclusionTitle')}
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {t('denpasar.conclusionDesc')}
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="bg-red-50 p-3 rounded border-l-4 border-red-600">
                <h4 className="font-semibold text-red-900 mb-2 text-sm">{t('denpasar.criticalImpactTitle2')}</h4>
                <ul className="text-red-800 space-y-1 text-xs">
                  {t('denpasar.criticalImpact', { returnObjects: true }).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm">{t('denpasar.distributionPatternTitle')}</h4>
                <ul className="text-blue-800 space-y-1 text-xs">
                  {t('denpasar.distributionPattern', { returnObjects: true }).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollStep>

        {/* Blank Step 7: Spacing */}
        <ScrollStep>
        </ScrollStep>
      </div>
    </section>
  );
};

export default DenpasarSection;
