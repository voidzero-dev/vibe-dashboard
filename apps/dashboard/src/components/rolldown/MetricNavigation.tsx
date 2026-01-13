import { Clock, Package } from "lucide-react";

const rolldownMetrics = [
  { id: "bundleSize", name: "Bundle Size", icon: Package },
  { id: "buildTime", name: "Build Time", icon: Clock },
];

interface MetricNavigationProps {
  selectedMetric: string;
  setSelectedMetric: (metric: string) => void;
}

export function MetricNavigation({ selectedMetric, setSelectedMetric }: MetricNavigationProps) {
  return (
    <nav className="px-6 py-4 border-b border-[var(--color-border)] flex gap-2">
      {rolldownMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <button
            key={metric.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedMetric === metric.id
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)]"
            }`}
            onClick={() => setSelectedMetric(metric.id)}
          >
            <Icon size={16} />
            {metric.name}
          </button>
        );
      })}
    </nav>
  );
}
