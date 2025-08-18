
import { TrendingUp, Home, Calendar, Wrench, BarChart3 } from 'lucide-react';
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
    { icon: BarChart3, label: t('nav.camera'), path: '/camera' },
    { icon: TrendingUp, label: t('nav.market'), path: '/market' },
    { icon: Wrench, label: t('nav.tools'), path: '/tools' },
  ];

  if (isTransitioning) {
    return <Loading3D message={currentMessage} />;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-green-100 dark:border-green-800 z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around py-2 px-2 sm:px-4 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-2 sm:px-3 min-w-[60px] sm:min-w-[70px] touch-manipulation active:scale-95 transition-all duration-200 ${
                isActive ? 'text-agriculture-green bg-agriculture-green/10' : 'text-gray-500 hover:text-agriculture-green hover:bg-agriculture-green/5'
              }`}
              onClick={() => navigateWithLoading(item.path)}
            >
              <item.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${isActive ? 'text-agriculture-green' : ''}`} />
              <span className="text-xs font-medium leading-tight">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};
