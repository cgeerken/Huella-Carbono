import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Card } from '@/components/ui/card';
import { CHART_COLORS } from '@/lib/constants';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface ResultChartsProps {
  results: {
    emissions: Record<string, number>;
    total: number;
    factors: {
      housingType: number;
      vehicleType: number;
    };
  };
  translations: {
    fields: Record<string, any>;
  };
}

export function ResultCharts({ results, translations }: ResultChartsProps) {
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

  // Datos para el gráfico de dona principal
  const emissionsData = {
    labels: Object.keys(results.emissions).map(translateCategory),
    datasets: [
      {
        data: Object.values(results.emissions),
        backgroundColor: CHART_COLORS.backgrounds,
        borderColor: CHART_COLORS.borders,
        borderWidth: 2,
      },
    ],
  };

  // Datos para el gráfico de barras de comparación
  const averageEmissions = {
    electricity: 250,
    gas: 180,
    car: 200,
    publicTransport: 50,
    flights: 300,
    meat: 150,
    fruitsVeggies: 30,
    waste: 40,
    entertainment: 20,
  };

  const comparisonData = {
    labels: Object.keys(results.emissions).map(translateCategory),
    datasets: [
      {
        label: 'Tus emisiones',
        data: Object.values(results.emissions),
        backgroundColor: 'rgba(52, 211, 153, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
      {
        label: 'Promedio recomendado',
        data: Object.values(averageEmissions),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(37, 99, 235)',
        borderWidth: 1,
      },
    ],
  };

  // Opciones comunes para los gráficos
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw as number;
            return `${value.toFixed(2)} kg CO₂`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-green-900/80 backdrop-blur-sm border-green-700">
        <h3 className="text-lg font-semibold text-green-100 mb-4 text-center">
          Distribución de Emisiones
        </h3>
        <Doughnut
          data={emissionsData}
          options={{
            ...commonOptions,
            cutout: '60%',
          }}
        />
      </Card>

      <Card className="p-6 bg-green-900/80 backdrop-blur-sm border-green-700">
        <h3 className="text-lg font-semibold text-green-100 mb-4 text-center">
          Comparación con Promedios Recomendados
        </h3>
        <Bar
          data={comparisonData}
          options={{
            ...commonOptions,
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.9)',
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxRotation: 45,
                  minRotation: 45,
                },
              },
            },
          }}
        />
      </Card>
    </div>
  );
}