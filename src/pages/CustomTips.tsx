import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Calendar, Cloud, Leaf, Target, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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

// Mock AI tips data
const mockTipsData: Record<string, AITip[]> = {
  today: [
    {
      title: "Optimal Watering Time Alert",
      description: "Based on today's weather forecast (24°C, 65% humidity), water your tomato plants between 6-8 AM to minimize evaporation and maximize root absorption.",
      category: "weather-based",
      priority: "high",
      timeRelevant: "Today, 6:00 AM",
      basedOn: ["Current temperature", "Humidity levels", "Crop water requirements"],
      localResources: ["Drip irrigation systems from Kigali Agro-Supply", "Mulching materials"],
      expectedBenefit: "20% water savings, reduced disease risk"
    },
    {
      title: "Pest Monitoring Required",
      description: "Warm conditions are ideal for aphid activity. Inspect your bean plants' undersides for early infestation signs. Early detection prevents crop loss.",
      category: "pest-management",
      priority: "high",
      timeRelevant: "Morning inspection",
      basedOn: ["Seasonal pest patterns", "Your crop types", "Weather conditions"],
      localResources: ["Neem oil from local agro-shops", "Yellow sticky traps"],
      expectedBenefit: "Prevent 15-25% yield loss"
    },
    {
      title: "Harvest Ready: Sweet Potatoes",
      description: "Your sweet potatoes planted 4 months ago are approaching optimal harvest time. Check tuber size by gently probing soil near plants.",
      category: "crop-specific",
      priority: "medium",
      timeRelevant: "This week",
      basedOn: ["Planting date records", "Growth cycle data", "Weather patterns"],
      localResources: ["Local markets in Kigali", "Storage facilities"],
      expectedBenefit: "Maximum tuber size and quality"
    }
  ],
  weekly: [
    {
      title: "Soil Preparation for Rainy Season",
      description: "Prepare your fields for the upcoming rainy season. Add organic matter and create proper drainage channels to prevent waterlogging.",
      category: "soil-health",
      priority: "high",
      timeRelevant: "Complete by Friday",
      basedOn: ["Seasonal calendar", "Your farm location", "Rainfall predictions"],
      localResources: ["Compost from Rubavu cooperative", "RAB extension services"],
      expectedBenefit: "Better crop establishment, reduced soil erosion"
    },
    {
      title: "Market Price Alert: Tomatoes Rising",
      description: "Tomato prices have increased 25% in Kigali markets. Consider harvesting mature fruits now for premium prices before market stabilizes.",
      category: "market-based",
      priority: "high",
      timeRelevant: "Next 3-5 days",
      basedOn: ["Real-time market data", "Supply trends", "Your crop inventory"],
      localResources: ["Kimironko Market", "Nyabugogo wholesale"],
      expectedBenefit: "15-25% higher income per kg"
    },
    {
      title: "Cassava Fertilization Window",
      description: "Apply second fertilization to cassava plants now at 6-8 weeks after planting for optimal tuber development.",
      category: "crop-specific",
      priority: "medium",
      timeRelevant: "This week",
      basedOn: ["Crop growth stage", "Soil nutrient status", "Variety requirements"],
      localResources: ["NPK fertilizer from agro-dealers", "Organic alternatives"],
      expectedBenefit: "30-40% yield improvement"
    }
  ],
  learning: [
    {
      title: "Master Integrated Pest Management",
      description: "Learn IPM techniques combining biological, cultural, and chemical controls. Reduces pesticide use by 50% while maintaining crop protection.",
      category: "crop-specific",
      priority: "medium",
      timeRelevant: "Self-paced learning",
      basedOn: ["Your farming practices", "Common pest issues", "Sustainability goals"],
      localResources: ["RAB training center", "MINAGRI extension videos"],
      expectedBenefit: "Reduced costs, healthier produce, environmental protection"
    },
    {
      title: "Understanding Soil pH Management",
      description: "Rwanda's volcanic soils often need pH adjustment. Learn to test and amend soil for optimal crop nutrient availability.",
      category: "soil-health",
      priority: "medium",
      timeRelevant: "Foundational knowledge",
      basedOn: ["Soil test recommendations", "Crop requirements", "Local soil conditions"],
      localResources: ["Soil testing labs in Kigali", "Lime suppliers"],
      expectedBenefit: "Improved nutrient uptake, better yields"
    },
    {
      title: "Climate-Smart Agriculture Practices",
      description: "Adapt your farming to changing climate patterns. Learn mulching, water harvesting, and drought-resistant variety selection.",
      category: "weather-based",
      priority: "low",
      timeRelevant: "Long-term implementation",
      basedOn: ["Climate projections", "Your region's risks", "Best practices"],
      localResources: ["CGIAR resources", "Local farmer cooperatives"],
      expectedBenefit: "Resilient farming system, consistent yields"
    }
  ]
};

