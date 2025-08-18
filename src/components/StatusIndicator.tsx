
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Battery, Signal } from 'lucide-react';

export const StatusIndicator = () => {
  const isOnline = navigator.onLine;
  const batteryLevel = 85; // In a real app, this would come from battery API
  const signalStrength = 'good'; // In a real app, this would come from network API

  return (
    <div className="flex items-center gap-2 text-xs">
      {/* Network Status */}
      <div className="flex items-center gap-1">
        {isOnline ? (
          <Wifi className="h-3 w-3 text-green-600" />
        ) : (
          <WifiOff className="h-3 w-3 text-red-600" />
        )}
        <Badge variant={isOnline ? "default" : "destructive"} className="text-xs px-1 py-0">
          {isOnline ? "Online" : "Offline"}
        </Badge>
      </div>

      {/* Signal Strength */}
      <div className="flex items-center gap-1">
        <Signal className={`h-3 w-3 ${
          signalStrength === 'good' ? 'text-green-600' : 
          signalStrength === 'fair' ? 'text-yellow-600' : 'text-red-600'
        }`} />
        <span className="text-muted-foreground">{signalStrength}</span>
      </div>

      {/* Battery Level */}
      <div className="flex items-center gap-1">
        <Battery className={`h-3 w-3 ${
          batteryLevel > 50 ? 'text-green-600' : 
          batteryLevel > 20 ? 'text-yellow-600' : 'text-red-600'
        }`} />
        <span className="text-muted-foreground">{batteryLevel}%</span>
      </div>
    </div>
  );
};
