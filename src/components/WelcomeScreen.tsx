
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    <div className="min-h-screen bg-gradient-to-br from-agriculture-green/5 via-white to-agriculture-light-green/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "20px 20px",
          backgroundRepeat: "repeat"
        }}></div>
      </div>

      {/* Status Bar */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Badge 
              variant="default"
              className="flex items-center gap-1.5 px-3 py-1 bg-agriculture-success/10 text-agriculture-success border-agriculture-success/30"
            >
              <div className="w-2 h-2 bg-agriculture-success rounded-full animate-pulse"></div>
              Online
            </Badge>
            <Badge 
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-1 bg-agriculture-info/10 text-agriculture-info border-agriculture-info/30"
            >
              AI Ready
            </Badge>
          </div>
          <Badge 
            variant="outline"
            className="flex items-center gap-1.5 px-3 py-1 bg-agriculture-warning/10 text-agriculture-warning border-agriculture-warning/30"
          >
            Secure
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-agriculture-green/10 backdrop-blur-md rounded-full border border-agriculture-green/20 mb-4">
            <div className="w-2 h-2 bg-agriculture-green rounded-full animate-pulse"></div>
            <span className="text-sm text-agriculture-green font-medium">Welcome to the Future of Farming</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-agriculture-green mb-6 animate-slide-up">
            AgriTech Advisor
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
            Your AI-powered companion for smarter farming decisions, better yields, and sustainable agriculture
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <div className="w-4 h-4 mr-1 text-yellow-500">⭐</div>
              4.9/5 Rating
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-1" />
              50k+ Farmers
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <div className="w-4 h-4 mr-1 text-green-500">🛡️</div>
              Enterprise Security
            </Badge>
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
