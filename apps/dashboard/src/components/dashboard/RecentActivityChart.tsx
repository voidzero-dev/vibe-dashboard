import { Activity } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

const recentActivityData = [
  { date: 'Mon', commits: 12, issues: 5, prs: 3 },
  { date: 'Tue', commits: 19, issues: 8, prs: 5 },
  { date: 'Wed', commits: 15, issues: 3, prs: 2 },
  { date: 'Thu', commits: 25, issues: 10, prs: 7 },
  { date: 'Fri', commits: 22, issues: 6, prs: 4 },
  { date: 'Sat', commits: 8, issues: 2, prs: 1 },
  { date: 'Sun', commits: 5, issues: 1, prs: 0 },
];

export function RecentActivityChart() {
  return (
    <Card
      title='Recent Activity'
      subtitle='Repository activity over the past week'
      headerAction={
        <Badge variant='success'>
          <Activity size={12} className='mr-1' />
          Active
        </Badge>
      }
    >
      <ResponsiveContainer width='100%' height={250}>
        <AreaChart data={recentActivityData}>
          <CartesianGrid strokeDasharray='3 3' className='stroke-slate-200 dark:stroke-slate-700' />
          <XAxis
            dataKey='date'
            className='text-xs'
            tick={{ fill: 'currentColor' }}
          />
          <YAxis
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
          <Area
            type='monotone'
            dataKey='commits'
            stackId='1'
            stroke='#10b981'
            fill='#10b981'
            fillOpacity={0.6}
            name='Commits'
          />
          <Area
            type='monotone'
            dataKey='issues'
            stackId='1'
            stroke='#f59e0b'
            fill='#f59e0b'
            fillOpacity={0.6}
            name='Issues'
          />
          <Area
            type='monotone'
            dataKey='prs'
            stackId='1'
            stroke='#3b82f6'
            fill='#3b82f6'
            fillOpacity={0.6}
            name='Pull Requests'
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}