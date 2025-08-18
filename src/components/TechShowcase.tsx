
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, Smartphone, Cloud, Zap } from 'lucide-react';

export const TechShowcase = () => {
  const techFeatures = [
    {
      icon: Cpu,
      title: "AI Processing",
      description: "Advanced machine learning algorithms",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
      badge: "Neural Networks"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Optimized for smartphone usage",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
      badge: "Cross Platform"
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Real-time data synchronization",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=400&q=80",
      badge: "Always Online"
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get results in seconds",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
      badge: "Lightning Fast"
    }
  ];

  return (
    <section className="py-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-agriculture-green mb-2">
          🚀 Powered by Advanced Technology
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Experience the future of agriculture with our cutting-edge AI technology
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {techFeatures.map((feature, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundImage: `url(${feature.image})` }}
            />
            
            {/* Content */}
            <div className="relative p-4 text-center">
              <div className="flex justify-between items-start mb-2">
                <feature.icon className="h-6 w-6 text-agriculture-green" />
                <Badge className="text-xs bg-agriculture-green/10 text-agriculture-green">
                  {feature.badge}
                </Badge>
              </div>
              
              <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
              
              {/* Subtle tech pattern overlay */}
              <div className="absolute bottom-0 right-0 w-8 h-8 opacity-5">
                <div className="w-full h-full bg-gradient-to-tl from-agriculture-green to-transparent rounded-tl-full"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
