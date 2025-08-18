
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Package, Sprout } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SmartInputPlanner = () => {
  const { t } = useLanguage();
  const [landSize, setLandSize] = useState('');
  const [cropType, setCropType] = useState('');
  const [recommendations, setRecommendations] = useState<{
    seeds: number;
    fertilizer: number;
    pesticide: number;
  } | null>(null);

  const calculateInputs = () => {
    const size = parseFloat(landSize);
    if (!size || !cropType) return;

    const inputs = {
      maize: { seeds: size * 25, fertilizer: size * 50, pesticide: size * 5 },
      beans: { seeds: size * 40, fertilizer: size * 30, pesticide: size * 3 },
      cassava: { seeds: size * 10000, fertilizer: size * 20, pesticide: size * 2 },
      rice: { seeds: size * 60, fertilizer: size * 75, pesticide: size * 8 }
    };

    setRecommendations(inputs[cropType as keyof typeof inputs] || inputs.maize);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green mb-2">
            📦 {t('planner.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('planner.subtitle')}
          </p>
        </div>

        <Card className="agriculture-card p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="landSize" className="text-agriculture-green">
                {t('planner.landSize')}
              </Label>
              <Input
                id="landSize"
                type="number"
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
                placeholder={t('planner.enterLandSize')}
              />
            </div>

            <div>
              <Label className="text-agriculture-green">{t('planner.cropType')}</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger>
                  <SelectValue placeholder={t('planner.selectCrop')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maize">{t('planner.maize')}</SelectItem>
                  <SelectItem value="beans">{t('planner.beans')}</SelectItem>
                  <SelectItem value="cassava">{t('planner.cassava')}</SelectItem>
                  <SelectItem value="rice">{t('planner.rice')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={calculateInputs}
              className="w-full bg-agriculture-green hover:bg-green-700"
            >
              <Calculator className="h-4 w-4 mr-2" />
              {t('planner.calculate')}
            </Button>
          </div>
        </Card>

        {recommendations && (
          <Card className="agriculture-card p-6">
            <h3 className="text-lg font-semibold text-agriculture-green mb-4">
              {t('planner.recommendations')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Sprout className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="font-medium text-gray-900">{t('planner.seeds')}</p>
                <p className="text-2xl font-bold text-agriculture-green">
                  {recommendations.seeds} kg
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="font-medium text-gray-900">{t('planner.fertilizer')}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {recommendations.fertilizer} kg
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Package className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <p className="font-medium text-gray-900">{t('planner.pesticide')}</p>
                <p className="text-2xl font-bold text-red-600">
                  {recommendations.pesticide} L
                </p>
              </div>
            </div>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default SmartInputPlanner;
