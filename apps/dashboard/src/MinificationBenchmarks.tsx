import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Zap, Gauge } from 'lucide-react'
import minificationData from '../../../minification-benchmarks-data.json'

// Transform minification data for charts
// Get popular minifiers for comparison
const popularMinifiers = ['terser', 'esbuild', '@swc/core', 'uglify-js', 'oxc-minify']

// Get library names from the data
const libraries = Object.keys(minificationData)

// Transform minification data for individual library charts
const getLibraryData = (library: string, metric: 'time' | 'compression') => {
  const libraryData = (minificationData as any)[library]
  const data: any[] = []
  
  popularMinifiers.forEach(minifier => {
    const minifierData = libraryData.minified?.[minifier]
    if (minifierData?.result?.data) {
      let value: number
      if (metric === 'time') {
        value = Math.round(minifierData.result.data.time || 0)
      } else {
        // compression ratio
        const originalSize = libraryData.size
        const minifiedBytes = minifierData.result.data.minifiedBytes || 0
        value = Math.round(((originalSize - minifiedBytes) / originalSize) * 100 * 10) / 10
      }
      
      data.push({
        name: minifier === '@swc/core' ? 'SWC' : 
              minifier === 'uglify-js' ? 'UglifyJS' : 
              minifier === 'oxc-minify' ? 'OXC' :
              minifier === 'esbuild' ? 'ESBuild' :
              minifier === 'terser' ? 'Terser' : minifier,
        value,
        fill: minifier === 'terser' ? '#8b5cf6' :
              minifier === 'esbuild' ? '#059669' :
              minifier === '@swc/core' ? '#0ea5e9' :
              minifier === 'uglify-js' ? '#dc2626' :
              minifier === 'oxc-minify' ? '#f59e0b' : '#6b7280'
      })
    }
  })
  
  return data
}

// Transform minification time data across libraries for popular minifiers (for overview stats)
const minificationTimeData = Object.keys(minificationData).map(library => {
  const libraryData = (minificationData as any)[library]
  const result: any = { name: library }
  
  popularMinifiers.forEach(minifier => {
    const minifierData = libraryData.minified?.[minifier]
    if (minifierData?.result?.data?.time) {
      result[minifier] = Math.round(minifierData.result.data.time)
    }
  })
  
  return result
})

// Transform minification size efficiency data (compression ratio)
const minificationSizeData = Object.keys(minificationData).map(library => {
  const libraryData = (minificationData as any)[library]
  const originalSize = libraryData.size
  const result: any = { name: library, originalSize }
  
  popularMinifiers.forEach(minifier => {
    const minifierData = libraryData.minified?.[minifier]
    if (minifierData?.result?.data?.minifiedBytes) {
      const compressionRatio = ((originalSize - minifierData.result.data.minifiedBytes) / originalSize) * 100
      result[minifier] = Math.round(compressionRatio * 10) / 10 // Round to 1 decimal
    }
  })
  
  return result
})

interface MinificationBenchmarksProps {
  selectedMetric: string
  setSelectedMetric: (metric: string) => void
}

function MinificationBenchmarks({ selectedMetric, setSelectedMetric }: MinificationBenchmarksProps) {
  // Minification metrics
  const minificationMetrics = [
    { id: 'minTime', name: 'Minification Time', icon: Zap, data: minificationTimeData, color: '#059669' },
    { id: 'compression', name: 'Compression Ratio', icon: Gauge, data: minificationSizeData, color: '#7c3aed' },
  ]

  const currentMetric = minificationMetrics.find(m => m.id === selectedMetric) || minificationMetrics[0]
  const metricType = selectedMetric === 'minTime' ? 'time' : 'compression'
  const unit = selectedMetric === 'minTime' ? 'ms' : '%'

  return (
    <>
      {/* Metric Navigation */}
      <nav className="dashboard-nav">
        {minificationMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <button
              key={metric.id}
              className={`nav-button ${selectedMetric === metric.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedMetric(metric.id)
              }}
            >
              <Icon size={20} />
              {metric.name}
            </button>
          )
        })}
      </nav>

      <main className="dashboard-main">
        {/* Individual Charts for Each Library */}
        <div className="library-charts-grid">
          {libraries.map(library => {
            const libraryData = getLibraryData(library, metricType)
            
            return (
              <div key={library} className="library-chart-container">
                <h3 className="library-title">{library}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={libraryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#374151', fontSize: 11 }}
                      axisLine={{ stroke: '#d1d5db' }}
                      tickLine={{ stroke: '#d1d5db' }}
                      angle={-45}
                      textAnchor="end"
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
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: any) => [`${value}${unit}`, currentMetric.name]}
                    />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )
          })}
        </div>

        <div className="stats-grid">
          {/* Minification statistics */}
          <div className="stat-card">
            <h3>Libraries Tested</h3>
            <p className="stat-value">{Object.keys(minificationData).length}</p>
            <span className="stat-change positive">JavaScript Libraries</span>
          </div>
          <div className="stat-card">
            <h3>Minifiers Compared</h3>
            <p className="stat-value">{popularMinifiers.length}</p>
            <span className="stat-change positive">Popular Tools</span>
          </div>
          <div className="stat-card">
            <h3>Fastest Minifier</h3>
            <p className="stat-value">OXC</p>
            <span className="stat-change positive">Rust-based</span>
          </div>
          <div className="stat-card">
            <h3>Best Compression</h3>
            <p className="stat-value">UglifyJS</p>
            <span className="stat-change positive">Traditional Leader</span>
          </div>
        </div>
      </main>
    </>
  )
}

export default MinificationBenchmarks