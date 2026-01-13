import { libraries } from "@vibe/utils";
import { LibraryBenchmarkCard } from "./components/minification/LibraryBenchmarkCard";
import { MinificationStats } from "./components/minification/MinificationStats";

function MinificationBenchmarks() {
  return (
    <main className="px-6 py-6 flex flex-col gap-6">
      {/* Combined Charts for Each Library */}
      <div className="flex flex-col gap-6">
        {libraries.map((library) => (
          <LibraryBenchmarkCard key={library} library={library} />
        ))}
      </div>

      <MinificationStats />
    </main>
  );
}

export default MinificationBenchmarks;
