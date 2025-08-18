
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('Loading...');
  const navigate = useNavigate();

  const navigateWithLoading = (path: string, loadingMessage?: string) => {
    const message = loadingMessage || getDefaultMessage(path);
    setCurrentMessage(message);
    setIsTransitioning(true);
    
    // Show loading for a brief moment to create smooth transition
    setTimeout(() => {
      navigate(path);
      setIsTransitioning(false);
    }, 1200);
  };

  const getDefaultMessage = (path: string): string => {
    const messageMap: Record<string, string> = {
      '/': 'Loading Dashboard...',
      '/calendar': 'Loading Calendar...',
      '/camera': 'Initializing Camera...',
      '/market': 'Loading Market Data...',
      '/tools': 'Loading Farm Tools...',
      '/settings': 'Loading Settings...',
      '/welcome': 'Loading Welcome...',
      '/about': 'Loading About...',
      '/smart-input-planner': 'Loading Smart Input Planner...',
      '/farming-game': 'Loading Farming Game...',
      '/crop-tracker': 'Loading Crop Tracker...',
      '/farm-podcast': 'Loading Farm Podcast...',
      '/smart-marketplace': 'Loading Smart Marketplace...',
      '/farm-challenges': 'Loading Farm Challenges...',
      '/learning-paths': 'Loading Learning Paths...',
      '/mentorship': 'Loading Mentorship...',
      '/risk-dashboard': 'Loading Risk Dashboard...',
      '/crop-diversification': 'Loading Crop Diversification...',
      '/micro-investment': 'Loading Micro Investment...',
      '/plot-mapping': 'Loading Plot Mapping...',
      '/mythbuster': 'Loading Mythbuster...',
      '/custom-tips': 'Loading Custom Tips...',
      '/expert-finder': 'Loading Expert Finder...'
    };
    
    return messageMap[path] || 'Loading...';
  };

  return {
    isTransitioning,
    currentMessage,
    navigateWithLoading,
    setIsTransitioning
  };
};
