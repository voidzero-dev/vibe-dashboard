import { Package } from 'lucide-react';
import rolldownStats from '../../../../../rolldown-version-stats.json';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function RecentUpdatesCard() {
  return (
    <Card title='Recent Updates' subtitle='Latest changes and improvements'>
      <div className='space-y-4'>
        {rolldownStats.slice(-5).reverse().map((stat, index) => (
          <div
            key={stat.version}
            className='flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-0'
          >
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
                <Package size={20} className='text-blue-600 dark:text-blue-400' />
              </div>
              <div>
                <p className='font-medium text-slate-900 dark:text-white'>
                  Version {stat.version} Released
                </p>
                <p className='text-sm text-slate-500 dark:text-slate-400'>
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
  );
}