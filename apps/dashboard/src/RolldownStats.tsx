import { BuildTimeChart } from "./components/rolldown/BuildTimeChart";
import { BundleSizeChart } from "./components/rolldown/BundleSizeChart";
import { MetricNavigation } from "./components/rolldown/MetricNavigation";
import { StatsCards } from "./components/rolldown/StatsCards";

interface RolldownStatsProps {
  selectedMetric: string;
  setSelectedMetric: (metric: string) => void;
}

function RolldownStats({ selectedMetric, setSelectedMetric }: RolldownStatsProps) {
  return (
    <>
      <MetricNavigation selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} />

      <main className="max-w-6xl mx-auto px-8 py-8 flex flex-col gap-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-8 rounded-xl shadow-sm">
          <h2 className="mb-6 text-slate-800 dark:text-slate-100 text-3xl font-bold tracking-tight">
            {selectedMetric === "bundleSize" ? "Bundle Size" : "Build Time"}
          </h2>
          {selectedMetric === "bundleSize" ? <BundleSizeChart /> : <BuildTimeChart />}
        </div>

        <StatsCards />
      </main>
    </>
  );
}

export default RolldownStats;
