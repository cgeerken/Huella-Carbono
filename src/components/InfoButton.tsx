import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useI18nStore, translations } from '@/lib/i18n';

export function InfoButton() {
  const { language } = useI18nStore();
  const t = translations[language];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed top-4 left-36 h-12 px-4 bg-blue-600/90 hover:bg-blue-500/90 border-2 border-blue-400/50 text-white font-semibold rounded-xl shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <Info className="h-5 w-5" />
          <span className="text-base">Info</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-green-950/95 border border-green-700 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-50">
            {t.infoDialog.title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-green-100">
            <p className="text-lg leading-relaxed">
              {t.infoDialog.description}
            </p>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-green-200">
                {t.infoDialog.sections.housing.title}
              </h3>
              <p className="leading-relaxed">
                {t.infoDialog.sections.housing.content}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-green-200">
                {t.infoDialog.sections.transport.title}
              </h3>
              <p className="leading-relaxed">
                {t.infoDialog.sections.transport.content}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-green-200">
                {t.infoDialog.sections.flights.title}
              </h3>
              <p className="leading-relaxed">
                {t.infoDialog.sections.flights.content}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-green-200">
                {t.infoDialog.sections.consumption.title}
              </h3>
              <p className="leading-relaxed">
                {t.infoDialog.sections.consumption.content}
              </p>
            </div>

            <p className="text-sm text-green-300 italic mt-6">
              {t.infoDialog.sections.note}
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}