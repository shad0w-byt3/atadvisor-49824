
import { useState, useEffect } from 'react';
import { Cloud, Sun, Droplets, Wind, Eye, Thermometer, CloudRain } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  uvIndex: number;
}

export const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    feelsLike: 26,
    uvIndex: 6
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const forecast = [
    { day: 'Today', temp: '24°', icon: Sun, condition: 'Partly Cloudy' },
    { day: 'Tomorrow', temp: '26°', icon: Cloud, condition: 'Cloudy' },
    { day: 'Friday', temp: '22°', icon: CloudRain, condition: 'Light Rain' },
  ];

  const fetchWeatherData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with realistic Kigali weather data
      setTimeout(() => {
        const temperatures = [22, 23, 24, 25, 26, 27];
        const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'];
        const humidities = [60, 65, 70, 75];
        
        const newWeatherData: WeatherData = {
          temperature: temperatures[Math.floor(Math.random() * temperatures.length)],
          condition: conditions[Math.floor(Math.random() * conditions.length)],
          humidity: humidities[Math.floor(Math.random() * humidities.length)],
          windSpeed: Math.floor(Math.random() * 10) + 8,
          visibility: Math.floor(Math.random() * 5) + 8,
          feelsLike: temperatures[Math.floor(Math.random() * temperatures.length)] + 2,
          uvIndex: Math.floor(Math.random() * 5) + 4
        };
        
        setWeatherData(newWeatherData);
        setIsLoading(false);
        
        toast({
          title: "Weather Updated",
          description: "Latest weather data for Kigali, Rwanda has been fetched.",
        });
      }, 1500);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setIsLoading(false);
      toast({
        title: "Weather Update Failed",
        description: "Using cached weather data for Kigali.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Fetch weather data on component mount
    fetchWeatherData();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'cloudy': return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'partly cloudy': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'light rain': return <CloudRain className="h-8 w-8 text-blue-500" />;
      default: return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getFarmingAdvice = (condition: string, temperature: number) => {
    if (condition.toLowerCase().includes('rain')) {
      return 'Good day for indoor farm activities';
    } else if (temperature > 25) {
      return 'Perfect for coffee and banana cultivation';
    } else if (temperature < 20) {
      return 'Ideal for cool-season crops like beans';
    } else {
      return 'Excellent conditions for most crops';
    }
  };

  return (
    <Card className="agriculture-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-agriculture-green">Weather Forecast - Kigali</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs"
          onClick={fetchWeatherData}
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Refresh'}
        </Button>
      </div>
      
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
        <div className="flex items-center gap-3">
          {getWeatherIcon(weatherData.condition)}
          <div>
            <div className="text-2xl font-bold text-agriculture-green">{weatherData.temperature}°C</div>
            <div className="text-sm text-muted-foreground">{weatherData.condition}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-agriculture-green">
            {getFarmingAdvice(weatherData.condition, weatherData.temperature)}
          </div>
          <div className="text-xs text-muted-foreground">UV Index: {weatherData.uvIndex}</div>
        </div>
      </div>
      
      {/* Weather Details */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="text-center">
          <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Humidity</div>
          <div className="font-medium">{weatherData.humidity}%</div>
        </div>
        <div className="text-center">
          <Wind className="h-5 w-5 text-gray-500 mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Wind</div>
          <div className="font-medium">{weatherData.windSpeed} km/h</div>
        </div>
        <div className="text-center">
          <Eye className="h-5 w-5 text-gray-400 mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Visibility</div>
          <div className="font-medium">{weatherData.visibility} km</div>
        </div>
        <div className="text-center">
          <Thermometer className="h-5 w-5 text-red-400 mx-auto mb-1" />
          <div className="text-xs text-muted-foreground">Feels like</div>
          <div className="font-medium">{weatherData.feelsLike}°C</div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-agriculture-green mb-2">3-Day Forecast</div>
        {forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50/50 transition-colors">
            <div className="flex items-center gap-2">
              <day.icon className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">{day.day}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{day.condition}</span>
              <span className="text-sm font-bold">{day.temp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Farming Tips based on weather */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <h4 className="font-medium text-agriculture-green text-sm mb-2">🌾 Today's Farming Tips</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Best time for watering: Early morning (6-8 AM)</li>
          <li>• Ideal humidity for cassava and sweet potato cultivation</li>
          <li>• Monitor coffee plants for optimal berry development</li>
        </ul>
      </div>
    </Card>
  );
};
