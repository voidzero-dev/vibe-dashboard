import { getLibraryData } from "@vibe/utils";
import { CompressionRatioChart } from "./CompressionRatioChart";
import { MinificationTimeChart } from "./MinificationTimeChart";

interface LibraryBenchmarkCardProps {
  library: string;
}

export function LibraryBenchmarkCard({ library }: LibraryBenchmarkCardProps) {
  const timeData = getLibraryData(library, "time");
  const compressionData = getLibraryData(library, "compression");

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[var(--color-border)]">
        <h3 className="text-sm font-semibold capitalize">
          {library}
        </h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[var(--color-border)]">
        {/* Left column - Minification Time */}
        <div className="p-5 bg-[var(--color-bg-elevated)]">
          <h4 className="mb-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Minification Time
          </h4>
          <MinificationTimeChart data={timeData} />
        </div>

        {/* Right column - Compression Ratio */}
        <div className="p-5 bg-[var(--color-bg-elevated)]">
          <h4 className="mb-4 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Compression Ratio
          </h4>
          <CompressionRatioChart data={compressionData} />
        </div>
      </div>
    </div>
  );
}
