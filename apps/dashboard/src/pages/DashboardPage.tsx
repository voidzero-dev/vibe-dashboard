import { TrendingUp, TrendingDown, Package, Zap, Download, Clock, ArrowRight, Activity } from 'lucide-react';
import { Card, CardGrid } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { PageContainer } from '../components/layout/PageContainer';
import { Link } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import rolldownStats from '../../../../rolldown-version-stats.json';
import minificationData from '../../../../minification-benchmarks-data.json';

// Mock data for charts
const recentActivityData = [
  { date: 'Mon', commits: 12, issues: 5, prs: 3 },
  { date: 'Tue', commits: 19, issues: 8, prs: 5 },
  { date: 'Wed', commits: 15, issues: 3, prs: 2 },
  { date: 'Thu', commits: 25, issues: 10, prs: 7 },
  { date: 'Fri', commits: 22, issues: 6, prs: 4 },
  { date: 'Sat', commits: 8, issues: 2, prs: 1 },
  { date: 'Sun', commits: 5, issues: 1, prs: 0 },
];

const performanceTrend = rolldownStats.slice(-7).map(stat => ({
  version: `v${stat.version}`,
  buildTime: stat.buildTime,
  bundleSize: Math.round(stat.totalSize / 1024), // Convert to KB
}));

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  linkTo?: string;
}

function StatCard({ title, value, change, changeLabel, icon, trend, linkTo }: StatCardProps) {
  const content = (
    <div className="group relative">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-2">
              {trend === 'up' ? (
                <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
              )}
              <span className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-slate-500 dark:text-slate-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
          {icon}
        </div>
      </div>
      {linkTo && (
        <Link 
          to={linkTo}
          className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-blue-500 transition-all"
        />
      )}
    </div>
  );

  return (
    <Card className={linkTo ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}>
      {content}
    </Card>
  );
}

function DashboardPage() {
  // Calculate stats
  const latestRolldownStats = rolldownStats[rolldownStats.length - 1];
  const previousRolldownStats = rolldownStats[rolldownStats.length - 2];
  const bundleSizeChange = previousRolldownStats 
    ? Math.round(((latestRolldownStats.totalSize - previousRolldownStats.totalSize) / previousRolldownStats.totalSize) * 100)
    : 0;
  
  const buildTimeChange = previousRolldownStats
    ? Math.round(((latestRolldownStats.buildTime - previousRolldownStats.buildTime) / previousRolldownStats.buildTime) * 100)
    : 0;

  // Count minification tools
  const minificationToolsCount = Object.keys(minificationData).length;

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Monitor your project metrics and performance at a glance
        </p>
      </div>

      {/* Stats Grid */}
      <CardGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Bundle Size"
          value={`${Math.round(latestRolldownStats.totalSize / 1024)} KB`}
          change={bundleSizeChange}
          changeLabel="vs last version"
          icon={<Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
          trend={bundleSizeChange >= 0 ? 'up' : 'down'}
          linkTo="/rolldown-stats"
        />
        <StatCard
          title="Build Time"
          value={`${latestRolldownStats.buildTime}ms`}
          change={buildTimeChange}
          changeLabel="vs last version"
          icon={<Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
          trend={buildTimeChange >= 0 ? 'up' : 'down'}
          linkTo="/rolldown-stats"
        />
        <StatCard
          title="Minification Tools"
          value={minificationToolsCount}
          icon={<Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
          linkTo="/minification"
        />
        <StatCard
          title="NPM Downloads"
          value="24.5K"
          change={12}
          changeLabel="this week"
          icon={<Download className="w-6 h-6 text-green-600 dark:text-green-400" />}
          trend="up"
          linkTo="/npm-downloads"
        />
      </CardGrid>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Trend */}
        <Card 
          title="Performance Trend" 
          subtitle="Build time and bundle size over versions"
          headerAction={
            <Link to="/rolldown-stats">
              <Button variant="ghost" size="sm" icon={<ArrowRight size={16} />}>
                View Details
              </Button>
            </Link>
          }
        >
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis 
                dataKey="version" 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis 
                yAxisId="left" 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg)',
                  border: '1px solid var(--tooltip-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="buildTime" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Build Time (ms)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="bundleSize" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Bundle Size (KB)"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Activity */}
        <Card 
          title="Recent Activity" 
          subtitle="Repository activity over the past week"
          headerAction={
            <Badge variant="success">
              <Activity size={12} className="mr-1" />
              Active
            </Badge>
          }
        >
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={recentActivityData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis 
                dataKey="date" 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'currentColor' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg)',
                  border: '1px solid var(--tooltip-border)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="commits" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.6}
                name="Commits"
              />
              <Area 
                type="monotone" 
                dataKey="issues" 
                stackId="1"
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.6}
                name="Issues"
              />
              <Area 
                type="monotone" 
                dataKey="prs" 
                stackId="1"
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.6}
                name="Pull Requests"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Updates */}
      <Card title="Recent Updates" subtitle="Latest changes and improvements">
        <div className="space-y-4">
          {rolldownStats.slice(-5).reverse().map((stat, index) => (
            <div key={stat.version} className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Package size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Version {stat.version} Released
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Bundle size: {Math.round(stat.totalSize / 1024)} KB • Build time: {stat.buildTime}ms
                  </p>
                </div>
              </div>
              <Badge variant={index === 0 ? 'success' : 'default'}>
                {index === 0 ? 'Latest' : `${index} version${index > 1 ? 's' : ''} behind`}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
}

export default DashboardPage;