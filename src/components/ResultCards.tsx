import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface ResultCardsProps {
  results: {
    emissions: Record<string, number>;
  };
  translations: {
    fields: Record<string, any>;
  };
}

export function ResultCards({ results, translations }: ResultCardsProps) {
  const translateCategory = (category: string): string => {
    const fieldTranslation = translations.fields[category as keyof typeof translations.fields];
    if (fieldTranslation?.title) {
      return fieldTranslation.title;
    }
    if (category === 'meat') {
      return translations.fields.food.meat.label;
    }
    if (category === 'fruitsVeggies') {
      return translations.fields.food.fruitsVeggies.label;
    }
    return category;
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(results.emissions).map(([category, value]) => (
          <Card
            key={category}
            className="flex items-center justify-between p-4 bg-green-900/80 backdrop-blur-sm rounded-lg border border-green-700 hover:bg-green-900/90 transition-colors"
          >
            <span className="text-green-50 font-medium">
              {translateCategory(category)}
            </span>
            <span className="font-semibold text-green-100 ml-4">
              {value.toFixed(2)} kg CO₂
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}