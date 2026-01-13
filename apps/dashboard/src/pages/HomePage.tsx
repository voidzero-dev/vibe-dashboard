import {
  BarChart3,
  Box,
  ExternalLink,
  FileText,
  FlaskConical,
  GitBranch,
  Package,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageContainer } from "../components/layout/PageContainer";

// VoidZero ecosystem projects
const projects = [
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
];

// Performance benchmarks (Rolldown)
const bundlerBenchmarks = [
  { name: "Rolldown", time: 1.61, color: "var(--color-accent)" },
  { name: "esbuild", time: 1.7, color: "#FFCF00" },
  { name: "rspack", time: 4.07, color: "#FF6B35" },
  { name: "Rollup + esbuild", time: 40.1, color: "#FF4444" },
];

// Oxc performance metrics
const oxcBenchmarks = [
  { tool: "Oxlint", comparison: "vs ESLint", speed: "50-100x faster" },
  { tool: "Oxfmt", comparison: "vs Prettier", speed: "35x faster" },
  { tool: "Parser", comparison: "vs SWC", speed: "3x faster" },
  { tool: "Resolver", comparison: "vs enhanced-resolve", speed: "28x faster" },
];

// Dashboard sections
const dashboardSections = [
  {
    title: "Rolldown Stats",
    description: "Build performance metrics and bundle size evolution",
    icon: <Package className="w-5 h-5" />,
    link: "/rolldown-stats",
  },
  {
    title: "Minification Benchmarks",
    description: "Compare JavaScript minification tools",
    icon: <Zap className="w-5 h-5" />,
    link: "/minification",
  },
  {
    title: "NPM Packages",
    description: "Package downloads and version stats",
    icon: <Sparkles className="w-5 h-5" />,
    link: "/npm-packages",
  },
  {
    title: "GitHub Dependents",
    description: "Repositories depending on key packages",
    icon: <GitBranch className="w-5 h-5" />,
    link: "/dependents",
  },
];

// Trusted by companies
const trustedBy = [
  "Shopify",
  "OpenAI",
  "Cloudflare",
  "Linear",
  "Framer",
  "Hugging Face",
  "Mercedes",
];

