import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, MapPin, Sprout, Check, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  name: string;
  location: string;
  farmSize: string;
  crops: string[];
  experience: string;
  setupComplete: boolean;
}

const CROPS_OPTIONS = [
  { id: 'cassava', label: 'Cassava', emoji: '🥔' },
  { id: 'beans', label: 'Beans', emoji: '🫘' },
  { id: 'maize', label: 'Maize', emoji: '🌽' },
  { id: 'bananas', label: 'Bananas', emoji: '🍌' },
  { id: 'potatoes', label: 'Sweet Potatoes', emoji: '🍠' },
  { id: 'tomatoes', label: 'Tomatoes', emoji: '🍅' },
  { id: 'coffee', label: 'Coffee', emoji: '☕' },
  { id: 'tea', label: 'Tea', emoji: '🍵' },
  { id: 'rice', label: 'Rice', emoji: '🌾' },
  { id: 'vegetables', label: 'Vegetables', emoji: '🥬' },
];

const LOCATIONS = [
  'Kigali', 'Musanze', 'Rubavu', 'Huye', 'Muhanga', 
  'Nyagatare', 'Rusizi', 'Kayonza', 'Rwamagana', 'Other'
];

const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'Beginner (0-2 years)', icon: '🌱' },
  { id: 'intermediate', label: 'Intermediate (3-5 years)', icon: '🌿' },
  { id: 'experienced', label: 'Experienced (5+ years)', icon: '🌳' },
];

export const UserProfileSetup = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    location: '',
    farmSize: '',
    crops: [],
    experience: '',
    setupComplete: false,
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      if (!parsed.setupComplete) {
        setIsOpen(true);
      }
    } else {
      // First time user
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, []);

  const toggleCrop = (cropId: string) => {
    setProfile(prev => ({
      ...prev,
      crops: prev.crops.includes(cropId)
        ? prev.crops.filter(c => c !== cropId)
        : [...prev.crops, cropId]
    }));
  };

  const handleComplete = () => {
    const completeProfile = { ...profile, setupComplete: true };
    localStorage.setItem('userProfile', JSON.stringify(completeProfile));
    setIsOpen(false);
    toast.success(`Welcome, ${profile.name}! Your farm profile is ready.`);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return profile.name.trim().length >= 2;
      case 2: return profile.location !== '';
      case 3: return profile.crops.length > 0;
      case 4: return profile.experience !== '';
      default: return false;
    }
  };

  const totalSteps = 4;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sprout className="w-5 h-5 text-primary" />
            </div>
            <span>Welcome to AgriTech Advisor</span>
          </DialogTitle>
          <DialogDescription>
            Let's personalize your farming experience
          </DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="space-y-4 py-2">
          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">What's your name?</h3>
                <p className="text-sm text-muted-foreground">We'll use this to personalize your experience</p>
              </div>
              <div>
                <Label htmlFor="name" className="text-foreground">Your Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="mt-1"
                  maxLength={50}
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Where is your farm?</h3>
                <p className="text-sm text-muted-foreground">This helps us provide local weather and market data</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {LOCATIONS.map((loc) => (
                  <Button
                    key={loc}
                    variant={profile.location === loc ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setProfile(prev => ({ ...prev, location: loc }))}
                    className="justify-start"
                  >
                    {profile.location === loc && <Check className="w-4 h-4 mr-1" />}
                    {loc}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Crops */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sprout className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">What do you grow?</h3>
                <p className="text-sm text-muted-foreground">Select all crops you cultivate</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {CROPS_OPTIONS.map((crop) => (
                  <Badge
                    key={crop.id}
                    variant={profile.crops.includes(crop.id) ? 'default' : 'outline'}
                    className={`cursor-pointer py-2 px-3 text-sm transition-all ${
                      profile.crops.includes(crop.id) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-primary/10'
                    }`}
                    onClick={() => toggleCrop(crop.id)}
                  >
                    <span className="mr-1">{crop.emoji}</span>
                    {crop.label}
                    {profile.crops.includes(crop.id) && <Check className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Experience */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <h3 className="font-semibold text-lg text-foreground">Your farming experience?</h3>
                <p className="text-sm text-muted-foreground">We'll tailor advice to your skill level</p>
              </div>
              <div className="space-y-2">
                {EXPERIENCE_LEVELS.map((exp) => (
                  <Button
                    key={exp.id}
                    variant={profile.experience === exp.id ? 'default' : 'outline'}
                    className="w-full justify-start h-auto py-3"
                    onClick={() => setProfile(prev => ({ ...prev, experience: exp.id }))}
                  >
                    <span className="text-xl mr-3">{exp.icon}</span>
                    <span>{exp.label}</span>
                    {profile.experience === exp.id && <Check className="w-4 h-4 ml-auto" />}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => setStep(prev => prev - 1)}
            disabled={step === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          
          {step < totalSteps ? (
            <Button
              onClick={() => setStep(prev => prev + 1)}
              disabled={!canProceed()}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!canProceed()}
              className="bg-primary hover:bg-primary/90"
            >
              <Check className="w-4 h-4 mr-1" />
              Complete Setup
            </Button>
          )}
        </div>

        {/* Skip option */}
        <button
          onClick={() => {
            localStorage.setItem('userProfile', JSON.stringify({ ...profile, setupComplete: true }));
            setIsOpen(false);
          }}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </DialogContent>
    </Dialog>
  );
};
