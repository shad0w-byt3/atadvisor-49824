
import { TrendingUp, Home, Calendar, Wrench, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Loading3D } from '@/components/Loading3D';
import { usePageTransition } from '@/hooks/usePageTransition';

export const BottomNavigation = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { isTransitioning, currentMessage, navigateWithLoading } = usePageTransition();

  const navItems = [
    { icon: Home, label: t('nav.home'), path: '/' },
    { icon: Calendar, label: t('nav.calendar'), path: '/calendar' },
    { icon: Sparkles, label: t('nav.camera'), path: '/camera-analysis' },
    { icon: TrendingUp, label: t('nav.market'), path: '/market' },
    { icon: Wrench, label: t('nav.tools'), path: '/tools' },
  ];

  if (isTransitioning) {
    return <Loading3D message={currentMessage} />;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around py-2 px-2 sm:px-4 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 sm:px-3 min-w-[60px] sm:min-w-[70px] touch-manipulation active:scale-95 transition-all duration-200 ${
                isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
              onClick={() => navigateWithLoading(item.path)}
            >
              <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs font-medium leading-tight">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};
