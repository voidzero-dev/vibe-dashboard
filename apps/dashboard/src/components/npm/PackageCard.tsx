import { Card } from "@vibe/ui";
import { Download, Package, Scale, Users, Calendar, GitBranch } from "lucide-react";
import { useEffect, useState } from "react";

interface PackageCardProps {
  packageName: string;
}

interface PackageData {
  version: string;
  license: string;
  maintainers?: Array<{ name: string }>;
  time?: { [key: string]: string };
  dependencies?: { [key: string]: string };
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Within 24 hours, show hours
  if (diffHours === 0) return "Just now";
  if (diffHours === 1) return "1 hour ago";
  if (diffHours < 24) return `${diffHours} hours ago`;

  // Days
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  // Weeks
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return "1 week ago";
  if (diffDays < 30) return `${diffWeeks} weeks ago`;

  // Months
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "1 month ago";
  if (diffDays < 365) return `${diffMonths} months ago`;

  // Years
  const diffYears = Math.floor(diffDays / 365);
  if (diffYears === 1) return "1 year ago";
  return `${diffYears} years ago`;
}

export function PackageCard({ packageName }: PackageCardProps) {
  const [downloads, setDownloads] = useState<number | null>(null);
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const [downloadsRes, packageRes] = await Promise.all([
          fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`),
          fetch(`https://registry.npmjs.org/${packageName}`),
        ]);

        if (downloadsRes.ok) {
          const downloadsData = await downloadsRes.json();
          setDownloads(downloadsData.downloads);
        }

        if (packageRes.ok) {
          const data = await packageRes.json();
          // Get the latest version data
          const latestVersion = data["dist-tags"]?.latest || Object.keys(data.versions || {}).pop();
          const latestVersionData = data.versions?.[latestVersion] || {};

          setPackageData({
            version: latestVersion,
            license: latestVersionData.license || data.license,
            maintainers: data.maintainers,
            time: data.time,
            dependencies: latestVersionData.dependencies,
          });
        }
      } catch (error) {
        console.error(`Failed to fetch data for ${packageName}:`, error);
      } finally {
        setLoading(false);
      }
    };

    void fetchPackageData();
  }, [packageName]);

  const handleClick = () => {
    window.open(`https://www.npmjs.com/package/${packageName}`, "_blank", "noopener,noreferrer");
  };

  // The 'modified' field contains the last modified date
  const lastPublishDate = packageData?.time?.modified || packageData?.time?.[packageData?.version || ""];
  const dependenciesCount = packageData?.dependencies ? Object.keys(packageData.dependencies).length : 0;
  const maintainersCount = packageData?.maintainers?.length || 0;

  return (
    <Card className="hover:shadow-lg transition-all cursor-pointer group">
      <div
        className="p-6"
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-mono text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {packageName}
          </h3>
          <Package className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded">
              <Package className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Version</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {loading ? (
                  <span className="inline-block h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                ) : (
                  packageData?.version || "N/A"
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded">
              <Download className="w-3 h-3 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Weekly</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {loading ? (
                  <span className="inline-block h-4 w-14 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                ) : downloads !== null ? (
                  formatNumber(downloads)
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded">
              <Calendar className="w-3 h-3 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Updated</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {loading ? (
                  <span className="inline-block h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                ) : lastPublishDate ? (
                  formatDate(lastPublishDate)
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded">
              <Users className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Maintainers</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {loading ? (
                  <span className="inline-block h-4 w-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                ) : (
                  maintainersCount
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded">
              <GitBranch className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Deps</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {loading ? (
                  <span className="inline-block h-4 w-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                ) : (
                  dependenciesCount
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded">
              <Scale className="w-3 h-3 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">License</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {loading ? (
                  <span className="inline-block h-4 w-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                ) : (
                  packageData?.license || "N/A"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
