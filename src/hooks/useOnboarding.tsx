import { useLocalStorage } from './useLocalStorage';

export interface OnboardingState {
  hasCompletedOnboarding: boolean;
  hasSeenTour: boolean;
}

export const useOnboarding = () => {
  const [onboardingState, setOnboardingState] = useLocalStorage<OnboardingState>(
    'agritech-onboarding',
    {
      hasCompletedOnboarding: false,
      hasSeenTour: false,
    }
  );

  const completeOnboarding = () => {
    setOnboardingState({
      ...onboardingState,
      hasCompletedOnboarding: true,
    });
  };

  const completeTour = () => {
    setOnboardingState({
      ...onboardingState,
      hasSeenTour: true,
    });
  };

  const skipOnboarding = () => {
    setOnboardingState({
      hasCompletedOnboarding: true,
      hasSeenTour: true,
    });
  };

  const resetOnboarding = () => {
    setOnboardingState({
      hasCompletedOnboarding: false,
      hasSeenTour: false,
    });
  };

  return {
    ...onboardingState,
    completeOnboarding,
    completeTour,
    skipOnboarding,
    resetOnboarding,
  };
};
