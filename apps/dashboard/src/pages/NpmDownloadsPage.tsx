import { Download, TrendingUp, Package, Calendar } from 'lucide-react';
import NpmDownloads from '../NpmDownloads';
import { PageContainer } from '../components/layout/PageContainer';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

function NpmDownloadsPage() {
  return (
    <PageContainer>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <Download className="text-green-600 dark:text-green-400" />
              NPM Downloads
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Weekly download statistics for key packages
            </p>
          </div>
          <Badge variant="success" size="md">
            Live Data
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Downloads</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">24.5K</p>
            </div>
            <Download className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Growth Rate</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">+12%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Packages</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">5</p>
            </div>
            <Package className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Period</p>
              <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">7 Days</p>
            </div>
            <Calendar className="w-8 h-8 text-amber-500" />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card noPadding>
        <NpmDownloads />
      </Card>
    </PageContainer>
  );
}

export default NpmDownloadsPage;
