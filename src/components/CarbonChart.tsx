import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useI18nStore, translations } from '@/lib/i18n';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CarbonChartProps {
  emissions: Record<string, number>;
}

export function CarbonChart({ emissions }: CarbonChartProps) {
  const { language } = useI18nStore();
  const t = translations[language];

  const chartData: ChartData<'doughnut'> = {
    labels: Object.keys(emissions).map(key => 
      t.categories[key as keyof typeof t.categories]
    ),
    datasets: [
      {
        data: Object.values(emissions),
        backgroundColor: [
          'rgba(52, 211, 153, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(248, 113, 113, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(167, 243, 208, 0.8)',
          'rgba(147, 197, 253, 0.8)',
          'rgba(196, 181, 253, 0.8)',
          'rgba(254, 202, 202, 0.8)',
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(37, 99, 235)',
          'rgb(124, 58, 237)',
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(110, 231, 183)',
          'rgb(96, 165, 250)',
          'rgb(167, 139, 250)',
          'rgb(252, 165, 165)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
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
          label: (context) => {
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
    cutout: '70%',
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}