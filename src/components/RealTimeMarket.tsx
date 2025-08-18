
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, RefreshCw, DollarSign } from 'lucide-react';

interface MarketData {
  crop: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

export const RealTimeMarket = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const generateMarketData = (): MarketData[] => {
    const crops = [
      { name: 'Wheat', basePrice: 850, unit: 'RWF/kg' }, // Converted from USD to RWF
      { name: 'Corn', basePrice: 600, unit: 'RWF/kg' },
      { name: 'Soybeans', basePrice: 1750, unit: 'RWF/kg' },
      { name: 'Rice', basePrice: 1400, unit: 'RWF/kg' },
      { name: 'Cotton', basePrice: 6200, unit: 'RWF/kg' },
      { name: 'Barley', basePrice: 680, unit: 'RWF/kg' }
    ];

    return crops.map(crop => {
      const changePercent = (Math.random() - 0.5) * 10; // -5% to +5%
      const change = (crop.basePrice * changePercent) / 100;
      const currentPrice = crop.basePrice + change;
      
      return {
        crop: crop.name,
        price: Math.round(currentPrice),
        change: Math.round(change),
        changePercent: Math.round(changePercent * 100) / 100,
        unit: crop.unit,
        lastUpdated: new Date().toLocaleTimeString(),
        trend: changePercent > 1 ? 'up' : changePercent < -1 ? 'down' : 'stable'
      };
    });
  };

  const fetchMarketData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMarketData(generateMarketData());
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchMarketData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50';
      case 'down':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="agriculture-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-agriculture-green">Live Market Prices</h3>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchMarketData}
          disabled={isLoading}
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="space-y-3">
        {marketData.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                {getTrendIcon(item.trend)}
              </div>
              <div>
                <h4 className="font-medium text-agriculture-green">{item.crop}</h4>
                <p className="text-sm text-muted-foreground">{item.unit}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-agriculture-green">{item.price.toLocaleString()} RWF</div>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className={getTrendColor(item.trend)}>
                  {item.changePercent > 0 ? '+' : ''}{item.changePercent}%
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h5 className="font-medium text-agriculture-green mb-1">Market Insights</h5>
        <p className="text-sm text-muted-foreground">
          Wheat and corn prices are showing stability this week. Consider selling soybeans if prices continue upward trend.
        </p>
      </div>
    </Card>
  );
};
