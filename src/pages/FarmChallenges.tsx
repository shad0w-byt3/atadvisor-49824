
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Users, Calendar, Award, Star } from 'lucide-react';

const FarmChallenges = () => {
  const [activeTab, setActiveTab] = useState('current');

  const currentChallenges = [
    {
      id: 1,
      title: "Best Maize Plot Challenge",
      description: "Show us your best maize field photos and growth progress",
      prize: "KSh 10,000 + Premium Seeds",
      participants: 156,
      daysLeft: 12,
      progress: 75,
      category: "Crop Excellence",
      difficulty: "Medium"
    },
    {
      id: 2,
      title: "Water-Saving Hero",
      description: "Demonstrate innovative water conservation techniques",
      prize: "Water Management Kit",
      participants: 89,
      daysLeft: 8,
      progress: 60,
      category: "Sustainability",
      difficulty: "Hard"
    },
    {
      id: 3,
      title: "Early Disease Spotter",
      description: "Upload photos of early disease detection and management",
      prize: "Disease Prevention Package",
      participants: 203,
      daysLeft: 18,
      progress: 40,
      category: "Health Management",
      difficulty: "Easy"
    }
  ];

  const pastChallenges = [
    {
      id: 4,
      title: "Organic Fertilizer Innovation",
      winner: "Mary Wanjiku",
      prize: "KSh 15,000",
      participants: 134,
      completedDate: "Jan 2024"
    },
    {
      id: 5,
      title: "Highest Yield Contest",
      winner: "John Kimani",
      prize: "Premium Equipment",
      participants: 278,
      completedDate: "Dec 2023"
    }
  ];

  const userAchievements = [
    { name: "First Challenge", icon: "🏆", earned: true },
    { name: "Top 10 Finisher", icon: "🥉", earned: true },
    { name: "Innovation Award", icon: "💡", earned: false },
    { name: "Community Helper", icon: "🤝", earned: true },
    { name: "Master Farmer", icon: "👨‍🌾", earned: false }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            🏆 Farm Challenges & Rewards
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Compete with other farmers and win amazing prizes
          </p>
        </div>

        {/* User Stats */}
        <Card className="agriculture-card p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-agriculture-green dark:text-green-400">7</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Challenges Joined</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Top 10 Finishes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Wins</p>
            </div>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('current')}
            variant={activeTab === 'current' ? 'default' : 'outline'}
            className={activeTab === 'current' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            Current Challenges
          </Button>
          <Button
            onClick={() => setActiveTab('past')}
            variant={activeTab === 'past' ? 'default' : 'outline'}
            className={activeTab === 'past' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            Past Winners
          </Button>
          <Button
            onClick={() => setActiveTab('achievements')}
            variant={activeTab === 'achievements' ? 'default' : 'outline'}
            className={activeTab === 'achievements' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            My Badges
          </Button>
        </div>

        {/* Current Challenges */}
        {activeTab === 'current' && (
          <div className="space-y-4">
            {currentChallenges.map((challenge) => (
              <Card key={challenge.id} className="agriculture-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-2">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex gap-2 mb-3">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        {challenge.category}
                      </Badge>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Trophy className="h-8 w-8 text-yellow-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Prize</p>
                    <p className="font-medium text-gray-900 dark:text-white">{challenge.prize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Participants
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">{challenge.participants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Days Left
                    </p>
                    <p className="font-medium text-red-600 dark:text-red-400">{challenge.daysLeft}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
                    <span className="text-gray-900 dark:text-white">{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>

                <div className="flex gap-3">
                  <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                    <Target className="h-4 w-4 mr-2" />
                    Join Challenge
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Past Winners */}
        {activeTab === 'past' && (
          <div className="space-y-4">
            {pastChallenges.map((challenge) => (
              <Card key={challenge.id} className="agriculture-card p-6">
                <div className="flex items-center gap-4">
                  <Award className="h-12 w-12 text-yellow-500" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Winner: <span className="font-medium text-gray-900 dark:text-white">{challenge.winner}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {challenge.participants} participants • {challenge.completedDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-agriculture-green dark:text-green-400">
                      {challenge.prize}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Achievements */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {userAchievements.map((achievement, index) => (
              <Card key={index} className={`agriculture-card p-6 text-center ${achievement.earned ? 'border-yellow-200 dark:border-yellow-800' : 'opacity-50'}`}>
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {achievement.name}
                </h3>
                {achievement.earned ? (
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                    <Star className="h-3 w-3 mr-1" />
                    Earned
                  </Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                    Locked
                  </Badge>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default FarmChallenges;
