
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, ShoppingCart, Plus, Search } from 'lucide-react';

const SmartMarketplace = () => {
  const [listings, setListings] = useState([
    {
      id: 1,
      crop: 'Maize',
      quantity: '50 bags',
      price: 'KSh 3,500 per bag',
      farmer: 'John Kimani',
      location: 'Kiambu, 2.5 km away',
      phone: '+254 712 345 678',
      quality: 'Grade A',
      available: true,
      posted: '2 hours ago'
    },
    {
      id: 2,
      crop: 'Beans',
      quantity: '30 bags',
      price: 'KSh 8,000 per bag',
      farmer: 'Mary Wanjiku',
      location: 'Thika, 5.2 km away',
      phone: '+254 722 987 654',
      quality: 'Premium',
      available: true,
      posted: '1 day ago'
    },
    {
      id: 3,
      crop: 'Irish Potatoes',
      quantity: '100 bags',
      price: 'KSh 2,800 per bag',
      farmer: 'Peter Mwangi',
      location: 'Nyeri, 12 km away',
      phone: '+254 733 456 789',
      quality: 'Grade A',
      available: false,
      posted: '3 days ago'
    },
    {
      id: 4,
      crop: 'Tomatoes',
      quantity: '25 crates',
      price: 'KSh 1,200 per crate',
      farmer: 'Grace Akinyi',
      location: 'Machakos, 8.5 km away',
      phone: '+254 744 321 098',
      quality: 'Fresh',
      available: true,
      posted: '5 hours ago'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddListing, setShowAddListing] = useState(false);

  const filteredListings = listings.filter(listing =>
    listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.farmer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Premium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Grade A': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Fresh': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            🛒 Smart Marketplace
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Buy and sell crops locally within your community
          </p>
        </div>

        {/* Search and Add Listing */}
        <Card className="agriculture-card p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search crops or farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <Button 
              onClick={() => setShowAddListing(!showAddListing)}
              className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              List Crop
            </Button>
          </div>
        </Card>

        {/* Add Listing Form */}
        {showAddListing && (
          <Card className="agriculture-card p-6">
            <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
              List Your Crop for Sale
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Crop type" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Input placeholder="Quantity" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Input placeholder="Price per unit" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
              <Input placeholder="Quality grade" className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
            </div>
            <div className="mt-4 flex gap-3">
              <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                Post Listing
              </Button>
              <Button variant="outline" onClick={() => setShowAddListing(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Marketplace Listings */}
        <div className="space-y-4">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="agriculture-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400">
                    {listing.crop}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">by {listing.farmer}</p>
                </div>
                <div className="text-right">
                  <Badge className={getQualityColor(listing.quality)}>
                    {listing.quality}
                  </Badge>
                  {!listing.available && (
                    <Badge className="ml-2 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                      Sold Out
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quantity</p>
                  <p className="font-medium text-gray-900 dark:text-white">{listing.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                  <p className="font-medium text-agriculture-green dark:text-green-400">{listing.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Posted</p>
                  <p className="font-medium text-gray-900 dark:text-white">{listing.posted}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {listing.location}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-agriculture-green text-agriculture-green hover:bg-agriculture-green hover:text-white dark:border-green-400 dark:text-green-400"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  {listing.available && (
                    <Button
                      size="sm"
                      className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Interested
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <Card className="agriculture-card p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No listings found matching your search.
            </p>
            <Button 
              onClick={() => setShowAddListing(true)}
              className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Be the first to list!
            </Button>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default SmartMarketplace;
