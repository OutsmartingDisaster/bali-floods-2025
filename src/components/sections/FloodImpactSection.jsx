import { useState, useEffect, useRef } from 'react';
import { useScrollama } from '../../hooks/useScrollama';
import InteractiveMap from '../scrollytelling/InteractiveMap';
import ScrollStep from '../scrollytelling/ScrollStep';
import { useTranslation } from 'react-i18next';

/**
 * FloodImpactSection - Flood Impact Analysis with InaRISK Layer
 * 
 * This section visualizes:
 * - Flood points overlay with InaRISK flood risk index
 * - 3D population data correlation
 * - Comprehensive layer analysis
 */

const FloodImpactSection = () => {
  const { t } = useTranslation();
  const [activeEvent, setActiveEvent] = useState(null);
  const [mapState, setMapState] = useState(null);
  const mapRef = useRef();

  // FloodImpact-specific map states
  const floodImpactMapStates = {
    0: { // Overview - Flood Points + InaRISK
      center: [115.2167, -8.6500],
      zoom: 11,
      pitch: 0,
      bearing: 0,
      layers: {
        floodPoints: true,
        floodImpact: true,
        rivers: true,
        adminBoundaries: true,
        buildings: false,
        inariskLayer: true // InaRISK flood risk layer
      },
      layerStyles: {
        floodPoints: { color: '#dc2626', size: 8, opacity: 0.9 },
        floodImpact: { color: '#ef4444', opacity: 0.5 },
        rivers: { color: '#2563eb', width: 4, opacity: 0.7 },
        adminBoundaries: { color: '#374151', width: 2, opacity: 0.6 }
      },
      interactive: false,
      mapStyle: "mapbox://styles/mapbox/light-v11"
    },
    1: { // Layer Analysis - Flood Radius
      center: [115.2167, -8.6500],
      zoom: 12,
      pitch: 0,
      bearing: 0,
      layers: {
        floodPoints: true,
        floodRadius: true,
        rivers: true,
        adminBoundaries: true,
        buildings: true
      },
      layerStyles: {
        floodPoints: { color: '#dc2626', size: 6, opacity: 0.8 },
        floodRadius: { color: '#f59e0b', opacity: 0.3 },
        rivers: { color: '#2563eb', width: 5, opacity: 0.8 },
        adminBoundaries: { color: '#374151', width: 1, opacity: 0.5 },
        buildings: { color: '#9ca3af', opacity: 0.6 }
      },
      interactive: true,
      mapStyle: "mapbox://styles/mapbox/light-v11"
    },
    2: { // Flood Depth Categories
      center: [115.2167, -8.6500],
      zoom: 12,
      pitch: 0,
      bearing: 0,
      layers: {
        floodPoints: false,
        floodImpact: true,
        rivers: true,
        buildings: true
      },
      layerStyles: {
        floodImpact: { 
          colorByDepth: true,
          colors: {
            high: '#dc2626',    // >2 meter - red
            medium: '#f97316',  // 1-2 meter - orange  
            low: '#eab308'      // <1 meter - yellow
          },
          opacity: 0.7
        },
        rivers: { color: '#2563eb', width: 4, opacity: 0.3 },
        buildings: { color: '#d1d5db', opacity: 0.7 }
      },
      interactive: false,
      mapStyle: "mapbox://styles/mapbox/light-v11"
    },
    3: { // River Buffer Analysis
      center: [115.2167, -8.6500],
      zoom: 12,
      pitch: 0,
      bearing: 0,
      layers: {
        floodPoints: true,
        rivers: true,
        riverBuffers: true,
        buildings: true
      },
      layerStyles: {
        floodPoints: { color: '#dc2626', size: 7, opacity: 0.85 },
        rivers: { color: '#1e40af', width: 6, opacity: 0.9 },
        riverBuffers: { 
          colors: {
            '10m': '#ef4444',
            '50m': '#ef4444',
            '100m': '#ef4444'
          },
          opacity: 0.5
        },
        buildings: { color: '#9ca3af', opacity: 0.6 }
      },
      interactive: false,
      mapStyle: "mapbox://styles/mapbox/light-v11"
    },
    4: { // Comprehensive Spatial Analysis - All Layers Combined
      center: [115.2167, -8.6500],
      zoom: 12,
      pitch: 0,
      bearing: 0,
      layers: {
        inariskLayer: true,
        populationChoropleth: true,
        floodImpact: true,
        rivers: true,
        floodPoints: true,
        buildings: false
      },
      layerStyles: {
        floodPoints: { color: '#dc2626', size: 8, opacity: 1 },
        populationChoropleth: {
          opacity: 0.7
        },
        floodImpact: {
          colorByDepth: true,
          colors: {
            high: '#dc2626',
            medium: '#f97316',
            low: '#eab308'
          },
          opacity: 0.4
        },
        rivers: { color: '#2563eb', width: 3, opacity: 0.6 },
        inariskLayer: { opacity: 0.35 }
      },
      interactive: false,
      mapStyle: "mapbox://styles/mapbox/light-v11"
    }
  };

  const { currentStep } = useScrollama({
    onStepEnter: (response) => {
      const { index } = response;
      console.log(`FloodImpact section - Entered step ${index}`);
      
      // Map step indices to map states (accounting for previous sections)
      // CollageSection: indices 0-4 (5 steps)
      // DenpasarSection: indices 5-17 (13 steps)
      // BadungSection: indices 18-24 (7 steps)
      // FloodImpactSection starts at index 25
      let mapStateIndex;
      if (index === 25) {
        mapStateIndex = 0; // Blank step - Overview
      } else if (index === 26) {
        mapStateIndex = 0; // Overview - Flood Points + InaRISK
      } else if (index === 27) {
        mapStateIndex = 0; // Blank step
      } else if (index === 28) {
        mapStateIndex = 1; // Layer Analysis - Flood Radius
      } else if (index === 29) {
        mapStateIndex = 1; // Blank step
      } else if (index === 30) {
        mapStateIndex = 2; // Flood Depth Categories
      } else if (index === 31) {
        mapStateIndex = 2; // Blank step
      } else if (index === 32) {
        mapStateIndex = 3; // River Buffer Analysis
      } else if (index === 33) {
        mapStateIndex = 3; // Blank step
      } else if (index === 34) {
        mapStateIndex = 4; // Comprehensive Spatial Analysis - All Layers
      } else if (index === 35) {
        mapStateIndex = 4; // Blank step
      }
      
      if (floodImpactMapStates[mapStateIndex]) {
        const newMapState = floodImpactMapStates[mapStateIndex];
        
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
    setMapState(floodImpactMapStates[0]);
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-50">
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

        {/* Step 1: Overview - Layer Introduction */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[650px] border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('floodImpact.overview.title')}
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {t('floodImpact.overview.description')}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm">{t('floodImpact.overview.layer')}</h4>
              <p className="text-blue-800 text-xs leading-relaxed">
                {t('floodImpact.overview.layerDesc')}
              </p>
            </div>
          </div>
        </ScrollStep>

        {/* Blank Step 2: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 2: Flood Radius Analysis */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[650px] border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('floodImpact.radius.title')}
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {t('floodImpact.radius.description')}
            </p>
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-900 mb-2 text-sm">{t('floodImpact.radius.impact')}</h4>
              <ul className="text-orange-800 space-y-1 text-xs">
                <li>• {t('floodImpact.radius.coverage')}</li>
                <li>• Memperkirakan wilayah terdampak lebih luas</li>
                <li>• Termasuk infrastruktur tidak tercatat</li>
              </ul>
            </div>
          </div>
        </ScrollStep>

        {/* Blank Step 3: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 3: Flood Depth Categories */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[650px] border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('floodImpact.depth.title')}
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {t('floodImpact.depth.description')}
            </p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-red-100 p-2 rounded border-l-4 border-red-600">
                <div className="text-xs font-semibold text-red-900">&gt;2 meter</div>
                <div className="text-xs text-red-700">{t('floodImpact.depth.high')}</div>
              </div>
              <div className="bg-orange-100 p-2 rounded border-l-4 border-orange-500">
                <div className="text-xs font-semibold text-orange-900">1-2 meter</div>
                <div className="text-xs text-orange-700">{t('floodImpact.depth.medium')}</div>
              </div>
              <div className="bg-yellow-100 p-2 rounded border-l-4 border-yellow-500">
                <div className="text-xs font-semibold text-yellow-900">&lt;1 meter</div>
                <div className="text-xs text-yellow-700">{t('floodImpact.depth.low')}</div>
              </div>
            </div>
            <p className="text-xs text-gray-600 italic">
              {t('floodImpact.depth.note')}
            </p>
          </div>
        </ScrollStep>

        {/* Blank Step 4: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 4: River Buffer Analysis */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[650px] border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('floodImpact.river.title')}
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {t('floodImpact.river.description')}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm">{t('floodImpact.river.findings')}</h4>
              <ul className="text-blue-800 space-y-1 text-xs">
                <li>• {t('floodImpact.river.finding1')}</li>
                <li>• Banjir sangat dipengaruhi kedekatan dengan alur air</li>
                <li>• Evaluasi kepatuhan sempadan sungai</li>
                <li>• {t('floodImpact.river.finding3')}</li>
              </ul>
            </div>
          </div>
        </ScrollStep>

        {/* Blank Step 5: Spacing */}
        <ScrollStep>
        </ScrollStep>

        {/* Step 5: Comprehensive Spatial Analysis */}
        <ScrollStep className="!justify-end md:pr-16 !items-end md:!items-center">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-4 md:p-6 w-full max-w-[95%] md:max-w-[700px] border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {t('floodImpact.conclusion.title')}
            </h3>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              {t('floodImpact.conclusion.description')}
            </p>
            
            <div className="space-y-3 mb-4">
              <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-600">
                <h4 className="font-semibold text-red-900 mb-1 text-sm">{t('floodImpact.conclusion.trigger')}</h4>
                <ul className="text-red-800 space-y-1 text-xs">
                  <li>• {t('floodImpact.conclusion.trigger1')}</li>
                  <li>• {t('floodImpact.conclusion.trigger2')}</li>
                  <li>• {t('floodImpact.conclusion.trigger3')}</li>
                  <li>• {t('floodImpact.conclusion.trigger4')}</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-600">
                <h4 className="font-semibold text-orange-900 mb-1 text-sm">{t('floodImpact.conclusion.consequence')}</h4>
                <ul className="text-orange-800 space-y-1 text-xs">
                  <li>• {t('floodImpact.conclusion.consequence1')}</li>
                  <li>• {t('floodImpact.conclusion.consequence2')}</li>
                  <li>• {t('floodImpact.conclusion.consequence3')}</li>
                  <li>• {t('floodImpact.conclusion.consequence4')}</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-600">
                <h4 className="font-semibold text-purple-900 mb-1 text-sm">{t('floodImpact.conclusion.priority')}</h4>
                <p className="text-purple-800 text-xs">
                  {t('floodImpact.conclusion.priorityList')}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 italic">
              {t('floodImpact.conclusion.note')}
            </p>
          </div>
        </ScrollStep>

        {/* Blank Step 6: Spacing */}
        <ScrollStep>
        </ScrollStep>
      </div>
    </section>
  );
};

export default FloodImpactSection;
