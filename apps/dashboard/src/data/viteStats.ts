import rawViteStats from "../../../../data/vite-version-stats.json";

export interface ViteStatFile {
  path: string;
  size: number;
  type: string;
}

export interface ViteStat {
  version: string;
  timestamp: string;
  publicationDate: string;
  files: ViteStatFile[];
  totalSize: number;
  buildTime: number;
}

// Typed view of the generated stats. The underlying JSON can be an empty array
// (e.g. before any stable Vite 8 release exists), which would otherwise be
// inferred as `never[]` and break every property access downstream.
export const viteStats = rawViteStats as ViteStat[];
