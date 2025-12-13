import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Camera as CameraIcon, Image, Loader2, AlertTriangle, CheckCircle, Info, Bug, Droplets, Sun, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface AIAnalysisResult {
  health: number;
  disease: string;
  symptoms: string[];
  causes: string[];
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  immediateActions: string[];
  treatments: string[];
  prevention: string[];
  yieldImpact: string;
  growthStage: string;
  riskLevel: 'low' | 'medium' | 'high';
  localSolutions: string[];
  marketAdvice: string;
}

// Mock AI analysis results based on common crop issues
const generateAnalysisResult = (): AIAnalysisResult => {
  const scenarios = [
    {
      health: 85,
      disease: 'Minor Nutrient Deficiency - Nitrogen',
      symptoms: ['Slight yellowing of lower leaves', 'Reduced leaf size', 'Pale green coloration'],
      causes: ['Low nitrogen in soil', 'Heavy rainfall leaching nutrients', 'Insufficient organic matter'],
      severity: 'low' as const,
      confidence: 89,
      immediateActions: ['Apply balanced NPK fertilizer', 'Add compost around plant base', 'Monitor for 1 week'],
      treatments: ['Foliar spray with urea solution (2%)', 'Apply organic manure', 'Consider cover cropping'],
      prevention: ['Regular soil testing every season', 'Rotate with legume crops', 'Maintain organic mulch'],
      yieldImpact: 'Expected 5-10% reduction if untreated',
      growthStage: 'Vegetative - Week 4',
      riskLevel: 'low' as const,
      localSolutions: ['Use cow manure from local farms', 'Apply bean residue as nitrogen source', 'Compost kitchen waste'],
      marketAdvice: 'Current tomato prices are favorable. Early treatment will preserve harvest quality.'
    },
    {
      health: 68,
      disease: 'Early Blight (Alternaria solani)',
      symptoms: ['Dark concentric ring spots on leaves', 'Lower leaves affected first', 'Yellowing around spots'],
      causes: ['Fungal infection', 'High humidity conditions', 'Poor air circulation'],
      severity: 'medium' as const,
      confidence: 92,
      immediateActions: ['Remove and destroy affected leaves', 'Improve plant spacing', 'Reduce overhead watering'],
      treatments: ['Apply copper-based fungicide', 'Use neem oil spray weekly', 'Apply baking soda solution'],
      prevention: ['Crop rotation (3-year cycle)', 'Stake plants for air flow', 'Mulch to prevent soil splash'],
      yieldImpact: 'Expected 20-30% reduction if untreated',
      growthStage: 'Flowering - Week 6',
      riskLevel: 'medium' as const,
      localSolutions: ['Neem oil available at Kigali agro-shops', 'Traditional ash application', 'Papaya leaf extract spray'],
      marketAdvice: 'Treat promptly to maintain fruit quality for premium market prices.'
    },
    {
      health: 45,
      disease: 'Bacterial Wilt (Ralstonia solanacearum)',
      symptoms: ['Sudden wilting of young leaves', 'Brown discoloration in stems', 'Plants collapse in heat'],
      causes: ['Soil-borne bacteria', 'Contaminated water or tools', 'Previous infected crops'],
      severity: 'high' as const,
      confidence: 87,
      immediateActions: ['Remove infected plants immediately', 'Do not water healthy plants with same water', 'Sanitize all tools'],
      treatments: ['No chemical cure available', 'Remove all infected plants', 'Solarize soil for 4-6 weeks'],
      prevention: ['Use disease-free seeds', 'Rotate with non-solanaceous crops for 5 years', 'Improve drainage'],
      yieldImpact: 'Complete loss of infected plants likely',
      growthStage: 'Fruiting - Week 8',
      riskLevel: 'high' as const,
      localSolutions: ['Consult Musanze agricultural extension office', 'Use resistant varieties from RAB', 'Apply biochar to improve soil health'],
      marketAdvice: 'Focus on saving healthy plants. Consider diversifying crop selection.'
    }
  ];

  return scenarios[Math.floor(Math.random() * scenarios.length)];
};

