
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

export const OnboardingFlow = ({ onComplete, onSkip }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    farmSize: '',
    primaryCrop: '',
    experience: '',
    goals: []
  });

  const steps = [
    {
      title: "Welcome to AgriTech Advisor! 🌱",
      subtitle: "Let's set up your farming profile",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">What's your name?</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="location">Where is your farm located?</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Ogun State, Nigeria"
            />
          </div>
        </div>
      )
    },
    {
      title: "Tell us about your farm 🚜",
      subtitle: "This helps us provide better recommendations",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="farmSize">Farm size (in hectares)</Label>
            <Input
              id="farmSize"
              type="number"
              value={formData.farmSize}
              onChange={(e) => setFormData(prev => ({ ...prev, farmSize: e.target.value }))}
              placeholder="e.g., 5.2"
            />
          </div>
          <div>
            <Label htmlFor="primaryCrop">Primary crop</Label>
            <Select value={formData.primaryCrop} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, primaryCrop: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select your main crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cassava">Cassava</SelectItem>
                <SelectItem value="maize">Maize</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="yam">Yam</SelectItem>
                <SelectItem value="beans">Beans</SelectItem>
                <SelectItem value="plantain">Plantain</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      title: "Your farming experience 📚",
      subtitle: "Help us tailor our advice to your level",
      content: (
        <div className="space-y-4">
          <div>
            <Label>How long have you been farming?</Label>
            <Select value={formData.experience} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, experience: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Less than 1 year (Beginner)</SelectItem>
                <SelectItem value="intermediate">1-5 years (Intermediate)</SelectItem>
                <SelectItem value="experienced">5-10 years (Experienced)</SelectItem>
                <SelectItem value="expert">More than 10 years (Expert)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>What are your main goals? (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                'Increase yield',
                'Reduce costs',
                'Disease prevention',
                'Market analysis',
                'Crop planning',
                'Sustainable farming'
              ].map((goal) => (
                <Button
                  key={goal}
                  variant={formData.goals.includes(goal) ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    const goals = formData.goals.includes(goal)
                      ? formData.goals.filter(g => g !== goal)
                      : [...formData.goals, goal];
                    setFormData(prev => ({ ...prev, goals }));
                  }}
                >
                  {goal}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "You're all set! 🎉",
      subtitle: "Welcome to the future of farming",
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 agriculture-gradient rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-agriculture-green mb-2">
              Welcome, {formData.name}! 👋
            </h3>
            <p className="text-muted-foreground">
              Your profile has been created. You can now start using AgriTech Advisor to:
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl mb-1">📸</div>
              <p className="font-medium">AI Crop Analysis</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-1">📈</div>
              <p className="font-medium">Market Insights</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl mb-1">🌤️</div>
              <p className="font-medium">Weather Alerts</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-1">🤖</div>
              <p className="font-medium">AI Assistant</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim() && formData.location.trim();
      case 1:
        return formData.farmSize && formData.primaryCrop;
      case 2:
        return formData.experience;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 agriculture-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🌱</span>
          </div>
          <span className="font-bold text-agriculture-green">AgriTech Advisor</span>
        </div>
        <Button variant="ghost" onClick={onSkip} className="text-sm">
          Skip Setup
        </Button>
      </div>

      {/* Progress */}
      <div className="px-4 mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-agriculture-green">
              {steps[currentStep].title}
            </CardTitle>
            {steps[currentStep].subtitle && (
              <p className="text-muted-foreground">
                {steps[currentStep].subtitle}
              </p>
            )}
          </CardHeader>
          <CardContent>
            {steps[currentStep].content}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-agriculture-green hover:bg-green-700"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
