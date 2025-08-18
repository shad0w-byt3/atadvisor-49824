
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Radio, Mic, Clock, Users } from 'lucide-react';

const FarmPodcast = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const podcasts = [
    {
      id: 1,
      title: "Maize Farming Best Practices",
      host: "Dr. Jane Mutua",
      duration: "15 min",
      category: "Crop Tips",
      listeners: 1250,
      description: "Learn the latest techniques for maximizing maize yields"
    },
    {
      id: 2,
      title: "Success Story: From 1 Acre to 50",
      host: "Farmer John Kimani",
      duration: "22 min",
      category: "Success Stories",
      listeners: 890,
      description: "How one farmer grew his operation through smart planning"
    },
    {
      id: 3,
      title: "Weather Patterns & Climate Adaptation",
      host: "Meteorologist Sarah Wanjiku",
      duration: "18 min",
      category: "Weather",
      listeners: 1100,
      description: "Understanding changing weather patterns for better farming"
    },
    {
      id: 4,
      title: "Organic Fertilizers Workshop",
      host: "Extension Officer Peter Mwangi",
      duration: "25 min",
      category: "Soil Health",
      listeners: 750,
      description: "Making your own organic fertilizers from farm waste"
    },
    {
      id: 5,
      title: "Market Pricing Strategies",
      host: "Economist Grace Akinyi",
      duration: "20 min",
      category: "Business",
      listeners: 980,
      description: "When and how to sell your crops for maximum profit"
    }
  ];

  const liveShows = [
    {
      id: 1,
      title: "Morning Farm Talk",
      time: "6:00 AM - 7:00 AM",
      status: "live",
      listeners: 324
    },
    {
      id: 2,
      title: "Evening Harvest Hour",
      time: "7:00 PM - 8:00 PM",
      status: "upcoming",
      listeners: 0
    }
  ];

  const togglePlay = (podcastId) => {
    setCurrentlyPlaying(currentlyPlaying === podcastId ? null : podcastId);
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Crop Tips": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "Success Stories": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "Weather": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "Soil Health": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      "Business": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            🎤 Farm Radio & Podcasts
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Listen to expert farming advice and success stories
          </p>
        </div>

        {/* Live Shows */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4 flex items-center gap-2">
            <Radio className="h-5 w-5" />
            Live Radio Shows
          </h3>
          <div className="space-y-3">
            {liveShows.map((show) => (
              <Card key={show.id} className="p-4 border border-green-100 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                      <Radio className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{show.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {show.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {show.status === 'live' ? (
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                          🔴 LIVE
                        </Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {show.listeners}
                        </p>
                      </div>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                        Upcoming
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Podcast Episodes */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4 flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Featured Podcast Episodes
          </h3>
          <div className="space-y-4">
            {podcasts.map((podcast) => (
              <Card key={podcast.id} className="p-4 border border-green-100 dark:border-green-800">
                <div className="flex items-start gap-4">
                  <Button
                    onClick={() => togglePlay(podcast.id)}
                    size="icon"
                    className="w-12 h-12 rounded-full bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    {currentlyPlaying === podcast.id ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {podcast.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          by {podcast.host}
                        </p>
                      </div>
                      <Badge className={getCategoryColor(podcast.category)}>
                        {podcast.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {podcast.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {podcast.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {podcast.listeners} listeners
                      </span>
                    </div>
                  </div>
                </div>

                {currentlyPlaying === podcast.id && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800 dark:text-green-400">
                        Now Playing: {podcast.title}
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400">
                        2:34 / {podcast.duration}
                      </span>
                    </div>
                    <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                      <div className="bg-green-600 dark:bg-green-400 h-2 rounded-full w-1/4"></div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Card>

        <Card className="agriculture-card p-6 text-center">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-2">
            Share Your Story
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Have a farming success story or tip to share? Submit your story for our podcast!
          </p>
          <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
            <Mic className="h-4 w-4 mr-2" />
            Submit Story
          </Button>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default FarmPodcast;
