
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Bell, Check, X, AlertTriangle, Info, TrendingUp, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'weather' | 'market' | 'task' | 'system' | 'community';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'weather',
      title: 'Weather Alert',
      message: 'Heavy rainfall expected in your area tomorrow. Consider protecting your crops.',
      timestamp: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'market',
      title: 'Price Update',
      message: 'Cassava prices increased by 8% in the local market.',
      timestamp: '4 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'task',
      title: 'Task Reminder',
      message: 'Time to apply fertilizer to your cassava field.',
      timestamp: '1 day ago',
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'community',
      title: 'Community Update',
      message: 'New farming technique shared by John from Ogun State.',
      timestamp: '2 days ago',
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'system',
      title: 'New Feature',
      message: 'AI crop analysis now supports maize detection!',
      timestamp: '3 days ago',
      read: false,
      priority: 'low'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'weather': return <AlertTriangle className="h-4 w-4" />;
      case 'market': return <TrendingUp className="h-4 w-4" />;
      case 'task': return <Calendar className="h-4 w-4" />;
      case 'community': return <Bell className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'weather': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
      case 'market': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'task': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      case 'community': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      default: return 'border-l-blue-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-agriculture-green" />
            Notifications
          </h3>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            className="text-xs"
          >
            Mark All Read
          </Button>
        )}
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
              <p className="text-sm">We'll notify you about important updates</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div key={notification.id}>
                <div className={`p-3 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} ${
                  notification.read 
                    ? 'bg-gray-50 dark:bg-gray-800/50' 
                    : 'bg-white dark:bg-gray-800 shadow-sm'
                }`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className={`text-xs ${getTypeColor(notification.type)}`}>
                          {getIcon(notification.type)}
                          <span className="ml-1 capitalize">{notification.type}</span>
                        </Badge>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-agriculture-green rounded-full"></div>
                        )}
                      </div>
                      
                      <h4 className={`font-medium ${
                        notification.read 
                          ? 'text-gray-600 dark:text-gray-400' 
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {notification.title}
                      </h4>
                      <p className={`text-sm ${
                        notification.read 
                          ? 'text-gray-500 dark:text-gray-500' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                    
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                {index < notifications.length - 1 && <Separator className="my-2" />}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
