import type { ReactNode } from "react";

/**
 * Dashboard section metadata
 */
export interface DashboardSection {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
}

/**
 * Companies using VoidZero ecosystem tools
 */
export const TRUSTED_BY: string[] = [
  "Shopify",
  "OpenAI",
  "Cloudflare",
  "Linear",
  "Framer",
  "Hugging Face",
  "Mercedes",
];
