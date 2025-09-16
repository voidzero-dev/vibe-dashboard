import { CardGrid } from '@vibe/ui';
import { Clock, Download, Package, Zap } from 'lucide-react';
import minificationData from '../../../../../data/minification-benchmarks-data.json';
import rolldownStats from '../../../../../rolldown-version-stats.json';
import { StatCard } from './StatCard';

export function StatsGrid() {
  const latestRolldownStats = rolldownStats[rolldownStats.length - 1];
  const previousRolldownStats = rolldownStats[rolldownStats.length - 2];
  const bundleSizeChange = previousRolldownStats
    ? Math.round(
      ((latestRolldownStats.totalSize - previousRolldownStats.totalSize) / previousRolldownStats.totalSize) * 100,
    )
    : 0;

  const buildTimeChange = previousRolldownStats
    ? Math.round(
      ((latestRolldownStats.buildTime - previousRolldownStats.buildTime) / previousRolldownStats.buildTime) * 100,
    )
    : 0;

  const minificationToolsCount = Object.keys(minificationData).length;

  return (
    <CardGrid className='grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8'>
      <StatCard
        title='Bundle Size'
        value={`${Math.round(latestRolldownStats.totalSize / 1024)} KB`}
        change={bundleSizeChange}
        changeLabel='vs last version'
        icon={<Package className='w-6 h-6 text-blue-600 dark:text-blue-400' />}
        trend={bundleSizeChange >= 0 ? 'up' : 'down'}
        linkTo='/rolldown-stats'
      />
      <StatCard
        title='Build Time'
        value={`${latestRolldownStats.buildTime}ms`}
        change={buildTimeChange}
        changeLabel='vs last version'
        icon={<Clock className='w-6 h-6 text-purple-600 dark:text-purple-400' />}
        trend={buildTimeChange >= 0 ? 'up' : 'down'}
        linkTo='/rolldown-stats'
      />
      <StatCard
        title='Minification Tools'
        value={minificationToolsCount}
        icon={<Zap className='w-6 h-6 text-amber-600 dark:text-amber-400' />}
        linkTo='/minification'
      />
      <StatCard
        title='NPM Packages'
        value='10'
        change={12}
        changeLabel='tracked'
        icon={<Download className='w-6 h-6 text-green-600 dark:text-green-400' />}
        trend='up'
        linkTo='/npm-packages'
      />
    </CardGrid>
  );
}
