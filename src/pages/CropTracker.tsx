
import { useState } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Photo {
  id: number;
  date: string;
  week: number;
  status: string;
  notes: string;
  aiAnalysis: string;
}

const CropTracker = () => {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      date: '2024-01-15',
      week: 1,
      status: 'Healthy',
      notes: 'Seeds just planted, good soil moisture',
      aiAnalysis: 'Optimal planting conditions detected'
    },
    {
      id: 2,
      date: '2024-01-22',
      week: 2,
      status: 'Growing',
      notes: 'First shoots appearing',
      aiAnalysis: 'Growth rate is normal, continue current care routine'
    },
    {
      id: 3,
      date: '2024-01-29',
      week: 3,
      status: 'Warning',
      notes: 'Some yellowing on leaves',
      aiAnalysis: 'Possible nutrient deficiency detected - consider nitrogen fertilizer'
    }
  ]);

  const takePhoto = () => {
    const newPhoto: Photo = {
      id: photos.length + 1,
      date: new Date().toISOString().split('T')[0],
      week: photos.length + 1,
      status: 'Pending Analysis',
      notes: '',
      aiAnalysis: 'Analyzing photo... Please wait.'
    };
    
    setPhotos([...photos, newPhoto]);
    
    // Simulate AI analysis
    setTimeout(() => {
      setPhotos(prev => prev.map(photo => 
        photo.id === newPhoto.id 
          ? { ...photo, status: 'Healthy', aiAnalysis: 'Crop appears healthy with good color and structure' }
          : photo
      ));
    }, 2000);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Healthy': return 'bg-green-100 text-green-800';
      case 'Growing': return 'bg-blue-100 text-blue-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold text-agriculture-green mb-2">
            📸 {t('tracker.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('tracker.subtitle')}
          </p>
        </div>

        <Card className="agriculture-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-agriculture-green">
              {t('tracker.currentCrop')}
            </h3>
            <Button onClick={takePhoto} className="bg-agriculture-green hover:bg-green-700">
              <Camera className="h-4 w-4 mr-2" />
              {t('tracker.takePhoto')}
            </Button>
          </div>

          <div className="grid gap-4">
            {photos.map((photo) => (
              <Card key={photo.id} className="p-4 border border-green-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                      <Camera className="h-8 w-8 text-agriculture-green" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{t('tracker.week')} {photo.week}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {photo.date}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(photo.status)}>
                    {photo.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-1">
                      {t('tracker.aiAnalysis')}
                    </p>
                    <p className="text-sm text-blue-700">
                      {photo.aiAnalysis}
                    </p>
                  </div>
                  
                  {photo.notes && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-800 mb-1">
                        {t('tracker.yourNotes')}
                      </p>
                      <p className="text-sm text-gray-700">
                        {photo.notes}
                      </p>
                    </div>
                  )}
                </div>

                {photo.status === 'Warning' && (
                  <div className="mt-3 p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        {t('tracker.actionRequired')}
                      </p>
                      <p className="text-sm text-yellow-700">
                        Consider applying nitrogen-rich fertilizer within the next 3 days.
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Card>

        <Card className="agriculture-card p-6">
          <h3 className="text-lg font-semibold text-agriculture-green mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            {t('tracker.progressSummary')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">75%</p>
              <p className="text-sm text-gray-600">{t('tracker.healthScore')}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{photos.length}</p>
              <p className="text-sm text-gray-600">{t('tracker.photosTaken')}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">12</p>
              <p className="text-sm text-gray-600">{t('tracker.daysTracked')}</p>
            </div>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default CropTracker;
