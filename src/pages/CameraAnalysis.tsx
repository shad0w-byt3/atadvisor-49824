import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { MobileCamera } from '@/components/MobileCamera';
import { CropAnalysisAI } from '@/components/CropAnalysisAI';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Bug, Droplets, Sun, Thermometer, Wind, Eye, Camera, FileText, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';

const CameraAnalysis = () => {
  const { t } = useLanguage();

  // Force scroll to top when component mounts
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);

  const analysisFeatures = [
    {
      icon: Leaf,
      title: t('camera.health'),
      description: "AI-powered health assessment for local crops",
      status: t('camera.active')
    },
    {
      icon: Bug,
      title: t('camera.pest'), 
      description: "Early pest identification and treatment",
      status: t('camera.premium')
    },
    {
      icon: Droplets,
      title: t('camera.disease'),
      description: "Disease prevention and treatment alerts",
      status: t('camera.active')
    },
    {
      icon: Sun,
      title: t('camera.growth'),
      description: "Track crop development stages",
      status: t('camera.new')
    }
  ];

  const weatherFeatures = [
    {
      icon: Thermometer,
      title: t('camera.temperature'),
      description: "Real-time temperature monitoring",
      value: "24°C"
    },
    {
      icon: Droplets,
      title: t('camera.humidity'),
      description: "Humidity levels for crop planning",
      value: "68%"
    },
    {
      icon: Wind,
      title: t('camera.windSpeed'),
      description: "Wind conditions affecting crops",
      value: "12 km/h"
    },
    {
      icon: Eye,
      title: t('camera.uvIndex'),
      description: "UV radiation levels",
      value: t('camera.moderate')
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case t('camera.active'): return 'bg-green-100 text-green-800';
      case t('camera.premium'): return 'bg-yellow-100 text-yellow-800';
      case t('camera.new'): return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/70 via-blue-50/50 to-green-50/70">
      <Header />
      
      <main className="pb-20 pt-4 px-4">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-agriculture-green mb-2 flex items-center justify-center gap-2">
              <Camera className="h-6 w-6" />
              {t('camera.smartAnalysis')}
            </h2>
            <p className="text-muted-foreground">
              AI-powered crop analysis with real-time weather data for Kigali, Rwanda
            </p>
            <Badge className="mt-2 bg-agriculture-green text-white">
              🚀 {t('camera.launchReady')}
            </Badge>
          </div>

          {/* Enhanced Crop Analysis */}
          <CropAnalysisAI />

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-auto py-3">
              <Camera className="h-4 w-4" />
              <span className="text-xs">{t('camera.capture')}</span>
            </Button>
            <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-auto py-3">
              <FileText className="h-4 w-4" />
              <span className="text-xs">{t('camera.report')}</span>
            </Button>
            <Button variant="outline" size="sm" className="flex flex-col items-center gap-1 h-auto py-3">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">{t('camera.history')}</span>
            </Button>
          </div>

          {/* Analysis Features */}
          <div className="grid grid-cols-2 gap-4">
            {analysisFeatures.map((feature, index) => (
              <Card key={index} className="agriculture-card p-4 text-center hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                  <feature.icon className="h-6 w-6 text-agriculture-green" />
                  <Badge className={`text-xs ${getStatusColor(feature.status)}`}>
                    {feature.status}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Weather Integration */}
          <Card className="agriculture-card p-4">
            <h3 className="font-semibold text-agriculture-green mb-3 flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              {t('camera.weatherConditions')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {weatherFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <feature.icon className="h-4 w-4 text-agriculture-green" />
                    <div>
                      <h5 className="font-medium text-xs">{feature.title}</h5>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-agriculture-green">{feature.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Local Crop Recommendations */}
          <Card className="agriculture-card p-4">
            <h3 className="font-semibold text-agriculture-green mb-3">🌱 {t('camera.recommendedCrops')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🥔</span>
                  <span className="text-sm font-medium">Cassava</span>
                </div>
                <Badge className="text-xs bg-green-100 text-green-700">{t('camera.excellentSeason')}</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍠</span>
                  <span className="text-sm font-medium">Sweet Potatoes</span>
                </div>
                <Badge className="text-xs bg-green-100 text-green-700">{t('camera.goodToPlant')}</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🫘</span>
                  <span className="text-sm font-medium">Beans</span>
                </div>
                <Badge className="text-xs bg-yellow-100 text-yellow-700">{t('camera.monitorWeather')}</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍌</span>
                  <span className="text-sm font-medium">Bananas</span>
                </div>
                <Badge className="text-xs bg-green-100 text-green-700">{t('camera.perfectConditions')}</Badge>
              </div>
            </div>
          </Card>

          {/* Analysis History */}
          <Card className="agriculture-card p-4">
            <h3 className="font-semibold text-agriculture-green mb-3">📊 {t('main.recentAnalyses')}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded">
                <div>
                  <p className="text-sm font-medium">{t('main.tomatoHealth')}</p>
                  <p className="text-xs text-muted-foreground">2 {t('time.hoursAgo')}</p>
                </div>
                <Badge className="bg-green-100 text-green-700">{t('main.healthy')}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <div>
                  <p className="text-sm font-medium">{t('main.beanAnalysis')}</p>
                  <p className="text-xs text-muted-foreground">1 {t('time.dayAgo')}</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-700">{t('main.attention')}</Badge>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <div>
                  <p className="text-sm font-medium">{t('main.cassavaCheck')}</p>
                  <p className="text-xs text-muted-foreground">3 {t('time.daysAgo')}</p>
                </div>
                <Badge className="bg-green-100 text-green-700">{t('main.excellent')}</Badge>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default CameraAnalysis;
