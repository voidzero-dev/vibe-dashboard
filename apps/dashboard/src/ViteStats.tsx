import { BuildTimeChart } from "./components/vite/BuildTimeChart";
import { BundleSizeChart } from "./components/vite/BundleSizeChart";
import { MetricNavigation } from "./components/vite/MetricNavigation";
import { StatsCards } from "./components/vite/StatsCards";

interface ViteStatsProps {
  selectedMetric: string;
  setSelectedMetric: (metric: string) => void;
}

function ViteStats({ selectedMetric, setSelectedMetric }: ViteStatsProps) {
  return (
    <>
      <MetricNavigation selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} />

      <main className="px-6 py-6 flex flex-col gap-6">
        <div>
          <h2 className="mb-4 text-lg font-semibold">
            {selectedMetric === "bundleSize" ? "Bundle Size" : "Build Time"}
          </h2>
          {selectedMetric === "bundleSize" ? <BundleSizeChart /> : <BuildTimeChart />}
        </div>

        <StatsCards />
      </main>
    </>
  );
}

export default ViteStats;
