import minificationData from "../../../data/minification-benchmarks-data.json";

const MINIFIERS = [
  { id: "terser", name: "Terser", fill: "#a78bfa" },
  { id: "esbuild", name: "ESBuild", fill: "#10b981" },
  { id: "@swc/core", name: "SWC", fill: "#38bdf8" },
  { id: "uglify-js", name: "UglifyJS", fill: "#f87171" },
  { id: "oxc-minify", name: "OXC", fill: "#fbbf24" },
] as const;

type MinifierDefinition = (typeof MINIFIERS)[number];
type MinifierId = MinifierDefinition["id"];
type Metric = "time" | "compression";

interface BenchmarkResultData {
  time?: number;
  minzippedBytes?: number;
}

interface MinifierBenchmark {
  result?: {
    data?: BenchmarkResultData;
  };
}

interface LibraryBenchmark {
  size: number;
  minified?: Record<string, MinifierBenchmark | undefined>;
}

type MinificationBenchmarkData = Record<string, LibraryBenchmark>;

interface LibraryDataPoint {
  name: string;
  value: number;
  minzippedBytes: number;
  fill: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isBenchmarkResultData(value: unknown): value is BenchmarkResultData {
  return (
    isRecord(value) &&
    (value.time === undefined || typeof value.time === "number") &&
    (value.minzippedBytes === undefined || typeof value.minzippedBytes === "number")
  );
}

function isMinifierBenchmark(value: unknown): value is MinifierBenchmark {
  if (!isRecord(value)) {
    return false;
  }

  if (value.result === undefined) {
    return true;
  }

  return (
    isRecord(value.result) &&
    (value.result.data === undefined || isBenchmarkResultData(value.result.data))
  );
}

function isLibraryBenchmark(value: unknown): value is LibraryBenchmark {
  if (!isRecord(value) || typeof value.size !== "number") {
    return false;
  }

  if (value.minified === undefined) {
    return true;
  }

  return (
    isRecord(value.minified) &&
    Object.values(value.minified).every(
      (minifierBenchmark) =>
        minifierBenchmark === undefined || isMinifierBenchmark(minifierBenchmark),
    )
  );
}

function getBenchmarkData(data: unknown): MinificationBenchmarkData {
  if (!isRecord(data)) {
    return {};
  }

  return Object.entries(data).reduce<MinificationBenchmarkData>((libraries, [name, benchmark]) => {
    if (isLibraryBenchmark(benchmark)) {
      libraries[name] = benchmark;
    }

    return libraries;
  }, {});
}

const benchmarkData = getBenchmarkData(minificationData);

export const popularMinifiers: MinifierId[] = MINIFIERS.map(({ id }) => id);

export const libraries = Object.entries(benchmarkData)
  .map(([name, { size }]) => ({ name, size }))
  .toSorted((a, b) => b.size - a.size)
  .map((item) => item.name);

function getMetricValue(
  metric: Metric,
  librarySize: number,
  resultData: BenchmarkResultData,
): number {
  if (metric === "time") {
    return Math.round(resultData.time || 0);
  }

  const minzippedBytes = resultData.minzippedBytes || 0;
  return Math.round(((librarySize - minzippedBytes) / librarySize) * 100 * 10) / 10;
}

function toLibraryDataPoint(
  minifier: MinifierDefinition,
  libraryData: LibraryBenchmark,
  metric: Metric,
): LibraryDataPoint | null {
  const resultData = libraryData.minified?.[minifier.id]?.result?.data;
  if (!resultData) {
    return null;
  }

  return {
    name: minifier.name,
    value: getMetricValue(metric, libraryData.size, resultData),
    minzippedBytes: metric === "compression" ? resultData.minzippedBytes || 0 : 0,
    fill: minifier.fill,
  };
}

export function getLibraryData(library: string, metric: Metric): LibraryDataPoint[] {
  const libraryData = benchmarkData[library];
  if (!libraryData) {
    return [];
  }

  return MINIFIERS.map((minifier) => toLibraryDataPoint(minifier, libraryData, metric))
    .filter((item): item is LibraryDataPoint => item !== null)
    .toSorted((a, b) =>
      metric === "time" ? a.value - b.value : a.minzippedBytes - b.minzippedBytes,
    );
}
