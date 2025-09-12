import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import minificationData from '../../../minification-benchmarks-data.json';

// Transform minification data for charts
// Get popular minifiers for comparison
const popularMinifiers = ['terser', 'esbuild', '@swc/core', 'uglify-js', 'oxc-minify'];

// Get library names from the data, sorted by size (largest first)
const libraries = Object.entries(minificationData)
  .map(([name, data]: [string, any]) => ({ name, size: data.size }))
  .sort((a, b) => b.size - a.size)
  .map(item => item.name);

// Transform minification data for individual library charts
const getLibraryData = (library: string, metric: 'time' | 'compression') => {
  const libraryData = (minificationData as any)[library];
  const data: any[] = [];

  popularMinifiers.forEach(minifier => {
    const minifierData = libraryData.minified?.[minifier];
    if (minifierData?.result?.data) {
      let value: number;
      let minzippedBytes = 0;
      if (metric === 'time') {
        value = Math.round(minifierData.result.data.time || 0);
      } else {
        // compression ratio
        const originalSize = libraryData.size;
        minzippedBytes = minifierData.result.data.minzippedBytes || 0;
        value = Math.round(((originalSize - minzippedBytes) / originalSize) * 100 * 10) / 10;
      }

      data.push({
        name: minifier === '@swc/core'
          ? 'SWC'
          : minifier === 'uglify-js'
          ? 'UglifyJS'
          : minifier === 'oxc-minify'
          ? 'OXC'
          : minifier === 'esbuild'
          ? 'ESBuild'
          : minifier === 'terser'
          ? 'Terser'
          : minifier,
        value,
        minzippedBytes: minzippedBytes || 0,
        fill: minifier === 'terser'
          ? '#a78bfa'
          : minifier === 'esbuild'
          ? '#10b981'
          : minifier === '@swc/core'
          ? '#38bdf8'
          : minifier === 'uglify-js'
          ? '#f87171'
          : minifier === 'oxc-minify'
          ? '#fbbf24'
          : '#9ca3af',
      });
    }
  });

  // Sort data: time from smallest to largest (fastest to slowest), compression from largest to smallest (best to worst)
  return data.sort((a, b) => metric === 'time' ? a.value - b.value : a.minzippedBytes - b.minzippedBytes);
};

interface MinificationBenchmarksProps {
  // Remove selectedMetric and setSelectedMetric since we'll show both metrics together
}

function MinificationBenchmarks({}: MinificationBenchmarksProps) {
  return (
    <>
      <main className='max-w-6xl mx-auto px-8 py-8 flex flex-col gap-8'>
        {/* Combined Charts for Each Library - Time and Compression Side by Side */}
        <div className='flex flex-col gap-8'>
          {libraries.map(library => {
            const timeData = getLibraryData(library, 'time');
            const compressionData = getLibraryData(library, 'compression');

            return (
              <div
                key={library}
                className='bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-6 py-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'
              >
                <h3 className='mb-4 text-xl font-bold text-slate-800 dark:text-slate-100 capitalize text-center pb-2 border-b-2 border-slate-200 dark:border-slate-700'>
                  {library}
                </h3>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4'>
                  {/* Left column - Minification Time */}
                  <div className='bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4'>
                    <h4 className='mb-4 text-base font-medium text-gray-700 dark:text-gray-300 text-center pb-2 border-b border-gray-200 dark:border-gray-700'>
                      Minification Time
                    </h4>
                    <ResponsiveContainer width='100%' height={300}>
                      <BarChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray='3 3' className='stroke-slate-200 dark:stroke-slate-700' />
                        <XAxis
                          dataKey='name'
                          tick={{ fill: '#6b7280', fontSize: 11 }}
                          axisLine={{ stroke: '#e5e7eb' }}
                          tickLine={{ stroke: '#e5e7eb' }}
                          angle={-45}
                          textAnchor='end'
                          height={60}
                        />
                        <YAxis
                          tick={{ fill: '#6b7280', fontSize: 11 }}
                          axisLine={{ stroke: '#e5e7eb' }}
                          tickLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--tooltip-bg)',
                            border: '1px solid var(--tooltip-border)',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            color: 'var(--tooltip-text)',
                          }}
                          labelStyle={{ color: 'var(--tooltip-text)' }}
                          formatter={(value: any) => [`${value}ms`, 'Minification Time']}
                        />
                        <Bar dataKey='value' fill='#60a5fa'>
                          <LabelList
                            dataKey='value'
                            position='top'
                            formatter={(label: React.ReactNode) => `${label}ms`}
                            style={{ fontSize: '12px', fill: '#6b7280' }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Right column - Compression Ratio */}
                  <div className='bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-4'>
                    <h4 className='mb-4 text-base font-medium text-gray-700 dark:text-gray-300 text-center pb-2 border-b border-gray-200 dark:border-gray-700'>
                      Compression Ratio
                    </h4>
                    <ResponsiveContainer width='100%' height={300}>
                      <BarChart data={compressionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray='3 3' className='stroke-slate-200 dark:stroke-slate-700' />
                        <XAxis
                          dataKey='name'
                          tick={{ fill: '#6b7280', fontSize: 11 }}
                          axisLine={{ stroke: '#e5e7eb' }}
                          tickLine={{ stroke: '#e5e7eb' }}
                          angle={-45}
                          textAnchor='end'
                          height={60}
                        />
                        <YAxis
                          tick={{ fill: '#6b7280', fontSize: 11 }}
                          axisLine={{ stroke: '#e5e7eb' }}
                          tickLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--tooltip-bg)',
                            border: '1px solid var(--tooltip-border)',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            color: 'var(--tooltip-text)',
                          }}
                          labelStyle={{ color: 'var(--tooltip-text)' }}
                          formatter={(value: any, _name: any, props: any) => [
                            `${value}% (${props.payload.minzippedBytes} bytes)`,
                            'Compression Ratio',
                          ]}
                        />
                        <Bar dataKey='value' fill='#4ade80'>
                          <LabelList
                            dataKey='value'
                            position='top'
                            formatter={(label: React.ReactNode) => `${label}%`}
                            style={{ fontSize: '10px', fill: '#6b7280' }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
      </main>
    </>
  );
}

export default MinificationBenchmarks;
