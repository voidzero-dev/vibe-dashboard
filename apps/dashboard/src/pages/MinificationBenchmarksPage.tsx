import { PageHeader } from "@vibe/shared";
import { Badge, Card } from "@vibe/ui";
import { FileDown, Gauge, Timer, Zap } from "lucide-react";
import minificationData from "../../../../data/minification-benchmarks-data.json";
import { PageContainer } from "../components/layout/PageContainer";
import MinificationBenchmarks from "../MinificationBenchmarks";

function MinificationBenchmarksPage() {
  // Calculate some stats
  const totalLibraries = Object.keys(minificationData).length;
  const minifiers = ["terser", "esbuild", "@swc/core", "uglify-js", "oxc-minify"];

  return (
    <PageContainer>
      <PageHeader
        icon={<Zap className="text-amber-600 dark:text-amber-400" />}
        title="Minification Benchmarks"
        subtitle="Performance comparison of JavaScript minification tools"
        action={
          <Badge variant="warning" size="md">
            {totalLibraries} Libraries Tested
          </Badge>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-300">Minifiers</p>
              <p className="text-2xl font-bold text-amber-900 dark:text-white">
                {minifiers.length}
              </p>
            </div>
            <Gauge className="w-8 h-8 text-amber-500" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-300">Fastest</p>
              <p className="text-2xl font-bold text-green-900 dark:text-white">OXC</p>
            </div>
            <Timer className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-300">
                Best Compression
              </p>
              <p className="text-2xl font-bold text-blue-900 dark:text-white">Terser</p>
            </div>
            <FileDown className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-300">Libraries</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-white">{totalLibraries}</p>
            </div>
            <Zap className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card noPadding>
        <MinificationBenchmarks />
      </Card>
    </PageContainer>
  );
}

export default MinificationBenchmarksPage;
