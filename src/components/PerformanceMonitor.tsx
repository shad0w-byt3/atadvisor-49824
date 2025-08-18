import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Log performance metrics in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`Performance: ${entry.name}`, entry);
        }
        
        // Send to analytics in production
        if (process.env.NODE_ENV === 'production') {
          // You can integrate with Google Analytics, Mixpanel, etc.
          // gtag('event', 'web_vital', {
          //   name: entry.name,
          //   value: entry.value,
          //   event_category: 'Web Vitals'
          // });
        }
      });
    });

    // Observe various performance metrics
    observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

    // Clean up
    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
};