
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Multiple methods to ensure scrolling to top works
    const scrollToTop = () => {
      // Method 1: Set scroll position directly
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Method 2: Use window.scrollTo with immediate behavior
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      
      // Method 3: Fallback using scrollTo without options
      window.scrollTo(0, 0);
    };

    // Execute immediately
    scrollToTop();
    
    // Execute after a short delay to override any other scroll behavior
    const timeoutId = setTimeout(scrollToTop, 10);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};
