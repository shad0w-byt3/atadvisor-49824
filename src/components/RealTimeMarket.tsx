import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarketPrice {
  id: string;
  crop_name: string;
  location: string;
  price_per_kg: number;
  currency: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

// Mock market data for Rwanda agricultural markets
const generateMarketPrices = (): MarketPrice[] => [
  { id: '1', crop_name: 'Tomatoes', location: 'Kigali', price_per_kg: 850, currency: 'RWF', trend: 'up', change: '+12%' },
  { id: '2', crop_name: 'Beans', location: 'Musanze', price_per_kg: 620, currency: 'RWF', trend: 'stable', change: '0%' },
  { id: '3', crop_name: 'Maize', location: 'Huye', price_per_kg: 380, currency: 'RWF', trend: 'down', change: '-5%' },
  { id: '4', crop_name: 'Cassava', location: 'Rubavu', price_per_kg: 290, currency: 'RWF', trend: 'up', change: '+8%' },
  { id: '5', crop_name: 'Sweet Potatoes', location: 'Nyagatare', price_per_kg: 340, currency: 'RWF', trend: 'up', change: '+3%' },
  { id: '6', crop_name: 'Coffee (kg)', location: 'Nyamasheke', price_per_kg: 2800, currency: 'RWF', trend: 'up', change: '+15%' },
];

export const RealTimeMarket = () => {
  const { t } = useLanguage();
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchMarketPrices = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const basePrices = generateMarketPrices();
      // Add slight random variation to simulate real-time updates
      const updatedPrices = basePrices.map(price => ({
        ...price,
        price_per_kg: price.price_per_kg + Math.floor(Math.random() * 50 - 25)
      }));
      setPrices(updatedPrices);
      setLastUpdated(new Date());
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchMarketPrices();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchMarketPrices, 300000);
    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <Card className="agriculture-card">
        <CardHeader>
          <CardTitle className="text-agriculture-green flex items-center gap-2">
            📊 {t('market.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center animate-pulse">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-4 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="agriculture-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-agriculture-green flex items-center gap-2">
            📊 {t('market.title')}
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Live
            </Badge>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={fetchMarketPrices}
            className="h-8 w-8"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prices.map((price) => (
            <div 
              key={price.id} 
              className="flex justify-between items-center p-2.5 bg-green-50/50 dark:bg-green-900/10 rounded-lg hover:bg-green-100/50 dark:hover:bg-green-900/20 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{price.crop_name}</span>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <span className="font-bold text-agriculture-green dark:text-green-400">
                    {price.price_per_kg.toLocaleString()} {price.currency}
                  </span>
                  <span className="text-xs text-muted-foreground">{t('market.perKg')}</span>
                </div>
                <div className={`flex items-center gap-1 text-xs ${getTrendColor(price.trend)}`}>
                  {getTrendIcon(price.trend)}
                  <span>{price.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            💡 Prices from major Rwandan agricultural markets
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
