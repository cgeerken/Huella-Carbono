import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { InputCard } from '@/components/InputCard';
import { CarbonResults } from '@/components/CarbonResults';
import { AIConfigDialog } from '@/components/AIConfigDialog';
import { AISuggestions } from '@/components/AISuggestions';
import { LanguageToggle } from '@/components/LanguageToggle';
import { InfoButton } from '@/components/InfoButton';
import { INPUT_GROUPS } from '@/lib/constants';
import { calculateEmissions } from '@/lib/calculations';
import { useI18nStore, translations } from '@/lib/i18n';
import type { FormData, AIConfig } from '@/lib/types';

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    electricity: 0,
    gas: 0,
    car: 0,
    publicTransport: 0,
    flights: 0,
    meat: 0,
    fruitsVeggies: 0,
    waste: 0,
    entertainment: 0,
    housingType: 'apartment',
    vehicleType: 'gasoline',
  });

  const [useRenewable, setUseRenewable] = useState(false);
  const [recycles, setRecycles] = useState(false);
  const [aiConfig, setAIConfig] = useState<AIConfig>({ apiKey: '', enabled: false });
  const { language } = useI18nStore();
  const t = translations[language];

  const results = calculateEmissions(formData, useRenewable, recycles);

  const handleInputChange = (field: string, value: number | string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3')] bg-cover bg-fixed">
      <div className="min-h-screen backdrop-blur-sm bg-green-950/30">
        <div className="container mx-auto py-8 px-4">
          <LanguageToggle />
          <InfoButton />

          <div className="max-w-7xl mx-auto mt-20">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                🌱 {t.title}
              </h1>
              <p className="text-green-100 text-lg">
                {t.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Columna izquierda: Calculadora */}
              <div className="space-y-8">
                {INPUT_GROUPS.map((group) => (
                  <Card key={group.title} className="bg-green-900/40 border-green-700/50 backdrop-blur-md">
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-green-100 mb-6">
                        {language === 'es' ? group.title : group.titleEn}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {group.fields.map((field) => (
                          <InputCard
                            key={field.id}
                            field={field}
                            value={formData[field.id as keyof FormData]}
                            onChange={handleInputChange}
                          />
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}

                <Card className="bg-green-900/40 border-green-700/50 backdrop-blur-md p-6">
                  <h2 className="text-xl font-semibold text-green-100 mb-6">
                    {language === 'es' ? 'Prácticas Sostenibles' : 'Sustainable Practices'}
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="renewable"
                        checked={useRenewable}
                        onCheckedChange={setUseRenewable}
                      />
                      <Label htmlFor="renewable" className="text-green-100">
                        {language === 'es' ? 'Uso energías renovables' : 'Use renewable energy'}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="recycles"
                        checked={recycles}
                        onCheckedChange={setRecycles}
                      />
                      <Label htmlFor="recycles" className="text-green-100">
                        {language === 'es' ? 'Reciclo activamente' : 'Active recycling'}
                      </Label>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Columna derecha: Resultados */}
              <div className="space-y-8">
                {results.total > 0 && (
                  <>
                    <CarbonResults results={results} />
                    {aiConfig.enabled && (
                      <AISuggestions results={results} apiKey={aiConfig.apiKey} />
                    )}
                  </>
                )}
                <AIConfigDialog
                  onSave={(apiKey) => setAIConfig({ apiKey, enabled: true })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}