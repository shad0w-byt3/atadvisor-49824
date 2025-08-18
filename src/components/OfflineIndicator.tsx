import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { toast } from 'sonner';

export const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Connection restored', {
        description: 'You are back online',
        duration: 3000,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error('No internet connection', {
        description: 'Some features may not work properly',
        duration: 5000,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm z-50">
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span>You are offline. Some features may not work.</span>
      </div>
    </div>
  );
};