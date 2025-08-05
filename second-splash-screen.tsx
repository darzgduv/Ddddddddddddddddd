'use client';

import { useEffect, useState } from 'react';

export function SecondSplashScreen() {
  const [fadeout, setFadeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeout(true);
    }, 4500); // Start fade out 500ms before disappearing

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-500 ${
        fadeout ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/20 to-black"></div>
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <p
          className="text-2xl md:text-4xl font-bold text-primary animate-pulse-glow"
          style={{ animationDelay: '1s' }}
        >
          تم الصنع بواسطه المسوول
        </p>
        <h1
          className="text-4xl md:text-6xl font-black font-headline uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent animate-text-shine"
          style={{ animationDelay: '2s' }}
        >
          محمد مال الله الصميدعي
        </h1>
        <p className="mt-8 text-xl md:text-2xl font-semibold text-cyan-200 water-text animate-fade-in-up" style={{ animationDelay: '3s' }}>
          صنعته لمساعدة جميع طلاب العراق . نحن فخورين بكم
        </p>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.8;
            text-shadow: 0 0 10px hsl(var(--primary) / 0.5),
              0 0 20px hsl(var(--primary) / 0.3);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 20px hsl(var(--primary) / 0.8),
              0 0 30px hsl(var(--primary) / 0.5),
              0 0 40px hsl(var(--primary) / 0.2);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes text-shine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        .animate-text-shine {
          background-size: 200% auto;
          animation: text-shine 4s linear infinite;
        }

        @keyframes move-twink-back {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -10000px 5000px;
          }
        }

        .stars,
        .twinkling,
        .clouds {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .stars {
          background: #000
            url(https://www.script-tutorials.com/demos/360/images/stars.png)
            repeat top center;
          z-index: 0;
        }

        .twinkling {
          background: transparent
            url(https://www.script-tutorials.com/demos/360/images/twinkling.png)
            repeat top center;
          z-index: 1;
          animation: move-twink-back 200s linear infinite;
        }

        .water-text {
          text-shadow: 0 1px 1px rgba(0,0,0,0.5), 0 0 5px rgba(0,255,255,0.5), 0 0 10px rgba(0,255,255,0.5);
          position: relative;
        }

        .water-text::after {
          content: 'صنعته لمساعدة جميع طلاب العراق . نحن فخورين بكم';
          position: absolute;
          left: 0;
          top: 0;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-image: linear-gradient(0deg, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 75%);
          background-size: 100% 200%;
          animation: water-flow 5s linear infinite;
        }
        
        @keyframes water-flow {
          from { background-position: 0% 100%; }
          to { background-position: 0% -100%; }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards;
        }
      `}</style>
    </div>
  );
}
