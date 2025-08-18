
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { WeatherWidget } from '@/components/WeatherWidget';
import { AIChatInterface } from '@/components/AIChatInterface';
import { FeatureCards } from '@/components/FeatureCards';
import { QuickStats } from '@/components/QuickStats';
import { BottomNavigation } from '@/components/BottomNavigation';
import { AppTour } from '@/components/AppTour';
import { OfflineSMS } from '@/components/OfflineSMS';
import { RealTimeMarket } from '@/components/RealTimeMarket';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, TrendingUp, Users, Calendar } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    // Force scroll to top immediately
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    
    if (isLoading) return;

    // If no user is authenticated, redirect to welcome
    if (!user) {
      navigate('/welcome');
      return;
    }

    // User is authenticated, mark as visited and stay on main page
    localStorage.setItem('hasVisitedApp', 'true');
    setIsCheckingAuth(false);
  }, [user, isLoading, navigate]);

  // Show loading state while checking authentication
  if (isLoading || isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 agriculture-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">🌱</span>
          </div>
          <div className="animate-spin w-8 h-8 border-4 border-agriculture-green border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-agriculture-green">{t('loading')}</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, this will redirect via useEffect
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      <main className="p-4 space-y-6 pb-24">
        {/* Welcome Section */}
        <div className="text-center py-6 relative">
          {/* Subtle background pattern */}
          <div 
            className="absolute inset-0 opacity-5 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80')`
            }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-agriculture-green">
                {t('welcome.back')}, {user.user_metadata?.name || t('farmer')}! 🌾
              </h2>
            </div>
            <p className="text-muted-foreground">
              {t('main.welcome')}
            </p>
            
            {/* Quick Access to App Tour */}
            <div className="mt-4 flex gap-2 justify-center">
              <Button 
                variant="outline" 
                onClick={() => setShowTour(true)}
                className="text-sm border-agriculture-green text-agriculture-green hover:bg-agriculture-green hover:text-white"
              >
                {t('main.tour')}
              </Button>
              <Button 
                variant="default"
                onClick={() => navigate('/camera')}
                className="text-sm bg-agriculture-green hover:bg-green-700"
              >
                🔍 {t('main.quickAnalysis')}
              </Button>
            </div>
          </div>
        </div>

        {/* Achievements & Progress with enhanced visuals */}
        <section className="relative">
          <div 
            className="absolute inset-0 opacity-5 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=800&q=80')`
            }}
          />
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-agriculture-green mb-3 flex items-center gap-2">
              <Award className="h-5 w-5" />
              {t('main.achievements')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Card className="agriculture-card p-3 text-center relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=400&q=80')`
                  }}
                />
                <div className="relative z-10">
                  <div className="text-2xl mb-1">🌱</div>
                  <p className="text-sm font-medium">{t('main.cropsMonitored')}</p>
                  <p className="text-lg font-bold text-agriculture-green">12</p>
                </div>
              </Card>
              <Card className="agriculture-card p-3 text-center relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80')`
                  }}
                />
                <div className="relative z-10">
                  <div className="text-2xl mb-1">📈</div>
                  <p className="text-sm font-medium">{t('main.yieldImproved')}</p>
                  <p className="text-lg font-bold text-agriculture-green">+23%</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section>
          <h3 className="text-lg font-semibold text-agriculture-green mb-3">{t('main.overview')}</h3>
          <QuickStats />
        </section>

        {/* Weather Widget */}
        <section>
          <WeatherWidget />
        </section>

        {/* Real-Time Market Data */}
        <section>
          <RealTimeMarket />
        </section>

        {/* Community Insights with enhanced background */}
        <section className="relative">
          <div 
            className="absolute inset-0 opacity-5 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80')`
            }}
          />
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-agriculture-green mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t('main.communityInsights')}
            </h3>
            <Card className="agriculture-card p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <span className="text-sm">📢 {t('community.cassavaReport')}</span>
                  <Badge variant="secondary" className="text-xs">2{t('community.hoursAgo')}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                  <span className="text-sm">🌧️ {t('community.rainAlert')}</span>
                  <Badge variant="secondary" className="text-xs">5{t('community.hoursAgo')}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <span className="text-sm">💰 {t('community.beanPrices')}</span>
                  <Badge variant="secondary" className="text-xs">1{t('community.dayAgo')}</Badge>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Offline SMS Section */}
        <section>
          <h3 className="text-lg font-semibold text-agriculture-green mb-3">{t('main.connected')}</h3>
          <OfflineSMS />
        </section>

        {/* AI Chat Interface */}
        <section>
          <AIChatInterface />
        </section>

        {/* Enhanced Feature Cards */}
        <section className="relative">
          <div 
            className="absolute inset-0 opacity-5 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80')`
            }}
          />
          
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-agriculture-green mb-4">{t('main.tools')}</h3>
            <FeatureCards />
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="text-lg font-semibold text-agriculture-green mb-3">🚀 {t('main.quickActions')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 relative overflow-hidden group"
              onClick={() => navigate('/calendar')}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80')`
                }}
              />
              <Calendar className="h-6 w-6 text-agriculture-green relative z-10" />
              <span className="text-sm relative z-10">{t('main.addTask')}</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 relative overflow-hidden group"
              onClick={() => navigate('/market')}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80')`
                }}
              />
              <TrendingUp className="h-6 w-6 text-agriculture-green relative z-10" />
              <span className="text-sm relative z-10">{t('main.checkPrices')}</span>
            </Button>
          </div>
        </section>
      </main>

      <BottomNavigation />
      
      {/* App Tour Modal */}
      {showTour && <AppTour onClose={() => setShowTour(false)} />}
    </div>
  );
};

export default Index;
