
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Play, CheckCircle, Clock, Award, Star } from 'lucide-react';

const LearningPaths = () => {
  const [activeTab, setActiveTab] = useState('paths');

  const learningPaths = [
    {
      id: 1,
      title: "Soil Health Basics",
      description: "Learn the fundamentals of soil testing, nutrients, and organic matter",
      level: "Beginner",
      duration: "2 hours",
      lessons: 8,
      completed: 5,
      progress: 62,
      certificate: true,
      enrolled: true
    },
    {
      id: 2,
      title: "Organic Fertilizers Mastery",
      description: "Master the art of making and applying organic fertilizers",
      level: "Intermediate",
      duration: "3 hours",
      lessons: 12,
      completed: 0,
      progress: 0,
      certificate: true,
      enrolled: false
    },
    {
      id: 3,
      title: "Pest & Disease Management",
      description: "Identify, prevent, and treat common crop pests and diseases",
      level: "Advanced",
      duration: "4 hours",
      lessons: 15,
      completed: 15,
      progress: 100,
      certificate: true,
      enrolled: true
    },
    {
      id: 4,
      title: "Water Conservation Techniques",
      description: "Efficient irrigation and water management strategies",
      level: "Intermediate",
      duration: "2.5 hours",
      lessons: 10,
      completed: 3,
      progress: 30,
      certificate: true,
      enrolled: true
    }
  ];

  const certificates = [
    {
      id: 1,
      title: "Pest & Disease Management Expert",
      issuedDate: "March 2024",
      validUntil: "March 2026",
      creditsEarned: 4
    },
    {
      id: 2,
      title: "Soil Health Specialist",
      issuedDate: "February 2024",
      validUntil: "February 2026",
      creditsEarned: 2
    }
  ];

  const currentLesson = {
    title: "Understanding Soil pH Levels",
    course: "Soil Health Basics",
    progress: 75,
    timeLeft: "8 minutes"
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            📚 Farmer Learning Paths
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Interactive courses to improve your farming skills
          </p>
        </div>

        {/* Current Learning */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
            Continue Learning
          </h3>
          <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Play className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">{currentLesson.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{currentLesson.course}</p>
              <div className="flex items-center gap-2 mt-2">
                <Progress value={currentLesson.progress} className="flex-1 h-2" />
                <span className="text-xs text-gray-500 dark:text-gray-400">{currentLesson.timeLeft}</span>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
              Continue
            </Button>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab('paths')}
            variant={activeTab === 'paths' ? 'default' : 'outline'}
            className={activeTab === 'paths' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            Learning Paths
          </Button>
          <Button
            onClick={() => setActiveTab('certificates')}
            variant={activeTab === 'certificates' ? 'default' : 'outline'}
            className={activeTab === 'certificates' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            My Certificates
          </Button>
        </div>

        {/* Learning Paths */}
        {activeTab === 'paths' && (
          <div className="space-y-4">
            {learningPaths.map((path) => (
              <Card key={path.id} className="agriculture-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400">
                        {path.title}
                      </h3>
                      <Badge className={getLevelColor(path.level)}>
                        {path.level}
                      </Badge>
                      {path.certificate && (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                          <Award className="h-3 w-3 mr-1" />
                          Certificate
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {path.description}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-agriculture-green dark:text-green-400" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{path.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{path.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {path.completed}/{path.lessons} completed
                    </span>
                  </div>
                </div>

                {path.enrolled && path.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-gray-900 dark:text-white">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>
                )}

                <div className="flex gap-3">
                  {path.enrolled ? (
                    <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      {path.progress > 0 ? 'Continue' : 'Start'}
                    </Button>
                  ) : (
                    <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                      Enroll Now
                    </Button>
                  )}
                  <Button variant="outline">
                    Preview
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Certificates */}
        {activeTab === 'certificates' && (
          <div className="space-y-4">
            {certificates.map((cert) => (
              <Card key={cert.id} className="agriculture-card p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Issued: {cert.issuedDate} • Valid until: {cert.validUntil}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Credits earned: {cert.creditsEarned}
                    </p>
                  </div>
                  <div className="text-center">
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PDF</p>
                  </div>
                </div>
              </Card>
            ))}

            {certificates.length === 0 && (
              <Card className="agriculture-card p-8 text-center">
                <Award className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No certificates yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Complete learning paths to earn certificates
                </p>
                <Button 
                  onClick={() => setActiveTab('paths')}
                  className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Explore Learning Paths
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Learning Stats */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
            Your Learning Stats
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <p className="text-2xl font-bold text-agriculture-green dark:text-green-400">127</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">XP Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">23</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">6</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Credits Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">18</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Study Streak</p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default LearningPaths;
