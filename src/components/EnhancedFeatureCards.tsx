
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageTransition } from '@/hooks/usePageTransition';
import { 
  Camera, 
  TrendingUp, 
  Calendar, 
  Settings, 
  Gamepad2, 
  Mic, 
  Store, 
  Trophy, 
  BookOpen, 
  Users, 
  Shield, 
  Layers, 
  DollarSign, 
  Map, 
  HelpCircle, 
  Lightbulb,
  UserCheck 
} from 'lucide-react';

export const EnhancedFeatureCards = () => {
  const { t } = useLanguage();
  const { navigateWithLoading } = usePageTransition();

  const tools = [
    {
      id: 'camera',
      title: t('tools.cameraAnalysis'),
      description: 'AI-powered crop health analysis',
      icon: Camera,
      path: '/camera',
      category: 'AI Tools',
      status: 'new',
      gradient: 'from-primary to-accent',
      delay: 0
    },
    {
      id: 'market',
      title: t('tools.marketPrices'),
      description: 'Real-time market insights',
      icon: TrendingUp,
      path: '/market',
      category: 'Market',
      status: 'trending',
      gradient: 'from-accent to-secondary',
      delay: 100
    },
    {
      id: 'planner',
      title: t('tools.smartPlanner'),
      description: 'Optimize your input usage',
      icon: Calendar,
      path: '/smart-input-planner',
      category: 'Planning',
      status: 'popular',
      gradient: 'from-secondary to-primary',
      delay: 200
    },
    {
      id: 'game',
      title: t('tools.farmingGame'),
      description: 'Learn through interactive gameplay',
      icon: Gamepad2,
      path: '/farming-game',
      category: 'Learning',
      status: 'fun',
      gradient: 'from-purple-500 to-pink-500',
      delay: 300
    },
    {
      id: 'tracker',
      title: t('tools.cropTracker'),
      description: 'Monitor your crop progress',
      icon: Layers,
      path: '/crop-tracker',
      category: 'Monitoring',
      status: null,
      gradient: 'from-primary to-secondary',
      delay: 400
    },
    {
      id: 'podcast',
      title: t('tools.farmPodcast'),
      description: 'Agricultural insights on-the-go',
      icon: Mic,
      path: '/farm-podcast',
      category: 'Learning',
      status: null,
      gradient: 'from-accent to-primary',
      delay: 500
    }
  ];

  const getStatusBadge = (status: string | null) => {
    if (!status) return null;
    
    const statusConfig = {
      new: { text: 'New', className: 'bg-accent/20 text-accent border-accent/30' },
      trending: { text: 'Trending', className: 'bg-secondary/20 text-secondary border-secondary/30' },
      popular: { text: 'Popular', className: 'bg-primary/20 text-primary border-primary/30' },
      fun: { text: 'Fun', className: 'bg-accent/20 text-accent border-accent/30' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    return (
      <Badge variant="outline" className={`text-xs ${config.className}`}>
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {tools.map((tool) => {
        const IconComponent = tool.icon;
        
        return (
          <Card
            key={tool.id}
            className={`group cursor-pointer transition-all duration-500 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${tool.gradient} p-0.5 rounded-xl animate-slide-up border-0`}
            style={{ animationDelay: `${tool.delay}ms` }}
            onClick={() => navigateWithLoading(tool.path)}
          >
            <div className="bg-background/95 backdrop-blur-sm rounded-lg p-4 sm:p-6 h-full">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.gradient} shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  {getStatusBadge(tool.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary" className="text-xs">
                    {tool.category}
                  </Badge>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
