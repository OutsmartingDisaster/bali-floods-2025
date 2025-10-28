import { useState, useEffect } from 'react';
import { useScrollama } from '../../hooks/useScrollama';
import RevealingCollage from '../scrollytelling/RevealingCollage';
import ScrollStep from '../scrollytelling/ScrollStep';

/**
 * CollageSection - 5-Step Introduction with Collage
 * 
 * This section manages:
 * - 5-step narrative introduction
 * - Revealing collage background
 * - Scroll-triggered story progression
 * - Independent styling and content
 */

const CollageSection = () => {
  const [currentCollageStep, setCurrentCollageStep] = useState(0);

  // ImageKit configuration
  const IMAGEKIT_URL_ENDPOINT = 'https://ik.imagekit.io/8qi5mzhkq';
  
  const collageImagePaths = [
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20115735.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20120125.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20120150.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20121600.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20121635.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20121746.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20121944.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20122053.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20122227.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20122352.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20124457.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20124601.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20124726.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20124830.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20125957.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20130127.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20130208.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20130312.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20130358.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20130456.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20130602.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20130637.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20130728.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20130816.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20130937.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131015.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131149.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131210.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131239.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131521.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131535.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131637.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131734.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131815.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131855.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20131931.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20132015.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20132258.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20132730.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20132805.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20133132.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20133232.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20133323.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20135812.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20135920.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20140142.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20140233.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20140326.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20140407.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20140455.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20140545.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20140624.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20140758.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20142655.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20143104.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20143445.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20150302.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20150650.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20150936.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20151430.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20155602.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20155934.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20160504.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20160637.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20161347.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20161524.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20161823.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20162213.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20163422.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20163636.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20163823.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20163903.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20164220.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20164824.png`,
    `${IMAGEKIT_URL_ENDPOINT}/Screenshot%202025-09-12%20164959.png`,
  ];

  const { currentStep } = useScrollama({
    onStepEnter: (response) => {
      const { index } = response;
      const progress = (index + 1) / 5; // Start from step 0, range 0.2-1.0
      console.log(`Collage section - Step ${index}, progress: ${progress}, revealing ${(progress * collageImagePaths.length).toFixed(0)} of ${collageImagePaths.length} collage images randomly`);
      setCurrentCollageStep(index);
    },
    offset: 0.5,
    debug: false
  });

  return (
    <div className="relative">
      {/* Sticky Collage Background */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-visible">
        <RevealingCollage 
          scrollProgress={(currentCollageStep + 1) / 5} // Start revealing from step 0, complete at step 5
          imagePaths={collageImagePaths} // Use all 71 images
        />
      </div>
      
      {/* Scrolling Story Steps */}
      <div className="relative z-10">
        {/* Step 1: The First Alerts */}
        <ScrollStep className="relative min-h-screen flex items-center justify-center">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="prose-wapo bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold">"Betare Wisnu memargi je becik-becik ampunan yeh ne menek, ling tuni ampun mem meman, gae liu mangde bise merainan."</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
              God Vishnu, please walk well with this water, don't let it get too high, it's been flooding for a while, there's still a lot of work to do to prepare for the traditional ceremony.
              </p>
            </div>
          </div>
        </ScrollStep>

        {/* Step 2: The Scramble */}
        <ScrollStep className="relative min-h-screen flex items-center justify-center">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="prose-wapo bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold">“Seumur-umur rage hidup mare jani blabar ne Bali care kene”</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
              In my entire life, this is the first time Bali has flooded like this.
              </p>
            </div>
          </div>
        </ScrollStep>

        {/* Step 3: Trapped */}
        <ScrollStep className="relative min-h-screen flex items-center justify-center">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="prose-wapo bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold">“Jembatane be sing ngenah ilite aja yeh, jalanane masih patuh”</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
              The bridge is no longer visible, covered by flood, the road is also invisible.
              </p>
            </div>
          </div>
        </ScrollStep>

        {/* Step 4: Cries for Help */}
        <ScrollStep className="relative min-h-screen flex items-center justify-center">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="prose-wapo bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold">“Hujane ngae irage megadang, jejeh bane ulian banjir dibi”</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
              The rain kept us awake all night, we were afraid of the flood happening again.
              </p>
            </div>
          </div>
        </ScrollStep>

        {/* Step 5: The Long Wait */}
        <ScrollStep className="relative min-h-screen flex items-center justify-center">
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="prose-wapo bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold">That is the voice of the people in social media between 10-11 September 2025</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Many residents are panics, the full scale of the disaster was becoming clear: this was the worst flood in Denpasar's recent history.
              </p>
            </div>
          </div>
        </ScrollStep>
      </div>
    </div>
  );
};

export default CollageSection;
