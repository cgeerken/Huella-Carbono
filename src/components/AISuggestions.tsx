import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import type { EmissionResults } from '@/lib/types';
import { useI18nStore, translations } from '@/lib/i18n';

interface AISuggestionsProps {
  results: EmissionResults;
  apiKey: string;
}

// Valores de referencia mensuales
const BENCHMARKS = {
  electricity: 142.5, // 300 kWh * 0.475 kg CO₂e
  gas: 275, // 100 m³ * 2.75 kg CO₂e
  car: 184.8, // 800 km * 0.231 kg CO₂e
  publicTransport: 15, // 150 km * 0.1 kg CO₂e
  flights: 250, // 1000 km * 0.25 kg CO₂e
  meat: 135, // 5 kg * 27 kg CO₂e
  fruitsVeggies: 15, // 15 kg * 1 kg CO₂e
  waste: 57, // 30 kg * 1.9 kg CO₂e
  entertainment: 2.75, // 50 horas * 0.055 kg CO₂e
};

export function AISuggestions({ results, apiKey }: AISuggestionsProps) {
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { language } = useI18nStore();
  const t = translations[language];

  useEffect(() => {
    const getSuggestion = async () => {
      setLoading(true);
      setError('');
      try {
        // Calcular comparaciones con valores de referencia
        const comparisons = Object.entries(results.emissions).map(([category, value]) => {
          const benchmark = BENCHMARKS[category as keyof typeof BENCHMARKS];
          const percentage = ((value - benchmark) / benchmark) * 100;
          return {
            category,
            value,
            benchmark,
            percentage,
            isHigh: percentage > 20, // 20% por encima del promedio
            isLow: percentage < -20, // 20% por debajo del promedio
          };
        });

        const highEmissions = comparisons.filter(c => c.isHigh);
        const lowEmissions = comparisons.filter(c => c.isLow);

        const prompt = `Actúa como un experto ambiental y analiza los siguientes datos de huella de carbono mensual:

Emisiones totales: ${results.total.toFixed(2)} kg CO₂e

Categorías por encima del promedio:
${highEmissions.map(c => `- ${t.categories[c.category as keyof typeof t.categories]}: ${c.value.toFixed(2)} kg CO₂e (${c.percentage.toFixed(0)}% sobre el promedio)`).join('\n')}

Categorías por debajo del promedio:
${lowEmissions.map(c => `- ${t.categories[c.category as keyof typeof t.categories]}: ${c.value.toFixed(2)} kg CO₂e (${c.percentage.toFixed(0)}% bajo el promedio)`).join('\n')}

${results.reductions.renewable || results.reductions.recycling ? 'Prácticas sostenibles actuales:' : ''}
${results.reductions.renewable ? `- Uso de energías renovables: reduce ${results.reductions.renewable.toFixed(2)} kg CO₂e` : ''}
${results.reductions.recycling ? `- Reciclaje activo: reduce ${results.reductions.recycling.toFixed(2)} kg CO₂e` : ''}

Por favor, proporciona:
1. Una evaluación detallada que compare estas emisiones con los promedios típicos, incluyendo el impacto ambiental equivalente (ej: árboles necesarios para compensar, km en automóvil, etc.).
2. 3-4 sugerencias específicas y prácticas para reducir la huella, priorizando las categorías con mayores emisiones.
3. Un análisis de las prácticas sostenibles actuales y su impacto.
4. Un mensaje motivador que reconozca los logros en categorías bajas y anime a seguir mejorando.

Responde en ${language === 'es' ? 'español' : 'english'}.
Usa un tono positivo y constructivo, pero sé específico en las recomendaciones.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 1000, // Aumentado de 500 a 1000 para permitir respuestas más detalladas
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Error en la solicitud a OpenAI');
        }

        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          setSuggestion(data.choices[0].message.content.trim());
        } else {
          throw new Error('Respuesta inválida de la API');
        }
      } catch (err) {
        console.error('Error getting AI suggestion:', err);
        setError(t.aiSuggestions.error);
      } finally {
        setLoading(false);
      }
    };

    if (apiKey && results.total > 0) {
      getSuggestion();
    }
  }, [results, apiKey, language, t]);

  return (
    <Card className="mt-8 bg-purple-900/30 border-purple-500/50 backdrop-blur-md">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-purple-100 mb-4">
          {t.aiSuggestions.title}
        </h3>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-300" />
          </div>
        ) : error ? (
          <p className="text-red-300">{error}</p>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="prose prose-invert prose-purple max-w-none">
              {suggestion.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-purple-100 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
}