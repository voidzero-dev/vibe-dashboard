import minificationData from "../../../data/minification-benchmarks-data.json";

export const popularMinifiers = ["terser", "esbuild", "@swc/core", "uglify-js", "oxc-minify"];

export const libraries = Object.entries(minificationData)
  .map(([name, data]: [string, any]) => ({ name, size: data.size }))
  .sort((a, b) => b.size - a.size)
  .map((item) => item.name);

export const getLibraryData = (library: string, metric: "time" | "compression") => {
  const libraryData = (minificationData as any)[library];
  const data: any[] = [];

  popularMinifiers.forEach((minifier) => {
    const minifierData = libraryData.minified?.[minifier];
    if (minifierData?.result?.data) {
      let value: number;
      let minzippedBytes = 0;
      if (metric === "time") {
        value = Math.round(minifierData.result.data.time || 0);
      } else {
        // compression ratio
        const originalSize = libraryData.size;
        minzippedBytes = minifierData.result.data.minzippedBytes || 0;
        value = Math.round(((originalSize - minzippedBytes) / originalSize) * 100 * 10) / 10;
      }

      data.push({
        name:
          minifier === "@swc/core"
            ? "SWC"
            : minifier === "uglify-js"
              ? "UglifyJS"
              : minifier === "oxc-minify"
                ? "OXC"
                : minifier === "esbuild"
                  ? "ESBuild"
                  : minifier === "terser"
                    ? "Terser"
                    : minifier,
        value,
        minzippedBytes: minzippedBytes || 0,
        fill:
          minifier === "terser"
            ? "#a78bfa"
            : minifier === "esbuild"
              ? "#10b981"
              : minifier === "@swc/core"
                ? "#38bdf8"
                : minifier === "uglify-js"
                  ? "#f87171"
                  : minifier === "oxc-minify"
                    ? "#fbbf24"
                    : "#9ca3af",
      });
    }
  });

  // Sort data: time from smallest to largest (fastest to slowest), compression from largest to smallest (best to worst)
  return data.sort((a, b) =>
    metric === "time" ? a.value - b.value : a.minzippedBytes - b.minzippedBytes,
  );
};
