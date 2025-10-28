import { PackageCard } from "./PackageCard";

interface PackageDownloadsListProps {
  packages: string[];
}

export function PackageDownloadsList({ packages }: PackageDownloadsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {packages.map((packageName) => (
        <PackageCard key={packageName} packageName={packageName} />
      ))}
    </div>
  );
}
