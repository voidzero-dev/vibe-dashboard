import { buildTimeTooltipFormatter } from "@vibe/utils";
import { Bar, BarChart, CartesianGrid, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import * as semver from "semver";
import rolldownStats from "../../../../../data/rolldown-version-stats.json";

const buildTimeData = rolldownStats
  .map((stat) => ({
    name: `v${stat.version}`,
    value: stat.buildTime,
    version: stat.version,
    publicationDate: (stat as any).publicationDate,
  }))
  .sort((a, b) => semver.compare(a.version, b.version));

export function BuildTimeChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={buildTimeData}>
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
          formatter={buildTimeTooltipFormatter}
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
        <Bar dataKey="value" fill="#60a5fa" name="Build Time (ms)">
          <LabelList
            dataKey="value"
            position="top"
            formatter={(label) => `${label as number}ms`}
            style={{ fontSize: "11px", fill: "#94a3b8" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
