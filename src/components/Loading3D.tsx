import { useState, useEffect, useMemo } from 'react';
import { Leaf } from 'lucide-react';

interface Loading3DProps {
  message?: string;
}

export const Loading3D = ({ message = "Loading..." }: Loading3DProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage(prev => (prev + 1) % 3);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Memoize particles to prevent re-renders
  const particles = useMemo(() => 
    [...Array(8)].map((_, i) => ({
      left: `${12.5 * i + 6}%`,
      top: `${20 + (i % 3) * 30}%`,
      delay: `${i * 0.2}s`
    })), []
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85 z-50 flex items-center justify-center">
      {/* Simplified particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Simplified icon animation */}
        <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center">
          <Leaf className="w-12 h-12 text-white animate-pulse" />
        </div>

        {/* Logo */}
        <div className="mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🌱</span>
          </div>
          <h1 className="text-xl font-bold text-white">AgriTech Advisor</h1>
        </div>

        {/* Loading message */}
        <p className="text-white/90 text-sm mb-4">{message}</p>
        
        {/* Progress bar */}
        <div className="w-48 h-1.5 bg-white/20 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-white/80 rounded-full animate-loading-bar" />
        </div>

        {/* Simple dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                stage >= i ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
