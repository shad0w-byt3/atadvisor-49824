
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Smartphone, MessageSquare, CloudOff, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const OfflineSMS = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [preferences, setPreferences] = useState({
    weatherAlerts: true,
    marketUpdates: false,
    farmingReminders: true,
    emergencyAlerts: true
  });
  const { toast } = useToast();

  const handleRegister = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number to register for SMS alerts.",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, this would connect to an SMS service
    setIsRegistered(true);
    toast({
      title: "SMS Alerts Registered",
      description: `You'll now receive farming updates at ${phoneNumber}`,
    });
  };

  const handleUnregister = () => {
    setIsRegistered(false);
    setPhoneNumber('');
    toast({
      title: "SMS Alerts Disabled",
      description: "You'll no longer receive SMS notifications.",
    });
  };

  const updatePreference = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Preferences Updated",
      description: "Your SMS notification preferences have been saved.",
    });
  };

  return (
    <Card className="agriculture-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
          <Smartphone className="h-6 w-6 text-agriculture-green" />
        </div>
        <div>
          <h3 className="font-semibold text-agriculture-green">Offline SMS Alerts</h3>
          <p className="text-sm text-muted-foreground">Stay connected even without internet</p>
        </div>
      </div>

      {!isRegistered ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <CloudOff className="h-5 w-5 text-blue-600" />
            <p className="text-sm text-blue-800">
              Register your phone to receive critical farming updates via SMS when you're offline
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleRegister}
            className="w-full bg-agriculture-green hover:bg-agriculture-green/90"
          >
            Register for SMS Alerts
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <Check className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-green-800 font-medium">SMS Alerts Active</p>
              <p className="text-xs text-green-700">Registered: {phoneNumber}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-agriculture-green">Notification Preferences</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm">Weather Alerts</Label>
                </div>
                <Switch
                  checked={preferences.weatherAlerts}
                  onCheckedChange={(checked) => updatePreference('weatherAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm">Market Updates</Label>
                </div>
                <Switch
                  checked={preferences.marketUpdates}
                  onCheckedChange={(checked) => updatePreference('marketUpdates', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm">Farming Reminders</Label>
                </div>
                <Switch
                  checked={preferences.farmingReminders}
                  onCheckedChange={(checked) => updatePreference('farmingReminders', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm">Emergency Alerts</Label>
                </div>
                <Switch
                  checked={preferences.emergencyAlerts}
                  onCheckedChange={(checked) => updatePreference('emergencyAlerts', checked)}
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleUnregister}
            variant="outline"
            className="w-full"
          >
            Disable SMS Alerts
          </Button>
        </div>
      )}
    </Card>
  );
};
