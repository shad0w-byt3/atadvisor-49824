
import { useState, useEffect } from 'react';
import { Leaf, Sprout, TreePine } from 'lucide-react';

interface Loading3DProps {
  message?: string;
  duration?: number;
}

export const Loading3D = ({ message = "Loading...", duration = 2000 }: Loading3DProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage(prev => (prev + 1) % 3);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const icons = [Sprout, Leaf, TreePine];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900/95 via-emerald-800/95 to-green-700/95 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* 3D rotating container */}
        <div className="relative w-32 h-32 mx-auto mb-8 perspective-1000">
          <div className="absolute inset-0 transform-style-preserve-3d animate-spin-slow">
            {icons.map((Icon, index) => {
              const isActive = stage === index;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${
                    isActive ? 'scale-110 opacity-100' : 'scale-90 opacity-40'
                  }`}
                  style={{
                    transform: `rotateY(${index * 120}deg) translateZ(60px)`
                  }}
                >
                  <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl">
                    <Icon 
                      className={`w-12 h-12 text-white transition-all duration-300 ${
                        isActive ? 'animate-pulse' : ''
                      }`} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AgriTech Logo */}
        <div className="mb-6">
          <div className="w-16 h-16 agriculture-gradient rounded-full flex items-center justify-center mx-auto mb-3 shadow-2xl border-4 border-white/20 backdrop-blur-sm animate-pulse-green">
            <span className="text-white text-2xl">🌱</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            AgriTech Advisor
          </h1>
        </div>

        {/* Loading message */}
        <div className="mb-8">
          <p className="text-white/90 text-lg mb-4 drop-shadow-md">
            {message}
          </p>
          
          {/* Progress bar */}
          <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-300 rounded-full animate-loading-bar"></div>
          </div>
        </div>

        {/* Floating growth indicators */}
        <div className="flex justify-center gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                stage >= i ? 'bg-green-400 scale-110' : 'bg-white/30 scale-100'
              }`}
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
