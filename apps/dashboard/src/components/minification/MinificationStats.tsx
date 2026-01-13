import minificationData from "../../../../../data/minification-benchmarks-data.json";
import { popularMinifiers } from "@vibe/utils";

export function MinificationStats() {
  const stats = [
    {
      label: "Libraries Tested",
      value: Object.keys(minificationData).length.toString(),
      badge: "JavaScript Libraries",
    },
    {
      label: "Minifiers Compared",
      value: popularMinifiers.length.toString(),
      badge: "Popular Tools",
    },
    {
      label: "Fastest Minifier",
      value: "OXC",
      badge: "Rust-based",
      highlight: true,
    },
    {
      label: "Best Compression",
      value: "UglifyJS",
      badge: "Traditional Leader",
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
          <p
            className={`mb-3 text-2xl font-semibold tracking-tight ${stat.highlight ? "text-[var(--color-accent)]" : ""}`}
          >
            {stat.value}
          </p>
          <span className="text-xs px-2 py-1 rounded-md bg-[var(--color-accent-soft)] text-[var(--color-accent)] border border-[var(--color-accent)]/20">
            {stat.badge}
          </span>
        </div>
      ))}
    </div>
  );
}
