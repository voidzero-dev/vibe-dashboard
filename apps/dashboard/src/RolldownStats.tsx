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

export default RolldownStats;
