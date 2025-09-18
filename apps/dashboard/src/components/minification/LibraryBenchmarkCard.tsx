import { getLibraryData } from '@vibe/utils';
import { CompressionRatioChart } from './CompressionRatioChart';
import { MinificationTimeChart } from './MinificationTimeChart';

interface LibraryBenchmarkCardProps {
  library: string;
}

export function LibraryBenchmarkCard({ library }: LibraryBenchmarkCardProps) {
  const timeData = getLibraryData(library, 'time');
  const compressionData = getLibraryData(library, 'compression');

  return (
    <div className='bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-6 py-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
      <h3 className='mb-4 text-xl font-bold text-slate-800 dark:text-slate-100 capitalize text-center pb-2 border-b-2 border-slate-200 dark:border-slate-700'>
        {library}
      </h3>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4'>
        {/* Left column - Minification Time */}
        <div className='bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4'>
          <h4 className='mb-4 text-base font-medium text-gray-700 dark:text-gray-300 text-center pb-2 border-b border-gray-200 dark:border-gray-700'>
            Minification Time
          </h4>
          <MinificationTimeChart data={timeData} />
        </div>

        {/* Right column - Compression Ratio */}
        <div className='bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4'>
          <h4 className='mb-4 text-base font-medium text-gray-700 dark:text-gray-300 text-center pb-2 border-b border-gray-200 dark:border-gray-700'>
            Compression Ratio
          </h4>
          <CompressionRatioChart data={compressionData} />
        </div>
      </div>
    </div>
  );
}
