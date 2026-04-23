/**
 * VoidZero ecosystem projects with their metadata
 */
export interface Project {
  name: string;
  description: string;
  stars: string;
  contributors: string;
  downloads: string;
  url: string;
  color: string;
}

export const PROJECTS: Project[] = [
  {
    name: "Vite",
    description: "The build tool for the web",
    stars: "75.0k",
    contributors: "1,161",
    downloads: "36M+/week",
    url: "https://vite.dev",
    color: "#646CFF",
  },
  {
    name: "Vitest",
    description: "Next-generation testing framework",
    stars: "14.9k",
    contributors: "631",
    downloads: "16.5M+/week",
    url: "https://vitest.dev",
    color: "#729B1B",
  },
  {
    name: "Rolldown",
    description: "Blazing fast Rust-based bundler",
    stars: "12.2k",
    contributors: "148",
    downloads: "—",
    url: "https://rolldown.rs",
    color: "#FF6B35",
  },
  {
    name: "Oxc",
    description: "The JavaScript Oxidation Compiler",
    stars: "17.2k",
    contributors: "268",
    downloads: "3.8M+/week",
    url: "https://oxc.rs",
    color: "#6B7FD7",
  },
  {
    name: "VitePress",
    description: "Markdown to beautiful docs",
    stars: "13.5k",
    contributors: "400+",
    downloads: "1.2M+/week",
    url: "https://vitepress.dev",
    color: "#5C73E7",
  },
  {
    name: "Vite+",
    description: "The unified toolchain for the web",
    stars: "1.2k",
    contributors: "30+",
    downloads: "50k+/week",
    url: "https://viteplus.dev",
    color: "#BD34FE",
  },
];
