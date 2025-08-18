
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, CheckCircle, Calendar, Droplets, Shield } from 'lucide-react';

const CropDiversification = () => {
  const [selectedRegion, setSelectedRegion] = useState('central');
  const [selectedSeason, setSelectedSeason] = useState('long-rains');

  const regions = [
    { id: 'central', name: 'Central Kenya', climate: 'Highland' },
    { id: 'coastal', name: 'Coastal Region', climate: 'Tropical' },
    { id: 'western', name: 'Western Kenya', climate: 'Lake Victoria Basin' },
    { id: 'eastern', name: 'Eastern Kenya', climate: 'Semi-Arid' }
  ];

  const seasons = [
    { id: 'long-rains', name: 'Long Rains (March-June)', months: 'Mar-Jun' },
    { id: 'short-rains', name: 'Short Rains (Oct-Dec)', months: 'Oct-Dec' },
    { id: 'dry-season', name: 'Dry Season (Jan-Feb, Jul-Sep)', months: 'Jan-Feb, Jul-Sep' }
  ];

  const recommendations = {
    'central': {
      'long-rains': [
        {
          id: 1,
          primaryCrop: 'Maize',
          companionCrops: ['Beans', 'Pumpkins'],
          benefits: ['Nitrogen fixation', 'Soil conservation', 'Pest control'],
          plantingPattern: 'Alternate rows',
          spacing: '75cm between maize rows, beans in between',
          expectedYield: '+25% total yield',
          riskReduction: 'High',
          sustainabilityScore: 85
        },
        {
          id: 2,
          primaryCrop: 'Irish Potatoes',
          companionCrops: ['Carrots', 'Onions'],
          benefits: ['Space optimization', 'Natural pest deterrent', 'Market diversification'],
          plantingPattern: 'Interplanting',
          spacing: 'Potatoes 30cm apart, onions as borders',
          expectedYield: '+15% space efficiency',
          riskReduction: 'Medium',
          sustainabilityScore: 78
        }
      ]
    }
  };

  const currentRecommendations = recommendations[selectedRegion]?.[selectedSeason] || [];

  const benefits = [
    {
      icon: Shield,
      title: 'Risk Reduction',
      description: 'Diversify to reduce crop failure risk and market volatility',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Leaf,
      title: 'Soil Health',
      description: 'Different crops improve soil structure and nutrient cycling',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Droplets,
      title: 'Water Efficiency',
      description: 'Companion crops can improve water retention and usage',
      color: 'text-cyan-600 dark:text-cyan-400'
    }
  ];

  const getBenefitColor = (benefit) => {
    const colors = {
      'Nitrogen fixation': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Soil conservation': 'bg-brown-100 text-brown-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'Pest control': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      'Space optimization': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Natural pest deterrent': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Market diversification': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
    };
    return colors[benefit] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-green-600 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'Low': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            🌾 Crop Diversification Advisor
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Smart intercropping recommendations for better yields and resilience
          </p>
        </div>

        {/* Benefits Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="agriculture-card p-4 text-center">
              <benefit.icon className={`h-8 w-8 mx-auto mb-2 ${benefit.color}`} />
              <h3 className="font-semibold text-agriculture-green dark:text-green-400 mb-1">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
            </Card>
          ))}
        </div>

        {/* Selection Controls */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
            Get Personalized Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Your Region
              </label>
              <div className="space-y-2">
                {regions.map((region) => (
                  <Button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    variant={selectedRegion === region.id ? 'default' : 'outline'}
                    className={`w-full justify-start ${
                      selectedRegion === region.id 
                        ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' 
                        : ''
                    }`}
                  >
                    <CheckCircle className={`h-4 w-4 mr-2 ${
                      selectedRegion === region.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                    <div className="text-left">
                      <p className="font-medium">{region.name}</p>
                      <p className="text-xs opacity-75">{region.climate}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Planting Season
              </label>
              <div className="space-y-2">
                {seasons.map((season) => (
                  <Button
                    key={season.id}
                    onClick={() => setSelectedSeason(season.id)}
                    variant={selectedSeason === season.id ? 'default' : 'outline'}
                    className={`w-full justify-start ${
                      selectedSeason === season.id 
                        ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' 
                        : ''
                    }`}
                  >
                    <Calendar className={`h-4 w-4 mr-2 ${
                      selectedSeason === season.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                    <div className="text-left">
                      <p className="font-medium">{season.name}</p>
                      <p className="text-xs opacity-75">{season.months}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400">
            Recommended Crop Combinations
          </h3>
          
          {currentRecommendations.length > 0 ? (
            currentRecommendations.map((rec) => (
              <Card key={rec.id} className="agriculture-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-agriculture-green dark:text-green-400 mb-2">
                      {rec.primaryCrop} + {rec.companionCrops.join(' + ')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Primary: <span className="font-medium text-gray-900 dark:text-white">{rec.primaryCrop}</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Companions: <span className="font-medium text-gray-900 dark:text-white">{rec.companionCrops.join(', ')}</span>
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-agriculture-green dark:bg-green-600 rounded-full flex items-center justify-center mb-1">
                      <span className="text-white font-bold">{rec.sustainabilityScore}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Sustainability Score</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Benefits</h5>
                    <div className="flex flex-wrap gap-2">
                      {rec.benefits.map((benefit, index) => (
                        <Badge key={index} className={getBenefitColor(benefit)}>
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Metrics</h5>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Expected Yield: <span className="font-medium text-green-600 dark:text-green-400">{rec.expectedYield}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Risk Reduction: <span className={`font-medium ${getRiskColor(rec.riskReduction)}`}>{rec.riskReduction}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h5 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Planting Instructions</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700 dark:text-blue-300">
                        <span className="font-medium">Pattern:</span> {rec.plantingPattern}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700 dark:text-blue-300">
                        <span className="font-medium">Spacing:</span> {rec.spacing}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                    <Leaf className="h-4 w-4 mr-2" />
                    Add to Plan
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="agriculture-card p-8 text-center">
              <Leaf className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No recommendations yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select your region and season to get personalized crop combinations
              </p>
            </Card>
          )}
        </div>

        {/* Success Stories */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
            Success Story: John from Kiambu
          </h3>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-300 text-sm italic mb-2">
              "I started intercropping maize with beans and pumpkins last season. My soil health improved dramatically, and I got 30% more total yield. The beans fixed nitrogen naturally, reducing my fertilizer costs by 40%!"
            </p>
            <p className="text-green-600 dark:text-green-400 text-xs">
              - John Kimani, Kiambu County • Maize + Beans + Pumpkins
            </p>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default CropDiversification;
