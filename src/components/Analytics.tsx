import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Simple analytics tracking
export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
      });
    }

    // Track app usage in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Page view: ${location.pathname}`);
    }
  }, [location]);

  return null;
};

// Event tracking utility
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`Event: ${eventName}`, parameters);
  }
};

// User action tracking
export const trackUserAction = (action: string, category: string = 'user_interaction') => {
  trackEvent('user_action', {
    event_category: category,
    action: action,
    timestamp: new Date().toISOString(),
  });
};