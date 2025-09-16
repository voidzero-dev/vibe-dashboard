import { formatNumberWithCommas } from '@vibe/utils';
import rolldownStats from '../../../../../data/rolldown-version-stats.json';

const buildTimeData = rolldownStats.map(stat => stat.buildTime);

export function StatsCards() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
      <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
        <h3 className='mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest'>
          Average Build Time
        </h3>
        <p className='mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight'>
          {Math.round(buildTimeData.reduce((sum, item) => sum + item, 0) / buildTimeData.length)}ms
        </p>
        <span className='text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200'>
          Across {buildTimeData.length} versions
        </span>
      </div>
      <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
        <h3 className='mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest'>
          Latest Bundle Size
        </h3>
        <p className='mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight'>
          {formatNumberWithCommas(rolldownStats[rolldownStats.length - 1]?.totalSize || 0)} bytes
        </p>
        <span className='text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200'>
          v{rolldownStats[rolldownStats.length - 1]?.version}
        </span>
      </div>
      <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
        <h3 className='mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest'>
          Bundle Size Range
        </h3>
        <p className='mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight'>
          {Math.round(
            (Math.max(...rolldownStats.map(s => s.totalSize)) - Math.min(...rolldownStats.map(s => s.totalSize))) /
              1024,
          )}KB
        </p>
        <span className='text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200'>
          Size Variation
        </span>
      </div>
      <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
        <h3 className='mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest'>
          Versions Tested
        </h3>
        <p className='mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight'>
          {rolldownStats.length}
        </p>
        <span className='text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200'>
          {rolldownStats[0]?.version} - {rolldownStats[rolldownStats.length - 1]?.version}
        </span>
      </div>
    </div>
  );
}
