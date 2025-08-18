
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navigation, Satellite, MapPin, Ruler, Droplets, Thermometer } from 'lucide-react';

const PlotMapping = () => {
  const [selectedField, setSelectedField] = useState('field-1');

  const fields = [
    {
      id: 'field-1',
      name: 'Main Field A',
      area: '2.3 acres',
      crop: 'Maize',
      coordinates: '-1.286389, 36.817223',
      soilType: 'Clay loam',
      waterAccess: 'Borehole - 50m',
      slope: 'Gentle (3-5%)',
      lastAnalyzed: '2 days ago'
    },
    {
      id: 'field-2', 
      name: 'Greenhouse Plot',
      area: '0.5 acres',
      crop: 'Tomatoes',
      coordinates: '-1.286500, 36.817350',
      soilType: 'Sandy loam',
      waterAccess: 'Drip irrigation',
      slope: 'Flat (0-2%)',
      lastAnalyzed: '5 days ago'
    }
  ];

  const analysisResults = {
    'field-1': {
      recommendations: [
        "Install drainage channels in the lower section to prevent waterlogging",
        "Consider contour farming due to gentle slope",
        "Optimal planting density: 25,000 plants per hectare"
      ],
      nearbyFeatures: [
        { name: "River Kiambu", distance: "200m", type: "water" },
        { name: "Access Road", distance: "50m", type: "infrastructure" },
        { name: "Neighbor's Farm", distance: "30m", type: "boundary" }
      ],
      environmentalFactors: {
        elevation: "1,650m above sea level",
        rainfall: "1,200mm annually",
        averageTemp: "18-24°C",
        sunExposure: "7-8 hours daily"
      }
    }
  };

  const currentField = fields.find(f => f.id === selectedField);
  const currentAnalysis = analysisResults[selectedField];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green dark:text-green-400 mb-2">
            📍 AI-Based Plot Mapping
          </h1>
          <p className="text-muted-foreground dark:text-gray-300">
            Satellite analysis and location-specific farming advice
          </p>
        </div>

        {/* Field Selection */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
            Select Field for Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <Button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                variant={selectedField === field.id ? 'default' : 'outline'}
                className={`h-auto p-4 justify-start ${
                  selectedField === field.id 
                    ? 'bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700' 
                    : ''
                }`}
              >
                <div className="text-left w-full">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{field.name}</h4>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="space-y-1 text-sm opacity-75">
                    <p>Area: {field.area}</p>
                    <p>Crop: {field.crop}</p>
                    <p>Last analyzed: {field.lastAnalyzed}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
          
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700">
            <Navigation className="h-4 w-4 mr-2" />
            Add New Field
          </Button>
        </Card>

        {/* Satellite View */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4 flex items-center gap-2">
            <Satellite className="h-5 w-5" />
            Satellite View - {currentField?.name}
          </h3>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 flex items-center justify-center mb-4">
            <div className="text-center">
              <Satellite className="h-16 w-16 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 dark:text-gray-400">
                Satellite imagery would be displayed here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Coordinates: {currentField?.coordinates}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Ruler className="h-6 w-6 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Area</p>
              <p className="font-medium text-gray-900 dark:text-white">{currentField?.area}</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Navigation className="h-6 w-6 mx-auto mb-1 text-green-600 dark:text-green-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Slope</p>
              <p className="font-medium text-gray-900 dark:text-white">{currentField?.slope}</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Droplets className="h-6 w-6 mx-auto mb-1 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Water Source</p>
              <p className="font-medium text-gray-900 dark:text-white">{currentField?.waterAccess}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Thermometer className="h-6 w-6 mx-auto mb-1 text-purple-600 dark:text-purple-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Soil Type</p>
              <p className="font-medium text-gray-900 dark:text-white">{currentField?.soilType}</p>
            </div>
          </div>
        </Card>

        {/* AI Analysis Results */}
        {currentAnalysis && (
          <>
            <Card className="agriculture-card p-6">
              <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
                AI Analysis & Recommendations
              </h3>
              <div className="space-y-3">
                {currentAnalysis.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-blue-800 dark:text-blue-300">{rec}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="agriculture-card p-6">
              <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
                Environmental Factors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Elevation</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {currentAnalysis.environmentalFactors.elevation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Annual Rainfall</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {currentAnalysis.environmentalFactors.rainfall}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Temperature Range</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {currentAnalysis.environmentalFactors.averageTemp}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Daily Sun Exposure</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {currentAnalysis.environmentalFactors.sunExposure}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="agriculture-card p-6">
              <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
                Nearby Features
              </h3>
              <div className="space-y-3">
                {currentAnalysis.nearbyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-agriculture-green dark:text-green-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{feature.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">{feature.distance}</p>
                      <Badge className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                        {feature.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* Actions */}
        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4">
            Field Management Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button className="bg-agriculture-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
              <Satellite className="h-4 w-4 mr-2" />
              Update Satellite Data
            </Button>
            <Button variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Mark Field Boundaries
            </Button>
            <Button variant="outline">
              <Ruler className="h-4 w-4 mr-2" />
              Measure Area
            </Button>
            <Button variant="outline">
              <Droplets className="h-4 w-4 mr-2" />
              Plan Irrigation
            </Button>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default PlotMapping;
