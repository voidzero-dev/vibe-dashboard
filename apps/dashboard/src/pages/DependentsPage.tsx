import { PageHeader } from "@vibe/shared";
import { GitBranch, ExternalLink, Clock, TrendingUp, Star } from "lucide-react";
import { useState } from "react";
import dependentsData from "../../../../data/dependents.json";
import { PageContainer } from "../components/layout/PageContainer";

interface Dependent {
  url: string;
  stars: number;
}

interface DependentsCollection {
  topDependents: Dependent[];
  latestDependents: Dependent[];
}

interface DependentsData {
  [repo: string]: {
    [pkg: string]: DependentsCollection | Dependent[];
  };
}

interface PackageData {
  repo: string;
  package: string;
  topDependents: Dependent[];
  latestDependents: Dependent[];
}

function DependentsPage() {
  const [viewMode, setViewMode] = useState<"top" | "latest">("top");
  const data = dependentsData as DependentsData;

  const allPackages: PackageData[] = [];
  Object.entries(data).forEach(([repo, packages]) => {
    Object.entries(packages).forEach(([pkg, deps]) => {
      if (Array.isArray(deps)) {
        allPackages.push({
          repo,
          package: pkg,
          topDependents: deps,
          latestDependents: [],
        });
      } else {
        allPackages.push({
          repo,
          package: pkg,
          topDependents: deps.topDependents || [],
          latestDependents: deps.latestDependents || [],
        });
      }
    });
  });

  return (
    <PageContainer>
      <PageHeader
        icon={<GitBranch size={20} />}
        title="GitHub Dependents"
        subtitle="Repositories and packages that depend on our projects"
      />

      {/* Tab Switcher */}
      <div className="mb-8">
        <div className="inline-flex rounded-lg bg-[var(--color-surface)] p-1 border border-[var(--color-border)]">
          <button
            onClick={() => setViewMode("top")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              viewMode === "top"
                ? "bg-[var(--color-bg-elevated)] text-[var(--color-accent)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <TrendingUp size={14} />
            Top by Stars
          </button>
          <button
            onClick={() => setViewMode("latest")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
              viewMode === "latest"
                ? "bg-[var(--color-bg-elevated)] text-[var(--color-accent)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            <Clock size={14} />
            Most Recent
          </button>
        </div>
      </div>

      {/* All Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {allPackages.map(({ repo, package: pkg, topDependents, latestDependents }) => {
          const dependents = viewMode === "top" ? topDependents : latestDependents;
          return (
            <div
              key={`${repo}/${pkg}`}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] overflow-hidden"
            >
              {/* Card Header */}
              <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch size={14} className="text-[var(--color-text-muted)]" />
                  <span className="text-xs text-[var(--color-text-muted)]">{repo}</span>
                </div>
                <h3 className="text-sm font-semibold">{pkg}</h3>
              </div>

              {/* Table */}
              <div className="max-h-80 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-[var(--color-surface)] z-10">
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="text-left py-2 px-4 font-medium text-[var(--color-text-muted)] text-xs w-10">
                        #
                      </th>
                      <th className="text-left py-2 px-4 font-medium text-[var(--color-text-muted)] text-xs">
                        Repository
                      </th>
                      <th className="text-right py-2 px-4 font-medium text-[var(--color-text-muted)] text-xs w-20">
                        Stars
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dependents.map((dep, index) => {
                      const repoName = dep.url.replace("https://github.com/", "");
                      return (
                        <tr
                          key={dep.url}
                          className="border-b border-[var(--color-border)] last:border-0 transition-colors hover:bg-[var(--color-surface)]"
                        >
                          <td className="py-2 px-4 text-[var(--color-text-muted)] text-xs">
                            {index + 1}
                          </td>
                          <td className="py-2 px-4">
                            <a
                              href={dep.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm hover:text-[var(--color-accent)] transition-colors flex items-center gap-1 group"
                            >
                              <span className="truncate">{repoName}</span>
                              <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </a>
                          </td>
                          <td className="py-2 px-4 text-right">
                            <span className="inline-flex items-center gap-1 text-[var(--color-text-muted)] text-xs">
                              <Star size={10} className="text-amber-500" />
                              <span className="font-medium">{dep.stars.toLocaleString()}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}

export default DependentsPage;
