import { PageHeader } from "@vibe/shared";
import { Card } from "@vibe/ui";
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
    [pkg: string]: DependentsCollection | Dependent[]; // Support both old and new format
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

  // Flatten the data structure to get all packages
  const allPackages: PackageData[] = [];
  Object.entries(data).forEach(([repo, packages]) => {
    Object.entries(packages).forEach(([pkg, deps]) => {
      // Handle both old format (array) and new format (object with topDependents/latestDependents)
      if (Array.isArray(deps)) {
        // Old format - treat as topDependents
        allPackages.push({
          repo,
          package: pkg,
          topDependents: deps,
          latestDependents: [],
        });
      } else {
        // New format
        allPackages.push({
          repo,
          package: pkg,
          topDependents: deps.topDependents || [],
          latestDependents: deps.latestDependents || [],
        });
      }
    });
  });

  // No stats calculation needed since we removed the cards

  return (
    <PageContainer>
      <PageHeader
        icon={<GitBranch className="text-purple-600 dark:text-purple-400" />}
        title="GitHub Dependents"
        subtitle="Repositories and packages that depend on our projects"
      />

      {/* Tab Switcher */}
      <div className="mb-8 flex justify-center">
        <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1.5 shadow-sm">
          <button
            onClick={() => setViewMode("top")}
            className={`px-6 py-3 rounded-md text-base font-semibold transition-all ${
              viewMode === "top"
                ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Top by Stars
            </span>
          </button>
          <button
            onClick={() => setViewMode("latest")}
            className={`px-6 py-3 rounded-md text-base font-semibold transition-all ${
              viewMode === "latest"
                ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Most Recent
            </span>
          </button>
        </div>
      </div>

      {/* All Packages in 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {allPackages.map(({ repo, package: pkg, topDependents, latestDependents }) => {
          const dependents = viewMode === "top" ? topDependents : latestDependents;
          return (
            <Card key={`${repo}/${pkg}`} className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{repo}</span>
                </div>
                <h3 className="text-lg font-semibold">{pkg}</h3>
                <div className="w-20"></div>
              </div>

              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-2 px-2 font-medium text-slate-600 dark:text-slate-400 w-12">
                        #
                      </th>
                      <th className="text-left py-2 px-2 font-medium text-slate-600 dark:text-slate-400">
                        Repository
                      </th>
                      <th className="text-right py-2 px-2 font-medium text-slate-600 dark:text-slate-400 w-24">
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
                          className="border-b border-slate-100 dark:border-slate-800 transition-colors duration-150 bg-white dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                        >
                          <td className="py-2 px-2 text-slate-500 dark:text-slate-400">
                            {index + 1}
                          </td>
                          <td className="py-2 px-2">
                            <a
                              href={dep.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 group"
                            >
                              <span className="truncate">{repoName}</span>
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </a>
                          </td>
                          <td className="py-2 px-2 text-right">
                            <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
                              <Star className="w-3 h-3" />
                              <span className="font-medium">{dep.stars.toLocaleString()}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}

export default DependentsPage;
