
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { UserProfile } from '@/components/UserProfile';
import { NotificationCenter } from '@/components/NotificationCenter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Globe, 
  HelpCircle, 
  LogOut, 
  Info,
  Download,
  Trash2,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { t } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [notificationSettings, setNotificationSettings] = useState({
    weatherAlerts: true,
    marketUpdates: true,
    taskReminders: true,
    communityUpdates: false,
    systemUpdates: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    analytics: false,
    locationServices: true
  });

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const clearCache = () => {
    localStorage.clear();
    toast.success('Cache cleared successfully');
  };

  const exportData = () => {
    // In a real app, this would export user data
    toast.success('Data export initiated. You will receive an email shortly.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30">
      <Header />
      
      <main className="p-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-agriculture-green mb-2">
              {t('nav.settings')}
            </h1>
            <p className="text-muted-foreground">
              Manage your account and app preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">System</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <UserProfile />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="agriculture-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-agriculture-green" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(notificationSettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <Label htmlFor={key} className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <Switch
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) =>
                            setNotificationSettings(prev => ({ ...prev, [key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <NotificationCenter />
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card className="agriculture-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-agriculture-green" />
                    Privacy & Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {Object.entries(privacySettings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <Label htmlFor={key} className="capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {key === 'dataCollection' && 'Allow us to collect usage data to improve the app'}
                            {key === 'analytics' && 'Share anonymous analytics to help us understand usage patterns'}
                            {key === 'locationServices' && 'Enable location-based weather and market data'}
                          </p>
                        </div>
                        <Switch
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) =>
                            setPrivacySettings(prev => ({ ...prev, [key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium">Data Management</h4>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={exportData}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export My Data
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => toast.info('Contact support to delete your account')}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="agriculture-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-agriculture-green" />
                      Language & Region
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LanguageSwitcher />
                  </CardContent>
                </Card>

                <Card className="agriculture-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-agriculture-green" />
                      App Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={clearCache}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cache
                    </Button>
                    
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Version:</strong> 1.0.0</p>
                      <p><strong>Build:</strong> 2024.01.15</p>
                      <p><strong>Storage Used:</strong> 12.3 MB</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="agriculture-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-agriculture-green" />
                      Support & Help
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate('/about')}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      About Us
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Info className="h-4 w-4 mr-2" />
                      User Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Privacy Policy
                    </Button>
                  </CardContent>
                </Card>

                <Card className="agriculture-card">
                  <CardHeader>
                    <CardTitle className="text-red-600">Account Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('auth.logout')}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Settings;
