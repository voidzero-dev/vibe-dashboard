import { bundleSizeDiffTooltipFormatter, formatNumberWithCommas } from "@vibe/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import * as semver from "semver";
import rolldownStats from "../../../../../data/rolldown-version-stats.json";

const sortedRolldownStats = [...rolldownStats].toSorted((a, b) =>
  semver.compare(a.version, b.version),
);

const bundleSizeDiffData = sortedRolldownStats.map((stat, index) => {
  if (index === 0) {
    return {
      name: `v${stat.version}`,
      value: 0,
      previousSize: null,
      currentSize: stat.totalSize,
      isBaseline: true,
      version: stat.version,
      publicationDate: stat.publicationDate,
    };
  }

  const prevSize = sortedRolldownStats[index - 1].totalSize;
  const currentSize = stat.totalSize;
  const diff = currentSize - prevSize;

  return {
    name: `v${stat.version}`,
    value: diff,
    previousSize: prevSize,
    currentSize: currentSize,
    isBaseline: false,
    version: stat.version,
    publicationDate: stat.publicationDate,
  };
});

export function BundleSizeChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={bundleSizeDiffData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
        <XAxis
          dataKey="name"
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={{ stroke: "#475569" }}
          tickLine={{ stroke: "#475569" }}
        />
        <YAxis
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={{ stroke: "#475569" }}
          tickLine={{ stroke: "#475569" }}
        />
        <Tooltip
          formatter={bundleSizeDiffTooltipFormatter}
          contentStyle={{
            backgroundColor: "var(--tooltip-bg)",
            border: "1px solid var(--tooltip-border)",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            color: "var(--tooltip-text)",
          }}
          labelStyle={{ color: "var(--tooltip-text)" }}
          itemStyle={{ color: "var(--tooltip-text)" }}
        />
        <Legend wrapperStyle={{ color: "#94a3b8" }} />
        <Bar dataKey="value" name="Bundle Size Change (bytes)">
          <LabelList
            dataKey="value"
            position="top"
            formatter={(label: React.ReactNode) => {
              const value = typeof label === "number" ? label : Number(label) || 0;
              if (value === 0) return "baseline";
              return value >= 0
                ? `+${formatNumberWithCommas(value)}`
                : formatNumberWithCommas(value);
            }}
            style={{ fontSize: "11px", fill: "#94a3b8" }}
          />
          {bundleSizeDiffData.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.isBaseline ? "#94a3b8" : entry.value >= 0 ? "#dc2626" : "#16a34a"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
