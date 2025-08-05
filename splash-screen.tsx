// @/components/splash-screen.tsx
'use client';

import { useEffect, useState } from "react";

export function SplashScreen() {
  const [fadeout, setFadeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeout(true);
    }, 6500); // Start fade out 500ms before disappearing

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-500 ${fadeout ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 overflow-hidden bg-grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-c from-black via-transparent to-black"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <div className="mb-8">
          <h1 className="text-7xl md:text-9xl font-black font-headline uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 animate-fire-text">
            RAGHAD
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-4 animate-fade-in-up tracking-wider" style={{ animationDelay: '1s' }}>
          موقع الدكتورة رغد الصميدعي
        </h2>
        
        <p className="text-lg md:text-xl font-bold text-orange-400 animate-fade-in-up" style={{ animationDelay: '2s' }}>
          تم صنعه بفضل المسوول محمد مال الله الصميدعي
        </p>

        <div className="absolute bottom-[-10rem] w-full flex justify-center items-center">
            <div className="w-1/2 h-1 bg-cyan-400/50 animate-scan-line"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fire-text {
          0% { text-shadow: 0 0 20px #fef08a, 0 0 30px #f59e0b, 0 0 40px #ef4444, 0 0 50px #dc2626; opacity: 0.8; }
          50% { text-shadow: 0 0 30px #fef9c3, 0 0 40px #fbbf24, 0 0 50px #f87171, 0 0 60px #ef4444; opacity: 1; transform: scale(1.05); }
          100% { text-shadow: 0 0 20px #fef08a, 0 0 30px #f59e0b, 0 0 40px #ef4444, 0 0 50px #dc2626; opacity: 0.8; }
        }
        .animate-fire-text {
          animation: fire-text 3s ease-in-out infinite;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards;
        }

        .bg-grid-pattern {
            background-image: linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
            background-size: 30px 30px;
            animation: move-grid 20s linear infinite;
        }
        
        @keyframes move-grid {
            from { background-position: 0 0; }
            to { background-position: 30px 30px; }
        }

        @keyframes scan-line {
            0% { transform: translateY(-50px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(50px); opacity: 0; }
        }
        .animate-scan-line{
            animation: scan-line 4s ease-in-out infinite;
            animation-delay: 2.5s;
        }
      `}</style>
    </div>
  );
}
