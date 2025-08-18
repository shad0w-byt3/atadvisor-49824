
import { Camera, TrendingUp, Calendar, Bug, Leaf, MapPin, Package, Gamepad2, BookOpen, Users, Trophy, Shield, DollarSign, Navigation, Lightbulb, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const EnhancedFeatureCards = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Package,
      title: "Smart Input Planner",
      description: "Calculate exact inputs needed for your farm",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      path: "/smart-input-planner",
      badge: "AI Calculated",
      bgImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Gamepad2,
      title: "Farming Game",
      description: "Learn through interactive farming simulation",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      path: "/farming-game",
      badge: "Educational",
      bgImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Camera,
      title: "Crop Growth Tracker",
      description: "AI-powered photo diary for crop monitoring",
      color: "text-green-600",
      bgColor: "bg-green-50",
      path: "/crop-tracker",
      badge: "AI Powered",
      bgImage: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Users,
      title: "Farm Podcast",
      description: "Listen to expert tips and success stories",
      color: "text-red-600",
      bgColor: "bg-red-50",
      path: "/farm-podcast",
      badge: "Live Radio",
      bgImage: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: TrendingUp,
      title: "Smart Marketplace",
      description: "Buy and sell crops locally",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      path: "/smart-marketplace",
      badge: "Local Trade",
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Trophy,
      title: "Farm Challenges",
      description: "Compete and win amazing prizes",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      path: "/farm-challenges",
      badge: "Rewards",
      bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: BookOpen,
      title: "Learning Paths",
      description: "Interactive courses with certificates",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      path: "/learning-paths",
      badge: "Certified",
      bgImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: UserCheck,
      title: "Mentorship",
      description: "Connect with experienced farmers",
      color: "text-green-600",
      bgColor: "bg-green-50",
      path: "/mentorship",
      badge: "Expert Network",
      bgImage: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Shield,
      title: "Risk Dashboard",
      description: "Monitor climate and financial risks",
      color: "text-red-600",
      bgColor: "bg-red-50",
      path: "/risk-dashboard",
      badge: "Early Warning",
      bgImage: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Leaf,
      title: "Crop Diversification",
      description: "Smart intercropping recommendations",
      color: "text-green-600",
      bgColor: "bg-green-50",
      path: "/crop-diversification",
      badge: "Climate Smart",
      bgImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: DollarSign,
      title: "Micro-Investment",
      description: "Access credit and investment opportunities",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      path: "/micro-investment",
      badge: "Financial Aid",
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Navigation,
      title: "Plot Mapping",
      description: "AI-powered field mapping with satellite",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      path: "/plot-mapping",
      badge: "Satellite",
      bgImage: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Bug,
      title: "Mythbuster",
      description: "Debunk common farming myths",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      path: "/mythbuster",
      badge: "Fact Check",
      bgImage: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: Lightbulb,
      title: "Custom Tips",
      description: "Personalized AI farming recommendations",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      path: "/custom-tips",
      badge: "Personalized",
      bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
    },
    {
      icon: MapPin,
      title: "Expert Finder",
      description: "Find nearby agricultural experts",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      path: "/expert-finder",
      badge: "Local Experts",
      bgImage: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <Button
          key={index}
          variant="ghost"
          className="relative h-auto flex-col gap-3 p-4 animate-fade-in hover:scale-105 transition-all duration-300 group feature-card overflow-hidden"
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={() => navigate(feature.path)}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity"
            style={{ backgroundImage: `url(${feature.bgImage})` }}
          />
          
          {/* Badge */}
          <div className="absolute -top-1 -right-1 bg-agriculture-green text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
            {feature.badge}
          </div>
          
          {/* Icon Container with enhanced styling */}
          <div className={`relative z-10 w-12 h-12 ${feature.bgColor} dark:bg-opacity-20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
            <feature.icon className={`h-6 w-6 ${feature.color} dark:opacity-80`} />
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <h4 className="font-semibold text-sm text-agriculture-green dark:text-green-400 mb-1">{feature.title}</h4>
            <p className="text-xs text-muted-foreground dark:text-gray-400 leading-relaxed">{feature.description}</p>
          </div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Button>
      ))}
    </div>
  );
};
