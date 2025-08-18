
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Camera, MapPin, Phone, Mail, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || '',
    phone: '',
    location: '',
    farmSize: '',
    primaryCrop: 'Cassava'
  });

  const handleSave = () => {
    // In a real app, this would update the user profile in Supabase
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const stats = [
    { label: 'Crops Monitored', value: '12', icon: '🌱' },
    { label: 'Analyses Done', value: '47', icon: '📊' },
    { label: 'Days Active', value: '23', icon: '📅' },
    { label: 'Yield Improvement', value: '+23%', icon: '📈' }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="agriculture-card">
        <CardHeader className="text-center">
          <div className="relative mx-auto mb-4">
            <div className="w-24 h-24 agriculture-gradient rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <Button 
              size="icon" 
              className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-50"
              variant="outline"
            >
              <Camera className="h-4 w-4 text-agriculture-green" />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <CardTitle className="text-2xl text-agriculture-green">
              {profileData.name || 'Farmer'}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
              className="h-8 w-8"
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {user?.email}
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Premium Farmer
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+234 xxx xxx xxxx"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <Label htmlFor="farmSize">Farm Size (hectares)</Label>
                  <Input
                    id="farmSize"
                    value={profileData.farmSize}
                    onChange={(e) => setProfileData(prev => ({ ...prev, farmSize: e.target.value }))}
                    placeholder="e.g., 5.2"
                  />
                </div>
              </div>
              
              <Button onClick={handleSave} className="w-full bg-agriculture-green hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profileData.phone || 'Add phone number'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{profileData.location || 'Add location'}</span>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Farm Size</p>
                  <p className="font-semibold">{profileData.farmSize || 'Not set'} ha</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Primary Crop</p>
                  <p className="font-semibold">{profileData.primaryCrop}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="agriculture-card p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-bold text-agriculture-green">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <Card className="agriculture-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🏆 Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
              <div className="text-2xl">🥇</div>
              <div>
                <p className="font-medium">Early Adopter</p>
                <p className="text-sm text-muted-foreground">First 100 users of AgriTech Advisor</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
              <div className="text-2xl">📸</div>
              <div>
                <p className="font-medium">AI Analyst</p>
                <p className="text-sm text-muted-foreground">Completed 50 crop analyses</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
              <div className="text-2xl">🌱</div>
              <div>
                <p className="font-medium">Green Thumb</p>
                <p className="text-sm text-muted-foreground">Monitored crops for 30 days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
