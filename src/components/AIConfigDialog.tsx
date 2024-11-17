import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles } from 'lucide-react';
import { useI18nStore, translations } from '@/lib/i18n';

interface AIConfigDialogProps {
  onSave: (apiKey: string) => void;
}

export function AIConfigDialog({ onSave }: AIConfigDialogProps) {
  const [apiKey, setApiKey] = useState('');
  const [open, setOpen] = useState(false);
  const { language } = useI18nStore();
  const t = translations[language];

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-12 px-4 bg-purple-600/90 hover:bg-purple-500/90 border-2 border-purple-400/50 text-white font-semibold rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
        >
          <Sparkles className="h-5 w-5" />
          <span>{t.aiConfig.enableButton}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-green-950/95 border border-green-700 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-green-50">{t.aiConfig.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-green-100">
              {t.aiConfig.apiKeyLabel}
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder={t.aiConfig.apiKeyPlaceholder}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-green-900/50 border-green-700 text-green-100 placeholder:text-green-300/50"
            />
          </div>
          <Button
            onClick={handleSave}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white"
          >
            {t.aiConfig.saveButton}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}