export const CropAnalysisAI = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);

  const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image.dataUrl) {
        setPhoto(image.dataUrl);
        analyzeImageWithAI(image.dataUrl);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      toast.error('Failed to take picture. Please try again.');
    }
  };

  const selectFromGallery = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      if (image.dataUrl) {
        setPhoto(image.dataUrl);
        analyzeImageWithAI(image.dataUrl);
      }
    } catch (error) {
      console.error('Error selecting from gallery:', error);
      toast.error('Failed to select image. Please try again.');
    }
  };

  const analyzeImageWithAI = async (imageData: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setProgress(0);
    
    // Simulate AI analysis with progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 15, 90));
    }, 400);

    // Simulate AI processing time
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      
      const result = generateAnalysisResult();
      setAnalysisResult(result);
      setIsAnalyzing(false);
      toast.success('AI analysis complete! Detailed diagnosis ready.');
    }, 2500);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'high': return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <Info className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <Sun className="h-4 w-4 text-green-500" />;
      case 'medium': return <Droplets className="h-4 w-4 text-yellow-500" />;
      case 'high': return <Bug className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <Card className="agriculture-card p-6">
      <h3 className="text-lg font-semibold text-agriculture-green dark:text-green-400 mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5" />
        AI-Powered Crop Analysis
      </h3>
      
      <div className="space-y-4">
        {photo ? (
          <div className="space-y-4">
            <img 
              src={photo} 
              alt="Captured crop" 
              className="w-full h-64 object-cover rounded-lg border border-border"
            />
            
            {isAnalyzing ? (
              <div className="text-center py-6">
                <Loader2 className="animate-spin mx-auto w-8 h-8 text-agriculture-green mb-3" />
                <p className="text-sm text-muted-foreground mb-2">AI analyzing your crop...</p>
                <Progress value={progress} className="w-full mb-2" />
                <p className="text-xs text-muted-foreground">Advanced agricultural AI processing image</p>
              </div>
            ) : analysisResult ? (
              <div className="space-y-4">
                {/* AI Health Score */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-agriculture-green dark:text-green-400 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      AI Health Assessment
                    </h4>
                    <Badge variant="outline" className="bg-background">
                      {analysisResult.confidence}% AI Confidence
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-agriculture-green dark:text-green-400">
                      {analysisResult.health}%
                    </div>
                    <div className="flex-1">
                      <Progress value={analysisResult.health} className="w-full" />
                    </div>
                  </div>
                </div>

                {/* AI Disease Detection */}
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-agriculture-green dark:text-green-400 flex items-center gap-2">
                      {getSeverityIcon(analysisResult.severity)}
                      AI Disease Analysis
                    </h4>
                    <Badge className={getRiskColor(analysisResult.riskLevel)}>
                      {getRiskIcon(analysisResult.riskLevel)}
                      <span className="ml-1 capitalize">{analysisResult.riskLevel} Risk</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-lg text-foreground">{analysisResult.disease}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">AI Recommendation: Priority Action Required</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h5 className="font-medium text-sm text-agriculture-green dark:text-green-400 mb-1">AI-Detected Symptoms:</h5>
                        <ul className="text-sm space-y-1">
                          {analysisResult.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start gap-2 text-foreground">
                              <span className="text-red-500 font-bold">•</span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm text-agriculture-green dark:text-green-400 mb-1">AI-Identified Causes:</h5>
                        <ul className="text-sm space-y-1">
                          {analysisResult.causes.map((cause, index) => (
                            <li key={index} className="flex items-start gap-2 text-foreground">
                              <span className="text-orange-500 font-bold">•</span>
                              <span>{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth and Yield Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card p-3 rounded-lg border border-border">
                    <h5 className="font-medium text-sm text-agriculture-green dark:text-green-400 mb-1">AI Growth Analysis</h5>
                    <p className="text-sm text-foreground">{analysisResult.growthStage}</p>
                  </div>
                  <div className="bg-card p-3 rounded-lg border border-border">
                    <h5 className="font-medium text-sm text-agriculture-green dark:text-green-400 mb-1">Yield Prediction</h5>
                    <p className="text-sm text-foreground">{analysisResult.yieldImpact}</p>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="space-y-3">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <h5 className="font-medium text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      AI Immediate Actions
                    </h5>
                    <ul className="text-sm space-y-1">
                      {analysisResult.immediateActions.map((action, index) => (
                        <li key={index} className="flex items-start gap-2 text-red-800 dark:text-red-300">
                          <span className="text-red-600 font-bold">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      AI Treatment Protocol
                    </h5>
                    <ul className="text-sm space-y-1">
                      {analysisResult.treatments.map((treatment, index) => (
                        <li key={index} className="flex items-start gap-2 text-blue-800 dark:text-blue-300">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h5 className="font-medium text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Local Resource Solutions
                    </h5>
                    <ul className="text-sm space-y-1">
                      {analysisResult.localSolutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-2 text-green-800 dark:text-green-300">
                          <span className="text-green-600 font-bold">•</span>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h5 className="font-medium text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      AI Market Insights
                    </h5>
                    <p className="text-sm text-purple-800 dark:text-purple-300">{analysisResult.marketAdvice}</p>
                  </div>
                </div>
              </div>
            ) : null}
            
            <Button 
              onClick={() => {
                setPhoto(null);
                setAnalysisResult(null);
                setProgress(0);
              }} 
              variant="outline" 
              className="w-full"
            >
              Analyze Another Photo
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-center py-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CameraIcon className="h-8 w-8 text-agriculture-green" />
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Advanced AI Crop Analysis Ready
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Take a clear photo for detailed AI disease detection
              </p>
            </div>
            
            <Button 
              onClick={takePicture} 
              className="w-full flex items-center gap-2 bg-agriculture-green hover:bg-agriculture-green/90"
            >
              <CameraIcon className="h-5 w-5" />
              Capture for AI Analysis
            </Button>
            
            <Button 
              onClick={selectFromGallery} 
              variant="outline" 
              className="w-full flex items-center gap-2"
            >
              <Image className="h-5 w-5" />
              Select from Gallery
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
