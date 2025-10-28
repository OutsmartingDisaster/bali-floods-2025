import { useState, useEffect, useRef, useMemo } from 'react';
import { useScrollama } from '../../hooks/useScrollama';
import InteractiveMap from '../scrollytelling/InteractiveMap';
import ScrollStep from '../scrollytelling/ScrollStep';
import { useTranslation } from 'react-i18next';

/**
 * BadungSection - Independent Section Component
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

const BadungSection = () => {
  const { t } = useTranslation();
  const [activeEvent, setActiveEvent] = useState(null);
  const [mapState, setMapState] = useState(null);
  const mapRef = useRef();

  // Detect mobile to reduce WebGL load
  const isMobile = useMemo(() => {
    return window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

  // Helper to shift center right on desktop
  const adjustCenter = (lng, lat) => {
    // Shift ~0.001 degrees east on desktop (roughly 100px visual shift right)
    return isMobile ? [lng, lat] : [lng + 0.001, lat];
  };

  // Badung-specific map states for 3 locations
  const badungMapStates = {
    0: { // Shortcut Canggu
      center: adjustCenter(115.138772, -8.653265),
      zoom: isMobile ? 14 : 17,
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
        floodPoints: { color: '#ea580c', size: 8, opacity: 0.85 },
        floodImpact: { color: '#f59e0b', opacity: 0.6 },
        rivers: { color: '#2563eb', width: 12, opacity: 0.8 },
        buildings: { color: '#d1d5db', opacity: 0.8, outlineColor: '#9ca3af' },
        buildings3D: { color: '#e5e7eb', opacity: 0.9 }
      },
      marker: {
        coordinates: [115.138772, -8.653265],
        title: "Shortcut Canggu",
        description: "Waist-deep flooding"
      },
      interactive: false,
      mapStyle: isMobile ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/satellite-streets-v12"
    },
    1: { // Underpass Dewa Ruci
      center: adjustCenter(115.182456, -8.72169),
      zoom: isMobile ? 14.5 : 17.5,
      pitch: isMobile ? 0 : 50,
      bearing: isMobile ? 0 : -20,
      layers: {
        floodPoints: true,
        floodImpact: true,
        rivers: false,
        adminBoundaries: false,
        buildings: false,
        buildings3D: false
      },
      layerStyles: {
        floodPoints: { color: '#dc2626', size: 10, opacity: 0.9 },
        floodImpact: { color: '#ef4444', opacity: 0.7 },
        buildings: { color: '#d1d5db', opacity: 0.8, outlineColor: '#9ca3af' },
        buildings3D: { color: '#e5e7eb', opacity: 0.9 }
      },
      marker: {
        coordinates: [115.182456, -8.72169],
        title: "Underpass Dewa Ruci",
        description: "Car-level flooding"
      },
      interactive: false,
      mapStyle: isMobile ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/satellite-streets-v12"
    },
    2: { // Kuta and Surroundings
      center: adjustCenter(115.173691, -8.704711),
      zoom: isMobile ? 13.5 : 16.5,
      pitch: isMobile ? 0 : 40,
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
        floodPoints: { color: '#f59e0b', size: 7, opacity: 0.8 },
        floodImpact: { color: '#fbbf24', opacity: 0.6 },
        rivers: { color: '#2563eb', width: 10, opacity: 0.8 },
        buildings: { color: '#d1d5db', opacity: 0.8, outlineColor: '#9ca3af' },
        buildings3D: { color: '#e5e7eb', opacity: 0.9 }
      },
      marker: {
        coordinates: [115.173691, -8.704711],
        title: "Kuta",
        description: "Thigh-deep flooding along roads"
      },
      interactive: false,
      mapStyle: "mapbox://styles/mapbox/satellite-streets-v12"
    }
  };

  const { currentStep } = useScrollama({
    onStepEnter: (response) => {
      const { index } = response;
      console.log(`Badung section - Entered step ${index}`);
      
      // Map step indices to map states (accounting for previous sections)
      // CollageSection: indices 0-4 (5 steps)
      // DenpasarSection: indices 5-17 (13 steps)
      // BadungSection starts at index 18
      let mapStateIndex;
      if (index === 18) {
        mapStateIndex = 0; // Blank step - start with Shortcut Canggu
      } else if (index === 19) {
        mapStateIndex = 0; // Shortcut Canggu Video
      } else if (index === 20) {
        mapStateIndex = 0; // Blank step - stay on Shortcut Canggu
      } else if (index === 21) {
        mapStateIndex = 1; // Underpass Dewa Ruci Video
      } else if (index === 22) {
        mapStateIndex = 1; // Blank step - stay on Underpass Dewa Ruci
      } else if (index === 23) {
        mapStateIndex = 2; // Kuta Video
      } else if (index === 24) {
        mapStateIndex = 2; // Blank step - stay on Kuta
      }
      
      if (badungMapStates[mapStateIndex]) {
        const newMapState = badungMapStates[mapStateIndex];
        
        // Use flyTo for smooth transitions
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
    setMapState(badungMapStates[0]);
  }, []);

  return (
    <section className="relative min-h-screen">
      {/* Sticky Map Background */}
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

        {/* Step 1: Shortcut Canggu */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[600px] border border-gray-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t('badung.shortcutCangguTitle')}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t('badung.shortcutCangguDesc')}
              </p>
              
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <iframe 
                    className="w-64 h-96 rounded-lg shadow-md"
                    src="https://www.youtube.com/embed/SZZesoNgeeg" 
                    title="Shortcut Canggu Flooding" 
                    frameBorder="0" 
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  ></iframe>
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent pointer-events-none rounded-t-lg"></div>
                </div>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-900 mb-2 text-sm">{t('badung.impactTitle')}</h4>
                <ul className="text-orange-800 space-y-1 text-xs">
                  {t('badung.shortcutCangguImpact', { returnObjects: true }).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollStep>

        {/* Blank Step 2: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 2: Underpass Dewa Ruci */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[600px] border border-gray-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t('badung.underpassTitle')}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t('badung.underpassDesc')}
              </p>
              
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <iframe 
                    className="w-64 h-96 rounded-lg shadow-md"
                    src="https://www.youtube.com/embed/_-OOIe6FpwI" 
                    title="Underpass Dewa Ruci Flooding" 
                    frameBorder="0" 
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  ></iframe>
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent pointer-events-none rounded-t-lg"></div>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
                <h4 className="font-semibold text-red-900 mb-2 text-sm">{t('badung.impactTitle')}</h4>
                <ul className="text-red-800 space-y-1 text-xs">
                  {t('badung.underpassImpact', { returnObjects: true }).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollStep>

        {/* Blank Step 3: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 3: Kuta and Surroundings */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[600px] border border-gray-200">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {t('badung.kutaTitle')}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {t('badung.kutaDesc')}
              </p>
              
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <iframe 
                    className="w-64 h-96 rounded-lg shadow-md"
                    src="https://www.youtube.com/embed/oHpbf8SjfEY" 
                    title="Kuta Flooding" 
                    frameBorder="0" 
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  ></iframe>
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent pointer-events-none rounded-t-lg"></div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-900 mb-2 text-sm">{t('badung.impactTitle')}</h4>
                <ul className="text-yellow-800 space-y-1 text-xs">
                  {t('badung.kutaImpact', { returnObjects: true }).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollStep>

        {/* Blank Step 4: Spacing */}
        <ScrollStep>
        </ScrollStep>
      </div>
    </section>
  );
};

export default BadungSection;
