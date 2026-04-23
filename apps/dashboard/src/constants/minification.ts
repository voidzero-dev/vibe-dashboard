/**
 * Minification statistics data
 */
export interface MinificationStat {
  label: string;
  value: string;
  badge: string;
  highlight?: boolean;
}

export const MINIFICATION_STATS_DATA = {
  fastestMinifier: "OXC",
  bestCompression: "UglifyJS",
} as const;
