import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, PieChart } from 'lucide-react';
import { Charts } from './Charts';
import type { EmissionResults } from '@/lib/types';
import { useI18nStore, translations } from '@/lib/i18n';

interface CarbonResultsProps {
  results: EmissionResults;
}

export function CarbonResults({ results }: CarbonResultsProps) {
  const { language } = useI18nStore();
  const t = translations[language];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-4">
          <Leaf className="h-12 w-12 text-green-300" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          {t.footprint.title}
        </h2>
        <p className="text-5xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
          {results.total.toFixed(2)}
          <span className="text-2xl ml-2">
            {t.footprint.unit}
          </span>
        </p>
      </div>

      <Tabs defaultValue="cards" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger 
            value="cards" 
            className="flex items-center gap-2"
          >
            <Leaf className="h-4 w-4" />
            {t.tabs.cards}
          </TabsTrigger>
          <TabsTrigger 
            value="charts" 
            className="flex items-center gap-2"
          >
            <PieChart className="h-4 w-4" />
            {t.tabs.charts}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(results.emissions).map(([category, value]) => (
              <Card key={category} className="p-4 bg-green-900/80 backdrop-blur-sm border-green-700">
                <div className="flex flex-col space-y-2">
                  <span className="text-green-50 text-lg font-medium">
                    {t.categories[category as keyof typeof t.categories]}
                  </span>
                  <span className="text-xl font-semibold text-green-100">
                    {value.toFixed(2)} <span className="text-sm">kg CO₂</span>
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="charts">
          <Charts results={results} />
        </TabsContent>
      </Tabs>

      {(results.reductions.renewable > 0 || results.reductions.recycling > 0) && (
        <Card className="p-4 bg-green-900/80 backdrop-blur-sm border-green-700">
          <h3 className="text-lg font-semibold text-green-100 mb-2">
            {t.reductions.title}
          </h3>
          {results.reductions.renewable > 0 && (
            <p className="text-green-200">
              {t.reductions.renewable}: -{results.reductions.renewable.toFixed(2)} kg CO₂
            </p>
          )}
          {results.reductions.recycling > 0 && (
            <p className="text-green-200">
              {t.reductions.recycling}: -{results.reductions.recycling.toFixed(2)} kg CO₂
            </p>
          )}
        </Card>
      )}
    </div>
  );
}