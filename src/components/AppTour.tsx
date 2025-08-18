
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ChevronLeft, ChevronRight, Camera, TrendingUp, Calendar, Settings } from 'lucide-react';

interface AppTourProps {
  onClose: () => void;
}

export const AppTour = ({ onClose }: AppTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      title: "Welcome to AgriTech Advisor",
      description: "Your intelligent farming companion powered by AI. Let's take a quick tour of the main features.",
      icon: "🌱",
      image: "/lovable-uploads/b95ebfc3-b9da-4146-9a7c-374550fa141e.png"
    },
    {
      title: "AI Crop Analysis",
      description: "Use your camera to instantly analyze crop health, detect diseases, and get AI-powered recommendations for treatment.",
      icon: Camera,
      features: ["Real-time disease detection", "Pest identification", "Treatment recommendations", "Progress tracking"]
    },
    {
      title: "Market Insights",
      description: "Stay updated with real-time crop prices, market trends, and make informed decisions about when to sell your produce.",
      icon: TrendingUp,
      features: ["Live market prices", "Price trend analysis", "Best selling times", "Profit optimization"]
    },
    {
      title: "Smart Calendar",
      description: "Plan your farming activities with AI-suggested optimal planting and harvesting times based on weather and crop cycles.",
      icon: Calendar,
      features: ["Planting reminders", "Weather integration", "Seasonal planning", "Task scheduling"]
    },
    {
      title: "Offline SMS Alerts",
      description: "Even without internet, receive critical farming updates and weather alerts via SMS to keep your farm operations running smoothly.",
      icon: "📱",
      features: ["Weather alerts", "Market price updates", "Farming reminders", "Emergency notifications"]
    }
  ];

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white relative overflow-hidden">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Icon/Image */}
          <div className="mb-6">
            {currentStep === 0 ? (
              <div 
                className="w-full h-32 bg-cover bg-center rounded-lg mb-4"
                style={{ backgroundImage: `url('${step.image}')` }}
              />
            ) : (
              <div className="w-16 h-16 agriculture-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                {typeof step.icon === 'string' ? (
                  <span className="text-2xl">{step.icon}</span>
                ) : (
                  <step.icon className="h-8 w-8 text-white" />
                )}
              </div>
            )}
          </div>

          {/* Title and Description */}
          <h3 className="text-xl font-bold text-agriculture-green mb-3">
            {step.title}
          </h3>
          <p className="text-muted-foreground mb-6">
            {step.description}
          </p>

          {/* Features List */}
          {step.features && (
            <div className="text-left mb-6">
              <ul className="space-y-2">
                {step.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-agriculture-green rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep ? 'bg-agriculture-green' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              className="bg-agriculture-green hover:bg-agriculture-green/90 flex items-center gap-2"
            >
              {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < tourSteps.length - 1 && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
