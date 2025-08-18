
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { UserCheck, MessageCircle, Phone, Video, Star, Users, Award } from 'lucide-react';

const Mentorship = () => {
  const [activeTab, setActiveTab] = useState('mentors');

  const mentors = [
    {
      id: 1,
      name: "Dr. Jane Mutua",
      expertise: "Soil Health & Nutrition",
      experience: "15 years",
      location: "Kiambu County",
      rating: 4.9,
      students: 45,
      languages: ["English", "Kiswahili"],
      specialties: ["Organic Farming", "Soil Testing", "Crop Rotation"],
      availability: "Available",
      responseTime: "< 2 hours"
    },
    {
      id: 2,
      name: "Farmer John Kimani",
      expertise: "Maize & Bean Farming",
      experience: "20 years",
      location: "Nakuru County",
      rating: 4.8,
      students: 32,
      languages: ["Kiswahili", "Kikuyu"],
      specialties: ["Intercropping", "Pest Control", "Market Access"],
      availability: "Busy",
      responseTime: "< 6 hours"
    },
    {
      id: 3,
      name: "Grace Akinyi",
      expertise: "Greenhouse Farming",
      experience: "12 years",
      location: "Machakos County",
      rating: 4.7,
      students: 28,
      languages: ["English", "Luo"],
      specialties: ["Tomatoes", "Capsicum", "Drip Irrigation"],
      availability: "Available",
      responseTime: "< 1 hour"
    }
  ];

  const myMentors = [
    {
      id: 1,
      name: "Dr. Jane Mutua",
      lastMessage: "Great progress on your soil test results!",
      lastActive: "2 hours ago",
      totalSessions: 8,
      nextSession: "Tomorrow 2:00 PM"
    }
  ];

  const mentorshipRequests = [
    {
      id: 1,
      name: "Peter Mwangi",
      crop: "Irish Potatoes",
      experience: "Beginner",
      location: "Nyeri County",
      message: "Need help with potato farming techniques and disease prevention"
    }
  ];

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Busy': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Offline': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            🤝 Farmer Mentorship Program
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Connect with experienced farmers and share knowledge
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button
            onClick={() => setActiveTab('mentors')}
            variant={activeTab === 'mentors' ? 'default' : 'outline'}
            className={activeTab === 'mentors' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            Find Mentors
          </Button>
          <Button
            onClick={() => setActiveTab('my-mentors')}
            variant={activeTab === 'my-mentors' ? 'default' : 'outline'}
            className={activeTab === 'my-mentors' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            My Mentors
          </Button>
          <Button
            onClick={() => setActiveTab('requests')}
            variant={activeTab === 'requests' ? 'default' : 'outline'}
            className={activeTab === 'requests' ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' : ''}
          >
            Mentorship Requests
          </Button>
        </div>

        {/* Find Mentors */}
        {activeTab === 'mentors' && (
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="agriculture-card p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 bg-agriculture-green text-white text-xl font-bold">
                    {mentor.name.charAt(0)}
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400">
                          {mentor.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{mentor.expertise}</p>
                      </div>
                      <Badge className={getAvailabilityColor(mentor.availability)}>
                        {mentor.availability}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                        <p className="font-medium text-gray-900 dark:text-white">{mentor.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                        <p className="font-medium text-gray-900 dark:text-white">{mentor.location}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium text-gray-900 dark:text-white">{mentor.rating}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">({mentor.students} students)</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Response time</p>
                        <p className="font-medium text-gray-900 dark:text-white">{mentor.responseTime}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {mentor.specialties.map((specialty, index) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Languages</p>
                      <div className="flex gap-2">
                        {mentor.languages.map((language, index) => (
                          <Badge key={index} className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Request Mentorship
                      </Button>
                      <Button variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* My Mentors */}
        {activeTab === 'my-mentors' && (
          <div className="space-y-4">
            {myMentors.map((mentor) => (
              <Card key={mentor.id} className="agriculture-card p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 bg-agriculture-green text-white text-lg font-bold">
                    {mentor.name.charAt(0)}
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-agriculture-green dark:text-green-400">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {mentor.lastMessage}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Last active: {mentor.lastActive}</span>
                      <span>Sessions: {mentor.totalSessions}</span>
                      <span>Next: {mentor.nextSession}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {myMentors.length === 0 && (
              <Card className="agriculture-card p-8 text-center">
                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No mentors yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Find experienced farmers to guide your journey
                </p>
                <Button 
                  onClick={() => setActiveTab('mentors')}
                  className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Find Mentors
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Mentorship Requests */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {mentorshipRequests.map((request) => (
              <Card key={request.id} className="agriculture-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-agriculture-green dark:text-green-400 mb-2">
                      {request.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Crop: <span className="font-medium text-gray-900 dark:text-white">{request.crop}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Level: <span className="font-medium text-gray-900 dark:text-white">{request.experience}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Location: <span className="font-medium text-gray-900 dark:text-white">{request.location}</span>
                      </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      "{request.message}"
                    </p>
                    <div className="flex gap-3">
                      <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                        Accept
                      </Button>
                      <Button variant="outline">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {mentorshipRequests.length === 0 && (
              <Card className="agriculture-card p-8 text-center">
                <Award className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No mentorship requests
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Requests will appear here when farmers want your guidance
                </p>
              </Card>
            )}
          </div>
        )}

        {/* Become a Mentor */}
        <Card className="agriculture-card p-6 text-center">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-2">
            Share Your Knowledge
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Help other farmers succeed by becoming a mentor in your area of expertise
          </p>
          <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
            <Award className="h-4 w-4 mr-2" />
            Become a Mentor
          </Button>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Mentorship;
