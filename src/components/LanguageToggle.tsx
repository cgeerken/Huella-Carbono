import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18nStore } from '@/lib/i18n';

export function LanguageToggle() {
  const { language, toggleLanguage } = useI18nStore();

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      className="fixed top-4 left-4 h-12 px-4 bg-green-600/90 hover:bg-green-500/90 border-2 border-green-400/50 text-white font-semibold rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 flex items-center gap-2"
    >
      <Languages className="h-5 w-5" />
      <span className="text-base">
        {language === 'es' ? 'Español' : 'English'}
      </span>
    </Button>
  );
}