
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const QuickStats = () => {
  const stats = [
    {
      label: "Crop Health",
      value: "94%",
      trend: "up",
      change: "+2.1%",
      status: "excellent",
      bgImage: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=400&q=80"
    },
    {
      label: "Soil Moisture",
      value: "72%",
      trend: "down",
      change: "-5.2%",
      status: "warning",
      bgImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&q=80"
    },
    {
      label: "Temperature",
      value: "24°C",
      trend: "stable",
      change: "0%",
      status: "normal",
      bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'excellent':
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>;
      case 'warning':
        return <AlertTriangle className="h-3 w-3 text-orange-500" />;
      default:
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Grid with enhanced backgrounds */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, index) => (
          <Card key={index} className="agriculture-card p-3 text-center hover:shadow-md transition-shadow group relative overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity"
              style={{ backgroundImage: `url(${stat.bgImage})` }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-1 mb-1">
                {getStatusIndicator(stat.status)}
                <div className="text-lg font-bold text-agriculture-green group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
              <div className={`flex items-center justify-center gap-1 text-xs ${getTrendColor(stat.trend)}`}>
                {getTrendIcon(stat.trend)}
                <span>{stat.change}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs hover:bg-green-50">
          View Details
        </Button>
        <Button variant="outline" size="sm" className="flex-1 text-xs hover:bg-green-50">
          Set Alerts
        </Button>
      </div>
    </div>
  );
};
