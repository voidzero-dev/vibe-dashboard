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
          ? '#8b5cf6'
          : minifier === 'esbuild'
          ? '#059669'
          : minifier === '@swc/core'
          ? '#0ea5e9'
          : minifier === 'uglify-js'
          ? '#dc2626'
          : minifier === 'oxc-minify'
          ? '#f59e0b'
          : '#6b7280',
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
      <main className='dashboard-main'>
        {/* Combined Charts for Each Library - Time and Compression Side by Side */}
        <div className='library-charts-grid'>
          {libraries.map(library => {
            const timeData = getLibraryData(library, 'time');
            const compressionData = getLibraryData(library, 'compression');

            return (
              <div key={library} className='library-chart-row'>
                <h3 className='library-title'>{library}</h3>
                <div className='library-charts-columns'>
                  {/* Left column - Minification Time */}
                  <div className='library-chart-container'>
                    <h4 className='chart-subtitle'>Minification Time</h4>
                    <ResponsiveContainer width='100%' height={300}>
                      <BarChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                        <XAxis
                          dataKey='name'
                          tick={{ fill: '#374151', fontSize: 11 }}
                          axisLine={{ stroke: '#d1d5db' }}
                          tickLine={{ stroke: '#d1d5db' }}
                          angle={-45}
                          textAnchor='end'
                          height={60}
                        />
                        <YAxis
                          tick={{ fill: '#374151', fontSize: 11 }}
                          axisLine={{ stroke: '#d1d5db' }}
                          tickLine={{ stroke: '#d1d5db' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.5rem',
                            color: '#111827',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                          }}
                          formatter={(value: any) => [`${value}ms`, 'Minification Time']}
                        />
                        <Bar dataKey='value'>
                          <LabelList
                            dataKey='value'
                            position='top'
                            formatter={(label: React.ReactNode) => `${label}ms`}
                            style={{ fontSize: '12px', fill: '#374151' }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Right column - Compression Ratio */}
                  <div className='library-chart-container'>
                    <h4 className='chart-subtitle'>Compression Ratio</h4>
                    <ResponsiveContainer width='100%' height={300}>
                      <BarChart data={compressionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                        <XAxis
                          dataKey='name'
                          tick={{ fill: '#374151', fontSize: 11 }}
                          axisLine={{ stroke: '#d1d5db' }}
                          tickLine={{ stroke: '#d1d5db' }}
                          angle={-45}
                          textAnchor='end'
                          height={60}
                        />
                        <YAxis
                          tick={{ fill: '#374151', fontSize: 11 }}
                          axisLine={{ stroke: '#d1d5db' }}
                          tickLine={{ stroke: '#d1d5db' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.5rem',
                            color: '#111827',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                          }}
                          formatter={(value: any, _name: any, props: any) => [
                            `${value}% (${props.payload.minzippedBytes} bytes)`,
                            'Compression Ratio',
                          ]}
                        />
                        <Bar dataKey='value'>
                          <LabelList
                            dataKey='value'
                            position='top'
                            formatter={(label: React.ReactNode) => `${label}%`}
                            style={{ fontSize: '10px', fill: '#374151' }}
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

        <div className='stats-grid'>
          {/* Minification statistics */}
          <div className='stat-card'>
            <h3>Libraries Tested</h3>
            <p className='stat-value'>{Object.keys(minificationData).length}</p>
            <span className='stat-change positive'>JavaScript Libraries</span>
          </div>
          <div className='stat-card'>
            <h3>Minifiers Compared</h3>
            <p className='stat-value'>{popularMinifiers.length}</p>
            <span className='stat-change positive'>Popular Tools</span>
          </div>
          <div className='stat-card'>
            <h3>Fastest Minifier</h3>
            <p className='stat-value'>OXC</p>
            <span className='stat-change positive'>Rust-based</span>
          </div>
          <div className='stat-card'>
            <h3>Best Compression</h3>
            <p className='stat-value'>UglifyJS</p>
            <span className='stat-change positive'>Traditional Leader</span>
          </div>
        </div>
      </main>
    </>
  );
}

export default MinificationBenchmarks;
