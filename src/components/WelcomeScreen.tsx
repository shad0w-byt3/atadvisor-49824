
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
    <div className="min-h-screen bg-gradient-elegant overflow-hidden relative">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "30px 30px"
        }}></div>
      </div>

      {/* Status Bar */}
      <div className="relative z-10 p-4 animate-slide-down">
        <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <Badge 
              variant="default"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success border-success/30 backdrop-blur-sm hover:bg-success/20 transition-colors"
            >
              <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-glow"></div>
              <span className="text-xs sm:text-sm font-medium">Online</span>
            </Badge>
            <Badge 
              variant="outline"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent border-accent/30 backdrop-blur-sm hover:bg-accent/20 transition-colors"
            >
              <span className="text-xs sm:text-sm font-medium">AI Ready</span>
            </Badge>
          </div>
          <Badge 
            variant="outline"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary border-primary/30 backdrop-blur-sm hover:bg-primary/20 transition-colors"
          >
            <span className="text-xs sm:text-sm font-medium">🛡️ Secure</span>
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-subtle backdrop-blur-md rounded-full border border-primary/20 mb-4 animate-fade-in hover-scale shadow-elegant">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow"></div>
            <span className="text-sm text-primary font-semibold">Welcome to the Future of Farming</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 animate-slide-up leading-tight">
            AgriTech Advisor
          </h1>
          
          <p className="text-xl sm:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed animate-slide-up font-medium" style={{ animationDelay: '100ms' }}>
            Your AI-powered companion for <span className="text-accent font-bold">smarter farming decisions</span>, <span className="text-secondary font-bold">better yields</span>, and <span className="text-primary font-bold">sustainable agriculture</span>
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <Badge variant="secondary" className="px-4 py-2.5 text-sm hover-scale shadow-sm bg-gradient-subtle backdrop-blur-sm border-primary/20">
              <span className="mr-2">⭐</span>
              <span className="font-semibold">4.9/5 Rating</span>
            </Badge>
            <Badge variant="secondary" className="px-4 py-2.5 text-sm hover-scale shadow-sm bg-gradient-subtle backdrop-blur-sm border-primary/20">
              <Users className="w-4 h-4 mr-2" />
              <span className="font-semibold">50k+ Farmers</span>
            </Badge>
            <Badge variant="secondary" className="px-4 py-2.5 text-sm hover-scale shadow-sm bg-gradient-subtle backdrop-blur-sm border-primary/20">
              <span className="mr-2">🛡️</span>
              <span className="font-semibold">Enterprise Secure</span>
            </Badge>
          </div>
        </div>

        {/* Features Grid - Responsive layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-sm sm:max-w-md lg:max-w-4xl w-full animate-fade-in" style={{ animationDelay: '300ms' }}>
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-4 sm:p-5 text-center bg-card/50 backdrop-blur-lg border-border/50 hover:border-primary/50 hover:shadow-elegant transition-all duration-300 touch-manipulation overflow-hidden relative"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                  <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-foreground mb-1.5 leading-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Buttons - Mobile optimized */}
        <div className="space-y-3 w-full max-w-sm sm:max-w-md lg:max-w-lg px-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <Button 
            onClick={handleGetStarted}
            className="w-full bg-gradient-primary hover:shadow-glow text-primary-foreground py-4 sm:py-5 text-base sm:text-lg font-bold shadow-elegant hover:scale-105 active:scale-95 min-h-[52px] touch-manipulation transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              🚀 Get Started Free
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          </Button>
          <Button 
            onClick={handleLogin}
            variant="outline" 
            className="w-full border-border/50 bg-card/30 backdrop-blur-lg text-foreground hover:bg-card/50 hover:border-primary/50 hover:text-primary py-4 sm:py-5 text-base sm:text-lg font-semibold transition-all duration-300 min-h-[52px] touch-manipulation active:scale-95 hover:shadow-sm"
          >
            Already have an account? <span className="font-bold ml-1">Sign In</span>
          </Button>
        </div>
      </div>

      {/* Enhanced Footer - Responsive */}
      <div className="relative z-10 p-4 sm:p-6 text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center touch-manipulation hover-scale shadow-sm">
            <span className="text-lg">🤖</span>
          </div>
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center touch-manipulation hover-scale shadow-sm">
            <span className="text-lg">🌾</span>
          </div>
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center touch-manipulation hover-scale shadow-sm">
            <span className="text-lg">📱</span>
          </div>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground font-medium">
          Empowering <span className="text-primary font-bold">50,000+</span> farmers with AI technology
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          © 2024 AgriTech Advisor. All rights reserved.
        </p>
      </div>
    </div>
  );
};
