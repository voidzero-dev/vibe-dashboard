import { Clock, Package } from 'lucide-react';

const rolldownMetrics = [
  { id: 'bundleSize', name: 'Bundle Size', icon: Package, color: '#374151' },
  { id: 'buildTime', name: 'Build Time', icon: Clock, color: '#2563eb' },
];

interface MetricNavigationProps {
  selectedMetric: string;
  setSelectedMetric: (metric: string) => void;
}

export function MetricNavigation({ selectedMetric, setSelectedMetric }: MetricNavigationProps) {
  return (
    <nav className='bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-8 py-4 flex gap-2 max-w-6xl mx-auto'>
      {rolldownMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <button
            key={metric.id}
            className={`flex items-center gap-2 px-5 py-3 border rounded-lg cursor-pointer font-medium text-sm transition-all duration-200 tracking-tight min-w-30 justify-center ${
              selectedMetric === metric.id
                ? 'bg-slate-600 border-slate-600 text-white hover:bg-slate-800 hover:border-slate-800'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-800 dark:hover:text-slate-100'
            }`}
            onClick={() => {
              setSelectedMetric(metric.id);
            }}
          >
            <Icon size={20} />
            {metric.name}
          </button>
        );
      })}
    </nav>
  );
}
