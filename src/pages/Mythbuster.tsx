
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Lightbulb, ThumbsUp, ThumbsDown, Share } from 'lucide-react';

const Mythbuster = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Myths', count: 15 },
    { id: 'planting', name: 'Planting', count: 5 },
    { id: 'fertilizer', name: 'Fertilizers', count: 4 },
    { id: 'weather', name: 'Weather', count: 3 },
    { id: 'pests', name: 'Pest Control', count: 3 }
  ];

  const myths = [
    {
      id: 1,
      category: 'planting',
      myth: "Planting during a full moon makes crops grow better",
      truth: "Moon phases have no scientific impact on plant growth",
      explanation: "Plant growth is determined by factors like soil quality, water, nutrients, and sunlight. While traditional lunar calendars exist, scientific studies show no correlation between moon phases and crop yield or growth rates.",
      evidence: "Multiple controlled studies by agricultural universities",
      popularity: 87,
      votes: { helpful: 156, notHelpful: 12 },
      expert: "Dr. Jane Mutua, Soil Scientist"
    },
    {
      id: 2,
      category: 'fertilizer',
      myth: "More fertilizer always means better crops",
      truth: "Excessive fertilizer can damage crops and the environment",
      explanation: "Over-fertilization can burn plant roots, pollute groundwater, and create nutrient imbalances. Plants need the right amount of nutrients at the right time. Soil testing helps determine exact needs.",
      evidence: "Kenya Agricultural Research Institute studies",
      popularity: 92,
      votes: { helpful: 203, notHelpful: 8 },
      expert: "Extension Officer Peter Mwangi"
    },
    {
      id: 3,
      category: 'weather',
      myth: "You can predict rain by looking at animal behavior",
      truth: "Weather forecasts are more reliable than animal behavior",
      explanation: "While animals may sense some atmospheric changes, modern meteorology provides much more accurate weather predictions. Relying solely on animal behavior can lead to poor farming decisions.",
      evidence: "Kenya Meteorological Department data",
      popularity: 78,
      votes: { helpful: 134, notHelpful: 23 },
      expert: "Meteorologist Sarah Wanjiku"
    },
    {
      id: 4,
      category: 'planting',
      myth: "Bananas grow better under full sun always",
      truth: "Bananas need some shade in hot climates",
      explanation: "While bananas need plenty of light, in very hot climates they benefit from partial shade during the hottest part of the day. This prevents leaf scorch and excessive water loss.",
      evidence: "Tropical agriculture research",
      popularity: 65,
      votes: { helpful: 89, notHelpful: 15 },
      expert: "Farmer John Kimani"
    },
    {
      id: 5,
      category: 'pests',
      myth: "Spraying pesticides every week prevents all pest problems",
      truth: "Excessive pesticide use creates resistant pests and harms beneficial insects",
      explanation: "Regular pesticide use without monitoring pest levels leads to resistance, kills helpful predators, and can be expensive. Integrated Pest Management (IPM) is more effective and sustainable.",
      evidence: "International Centre of Insect Physiology studies",
      popularity: 73,
      votes: { helpful: 167, notHelpful: 19 },
      expert: "Dr. Grace Akinyi, Entomologist"
    }
  ];

  const filteredMyths = selectedCategory === 'all' 
    ? myths 
    : myths.filter(myth => myth.category === selectedCategory);

  const getMythStatusIcon = (isMyth) => {
    return isMyth ? (
      <XCircle className="h-6 w-6 text-red-500" />
    ) : (
      <CheckCircle className="h-6 w-6 text-green-500" />
    );
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 80) return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    if (popularity >= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            📖 Mythbuster Corner
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Separating farming facts from fiction with science
          </p>
        </div>

        {/* Stats */}
        <Card className="agriculture-card p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">15</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Myths Busted</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">1,248</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Farmers Educated</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expert Contributors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">94%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</p>
            </div>
          </div>
        </Card>

        {/* Category Filter */}
        <Card className="agriculture-card p-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`flex-shrink-0 ${
                  selectedCategory === category.id 
                    ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' 
                    : ''
                }`}
              >
                {category.name}
                <Badge className="ml-2 bg-white/20 text-current">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </Card>

        {/* Myths List */}
        <div className="space-y-4">
          {filteredMyths.map((item) => (
            <Card key={item.id} className="agriculture-card p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getMythStatusIcon(true)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge className="mb-2 bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                        {categories.find(c => c.id === item.category)?.name}
                      </Badge>
                      <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                        Myth: "{item.myth}"
                      </h3>
                    </div>
                    <Badge className={getPopularityColor(item.popularity)}>
                      {item.popularity}% believe this
                    </Badge>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <h4 className="font-medium text-green-800 dark:text-green-400">
                        Truth: {item.truth}
                      </h4>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      Scientific Explanation
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {item.explanation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Evidence Source</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.evidence}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expert Reviewer</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.expert}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {item.votes.helpful}
                        </Button>
                        <Button size="sm" variant="outline" className="h-8">
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          {item.votes.notHelpful}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Was this helpful?
                      </p>
                    </div>
                    
                    <Button size="sm" variant="outline">
                      <Share className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Submit Myth */}
        <Card className="agriculture-card p-6 text-center">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-2">
            Know a Farming Myth?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Help us debunk common misconceptions in farming. Submit a myth and our experts will investigate!
          </p>
          <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
            <Lightbulb className="h-4 w-4 mr-2" />
            Submit a Myth
          </Button>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Mythbuster;
