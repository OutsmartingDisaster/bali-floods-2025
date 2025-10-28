import React, { useMemo, useState, useEffect } from 'react';

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

const RevealingCollage = ({ scrollProgress, imagePaths }) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  
  // Detect mobile for aggressive optimization
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  
  // Drastically reduce image count on mobile to prevent crash
  const optimizedImagePaths = useMemo(() => {
    if (!isMobile) return imagePaths;
    // On mobile: only show every 4th image (77 -> ~19 images)
    return imagePaths.filter((_, index) => index % 4 === 0);
  }, [imagePaths, isMobile]);

  // Preload images and track which ones load successfully
  useEffect(() => {
    const preloadImages = async () => {
      // On mobile: lazy load images as they're revealed, not all at once
      if (isMobile) {
        // Don't preload on mobile - load on demand
        return;
      }
      
      const loadPromises = optimizedImagePaths.map((src, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]));
            resolve(index);
          };
          img.onerror = () => {
            // Don't add to loadedImages if it fails
            resolve(null);
          };
          img.src = src;
        });
      });

      await Promise.all(loadPromises);
    };

    preloadImages();
  }, [optimizedImagePaths, isMobile]);

  // Create shuffled reveal order and random positions with poker card throw animation
  const { shuffledImages, shuffledOrder, randomPositions } = useMemo(() => {
    // Shuffle images and create reveal order
    const shuffledImageArray = shuffleArray([...optimizedImagePaths]);
    const orderIndices = Array.from({ length: optimizedImagePaths.length }, (_, i) => i);
    const shuffledOrderArray = shuffleArray(orderIndices);

    // Generate random positions for each image (punk zine style) with throw animation
    const positions = shuffledImageArray.map(() => {
      // Random starting position (off-screen, simulating throw from hand)
      const throwFromSide = Math.random() > 0.5 ? 'left' : 'right';
      const startX = throwFromSide === 'left' ? -30 : 130; // Start from left or right edge
      const startY = 80 + Math.random() * 20; // Start from bottom (hand position)
      
      return {
        // Final resting position
        left: Math.random() * 120 - 10, // -10% to 110% (extends beyond viewport)
        top: Math.random() * 120 - 10,  // -10% to 110% (extends beyond viewport)
        rotation: Math.random() * 45 - 22.5, // -22.5° to +22.5° (more dramatic rotation)
        zIndex: Math.floor(Math.random() * 30) + 1, // Random z-index for heavy layering
        
        // Throw animation properties
        startX, // Starting X position (off-screen)
        startY, // Starting Y position (bottom)
        startRotation: (Math.random() * 720 - 360) + (throwFromSide === 'left' ? 45 : -45), // Multiple spins during throw
        throwDuration: 0.6 + Math.random() * 0.4, // 0.6-1.0s throw duration
        throwDelay: Math.random() * 0.3, // 0-0.3s staggered delay
        arcHeight: 20 + Math.random() * 40, // Arc trajectory height (20-60%)
      };
    });

    return {
      shuffledImages: shuffledImageArray,
      shuffledOrder: shuffledOrderArray,
      randomPositions: positions,
    };
  }, [optimizedImagePaths]);

  // Determine how many images should be revealed based on scroll progress
  const revealedCount = Math.floor(scrollProgress * shuffledImages.length);

  const collageImages = useMemo(() => {
    return shuffledImages.map((imageUrl, index) => {
      // On mobile: skip preload check, load on demand
      if (!isMobile && !loadedImages.has(index)) {
        return null; // Don't render broken images
      }

      // Check if this image should be revealed
      const isRevealed = revealedCount > shuffledOrder.indexOf(index);
      const position = randomPositions[index];

      // Generate unique animation name for this card
      const animationName = `cardThrow-${index}`;
      const keyframes = `
        @keyframes ${animationName} {
          0% {
            left: ${position.startX}%;
            top: ${position.startY}%;
            transform: translate(-50%, -50%) rotate(${position.startRotation}deg) scale(0.8);
            opacity: 0;
          }
          30% {
            opacity: 1;
            top: ${position.startY - position.arcHeight}%;
          }
          100% {
            left: ${position.left}%;
            top: ${position.top}%;
            transform: translate(-50%, -50%) rotate(${position.rotation}deg) scale(1);
            opacity: 1;
          }
        }
      `;

      return (
        <React.Fragment key={index}>
          {isRevealed && <style>{keyframes}</style>}
          <div
            className="absolute"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
              transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
              zIndex: position.zIndex,
              width: 'auto',
              height: '350px',
              display: isRevealed ? 'block' : 'none',
              animation: isRevealed ? `${animationName} ${position.throwDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${position.throwDelay}s both` : 'none',
            }}
          >
            <img
              src={isMobile ? `${imageUrl}?tr=w-400,q-60` : imageUrl}
              alt={`Collage piece ${index}`}
              className="h-full w-auto object-cover rounded-none shadow-2xl border-4 border-white"
              loading="lazy"
              style={{
                maxWidth: isMobile ? '300px' : '1000px',
                filter: 'contrast(1.1) brightness(1.05) saturate(1.2)',
              }}
            />
          </div>
        </React.Fragment>
      );
    }).filter(Boolean); // Remove null elements (broken images)
  }, [revealedCount, shuffledImages, shuffledOrder, randomPositions, loadedImages, isMobile]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-visible z-0 bg-gradient-to-br from-gray-900/30 via-red-900/10 to-black/50">
      {/* Punk zine style texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-red-500/5 to-transparent"></div>
      </div>
      
      {/* Random overlapping collage images */}
      {collageImages}
    </div>
  );
};

export default RevealingCollage;
