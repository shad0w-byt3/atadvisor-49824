import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, Bell, RefreshCw, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const Market = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { toast } = useToast();
  const { t } = useLanguage();

  // Ensure page starts at top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const marketData = [
    {
      crop: 'Tomatoes',
      currentPrice: '1,500 RWF/kg',
      change: '+12%',
      trend: 'up',
      description: 'High demand in local markets',
      volume: '2.3k tons',
      lastUpdated: '5 min ago'
    },
    {
      crop: 'Corn',
      currentPrice: '950 RWF/kg',
      change: '-3%',
      trend: 'down',
      description: 'Seasonal price adjustment',
      volume: '5.1k tons',
      lastUpdated: '10 min ago'
    },
    {
      crop: 'Lettuce',
      currentPrice: '1,080 RWF/kg',
      change: '0%',
      trend: 'stable',
      description: 'Stable market conditions',
      volume: '1.8k tons',
      lastUpdated: '2 min ago'
    },
    {
      crop: 'Apples',
      currentPrice: '1,720 RWF/kg',
      change: '+8%',
      trend: 'up',
      description: 'Export demand increasing',
      volume: '3.7k tons',
      lastUpdated: '15 min ago'
    },
    {
      crop: 'Carrots',
      currentPrice: '710 RWF/kg',
      change: '-5%',
      trend: 'down',
      description: 'Supply surplus in region',
      volume: '2.9k tons',
      lastUpdated: '8 min ago'
    },
    {
      crop: 'Potatoes',
      currentPrice: '610 RWF/kg',
      change: '+2%',
      trend: 'up',
      description: 'Steady local demand',
      volume: '4.2k tons',
      lastUpdated: '12 min ago'
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

  const handleRefresh = () => {
    toast({
      title: "Refreshing Prices",
      description: "Getting latest market data...",
    });
  };

  const handleSetAlert = (crop: string) => {
    toast({
      title: "Price Alert Set",
      description: `You'll be notified of significant ${crop} price changes.`,
    });
  };

  const filteredData = selectedFilter === 'all' 
    ? marketData 
    : marketData.filter(item => item.trend === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-agriculture-green mb-2">{t('market.title')}</h2>
            <p className="text-muted-foreground">{t('market.subtitle')}</p>
          </div>
          <Button variant="outline" onClick={handleRefresh} className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('market.refresh')}
          </Button>
        </div>

        {/* Market Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: 'all', label: t('market.all') },
            { key: 'up', label: t('market.rising') },
            { key: 'down', label: t('market.falling') },
            { key: 'stable', label: t('market.stable') }
          ].map((filter) => (
            <Button
              key={filter.key}
              variant={selectedFilter === filter.key ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${selectedFilter === filter.key ? 'agriculture-gradient' : 'hover:bg-green-50'}`}
              onClick={() => setSelectedFilter(filter.key)}
            >
              <Filter className="h-3 w-3 mr-1" />
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Market Summary */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="agriculture-card p-3 text-center hover:shadow-md transition-shadow">
            <div className="text-lg font-bold text-green-500">↗ 50%</div>
            <div className="text-xs text-muted-foreground">{t('market.rising')}</div>
          </Card>
          <Card className="agriculture-card p-3 text-center hover:shadow-md transition-shadow">
            <div className="text-lg font-bold text-red-500">↘ 33%</div>
            <div className="text-xs text-muted-foreground">{t('market.falling')}</div>
          </Card>
          <Card className="agriculture-card p-3 text-center hover:shadow-md transition-shadow">
            <div className="text-lg font-bold text-agriculture-green">1,155 RWF</div>
            <div className="text-xs text-muted-foreground">Avg. Price/kg</div>
          </Card>
        </div>

        {/* Price List */}
        <div className="space-y-3">
          {filteredData.map((item, index) => (
            <Card key={index} className="agriculture-card p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-agriculture-green">{item.crop}</h3>
                    <div className={`flex items-center gap-1 ${getTrendColor(item.trend)}`}>
                      {getTrendIcon(item.trend)}
                      <span className="font-medium">{item.change}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{item.currentPrice}</p>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Volume: {item.volume} • Updated {item.lastUpdated}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs hover:bg-green-50"
                      onClick={() => handleSetAlert(item.crop)}
                    >
                      <Bell className="h-3 w-3 mr-1" />
                      Alert
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Market Insights */}
        <Card className="agriculture-card p-4">
          <h3 className="font-semibold text-agriculture-green mb-3">📊 {t('market.insights')}</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-agriculture-green mb-1">🚀 {t('market.opportunities')}</h4>
              <p className="text-sm text-muted-foreground">
                Tomatoes and Apples showing strong upward trends - optimal selling time
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-600 mb-1">⏳ {t('market.hold')}</h4>
              <p className="text-sm text-muted-foreground">
                Corn prices expected to recover next month - consider holding inventory
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-600 mb-1">📈 {t('market.trend')}</h4>
              <p className="text-sm text-muted-foreground">
                Overall vegetable market trending upward due to seasonal demand increase
              </p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Market;
