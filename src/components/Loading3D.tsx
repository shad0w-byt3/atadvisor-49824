import { useState, useEffect, useMemo } from 'react';
import { Leaf, Sprout, Sun, Droplets } from 'lucide-react';

interface Loading3DProps {
  message?: string;
}

export const Loading3D = ({ message = "Loading..." }: Loading3DProps) => {
  const [stage, setStage] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStage(prev => (prev + 1) % 4);
    }, 250); // Faster stage transitions

    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 6) % 360); // Faster rotation
    }, 30);

    return () => {
      clearInterval(stageInterval);
      clearInterval(rotationInterval);
    };
  }, []);

  // Memoize floating particles
  const particles = useMemo(() => 
    [...Array(12)].map((_, i) => ({
      left: `${(i * 8.5) + 2}%`,
      top: `${15 + (i % 4) * 20}%`,
      delay: `${i * 0.1}s`,
      size: i % 3 === 0 ? 'w-3 h-3' : 'w-2 h-2'
    })), []
  );

  const icons = [Leaf, Sprout, Sun, Droplets];
  const CurrentIcon = icons[stage];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent z-50 flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`absolute ${p.size} bg-white/25 rounded-full`}
            style={{ 
              left: p.left, 
              top: p.top,
              animation: `float ${1.5 + (i % 3) * 0.3}s ease-in-out infinite`,
              animationDelay: p.delay
            }}
          />
        ))}
      </div>

      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border-2 border-white/10 animate-ping" style={{ animationDuration: '1.5s' }} />
        <div className="absolute w-36 h-36 rounded-full border-2 border-white/15 animate-ping" style={{ animationDuration: '1.2s', animationDelay: '0.3s' }} />
        <div className="absolute w-24 h-24 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: '0.9s', animationDelay: '0.6s' }} />
      </div>

      <div className="relative z-10 text-center">
        {/* 3D rotating icon container */}
        <div 
          className="w-28 h-28 mx-auto mb-6 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          <div 
            className="w-full h-full bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 flex items-center justify-center shadow-2xl transform-style-preserve-3d transition-transform duration-100"
            style={{ 
              transform: `rotateY(${rotation}deg) rotateX(${Math.sin(rotation * 0.02) * 10}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <CurrentIcon className="w-14 h-14 text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Logo with glow */}
        <div className="mb-5">
          <div className="w-16 h-16 bg-white/25 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg backdrop-blur-sm border border-white/30">
            <span className="text-3xl">🌱</span>
          </div>
          <h1 className="text-2xl font-bold text-white drop-shadow-md tracking-wide">AgriTech Advisor</h1>
          <p className="text-white/70 text-xs mt-1">Smart Farming Solutions</p>
        </div>

        {/* Loading message */}
        <p className="text-white/90 text-sm mb-4 font-medium">{message}</p>
        
        {/* Animated progress bar */}
        <div className="w-56 h-2 bg-white/20 rounded-full mx-auto overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-white/60 via-white to-white/60 rounded-full"
            style={{
              animation: 'loading-bar 1.2s ease-in-out infinite'
            }}
          />
        </div>

        {/* Animated dots indicator */}
        <div className="flex justify-center gap-3 mt-5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                stage === i 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/40 scale-100'
              }`}
            />
          ))}
        </div>

        {/* Feature hints */}
        <div className="mt-6 flex justify-center gap-4 text-white/60 text-xs">
          <span className="flex items-center gap-1"><Leaf className="w-3 h-3" /> Crops</span>
          <span className="flex items-center gap-1"><Sun className="w-3 h-3" /> Weather</span>
          <span className="flex items-center gap-1"><Droplets className="w-3 h-3" /> Market</span>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-15px) scale(1.1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
