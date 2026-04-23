import { formatNumberWithCommas } from "@vibe/utils";
import rolldownStats from "../../../../../data/rolldown-version-stats.json";

const buildTimeData = rolldownStats.map((stat) => stat.buildTime);
const bundleSizes = rolldownStats.map((s) => s.totalSize);
const latestVersion = rolldownStats[rolldownStats.length - 1];
const firstVersion = rolldownStats[0];

export function StatsCards() {
  const averageBuildTime = Math.round(
    buildTimeData.reduce((sum, item) => sum + item, 0) / buildTimeData.length,
  );

  const bundleSizeRange = Math.round((Math.max(...bundleSizes) - Math.min(...bundleSizes)) / 1024);

  const stats = [
    {
      label: "Average Build Time",
      value: `${averageBuildTime}ms`,
      badge: `Across ${buildTimeData.length} versions`,
    },
    {
      label: "Latest Bundle Size",
      value: `${formatNumberWithCommas(latestVersion?.totalSize || 0)} bytes`,
      badge: `v${latestVersion?.version}`,
    },
    {
      label: "Bundle Size Range",
      value: `${bundleSizeRange}KB`,
      badge: "Size Variation",
    },
    {
      label: "Versions Tested",
      value: rolldownStats.length.toString(),
      badge: `${firstVersion?.version} - ${latestVersion?.version}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-border-strong)]"
        >
          <h3 className="mb-2 text-[var(--color-text-muted)] text-xs font-medium uppercase tracking-wider">
            {stat.label}
          </h3>
          <p className="mb-3 text-2xl font-semibold tracking-tight">{stat.value}</p>
          <span className="text-xs px-2 py-1 rounded-md bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/20">
            {stat.badge}
          </span>
        </div>
      ))}
    </div>
  );
}
