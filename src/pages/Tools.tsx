
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { OrganizedToolsGrid } from '@/components/OrganizedToolsGrid';
import { Loading3D } from '@/components/Loading3D';
import { useLanguage } from '@/contexts/LanguageContext';

const Tools = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading3D message="Loading Farm Tools..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-green-50/30">
      <Header />
      
      <main className="mobile-padding space-y-6 pb-20 sm:pb-24">
        <div className="text-center py-6 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-agriculture-green mb-3">
            🛠️ {t('tools.title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            {t('tools.subtitle')}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-agriculture-green/10 backdrop-blur-md rounded-full border border-agriculture-green/20">
            <div className="w-2 h-2 bg-agriculture-green rounded-full animate-pulse"></div>
            <span className="text-sm text-agriculture-green font-medium">15 Smart Tools Available</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto animate-fade-in-up">
          <OrganizedToolsGrid />
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Tools;
