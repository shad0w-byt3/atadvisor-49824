
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { AuthScreen } from '@/components/AuthScreen';
import { Loading3D } from '@/components/Loading3D';

const Welcome = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'auth'>('welcome');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Ensure page starts at top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // If user is already authenticated, show loading then redirect to main app
    if (!isLoading && user) {
      setShowLoading(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [user, isLoading, navigate]);

  const handleGetStarted = () => {
    setAuthMode('signup');
    setCurrentScreen('auth');
  };

  const handleLogin = () => {
    setAuthMode('login');
    setCurrentScreen('auth');
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  // Show loading while checking auth state or transitioning
  if (isLoading || showLoading) {
    return (
      <Loading3D 
        message={showLoading ? "Welcome back! Loading your dashboard..." : "Initializing AgriTech Advisor..."} 
      />
    );
  }

  // If user is authenticated, redirect will happen via useEffect
  if (user) {
    return null;
  }

  if (currentScreen === 'auth') {
    return <AuthScreen onBack={handleBack} initialMode={authMode} />;
  }

  return <WelcomeScreen onGetStarted={handleGetStarted} onLogin={handleLogin} />;
};

export default Welcome;
