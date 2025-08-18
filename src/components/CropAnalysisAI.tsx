
import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Camera as CameraIcon, Image, Loader2, AlertTriangle, CheckCircle, Info, Bug, Droplets, Sun, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
  rawAnalysis?: string;
}

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
      toast.error('Failed to take picture');
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
      toast.error('Failed to select image');
    }
  };

  const analyzeImageWithAI = async (imageData: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setProgress(0);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      console.log('Sending image to AI for analysis...');
      
      const { data, error } = await supabase.functions.invoke('ai-crop-analysis', {
        body: {
          imageData: imageData,
          cropType: 'mixed crops',
          location: 'Kigali, Rwanda'
        }
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setAnalysisResult(data);
        toast.success('AI analysis complete! Detailed diagnosis ready.');
      }
    } catch (error) {
      console.error('Error in AI analysis:', error);
      toast.error('AI analysis failed. Please try again.');
      
      // Fallback to basic analysis
      setAnalysisResult({
        health: 75,
        disease: 'Analysis Error',
        symptoms: ['Unable to complete full AI analysis'],
        causes: ['Network or service issue'],
        severity: 'medium',
        confidence: 50,
        immediateActions: ['Try again with better lighting'],
        treatments: ['Ensure good image quality'],
        prevention: ['Check internet connection'],
        yieldImpact: 'Analysis incomplete',
        growthStage: 'Cannot determine',
        riskLevel: 'medium',
        localSolutions: ['Manual crop inspection recommended'],
        marketAdvice: 'Consult local agricultural experts'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
      <h3 className="text-lg font-semibold text-agriculture-green mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5" />
        AI-Powered Crop Analysis
      </h3>
      
      <div className="space-y-4">
        {photo ? (
          <div className="space-y-4">
            <img 
              src={photo} 
              alt="Captured crop" 
              className="w-full h-64 object-cover rounded-lg border"
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
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-agriculture-green flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      AI Health Assessment
                    </h4>
                    <Badge variant="outline" className="bg-white">
                      {analysisResult.confidence}% AI Confidence
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-bold text-agriculture-green">
                      {analysisResult.health}%
                    </div>
                    <div className="flex-1">
                      <Progress value={analysisResult.health} className="w-full" />
                    </div>
                  </div>
                </div>

                {/* AI Disease Detection */}
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-agriculture-green flex items-center gap-2">
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
                      <p className="font-medium text-lg">{analysisResult.disease}</p>
                      <p className="text-sm text-blue-600 font-medium">AI Recommendation: Priority Action Required</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h5 className="font-medium text-sm text-agriculture-green mb-1">AI-Detected Symptoms:</h5>
                        <ul className="text-sm space-y-1">
                          {analysisResult.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-500 font-bold">•</span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm text-agriculture-green mb-1">AI-Identified Causes:</h5>
                        <ul className="text-sm space-y-1">
                          {analysisResult.causes.map((cause, index) => (
                            <li key={index} className="flex items-start gap-2">
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
                  <div className="bg-white p-3 rounded-lg border">
                    <h5 className="font-medium text-sm text-agriculture-green mb-1">AI Growth Analysis</h5>
                    <p className="text-sm">{analysisResult.growthStage}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <h5 className="font-medium text-sm text-agriculture-green mb-1">Yield Prediction</h5>
                    <p className="text-sm">{analysisResult.yieldImpact}</p>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="space-y-3">
                  {/* Immediate AI Actions */}
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h5 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      AI Immediate Actions
                    </h5>
                    <ul className="text-sm space-y-1">
                      {analysisResult.immediateActions.map((action, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-red-600 font-bold">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AI Treatment Plan */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-700 mb-2 flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      AI Treatment Protocol
                    </h5>
                    <ul className="text-sm space-y-1">
                      {analysisResult.treatments.map((treatment, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Local Solutions */}
                  {analysisResult.localSolutions && analysisResult.localSolutions.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Local Resource Solutions
                      </h5>
                      <ul className="text-sm space-y-1">
                        {analysisResult.localSolutions.map((solution, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Market Advice */}
                  {analysisResult.marketAdvice && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h5 className="font-medium text-purple-700 mb-2 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        AI Market Insights
                      </h5>
                      <p className="text-sm">{analysisResult.marketAdvice}</p>
                    </div>
                  )}
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
            <div className="text-center py-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
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