function HomePage() {
  const maxTime = Math.max(...bundlerBenchmarks.map((b) => b.time));

  return (
    <PageContainer>
      {/* Hero Section */}
      <div className="mb-16">
        <div className="flex items-start gap-5 mb-4">
          <div className="w-12 h-12 bg-[var(--color-accent)] rounded-lg flex items-center justify-center flex-shrink-0">
            <BarChart3 size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-1">VoidZero Dashboard</h1>
            <p className="text-[var(--color-text-muted)] text-sm max-w-xl">
              Performance metrics and analytics for the next-generation JavaScript toolchain
            </p>
          </div>
        </div>

        {/* Total stats banner */}
        <div className="flex items-center gap-8 mt-8 py-4 px-5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg">
          <div>
            <div className="text-2xl font-semibold text-[var(--color-accent)]">124.1k</div>
            <div className="text-xs text-[var(--color-text-muted)]">GitHub Stars</div>
          </div>
          <div className="w-px h-8 bg-[var(--color-border)]" />
          <div>
            <div className="text-2xl font-semibold">2,208+</div>
            <div className="text-xs text-[var(--color-text-muted)]">Contributors</div>
          </div>
          <div className="w-px h-8 bg-[var(--color-border)]" />
          <div>
            <div className="text-2xl font-semibold">57M+</div>
            <div className="text-xs text-[var(--color-text-muted)]">Weekly Downloads</div>
          </div>
          <div className="w-px h-8 bg-[var(--color-border)]" />
          <div>
            <div className="text-2xl font-semibold text-green-500">$12.5M</div>
            <div className="text-xs text-[var(--color-text-muted)]">Series A Funding</div>
          </div>
        </div>
      </div>

      {/* Open Source Projects */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Open Source Projects</h2>
          <a
            href="https://voidzero.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
          >
            voidzero.dev <ExternalLink size={12} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)] transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                <span className="font-medium text-sm group-hover:text-[var(--color-accent)] transition-colors">
                  {project.name}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mb-3 leading-relaxed">
                {project.description}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span> {project.stars}
                </span>
                <span>{project.downloads}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold mb-6">Bundler Performance</h2>
        <div className="p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
          <p className="text-xs text-[var(--color-text-muted)] mb-4">
            Bundling 19,000 modules (10k React JSX + 9k iconify JS) with minification & source maps
          </p>
          <div className="space-y-3">
            {bundlerBenchmarks.map((benchmark) => (
              <div key={benchmark.name} className="flex items-center gap-4">
                <div className="w-32 text-sm">{benchmark.name}</div>
                <div className="flex-1 h-6 bg-[var(--color-surface)] rounded overflow-hidden">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{
                      width: `${(benchmark.time / maxTime) * 100}%`,
                      backgroundColor: benchmark.color,
                    }}
                  />
                </div>
                <div className="w-16 text-right font-mono text-sm">{benchmark.time}s</div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-muted)]">
              Source: rolldown.rs benchmarks
            </span>
            <a
              href="https://rolldown.rs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              Learn more <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </section>

      {/* Oxc Performance */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold mb-6">Oxc Toolchain Speed</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {oxcBenchmarks.map((bench) => (
            <div
              key={bench.tool}
              className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
            >
              <div className="text-sm font-medium mb-1">{bench.tool}</div>
              <div className="text-xs text-[var(--color-text-muted)] mb-2">{bench.comparison}</div>
              <div className="text-lg font-semibold text-[var(--color-accent)]">{bench.speed}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4">
          <a
            href="https://oxc.rs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
          >
            oxc.rs <ExternalLink size={10} />
          </a>
          <span className="text-xs text-[var(--color-text-muted)]">
            570+ linting rules • Prettier-compatible formatter • TypeScript & JSX support
          </span>
        </div>
      </section>

      {/* Vite+ Section */}
      <section className="mb-16">
        <div className="p-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Vite+</h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                The Unified Toolchain for the Web
              </p>
            </div>
            <a
              href="https://viteplus.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              viteplus.dev <ExternalLink size={10} />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
            {[
              { icon: <Box size={14} />, label: "Dev", sub: "40x faster" },
              { icon: <Package size={14} />, label: "Build", sub: "Rolldown" },
              { icon: <FlaskConical size={14} />, label: "Test", sub: "Vitest" },
              { icon: <Zap size={14} />, label: "Lint", sub: "100x faster" },
              { icon: <FileText size={14} />, label: "Format", sub: "Prettier-compat" },
              { icon: <Timer size={14} />, label: "Cache", sub: "Monorepo" },
              { icon: <BarChart3 size={14} />, label: "GUI", sub: "Debug tools" },
            ].map((feature) => (
              <div
                key={feature.label}
                className="p-3 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-center"
              >
                <div className="text-[var(--color-text-muted)] mb-1 flex justify-center">
                  {feature.icon}
                </div>
                <div className="text-xs font-medium">{feature.label}</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">{feature.sub}</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--color-text-muted)]">
            One dependency for dev, build, test, lint, and format. Supports React, Vue, Svelte,
            Solid, and 20+ frameworks.
          </p>
        </div>
      </section>

      {/* Dashboard Analytics */}
      <section className="mb-16">
        <h2 className="text-lg font-semibold mb-6">Dashboard Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {dashboardSections.map((section) => (
            <Link key={section.link} to={section.link} className="group">
              <div className="h-full p-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition-all duration-150 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)]">
                <div className="mb-3 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
                  {section.icon}
                </div>
                <h3 className="text-sm font-medium mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                  {section.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {section.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trusted By */}
      <section className="mb-8">
        <div className="text-xs text-[var(--color-text-muted)] mb-4">Trusted by</div>
        <div className="flex flex-wrap items-center gap-6">
          {trustedBy.map((company) => (
            <span
              key={company}
              className="text-sm text-[var(--color-text-muted)] opacity-60 hover:opacity-100 transition-opacity"
            >
              {company}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] pt-8 border-t border-[var(--color-border)]">
        <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
        <span>Part of the VoidZero ecosystem</span>
        <span className="mx-2">•</span>
        <a
          href="https://voidzero.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-accent)] transition-colors"
        >
          voidzero.dev
        </a>
      </div>
    </PageContainer>
  );
}

export default HomePage;
