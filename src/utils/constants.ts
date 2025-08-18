// App-wide constants

export const APP_CONFIG = {
  name: 'AgriTech Advisor',
  version: '1.0.0',
  description: 'AI-Powered Farming Solutions for Rwanda',
  supportEmail: 'support@agritech-advisor.com',
  privacyPolicyUrl: '/privacy',
  termsOfServiceUrl: '/terms',
};

export const API_ENDPOINTS = {
  WEATHER: 'https://api.openweathermap.org/data/2.5',
  CROP_ANALYSIS: '/functions/v1/ai-crop-analysis',
  CUSTOM_TIPS: '/functions/v1/ai-custom-tips',
};

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  OFFLINE_DATA: 'offline_data',
  APP_VERSION: 'app_version',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  LANGUAGE: 'selected_language',
  THEME: 'app_theme',
};

export const FEATURE_FLAGS = {
  AI_ANALYSIS: true,
  WEATHER_WIDGET: true,
  MARKET_DATA: true,
  OFFLINE_MODE: true,
  PUSH_NOTIFICATIONS: false, // Enable when ready
};

export const CROP_TYPES = [
  'maize',
  'beans', 
  'cassava',
  'sweet_potatoes',
  'tomatoes',
  'bananas',
  'coffee',
  'tea',
  'rice',
  'sorghum'
] as const;

export const DISEASE_CATEGORIES = [
  'fungal',
  'bacterial',
  'viral',
  'pest',
  'nutrient_deficiency',
  'environmental_stress'
] as const;

export const SEVERITY_LEVELS = ['low', 'medium', 'high'] as const;
export const RISK_LEVELS = ['low', 'medium', 'high'] as const;
export const PRIORITY_LEVELS = ['low', 'medium', 'high'] as const;