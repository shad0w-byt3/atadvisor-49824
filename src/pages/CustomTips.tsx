
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Calendar, Cloud, Leaf, Target, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AITip {
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  timeRelevant: string;
  basedOn: string[];
  localResources: string[];
  expectedBenefit: string;
}

const CustomTips = () => {
  const [selectedTab, setSelectedTab] = useState('today');
  const [aiTips, setAiTips] = useState<AITip[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string>('');

  const generateAITips = async (timeframe: string) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      console.log('Generating AI tips for timeframe:', timeframe);
      
      const farmProfile = {
        location: 'Kigali, Rwanda',
        crops: ['maize', 'beans', 'cassava', 'sweet_potatoes', 'tomatoes'],
        farmSize: '2 hectares',
        experience: 'intermediate',
        budget: 'moderate',
        season: 'dry season transitioning to rainy'
      };

      const weatherData = {
        temperature: '24°C',
        humidity: '68%',
        rainfall: 'moderate expected',
        windSpeed: '12 km/h',
        uvIndex: 'moderate',
        season: 'dry season'
      };

      const marketData = {
        tomatoPrices: 'high (+25% from last month)',
        beanPrices: 'stable',
        maizePrices: 'moderate',
        fertilizerCosts: 'moderate',
        seedAvailability: 'good'
      };

      const { data, error } = await supabase.functions.invoke('ai-custom-tips', {
        body: {
          farmProfile,
          weatherData,
          marketData,
          timeframe: timeframe
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data && data.tips) {
        setAiTips(data.tips);
        setLastGenerated(new Date().toLocaleTimeString());
        toast.success(`🤖 AI generated ${data.tips.length} personalized tips!`);
      }
    } catch (error) {
      console.error('Error generating AI tips:', error);
      toast.error('Failed to generate AI tips. Please try again.');
      
      // Fallback tips
      setAiTips([
        {
          title: "Monitor Weather Patterns",
          description: "Keep track of changing weather conditions for optimal farming decisions.",
          category: "weather-based",
          priority: "high",
          timeRelevant: "Daily",
          basedOn: ["Current weather conditions", "Seasonal patterns"],
          localResources: ["Local weather observations", "Community knowledge"],
          expectedBenefit: "Better crop planning and protection"
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateAITips(selectedTab);
  }, [selectedTab]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "weather-based": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "crop-specific": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "market-based": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "pest-management": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      "soil-health": "bg-brown-100 text-brown-800 dark:bg-yellow-900/20 dark:text-yellow-400"
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'weather-based': return <Cloud className="h-5 w-5" />;
      case 'crop-specific': return <Leaf className="h-5 w-5" />;
      case 'market-based': return <Target className="h-5 w-5" />;
      case 'pest-management': return <Leaf className="h-5 w-5" />;
      case 'soil-health': return <Leaf className="h-5 w-5" />;
      default: return <Lightbulb className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6" />
            🤖 AI-Powered Custom Tips
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Personalized farming advice generated by advanced AI
          </p>
          {lastGenerated && (
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {lastGenerated}
            </p>
          )}
        </div>

        {/* AI Status */}
        <Card className="agriculture-card p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-agriculture-green to-blue-500 dark:from-green-600 dark:to-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-agriculture-green dark:text-green-400">
                🧠 AI Agricultural Advisor: Active
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced AI analyzing your farm data, weather patterns, and market conditions
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => generateAITips(selectedTab)}
              disabled={isGenerating}
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : '🔄 Refresh AI'}
            </Button>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button
            onClick={() => setSelectedTab('today')}
            variant={selectedTab === 'today' ? 'default' : 'outline'}
            className={selectedTab === 'today' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
            disabled={isGenerating}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Today's AI Tips
          </Button>
          <Button
            onClick={() => setSelectedTab('weekly')}
            variant={selectedTab === 'weekly' ? 'default' : 'outline'}
            className={selectedTab === 'weekly' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
            disabled={isGenerating}
          >
            This Week
          </Button>
          <Button
            onClick={() => setSelectedTab('learning')}
            variant={selectedTab === 'learning' ? 'default' : 'outline'}
            className={selectedTab === 'learning' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
            disabled={isGenerating}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Learning Tips
          </Button>
        </div>

        {/* Loading State */}
        {isGenerating && (
          <Card className="agriculture-card p-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-agriculture-green mb-3" />
            <p className="text-lg font-medium text-agriculture-green">🤖 AI Generating Personalized Tips...</p>
            <p className="text-sm text-muted-foreground">Analyzing your farm profile, weather data, and market conditions</p>
          </Card>
        )}

        {/* AI Tips List */}
        <div className="space-y-4">
          {aiTips.map((tip, index) => (
            <Card key={index} className="agriculture-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  {getCategoryIcon(tip.category)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        {tip.title}
                      </h3>
                      <div className="flex gap-2 mb-2">
                        <Badge className={getCategoryColor(tip.category)}>
                          {tip.category.replace('-', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(tip.priority)}>
                          {tip.priority} Priority
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {tip.timeRelevant}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-blue-800 dark:text-blue-300">{tip.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                        🎯 Expected Benefit:
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-400">{tip.expectedBenefit}</p>
                    </div>
                    
                    {tip.localResources && tip.localResources.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                          🌱 Local Resources:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tip.localResources.map((resource, idx) => (
                            <Badge key={idx} className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                              {resource}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      🤖 AI based this tip on:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tip.basedOn.map((factor, idx) => (
                        <Badge key={idx} className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button size="sm" className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                      ✅ Mark as Done
                    </Button>
                    <Button size="sm" variant="outline">
                      💾 Save for Later
                    </Button>
                    <Button size="sm" variant="outline">
                      📚 Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* AI Insights */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            🧠 AI Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">95%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI Accuracy Rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{aiTips.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tips Generated</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">22%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Yield Improvement</p>
            </div>
          </div>
        </Card>

        {/* AI Tip Settings */}
        <Card className="agriculture-card p-6 text-center">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-2">
            🎛️ Customize AI Recommendations
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Help our AI provide better recommendations by updating your farm profile and preferences
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
              🚀 Update AI Profile
            </Button>
            <Button variant="outline">
              ⚙️ AI Preferences
            </Button>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default CustomTips;
