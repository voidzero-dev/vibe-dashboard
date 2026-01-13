import { PageHeader } from "@vibe/shared";
import { Badge } from "@vibe/ui";
import { BarChart3, Clock, Package, TrendingUp } from "lucide-react";
import { useState } from "react";
import rolldownStatsData from "../../../../data/rolldown-version-stats.json";
import { PageContainer } from "../components/layout/PageContainer";
import RolldownStats from "../RolldownStats";

function RolldownStatsPage() {
  const [selectedMetric, setSelectedMetric] = useState("bundleSize");
  const latestVersion = rolldownStatsData[rolldownStatsData.length - 1];

  const stats = [
    {
      label: "Bundle Size",
      value: `${Math.round(latestVersion.totalSize / 1024)} KB`,
      icon: <BarChart3 size={16} />,
    },
    {
      label: "Build Time",
      value: `${latestVersion.buildTime}ms`,
      icon: <Clock size={16} />,
    },
    {
      label: "Versions Tracked",
      value: rolldownStatsData.length.toString(),
      icon: <TrendingUp size={16} />,
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        icon={<Package size={20} />}
        title="Rolldown Stats"
        subtitle="Track bundle size and build performance across versions"
        action={
          <Badge variant="accent" size="md">
            v{latestVersion.version}
          </Badge>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
          >
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] mb-2">
              {stat.icon}
              <span className="text-xs">{stat.label}</span>
            </div>
            <div className="text-xl font-semibold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">
        <RolldownStats selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} />
      </div>
    </PageContainer>
  );
}

export default RolldownStatsPage;
