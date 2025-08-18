import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Bell, Settings, User, Menu } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { NotificationCenter } from '@/components/NotificationCenter';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Loading3D } from '@/components/Loading3D';
import { usePageTransition } from '@/hooks/usePageTransition';

export const Header = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isTransitioning, currentMessage, navigateWithLoading } = usePageTransition();

  const handleSignOut = async () => {
    await signOut();
    navigateWithLoading('/welcome', 'Signing out...');
    setShowMobileMenu(false);
  };

  const handleNavigateToSettings = () => {
    navigateWithLoading('/settings');
    setShowMobileMenu(false);
  };

  if (isTransitioning) {
    return <Loading3D message={currentMessage} />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
        {/* Logo - Responsive */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 agriculture-gradient rounded-full flex items-center justify-center">
            <span className="text-white text-xs sm:text-sm">🌱</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-agriculture-green">
            AgriTech
          </h1>
        </div>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(true)}
              className="h-9 w-9 relative touch-manipulation"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white border-2 border-background">
                3
              </Badge>
            </Button>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNavigateToSettings}
            className="h-9 w-9 touch-manipulation"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* User Menu */}
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="h-9 w-9 touch-manipulation"
            >
              <User className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 touch-manipulation">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 mt-6">
                {/* Notifications */}
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowNotifications(true);
                    setShowMobileMenu(false);
                  }}
                  className="justify-start gap-3 h-12 text-left touch-manipulation"
                >
                  <div className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500 text-white">
                      3
                    </Badge>
                  </div>
                  Notifications
                </Button>

                {/* Settings */}
                <Button
                  variant="ghost"
                  onClick={handleNavigateToSettings}
                  className="justify-start gap-3 h-12 text-left touch-manipulation"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Button>

                {/* Theme Toggle Row */}
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>

                {/* Sign Out */}
                {user && (
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="justify-start gap-3 h-12 text-left text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 touch-manipulation"
                  >
                    <User className="h-5 w-5" />
                    Sign Out
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Notifications Dialog */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-md max-h-[80vh] p-0">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="text-lg">Notifications</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4">
            <NotificationCenter />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
