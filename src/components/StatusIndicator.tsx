import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Cloud, CloudOff } from 'lucide-react';

interface StatusIndicatorProps {
  isOnline?: boolean;
  isCloudConnected?: boolean;
  className?: string;
}

export const StatusIndicator = ({ 
  isOnline = true, 
  isCloudConnected = true,
  className = ''
}: StatusIndicatorProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Badge 
        variant={isOnline ? "default" : "destructive"}
        className={`flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-sm transition-all duration-300 ${
          isOnline 
            ? 'bg-success/10 text-success border-success/30 hover:bg-success/20' 
            : 'bg-destructive/10 text-destructive border-destructive/30'
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-3 h-3" />
            <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse shadow-glow"></div>
            <span className="text-xs font-semibold">Online</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3 h-3" />
            <span className="text-xs font-semibold">Offline</span>
          </>
        )}
      </Badge>

      {isCloudConnected && (
        <Badge 
          variant="outline"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent border-accent/30 backdrop-blur-sm hover:bg-accent/20 transition-all duration-300"
        >
          <Cloud className="w-3 h-3" />
          <span className="text-xs font-semibold">Synced</span>
        </Badge>
      )}

      {!isCloudConnected && isOnline && (
        <Badge 
          variant="outline"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 text-muted-foreground border-muted-foreground/30 backdrop-blur-sm"
        >
          <CloudOff className="w-3 h-3" />
          <span className="text-xs font-semibold">Local</span>
        </Badge>
      )}
    </div>
  );
};
