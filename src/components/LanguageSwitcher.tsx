
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const getNextLanguage = () => {
    switch (language) {
      case 'en':
        return 'fr';
      case 'fr':
        return 'rw';
      case 'rw':
        return 'en';
      default:
        return 'en';
    }
  };

  const getLanguageDisplay = () => {
    switch (language) {
      case 'en':
        return 'EN';
      case 'fr':
        return 'FR';
      case 'rw':
        return 'RW';
      default:
        return 'EN';
    }
  };

  const toggleLanguage = () => {
    setLanguage(getNextLanguage());
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="text-xs font-medium">
        {getLanguageDisplay()}
      </span>
    </Button>
  );
};
