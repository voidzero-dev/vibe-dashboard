import { PageHeader } from "@vibe/shared";
import { Badge } from "@vibe/ui";
import { FileDown, Gauge, Timer, Zap } from "lucide-react";
import minificationData from "../../../../data/minification-benchmarks-data.json";
import { PageContainer } from "../components/layout/PageContainer";
import MinificationBenchmarks from "../MinificationBenchmarks";

function MinificationBenchmarksPage() {
  const totalLibraries = Object.keys(minificationData).length;

  const stats = [
    {
      label: "Minifiers",
      value: "5",
      icon: <Gauge size={16} />,
    },
    {
      label: "Fastest",
      value: "OXC",
      icon: <Timer size={16} />,
      highlight: true,
    },
    {
      label: "Best Compression",
      value: "Terser",
      icon: <FileDown size={16} />,
    },
    {
      label: "Libraries Tested",
      value: totalLibraries.toString(),
      icon: <Zap size={16} />,
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        icon={<Zap size={20} />}
        title="Minification Benchmarks"
        subtitle="Performance comparison of JavaScript minification tools"
        action={
          <Badge variant="accent" size="md">
            {totalLibraries} Libraries
          </Badge>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
          >
            <div className="flex items-center gap-2 text-[var(--color-text-muted)] mb-2">
              {stat.icon}
              <span className="text-xs">{stat.label}</span>
            </div>
            <div
              className={`text-xl font-semibold ${stat.highlight ? "text-[var(--color-accent)]" : ""}`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden">
        <MinificationBenchmarks />
      </div>
    </PageContainer>
  );
}

export default MinificationBenchmarksPage;
