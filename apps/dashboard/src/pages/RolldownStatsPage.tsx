import { useState } from 'react';
import { Package, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import RolldownStats from '../RolldownStats';
import { PageContainer } from '../components/layout/PageContainer';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import rolldownStatsData from '../../../../rolldown-version-stats.json';

function RolldownStatsPage() {
  const [selectedMetric, setSelectedMetric] = useState('bundleSize');
  const latestVersion = rolldownStatsData[rolldownStatsData.length - 1];

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Package className="text-blue-600 dark:text-blue-400" />
              Rolldown Stats
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Track bundle size and build performance across versions
            </p>
          </div>
          <Badge variant="info" size="md">
            Latest: v{latestVersion.version}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Current Bundle Size</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {Math.round(latestVersion.totalSize / 1024)} KB
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Build Time</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {latestVersion.buildTime}ms
              </p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Versions</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {rolldownStatsData.length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Main Chart */}
      <Card noPadding>
        <RolldownStats
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
        />
      </Card>
    </PageContainer>
  );
}

export default RolldownStatsPage;
