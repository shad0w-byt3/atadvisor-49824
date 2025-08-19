import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface MarketPrice {
  id: string;
  crop_name: string;
  location: string;
  price_per_kg: number;
  currency: string;
  market_date: string;
  created_at: string;
}

export const RealTimeMarket = () => {
  const { t } = useLanguage();
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketPrices();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('market-prices-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'market_prices'
      }, (payload) => {
        console.log('Market price updated:', payload);
        fetchMarketPrices(); // Refresh data when changes occur
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMarketPrices = async () => {
    try {
      const { data, error } = await supabase
        .from('market_prices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      
      setPrices(data || []);
    } catch (error) {
      console.error('Error fetching market prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (crop: string) => {
    // Simulate trend based on crop name hash for demo
    const hash = crop.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const trend = hash % 3;
    
    if (trend === 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 1) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
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
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="agriculture-card">
      <CardHeader>
        <CardTitle className="text-agriculture-green flex items-center gap-2">
          📊 {t('market.title')}
          <Badge variant="secondary" className="text-xs">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prices.map((price) => (
            <div key={price.id} className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <div className="flex items-center gap-2">
                <span className="font-medium">{price.crop_name}</span>
                {getTrendIcon(price.crop_name)}
              </div>
              <div className="text-right">
                <span className="font-bold text-agriculture-green">
                  {price.price_per_kg} {price.currency}{t('market.perKg')}
                </span>
                <div className="text-xs text-muted-foreground">{price.location}</div>
              </div>
            </div>
          ))}
          {prices.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              No market data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};