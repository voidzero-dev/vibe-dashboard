import { FileDown, Gauge, Timer, Zap } from 'lucide-react';
import minificationData from '../../../../minification-benchmarks-data.json';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import MinificationBenchmarks from '../MinificationBenchmarks';

function MinificationBenchmarksPage() {
  // Calculate some stats
  const totalLibraries = Object.keys(minificationData).length;
  const minifiers = ['terser', 'esbuild', '@swc/core', 'uglify-js', 'oxc-minify'];

  return (
    <PageContainer>
      {/* Page Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3'>
              <Zap className='text-amber-600 dark:text-amber-400' />
              Minification Benchmarks
            </h1>
            <p className='mt-2 text-slate-600 dark:text-slate-400'>
              Performance comparison of JavaScript minification tools
            </p>
          </div>
          <Badge variant='warning' size='md'>
            {totalLibraries} Libraries Tested
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
        <Card className='bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-amber-600 dark:text-amber-400'>Minifiers</p>
              <p className='text-2xl font-bold text-amber-900 dark:text-amber-100'>{minifiers.length}</p>
            </div>
            <Gauge className='w-8 h-8 text-amber-500' />
          </div>
        </Card>
        <Card className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-green-600 dark:text-green-400'>Fastest</p>
              <p className='text-2xl font-bold text-green-900 dark:text-green-100'>ESBuild</p>
            </div>
            <Timer className='w-8 h-8 text-green-500' />
          </div>
        </Card>
        <Card className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-blue-600 dark:text-blue-400'>Best Compression</p>
              <p className='text-2xl font-bold text-blue-900 dark:text-blue-100'>Terser</p>
            </div>
            <FileDown className='w-8 h-8 text-blue-500' />
          </div>
        </Card>
        <Card className='bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-purple-600 dark:text-purple-400'>Libraries</p>
              <p className='text-2xl font-bold text-purple-900 dark:text-purple-100'>{totalLibraries}</p>
            </div>
            <Zap className='w-8 h-8 text-purple-500' />
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Card noPadding>
        <MinificationBenchmarks />
      </Card>
    </PageContainer>
  );
}

export default MinificationBenchmarksPage;
