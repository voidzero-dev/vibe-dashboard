import { Download, Package, Scale, Users, Calendar, GitBranch, ExternalLink } from "lucide-react";
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

function Skeleton({ width }: { width: string }) {
  return (
    <span className={`inline-block h-4 ${width} bg-[var(--color-surface)] rounded animate-pulse`} />
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffHours === 0) return "Just now";
  if (diffHours === 1) return "1 hour ago";
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return "1 week ago";
  if (diffDays < 30) return `${diffWeeks} weeks ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "1 month ago";
  if (diffDays < 365) return `${diffMonths} months ago`;

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

  const lastPublishDate =
    packageData?.time?.modified || packageData?.time?.[packageData?.version || ""];
  const dependenciesCount = packageData?.dependencies
    ? Object.keys(packageData.dependencies).length
    : 0;
  const maintainersCount = packageData?.maintainers?.length || 0;

  const stats = [
    {
      icon: <Package size={12} />,
      label: "Version",
      value: loading ? <Skeleton width="w-12" /> : packageData?.version || "N/A",
    },
    {
      icon: <Download size={12} />,
      label: "Weekly",
      value: loading ? (
        <Skeleton width="w-14" />
      ) : downloads !== null ? (
        formatNumber(downloads)
      ) : (
        "N/A"
      ),
      highlight: true,
    },
    {
      icon: <Calendar size={12} />,
      label: "Updated",
      value: loading ? (
        <Skeleton width="w-16" />
      ) : lastPublishDate ? (
        formatDate(lastPublishDate)
      ) : (
        "N/A"
      ),
    },
    {
      icon: <Users size={12} />,
      label: "Maintainers",
      value: loading ? <Skeleton width="w-8" /> : maintainersCount,
    },
    {
      icon: <GitBranch size={12} />,
      label: "Deps",
      value: loading ? <Skeleton width="w-8" /> : dependenciesCount,
    },
    {
      icon: <Scale size={12} />,
      label: "License",
      value: loading ? <Skeleton width="w-10" /> : packageData?.license || "N/A",
    },
  ];

  return (
    <button
      type="button"
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition-all cursor-pointer group hover:border-[var(--color-border-strong)] text-left w-full"
      onClick={handleClick}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className="font-mono text-sm font-medium group-hover:text-[var(--color-accent)] transition-colors">
          {packageName}
        </h3>
        <ExternalLink
          size={12}
          className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Stats Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-[var(--color-surface)] text-[var(--color-text-muted)]">
              {stat.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-[var(--color-text-muted)]">{stat.label}</p>
              <p
                className={`text-sm font-medium truncate ${stat.highlight ? "text-[var(--color-accent)]" : ""}`}
              >
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </button>
  );
}
