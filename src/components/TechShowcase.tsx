import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Zap, Shield, Globe, Sparkles, TrendingUp } from 'lucide-react';

export const TechShowcase = () => {
  const technologies = [
    {
      icon: Cpu,
      name: 'AI/ML',
      description: 'Advanced machine learning for crop analysis',
      color: 'text-accent',
      gradient: 'from-accent/20 to-accent/5'
    },
    {
      icon: Zap,
      name: 'Real-time',
      description: 'Instant market updates and alerts',
      color: 'text-secondary',
      gradient: 'from-secondary/20 to-secondary/5'
    },
    {
      icon: Shield,
      name: 'Secure',
      description: 'Enterprise-grade data protection',
      color: 'text-primary',
      gradient: 'from-primary/20 to-primary/5'
    },
    {
      icon: Globe,
      name: 'Offline First',
      description: 'Works without internet via SMS',
      color: 'text-success',
      gradient: 'from-success/20 to-success/5'
    },
    {
      icon: Sparkles,
      name: 'Smart AI',
      description: 'Gemini AI multilingual assistant',
      color: 'text-accent',
      gradient: 'from-accent/20 to-accent/5'
    },
    {
      icon: TrendingUp,
      name: 'Analytics',
      description: 'Predictive farming insights',
      color: 'text-secondary',
      gradient: 'from-secondary/20 to-secondary/5'
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <Badge className="mb-4 px-4 py-2 bg-gradient-primary text-primary-foreground">
          Powered by Cutting-Edge Technology
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
          Built for Modern Farming
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Leveraging the latest in AI, cloud computing, and mobile technology to bring you the best farming experience
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {technologies.map((tech, index) => (
          <Card 
            key={tech.name}
            className={`group p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 bg-gradient-to-br ${tech.gradient} backdrop-blur-sm animate-scale-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm`}>
                <tech.icon className={`w-7 h-7 text-primary-foreground`} />
              </div>
              <div>
                <h3 className={`font-bold text-lg mb-1 ${tech.color}`}>
                  {tech.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-snug">
                  {tech.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-subtle rounded-2xl border border-border/50 backdrop-blur-sm text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          <h3 className="text-xl font-bold text-foreground">Always Improving</h3>
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We continuously update our platform with the latest AI models, features, and improvements based on farmer feedback
        </p>
      </div>
    </div>
  );
};
