
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Leaf, Users, Camera, TrendingUp } from 'lucide-react';
import { Loading3D } from '@/components/Loading3D';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const WelcomeScreen = ({ onGetStarted, onLogin }: WelcomeScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const features = [
    {
      icon: Camera,
      title: "AI Crop Analysis",
      description: "Instant crop health assessment using advanced AI"
    },
    {
      icon: TrendingUp,
      title: "Market Insights", 
      description: "Real-time crop prices and market trends"
    },
    {
      icon: Leaf,
      title: "Smart Farming",
      description: "Personalized farming recommendations"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Connect with agricultural experts"
    }
  ];

  const handleGetStarted = () => {
    setLoadingMessage('Setting up your account...');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onGetStarted();
    }, 1500);
  };

  const handleLogin = () => {
    setLoadingMessage('Preparing sign in...');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  if (isLoading) {
    return <Loading3D message={loadingMessage} />;
  }

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Background with Technology Integration - Optimized for mobile */}
      <div className="absolute inset-0">
        {/* Primary background with farming technology */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        
        {/* Secondary overlay with woman using laptop for tech integration */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        
        {/* Gradient overlay for readability - Enhanced for mobile */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-blue-900/75 to-green-800/85"></div>
        
        {/* Subtle pattern overlay - Responsive */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Content - Optimized for all screen sizes */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center py-8">
        {/* Logo and Title with enhanced responsive styling */}
        <div className="mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 agriculture-gradient rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl border-4 border-white/20 backdrop-blur-sm">
            <span className="text-white text-3xl sm:text-4xl lg:text-5xl">🌱</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg leading-tight">
            AgriTech Advisor
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-sm sm:max-w-md lg:max-w-lg drop-shadow-md px-2">
            Your intelligent farming companion powered by AI
          </p>
          <div className="mt-2 sm:mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm text-white/80">Advanced Agricultural Technology</span>
          </div>
        </div>

        {/* Features Grid - Responsive layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-sm sm:max-w-md lg:max-w-4xl w-full">
          {features.map((feature, index) => (
            <Card key={index} className="p-3 sm:p-4 text-center bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 group touch-manipulation">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="font-semibold text-xs sm:text-sm text-white mb-1 leading-tight">
                {feature.title}
              </h3>
              <p className="text-xs text-white/80 leading-tight">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA Buttons - Mobile optimized */}
        <div className="space-y-3 w-full max-w-sm sm:max-w-md lg:max-w-lg px-2">
          <Button 
            onClick={handleGetStarted}
            className="w-full bg-agriculture-green hover:bg-agriculture-green/90 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 min-h-[48px] touch-manipulation"
          >
            Get Started
          </Button>
          <Button 
            onClick={handleLogin}
            variant="outline" 
            className="w-full border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/50 py-3 sm:py-4 text-base sm:text-lg transition-all duration-300 min-h-[48px] touch-manipulation active:scale-95"
          >
            Already have an account? Sign In
          </Button>
        </div>
      </div>

      {/* Enhanced Footer - Responsive */}
      <div className="relative z-10 p-4 sm:p-6 text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center touch-manipulation">
            <span className="text-white text-sm">🤖</span>
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center touch-manipulation">
            <span className="text-white text-sm">🌾</span>
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center touch-manipulation">
            <span className="text-white text-sm">📱</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-white/70">
          Empowering farmers with technology since 2024
        </p>
      </div>
    </div>
  );
};
