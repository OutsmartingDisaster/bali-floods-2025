import React, { useState, useEffect, useMemo } from 'react';

// Helper function to shuffle an array
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const CollageBackground = ({ scrollProgress, imagePaths = [] }) => {
  const imageDetails = useMemo(() => {
    const details = imagePaths.map((path, index) => ({
      id: index,
      src: path,
      // Random positions and rotations for a scattered look
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      rotate: `${Math.random() * 40 - 20}deg`,
      scale: Math.random() * 0.4 + 0.8, // Random scale between 0.8 and 1.2
    }));
    return shuffleArray(details); // Shuffle for random appearance
  }, [imagePaths]);

  // Determine how many images should be visible based on scroll progress
  const visibleImages = Math.floor(scrollProgress * imageDetails.length);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {imageDetails.map((img, index) => (
        <div
          key={img.id}
          className="absolute transition-opacity duration-1000 ease-in-out"
          style={{
            top: img.top,
            left: img.left,
            transform: `rotate(${img.rotate}) scale(${img.scale})`,
            opacity: index < visibleImages ? 1 : 0,
          }}
        >
          <img
            src={img.src}
            alt={`Collage image ${img.id + 1}`}
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-lg shadow-2xl border-2 border-white"
          />
        </div>
      ))}
    </div>
  );
};

export default CollageBackground;
