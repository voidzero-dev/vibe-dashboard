import minificationData from '../../../../../minification-benchmarks-data.json';
import { popularMinifiers } from '../../utils/minification-data';

export function MinificationStats() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
      {/* Minification statistics */}
      <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
        <h3 className='mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest'>
          Libraries Tested
        </h3>
        <p className='mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight'>
          {Object.keys(minificationData).length}
        </p>
        <span className='text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200'>
          JavaScript Libraries
        </span>
      </div>
      <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
        <h3 className='mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest'>
          Minifiers Compared
        </h3>
        <p className='mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight'>
          {popularMinifiers.length}
        </p>
        <span className='text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200'>
          Popular Tools
        </span>
      </div>
      <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
        <h3 className='mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest'>
          Fastest Minifier
        </h3>
        <p className='mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight'>
          OXC
        </p>
        <span className='text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200'>
          Rust-based
        </span>
      </div>
      <div className='bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-7 py-7 rounded-xl shadow-sm border-l-4 border-l-blue-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'>
        <h3 className='mb-3 text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-widest'>
          Best Compression
        </h3>
        <p className='mb-3 text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-tight'>
          UglifyJS
        </p>
        <span className='text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 bg-opacity-100 border border-emerald-200 border-opacity-200'>
          Traditional Leader
        </span>
      </div>
    </div>
  );
}
