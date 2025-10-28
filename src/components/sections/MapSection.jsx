import React, { useState } from 'react';
import InteractiveMap from '../scrollytelling/InteractiveMap';
import StickyContainer from '../scrollytelling/StickyContainer';
import ScrollStep from '../scrollytelling/ScrollStep';

const MapSection = () => {
  const [activeEvent, setActiveEvent] = useState(null);
  const [mapState, setMapState] = useState({
    center: [115.2126, -8.6705],
    zoom: 12,
    layers: {
      floodPoints: true,
      floodImpact: true,
      rivers: true,
      adminBoundaries: true
    }
  });

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Sticky Map */}
        <StickyContainer className="bg-gray-100">
          <InteractiveMap 
            activeEvent={activeEvent}
            onEventClick={setActiveEvent}
            mapState={mapState}
            currentStep={5}
          />
        </StickyContainer>

        {/* Scrolling Content */}
        <div className="space-y-0">
          <ScrollStep>
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Understanding the Flood
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                The flood was caused by extreme rainfall of 385mm in 24 hours, driven by a Rossby Wave phenomenon. 
                The Tukad Badung river overflowed at 06:35 WITA, triggering widespread flooding across the city.
              </p>
            </div>
          </ScrollStep>

          <ScrollStep>
            <div className="max-w-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Critical Moment: Tukad Badung Overflow
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                The critical moment occurred at 06:35 WITA when the Tukad Badung river overflowed, 
                causing buildings along Jalan Hasanuddin to suffer structural failures.
              </p>
            </div>
          </ScrollStep>
          
          <ScrollStep>
            <div className="max-w-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Flood Impact Distribution
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A total of 57 flood points were documented across Denpasar and Badung. 
                The map shows the severity distribution, with extreme impacts concentrated in central Denpasar.
              </p>
            </div>
          </ScrollStep>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
