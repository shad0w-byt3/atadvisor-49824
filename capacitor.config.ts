
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.88dd63c7870f4a7c9ac000f40750f87e',
  appName: 'AgriTech Advisor',
  webDir: 'dist',
  server: {
    url: 'https://88dd63c7-870f-4a7c-9ac0-00f40750f87e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    },
    Geolocation: {
      permissions: ['location']
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;
