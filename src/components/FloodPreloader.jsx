import React, { useEffect, useRef } from 'react';

const FloodPreloader = ({ onLoaded }) => {
  const doneRef = useRef(false);

  const handleDone = () => {
    if (!doneRef.current) {
      doneRef.current = true;
      onLoaded();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => handleDone(), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50">
      <style>{`
        @keyframes flood-rush {
          0% { transform: translateX(-100%) scaleY(0.4); opacity: 0; }
          15% { transform: translateX(-50%) scaleY(0.5); opacity: 1; }
          30% { transform: translateX(0%) scaleY(0.6); opacity: 1; }
          100% { transform: translateX(0%) scaleY(1); opacity: 1; }
        }
        @keyframes flood-rise {
          0% { height: 25%; }
          50% { height: 30%; }
          100% { height: 100%; }
        }
        @keyframes wave-turbulence {
          0%, 100% { transform: translateY(0px) scaleX(1); }
          25% { transform: translateY(-8px) scaleX(1.02); }
          50% { transform: translateY(-12px) scaleX(0.98); }
          75% { transform: translateY(-6px) scaleX(1.01); }
        }
        @keyframes water-shimmer {
          0%, 100% { opacity: 0.3; transform: translateX(0); }
          50% { opacity: 0.6; transform: translateX(20px); }
        }
        .flood {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 25%;
          background: linear-gradient(0deg, #0c4a6e 0%, #0369a1 30%, #0ea5e9 60%, #38bdf8 80%, #7dd3fc 100%);
          animation: 
            flood-rush 1.2s cubic-bezier(0.6, 0.04, 0.98, 0.335) forwards,
            flood-rise 2.8s 1.2s ease-out forwards;
          overflow: hidden;
        }
        .flood::before {
          content: '';
          position: absolute;
          left: -50%; right: -50%; top: -30px; height: 60px;
          background:
            radial-gradient(ellipse at 10% 50%, rgba(255,255,255,0.7) 0%, transparent 40%),
            radial-gradient(ellipse at 30% 45%, rgba(255,255,255,0.5) 0%, transparent 35%),
            radial-gradient(ellipse at 50% 55%, rgba(255,255,255,0.6) 0%, transparent 38%),
            radial-gradient(ellipse at 70% 48%, rgba(255,255,255,0.45) 0%, transparent 35%),
            radial-gradient(ellipse at 90% 52%, rgba(255,255,255,0.55) 0%, transparent 40%);
          background-size: 200px 60px;
          background-repeat: repeat-x;
          animation: wave-turbulence 0.8s ease-in-out infinite;
        }
        .flood::after {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.1) 30%, transparent 60%),
            linear-gradient(240deg, transparent 0%, rgba(255,255,255,0.08) 40%, transparent 70%);
          background-size: 300% 100%;
          animation: water-shimmer 2s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900" />

      <div className="absolute inset-x-0 top-[22%] text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Banjir Bali 2025</h1>
        <p className="text-blue-200 text-base md:text-lg max-w-2xl mx-auto">
          Data storytelling yang disusun berdasarkan jeritan warga dan laporan formalitas aparat di sosial media.
        </p>
      </div>

      <div className="flood" onAnimationEnd={handleDone}>
        <div className="flow" />
      </div>

      <div className="absolute inset-x-0 bottom-6 text-center text-blue-200/80 text-xs animate-pulse">
        Air datang...
      </div>
    </div>
  );
};

export default FloodPreloader;