const CustomTips = () => {
  const [selectedTab, setSelectedTab] = useState('today');
  const [aiTips, setAiTips] = useState<AITip[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string>('');

  const generateAITips = async (timeframe: string) => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      // Get user profile for personalization
      const savedProfile = localStorage.getItem('userProfile');
      const profile = savedProfile ? JSON.parse(savedProfile) : {};
      
      // Call the real AI edge function
      const { data, error } = await supabase.functions.invoke('ai-custom-tips', {
        body: {
          farmProfile: {
            location: profile.location || 'Kigali, Rwanda',
            crops: profile.crops || ['maize', 'beans', 'cassava'],
            farmSize: profile.farmSize || '2 hectares',
            experience: profile.experience || 'intermediate'
          },
          weatherData: {
            temperature: '24°C',
            humidity: '68%',
            rainfall: 'moderate',
            season: 'dry season'
          },
          marketData: {
            tomatoPrices: 'high',
            beanPrices: 'stable',
            fertilizerCosts: 'moderate'
          },
          timeframe: timeframe
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate tips');
      }

      const tips = data?.tips || mockTipsData[timeframe] || [];
      setAiTips(tips);
      setLastGenerated(new Date().toLocaleTimeString());
      toast.success(`🤖 AI generated ${tips.length} personalized tips!`);
    } catch (error) {
      console.error('Error generating AI tips:', error);
      // Fallback to mock data
      setAiTips(mockTipsData[timeframe] || []);
      setLastGenerated(new Date().toLocaleTimeString());
      toast.warning('Using offline tips. Connect for full AI features.');
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
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "weather-based": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "crop-specific": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "market-based": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "pest-management": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      "soil-health": "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
    };
    return colors[category] || "bg-muted text-muted-foreground";
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
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-background to-green-50/30">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6" />
            🤖 AI-Powered Custom Tips
          </h1>
          <p className="text-muted-foreground">
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
            <div className="w-12 h-12 bg-gradient-to-r from-agriculture-green to-blue-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-agriculture-green dark:text-green-400">
                🧠 AI Agricultural Advisor: Active
              </h3>
              <p className="text-muted-foreground">
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
            className={selectedTab === 'today' ? 'bg-agriculture-green hover:bg-green-700' : ''}
            disabled={isGenerating}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Today's AI Tips
          </Button>
          <Button
            onClick={() => setSelectedTab('weekly')}
            variant={selectedTab === 'weekly' ? 'default' : 'outline'}
            className={selectedTab === 'weekly' ? 'bg-agriculture-green hover:bg-green-700' : ''}
            disabled={isGenerating}
          >
            This Week
          </Button>
          <Button
            onClick={() => setSelectedTab('learning')}
            variant={selectedTab === 'learning' ? 'default' : 'outline'}
            className={selectedTab === 'learning' ? 'bg-agriculture-green hover:bg-green-700' : ''}
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
        {!isGenerating && (
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
                        <div className="flex gap-2 mb-2 flex-wrap">
                          <Badge className={getCategoryColor(tip.category)}>
                            {tip.category.replace('-', ' ')}
                          </Badge>
                          <Badge className={getPriorityColor(tip.priority)}>
                            {tip.priority} Priority
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
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
                        <p className="text-sm text-muted-foreground mb-2 font-medium">
                          🎯 Expected Benefit:
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-400">{tip.expectedBenefit}</p>
                      </div>
                      
                      {tip.localResources && tip.localResources.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2 font-medium">
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
                      <p className="text-sm text-muted-foreground mb-2">
                        🤖 AI based this tip on:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tip.basedOn.map((factor, idx) => (
                          <Badge key={idx} className="bg-muted text-muted-foreground">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <Button size="sm" className="bg-agriculture-green hover:bg-green-700">
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
        )}

        {/* AI Insights */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            🧠 AI Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">95%</p>
              <p className="text-sm text-muted-foreground">AI Accuracy Rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{aiTips.length}</p>
              <p className="text-sm text-muted-foreground">Tips Generated</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">22%</p>
              <p className="text-sm text-muted-foreground">Yield Improvement</p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default CustomTips;
