import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import rolldownStats from '../../../../../rolldown-version-stats.json';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const performanceTrend = rolldownStats.slice(-7).map(stat => ({
  version: `v${stat.version}`,
  buildTime: stat.buildTime,
  bundleSize: Math.round(stat.totalSize / 1024), // Convert to KB
}));

export function PerformanceTrendChart() {
  return (
    <Card
      title='Performance Trend'
      subtitle='Build time and bundle size over versions'
      headerAction={
        <Link to='/rolldown-stats'>
          <Button variant='ghost' size='sm' icon={<ArrowRight size={16} />}>
            View Details
          </Button>
        </Link>
      }
    >
      <ResponsiveContainer width='100%' height={250}>
        <LineChart data={performanceTrend}>
          <CartesianGrid strokeDasharray='3 3' className='stroke-slate-200 dark:stroke-slate-700' />
          <XAxis
            dataKey='version'
            className='text-xs'
            tick={{ fill: 'currentColor' }}
          />
          <YAxis
            yAxisId='left'
            className='text-xs'
            tick={{ fill: 'currentColor' }}
          />
          <YAxis
            yAxisId='right'
            orientation='right'
            className='text-xs'
            tick={{ fill: 'currentColor' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg)',
              border: '1px solid var(--tooltip-border)',
              borderRadius: '8px',
            }}
          />
          <Line
            yAxisId='left'
            type='monotone'
            dataKey='buildTime'
            stroke='#8b5cf6'
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name='Build Time (ms)'
          />
          <Line
            yAxisId='right'
            type='monotone'
            dataKey='bundleSize'
            stroke='#3b82f6'
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name='Bundle Size (KB)'
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}