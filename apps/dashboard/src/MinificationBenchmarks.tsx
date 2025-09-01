import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Zap, Gauge } from 'lucide-react'
import minificationData from '../../../minification-benchmarks-data.json'

// Transform minification data for charts
// Get popular minifiers for comparison
const popularMinifiers = ['terser', 'esbuild', '@swc/core', 'uglify-js', 'oxc-minify']

// Transform minification time data across libraries for popular minifiers
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
        <div className="chart-container">
          <h2>{currentMetric.name}</h2>
          <ResponsiveContainer width="100%" height={400}>
            {/* Minification charts - multi-bar charts for comparing minifiers */}
            <BarChart data={currentMetric.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#374151', fontSize: 12 }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <YAxis
                tick={{ fill: '#374151', fontSize: 12 }}
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
              />
              <Legend wrapperStyle={{ color: '#374151' }} />
              <Bar dataKey="terser" fill="#8b5cf6" name="Terser" />
              <Bar dataKey="esbuild" fill="#059669" name="ESBuild" />
              <Bar dataKey="@swc/core" fill="#0ea5e9" name="SWC" />
              <Bar dataKey="uglify-js" fill="#dc2626" name="UglifyJS" />
              <Bar dataKey="oxc-minify" fill="#f59e0b" name="OXC" />
            </BarChart>
          </ResponsiveContainer>
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