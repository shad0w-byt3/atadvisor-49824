import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, TrendingUp, Calendar, Map, Leaf, 
  MessageSquare, BookOpen, Users, Briefcase,
  Calculator, Trophy, Gamepad2, Radio, Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OrganizedToolsGrid = () => {
  const navigate = useNavigate();

  const toolCategories = [
    {
      category: 'AI & Analysis',
      badge: '🤖 AI Powered',
      tools: [
        {
          icon: Camera,
          name: 'Crop Analysis',
          description: 'AI-powered crop health assessment',
          path: '/camera-analysis',
          color: 'text-accent',
          new: true
        },
        {
          icon: Brain,
          name: 'AI Chat Assistant',
          description: 'Ask farming questions in your language',
          path: '/',
          color: 'text-accent',
          popular: true
        },
        {
          icon: Calculator,
          name: 'Smart Input Planner',
          description: 'Optimize fertilizer and input costs',
          path: '/smart-input-planner',
          color: 'text-secondary'
        }
      ]
    },
    {
      category: 'Market & Planning',
      badge: '📈 Business Tools',
      tools: [
        {
          icon: TrendingUp,
          name: 'Market Prices',
          description: 'Real-time crop prices and trends',
          path: '/market',
          color: 'text-primary',
          popular: true
        },
        {
          icon: Calendar,
          name: 'Farming Calendar',
          description: 'Plan planting and harvesting',
          path: '/calendar',
          color: 'text-success'
        },
        {
          icon: Briefcase,
          name: 'Micro Investment',
          description: 'Small-scale investment opportunities',
          path: '/micro-investment',
          color: 'text-secondary'
        }
      ]
    },
    {
      category: 'Farm Management',
      badge: '🌾 Operations',
      tools: [
        {
          icon: Map,
          name: 'Plot Mapping',
          description: 'Map and track your farm plots',
          path: '/plot-mapping',
          color: 'text-accent'
        },
        {
          icon: Leaf,
          name: 'Crop Tracker',
          description: 'Monitor crop growth and health',
          path: '/crop-tracker',
          color: 'text-success'
        },
        {
          icon: Trophy,
          name: 'Risk Dashboard',
          description: 'Assess and manage farm risks',
          path: '/risk-dashboard',
          color: 'text-primary'
        }
      ]
    },
    {
      category: 'Learning & Community',
      badge: '📚 Education',
      tools: [
        {
          icon: BookOpen,
          name: 'Learning Paths',
          description: 'Structured farming courses',
          path: '/learning-paths',
          color: 'text-accent'
        },
        {
          icon: Users,
          name: 'Expert Finder',
          description: 'Connect with agricultural experts',
          path: '/expert-finder',
          color: 'text-secondary'
        },
        {
          icon: MessageSquare,
          name: 'Mentorship',
          description: 'Get guidance from experienced farmers',
          path: '/mentorship',
          color: 'text-primary'
        }
      ]
    },
    {
      category: 'Entertainment & Extras',
      badge: '🎮 Fun & More',
      tools: [
        {
          icon: Gamepad2,
          name: 'Farming Game',
          description: 'Learn through interactive gameplay',
          path: '/farming-game',
          color: 'text-accent'
        },
        {
          icon: Radio,
          name: 'Farm Podcast',
          description: 'Listen to farming tips and stories',
          path: '/farm-podcast',
          color: 'text-secondary'
        },
        {
          icon: Trophy,
          name: 'Farm Challenges',
          description: 'Complete challenges, earn rewards',
          path: '/farm-challenges',
          color: 'text-success'
        }
      ]
    }
  ];

  const handleToolClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">
      {toolCategories.map((category, catIndex) => (
        <div 
          key={category.category}
          className="animate-fade-in"
          style={{ animationDelay: `${catIndex * 100}ms` }}
        >
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">{category.category}</h3>
            <Badge variant="secondary" className="bg-gradient-subtle border-primary/20">
              {category.badge}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.tools.map((tool, toolIndex) => (
              <Card
                key={tool.name}
                onClick={() => handleToolClick(tool.path)}
                className="group p-5 cursor-pointer hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm animate-scale-in"
                style={{ animationDelay: `${catIndex * 100 + toolIndex * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm shrink-0`}>
                    <tool.icon className={`w-6 h-6 text-primary-foreground`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                        {tool.name}
                      </h4>
                      {tool.new && (
                        <Badge className="text-xs px-1.5 py-0 bg-accent/20 text-accent border-accent/30">
                          New
                        </Badge>
                      )}
                      {tool.popular && (
                        <Badge className="text-xs px-1.5 py-0 bg-primary/20 text-primary border-primary/30">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
