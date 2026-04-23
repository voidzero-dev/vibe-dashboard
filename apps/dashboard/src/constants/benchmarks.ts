/**
 * Bundler performance benchmarks
 */
export interface BundlerBenchmark {
  name: string;
  time: number;
  color: string;
}

export const BUNDLER_BENCHMARKS: BundlerBenchmark[] = [
  { name: "Rolldown", time: 1.61, color: "var(--color-accent)" },
  { name: "esbuild", time: 1.7, color: "#FFCF00" },
  { name: "rspack", time: 4.07, color: "#FF6B35" },
  { name: "Rollup + esbuild", time: 40.1, color: "#FF4444" },
];

/**
 * Oxc performance metrics
 */
export interface OxcBenchmark {
  tool: string;
  comparison: string;
  speed: string;
}

export const OXC_BENCHMARKS: OxcBenchmark[] = [
  { tool: "Oxlint", comparison: "vs ESLint", speed: "50-100x faster" },
  { tool: "Oxfmt", comparison: "vs Prettier", speed: "35x faster" },
  { tool: "Parser", comparison: "vs SWC", speed: "3x faster" },
  { tool: "Resolver", comparison: "vs enhanced-resolve", speed: "28x faster" },
];
