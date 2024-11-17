import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Card } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Maximize2 } from 'lucide-react';
import type { EmissionResults } from '@/lib/types';
import { useI18nStore, translations } from '@/lib/i18n';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title
);

interface ChartProps {
  results: EmissionResults;
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard = ({ title, children }: ChartCardProps) => (
  <Card className="bg-green-900/80 backdrop-blur-sm border-green-700 p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-green-100">{title}</h3>
      <Dialog>
        <DialogTrigger asChild>
          <button className="p-2 hover:bg-green-800/50 rounded-lg transition-colors">
            <Maximize2 className="h-5 w-5 text-green-300" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-green-950/95 border-green-700 max-w-4xl w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-green-100">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </div>
    {children}
  </Card>
);

export function Charts({ results }: ChartProps) {
  const { language } = useI18nStore();
  const t = translations[language];

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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgba(255, 255, 255, 0.9)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        padding: 12,
        cornerRadius: 8,
      },
    },
  };

  const distributionData = {
    labels: Object.keys(results.emissions).map(
      key => t.categories[key as keyof typeof t.categories]
    ),
    datasets: [{
      data: Object.values(results.emissions),
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
    }],
  };

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
    labels: Object.keys(results.emissions).map(
      key => t.categories[key as keyof typeof t.categories]
    ),
    datasets: [
      {
        label: t.charts.yourEmissions,
        data: Object.values(results.emissions),
        backgroundColor: 'rgba(52, 211, 153, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
      {
        label: t.charts.average,
        data: Object.values(averageEmissions),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(37, 99, 235)',
        borderWidth: 1,
      },
    ],
  };

  const sectorData = {
    labels: [
      t.charts.sectors.housing,
      t.charts.sectors.transport,
      t.charts.sectors.consumption,
    ],
    datasets: [{
      label: t.charts.sectorImpact,
      data: [
        results.emissions.electricity + results.emissions.gas,
        results.emissions.car + results.emissions.publicTransport + results.emissions.flights,
        results.emissions.meat + results.emissions.fruitsVeggies + results.emissions.waste + results.emissions.entertainment,
      ],
      borderColor: 'rgba(139, 92, 246, 0.8)',
      backgroundColor: 'rgba(139, 92, 246, 0.3)',
      fill: true,
      tension: 0.4,
    }],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartCard title={t.charts.distribution}>
        <div className="w-full max-w-[300px] mx-auto">
          <Doughnut
            data={distributionData}
            options={{
              ...commonOptions,
              cutout: '70%',
              maintainAspectRatio: true,
              aspectRatio: 1,
            }}
          />
        </div>
      </ChartCard>

      <ChartCard title={t.charts.comparison}>
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
      </ChartCard>

      <ChartCard title={t.charts.sectorAnalysis}>
        <Line
          data={sectorData}
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
                },
              },
            },
          }}
        />
      </ChartCard>
    </div>
  );
}