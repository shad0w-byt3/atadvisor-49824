
import { Camera, TrendingUp, Calendar, Bug, Leaf, MapPin, Package, Gamepad2, BookOpen, Users, Trophy, Shield, DollarSign, Navigation, Lightbulb, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Loading3D } from '@/components/Loading3D';
import { usePageTransition } from '@/hooks/usePageTransition';

export const OrganizedToolsGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { isTransitioning, navigateWithLoading } = usePageTransition();

  const categories = [
    { id: 'all', label: 'All Tools', color: 'bg-gray-100 text-gray-800' },
    { id: 'ai-powered', label: 'AI Powered', color: 'bg-blue-100 text-blue-800' },
    { id: 'education', label: 'Learning', color: 'bg-purple-100 text-purple-800' },
    { id: 'financial', label: 'Financial', color: 'bg-green-100 text-green-800' },
    { id: 'monitoring', label: 'Monitoring', color: 'bg-orange-100 text-orange-800' },
    { id: 'community', label: 'Community', color: 'bg-pink-100 text-pink-800' }
  ];

  const tools = [
    {
      icon: Package,
      title: "Smart Input Planner",
      description: "Calculate exact inputs needed for your farm",
      path: "/smart-input-planner",
      category: 'ai-powered',
      featured: true,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      loadingMessage: "Loading Smart Input Planner..."
    },
    {
      icon: Camera,
      title: "Crop Growth Tracker",
      description: "AI-powered photo diary for crop monitoring",
      path: "/crop-tracker",
      category: 'ai-powered',
      featured: true,
      color: "text-green-600",
      bgColor: "bg-green-50",
      loadingMessage: "Loading Crop Tracker..."
    },
    {
      icon: TrendingUp,
      title: "Smart Marketplace",
      description: "Buy and sell crops locally",
      path: "/smart-marketplace",
      category: 'financial',
      featured: true,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      loadingMessage: "Loading Smart Marketplace..."
    },
    {
      icon: Gamepad2,
      title: "Farming Game",
      description: "Learn through interactive simulation",
      path: "/farming-game",
      category: 'education',
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      loadingMessage: "Loading Farming Game..."
    },
    {
      icon: BookOpen,
      title: "Learning Paths",
      description: "Interactive courses with certificates",
      path: "/learning-paths",
      category: 'education',
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      loadingMessage: "Loading Learning Paths..."
    },
    {
      icon: Users,
      title: "Farm Podcast",
      description: "Listen to expert tips and stories",
      path: "/farm-podcast",
      category: 'community',
      color: "text-red-600",
      bgColor: "bg-red-50",
      loadingMessage: "Loading Farm Podcast..."
    },
    {
      icon: UserCheck,
      title: "Mentorship",
      description: "Connect with experienced farmers",
      path: "/mentorship",
      category: 'community',
      color: "text-green-600",
      bgColor: "bg-green-50",
      loadingMessage: "Loading Mentorship..."
    },
    {
      icon: Trophy,
      title: "Farm Challenges",
      description: "Compete and win amazing prizes",
      path: "/farm-challenges",
      category: 'community',
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      loadingMessage: "Loading Farm Challenges..."
    },
    {
      icon: Shield,
      title: "Risk Dashboard",
      description: "Monitor climate and financial risks",
      path: "/risk-dashboard",
      category: 'monitoring',
      color: "text-red-600",
      bgColor: "bg-red-50",
      loadingMessage: "Loading Risk Dashboard..."
    },
    {
      icon: Leaf,
      title: "Crop Diversification",
      description: "Smart intercropping recommendations",
      path: "/crop-diversification",
      category: 'ai-powered',
      color: "text-green-600",
      bgColor: "bg-green-50",
      loadingMessage: "Loading Crop Diversification..."
    },
    {
      icon: DollarSign,
      title: "Micro-Investment",
      description: "Access credit and investment opportunities",
      path: "/micro-investment",
      category: 'financial',
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      loadingMessage: "Loading Micro-Investment..."
    },
    {
      icon: Navigation,
      title: "Plot Mapping",
      description: "AI-powered field mapping with satellite",
      path: "/plot-mapping",
      category: 'ai-powered',
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      loadingMessage: "Loading Plot Mapping..."
    },
    {
      icon: Bug,
      title: "Mythbuster",
      description: "Debunk common farming myths",
      path: "/mythbuster",
      category: 'education',
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      loadingMessage: "Loading Mythbuster..."
    },
    {
      icon: Lightbulb,
      title: "Custom Tips",
      description: "Personalized AI farming recommendations",
      path: "/custom-tips",
      category: 'ai-powered',
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      loadingMessage: "Loading Custom Tips..."
    },
    {
      icon: MapPin,
      title: "Expert Finder",
      description: "Find nearby agricultural experts",
      path: "/expert-finder",
      category: 'community',
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      loadingMessage: "Loading Expert Finder..."
    }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const featuredTools = tools.filter(tool => tool.featured);

  if (isTransitioning) {
    return <Loading3D message="Loading Tool..." />;
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={`${selectedCategory === category.id ? 'bg-agriculture-green hover:bg-agriculture-green/90' : ''} transition-all duration-300`}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Featured Tools (only show when 'all' is selected) */}
      {selectedCategory === 'all' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-agriculture-green flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Featured Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredTools.map((tool, index) => (
              <Card
                key={index}
                className="relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => navigateWithLoading(tool.path, tool.loadingMessage)}
              >
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  ⭐ Featured
                </div>
                <div className="p-6">
                  <div className={`w-14 h-14 ${tool.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className={`w-7 h-7 ${tool.color}`} />
                  </div>
                  <h4 className="font-semibold text-lg text-agriculture-green mb-2">{tool.title}</h4>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Tools Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-agriculture-green">
          {selectedCategory === 'all' ? 'All Tools' : categories.find(c => c.id === selectedCategory)?.label}
          <span className="text-sm text-muted-foreground ml-2">({filteredTools.length} tools)</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTools.map((tool, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto flex-col gap-3 p-4 group hover:scale-105 transition-all duration-300 hover:shadow-md border border-transparent hover:border-agriculture-green/20"
              onClick={() => navigateWithLoading(tool.path, tool.loadingMessage)}
            >
              <div className={`w-12 h-12 ${tool.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <tool.icon className={`h-6 w-6 ${tool.color}`} />
              </div>
              
              <div className="text-center">
                <h4 className="font-semibold text-sm text-agriculture-green mb-1">{tool.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
