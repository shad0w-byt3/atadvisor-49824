
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { MapPin, Phone, MessageCircle, Star, Search, Filter, Navigation, Clock } from 'lucide-react';

const ExpertFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Experts' },
    { id: 'extension', name: 'Extension Officers' },
    { id: 'agro-dealers', name: 'Agro-Dealers' },
    { id: 'veterinarians', name: 'Veterinarians' },
    { id: 'soil-experts', name: 'Soil Specialists' },
    { id: 'crop-specialists', name: 'Crop Specialists' }
  ];

  const experts = [
    {
      id: 1,
      name: "Dr. Jane Mutua",
      title: "Senior Extension Officer",
      category: "extension",
      specializations: ["Soil Health", "Organic Farming", "Crop Rotation"],
      location: "Kiambu County Office",
      distance: "2.3 km",
      phone: "+254 712 345 678",
      email: "j.mutua@agriculture.go.ke",
      rating: 4.9,
      reviewCount: 127,
      availability: "Available",
      responseTime: "< 2 hours",
      languages: ["English", "Kiswahili", "Kikuyu"],
      workingHours: "Mon-Fri 8AM-5PM",
      verified: true
    },
    {
      id: 2,
      name: "Peter Mwangi",
      title: "Certified Agro-Dealer",
      category: "agro-dealers",
      specializations: ["Seeds & Fertilizers", "Pest Control", "Farm Equipment"],
      location: "Thika Agricultural Store",
      distance: "5.7 km",
      phone: "+254 722 987 654",
      email: "peter@thikaagrostore.com",
      rating: 4.7,
      reviewCount: 89,
      availability: "Busy",
      responseTime: "< 4 hours",
      languages: ["Kiswahili", "English"],
      workingHours: "Mon-Sat 7AM-7PM",
      verified: true
    },
    {
      id: 3,
      name: "Dr. Grace Akinyi",
      title: "Veterinary Officer",
      category: "veterinarians",
      specializations: ["Livestock Health", "Animal Nutrition", "Disease Prevention"],
      location: "Machakos Veterinary Clinic",
      distance: "8.2 km",
      phone: "+254 733 456 789",
      email: "g.akinyi@machakosvet.com",
      rating: 4.8,
      reviewCount: 156,
      availability: "Available",
      responseTime: "< 1 hour",
      languages: ["English", "Kiswahili", "Luo"],
      workingHours: "24/7 Emergency",
      verified: true
    },
    {
      id: 4,
      name: "Prof. Samuel Kiprotich",
      title: "Soil Science Specialist",
      category: "soil-experts",
      specializations: ["Soil Testing", "Fertility Management", "pH Correction"],
      location: "University Agriculture Dept",
      distance: "12.1 km",
      phone: "+254 744 321 098",
      email: "s.kiprotich@university.ac.ke",
      rating: 5.0,
      reviewCount: 43,
      availability: "By Appointment",
      responseTime: "< 24 hours",
      languages: ["English", "Kiswahili"],
      workingHours: "Tue-Thu 2PM-5PM",
      verified: true
    },
    {
      id: 5,
      name: "Mary Wanjiku",
      title: "Greenhouse Specialist",
      category: "crop-specialists",
      specializations: ["Greenhouse Farming", "Hydroponics", "Climate Control"],
      location: "Green Valley Farm Consultancy",
      distance: "6.8 km",
      phone: "+254 755 567 890",
      email: "mary@greenvalley.co.ke",
      rating: 4.6,
      reviewCount: 72,
      availability: "Available",
      responseTime: "< 3 hours",
      languages: ["English", "Kiswahili"],
      workingHours: "Mon-Fri 9AM-4PM",
      verified: true
    }
  ];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || expert.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Busy': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'By Appointment': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            👨🏽‍🔧 Nearby Agro-Expert Finder
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Find qualified agricultural experts in your area
          </p>
        </div>

        {/* Quick Stats */}
        <Card className="agriculture-card p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-agriculture-green dark:text-green-400">24</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Local Experts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">15</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">km Radius</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">4.8</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">2h</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response</p>
            </div>
          </div>
        </Card>

        {/* Search and Filter */}
        <Card className="agriculture-card p-4">
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                className={`flex-shrink-0 ${
                  selectedCategory === category.id 
                    ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' 
                    : ''
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </Card>

        {/* Experts List */}
        <div className="space-y-4">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="agriculture-card p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 bg-agriculture-green text-white text-xl font-bold">
                  {expert.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400">
                          {expert.name}
                        </h3>
                        {expert.verified && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{expert.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{expert.rating}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">({expert.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <Badge className={getAvailabilityColor(expert.availability)}>
                      {expert.availability}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {expert.location} • {expert.distance} away
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {expert.workingHours}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Responds {expert.responseTime}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Languages</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {expert.languages.map((lang, index) => (
                          <Badge key={index} className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Specializations</p>
                    <div className="flex flex-wrap gap-2">
                      {expert.specializations.map((spec, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <Button 
                      size="sm"
                      className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <Navigation className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <Card className="agriculture-card p-8 text-center">
            <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No experts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search terms or expanding your search radius
            </p>
            <Button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Clear Filters
            </Button>
          </Card>
        )}

        {/* Emergency Contacts */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
            Emergency Agricultural Contacts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="font-medium text-red-800 dark:text-red-400">Plant Disease Emergency</p>
              <p className="text-sm text-red-700 dark:text-red-300">24/7 Hotline: +254 700 123 456</p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="font-medium text-yellow-800 dark:text-yellow-400">Veterinary Emergency</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">24/7 Hotline: +254 700 789 012</p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default ExpertFinder;
