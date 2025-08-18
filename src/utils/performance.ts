// Performance utilities for the app
import { lazy as ReactLazy } from 'react';

export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`Performance: ${name} took ${end - start} milliseconds`);
  }
};

export const lazy = (fn: () => Promise<any>) => {
  return ReactLazy(() => 
    fn().then(module => ({ default: module.default || module }))
  );
};

// Preload critical resources
export const preloadResource = (url: string, type: 'image' | 'script' | 'style' = 'image') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = type;
  document.head.appendChild(link);
};

// Image optimization
export const optimizeImageLoading = () => {
  // Add loading="lazy" to images that are not immediately visible
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach((img, index) => {
    if (index > 2) { // First 3 images load immediately
      img.setAttribute('loading', 'lazy');
    }
  });
};