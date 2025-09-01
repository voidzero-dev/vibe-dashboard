import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { BarChart3, Clock, Package, Zap, Gauge } from 'lucide-react'
import './App.css'
import rolldownStats from '../../../rolldown-version-stats.json'
import minificationData from '../../../minification-benchmarks-data.json'

// Utility function to format numbers with commas
const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString()
}

// Transform rolldown stats data for charts
const buildTimeData = rolldownStats.map(stat => ({
  name: `v${stat.version}`,
  value: stat.buildTime
}))

// Calculate bundle size differences between consecutive versions
const bundleSizeDiffData = rolldownStats.map((stat, index) => {
  if (index === 0) {
    // For the first version, show 0 difference or could show absolute value
    return {
      name: `v${stat.version}`,
      value: 0,
      previousSize: null,
      currentSize: stat.totalSize,
      isBaseline: true
    }
  }

  const prevSize = rolldownStats[index - 1].totalSize
  const currentSize = stat.totalSize
  const diff = currentSize - prevSize

  return {
    name: `v${stat.version}`,
    value: diff,
    previousSize: prevSize,
    currentSize: currentSize,
    isBaseline: false
  }
})

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

function App() {
  const [selectedPage, setSelectedPage] = useState('rolldown')
  const [selectedMetric, setSelectedMetric] = useState('bundleSize')
  
  // Custom tooltip formatter for bundle size differences
  const bundleSizeDiffTooltipFormatter = (value: any, name: string, props: any) => {
    const data = props.payload
    if (!data) return [value, name]

    if (data.isBaseline) {
      return [`${formatNumberWithCommas(data.currentSize)} bytes (baseline)`, 'Bundle Size']
    }

    const sign = value >= 0 ? '+' : ''
    const changeText = `${sign}${formatNumberWithCommas(value)} bytes`
    const fromTo = `(${formatNumberWithCommas(data.previousSize)} → ${formatNumberWithCommas(data.currentSize)})`

    return [`${changeText} ${fromTo}`, 'Size Change']
  }

  // Rolldown metrics
  const rolldownMetrics = [
    { id: 'bundleSize', name: 'Bundle Size', icon: Package, data: bundleSizeDiffData, color: '#374151' },
    { id: 'buildTime', name: 'Build Time', icon: Clock, data: buildTimeData, color: '#000000' },
  ]

  // Minification metrics
  const minificationMetrics = [
    { id: 'minTime', name: 'Minification Time', icon: Zap, data: minificationTimeData, color: '#059669' },
    { id: 'compression', name: 'Compression Ratio', icon: Gauge, data: minificationSizeData, color: '#7c3aed' },
  ]

  const currentMetrics = selectedPage === 'rolldown' ? rolldownMetrics : minificationMetrics
  const currentMetric = currentMetrics.find(m => m.id === selectedMetric) || currentMetrics[0]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <BarChart3 size={28} />
            <h1>{selectedPage === 'rolldown' ? 'Rolldown-Vite Dashboard' : 'Minification Benchmarks'}</h1>
          </div>
          <p className="header-subtitle">
            {selectedPage === 'rolldown' 
              ? 'Statistics collected from different Rolldown-Vite versions'
              : 'Performance comparison of JavaScript minification tools'}
          </p>
        </div>
      </header>

      {/* Page Navigation */}
      <nav className="page-nav">
        <button
          className={`page-button ${selectedPage === 'rolldown' ? 'active' : ''}`}
          onClick={() => {
            setSelectedPage('rolldown')
            setSelectedMetric('bundleSize')
          }}
        >
          <Package size={20} />
          Rolldown Stats
        </button>
        <button
          className={`page-button ${selectedPage === 'minification' ? 'active' : ''}`}
          onClick={() => {
            setSelectedPage('minification')
            setSelectedMetric('minTime')
          }}
        >
          <Zap size={20} />
          Minification Benchmarks
        </button>
      </nav>

      {/* Metric Navigation */}
      <nav className="dashboard-nav">
        {currentMetrics.map((metric) => {
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
            {selectedPage === 'rolldown' ? (
              // Rolldown charts
              selectedMetric === 'bundleSize' ? (
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
                    formatter={bundleSizeDiffTooltipFormatter}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      color: '#111827',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend wrapperStyle={{ color: '#374151' }} />
                  <Bar dataKey="value" name="Bundle Size Change (bytes)">
                    {currentMetric.data.map((entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isBaseline ? '#6b7280' : (entry.value >= 0 ? '#dc2626' : '#16a34a')}
                      />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
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
                  <Bar
                    dataKey="value"
                    fill="url(#buildTimeGradient)"
                    name="Build Time (ms)"
                  />
                  <defs>
                    <linearGradient id="buildTimeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#000000" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#374151" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              )
            ) : (
              // Minification charts - multi-bar charts for comparing minifiers
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
            )}
          </ResponsiveContainer>
        </div>

        <div className="stats-grid">
          {selectedPage === 'rolldown' ? (
            // Rolldown statistics
            <>
              <div className="stat-card">
                <h3>Average Build Time</h3>
                <p className="stat-value">{Math.round(buildTimeData.reduce((sum, item) => sum + item.value, 0) / buildTimeData.length)}ms</p>
                <span className="stat-change positive">Across {buildTimeData.length} versions</span>
              </div>
              <div className="stat-card">
                <h3>Latest Bundle Size</h3>
                <p className="stat-value">{formatNumberWithCommas(rolldownStats[rolldownStats.length - 1]?.totalSize || 0)} bytes</p>
                <span className="stat-change positive">v{rolldownStats[rolldownStats.length - 1]?.version}</span>
              </div>
              <div className="stat-card">
                <h3>Bundle Size Range</h3>
                <p className="stat-value">{Math.round((Math.max(...rolldownStats.map(s => s.totalSize)) - Math.min(...rolldownStats.map(s => s.totalSize))) / 1024)}KB</p>
                <span className="stat-change positive">Size Variation</span>
              </div>
              <div className="stat-card">
                <h3>Versions Tested</h3>
                <p className="stat-value">{rolldownStats.length}</p>
                <span className="stat-change positive">{rolldownStats[0]?.version} - {rolldownStats[rolldownStats.length - 1]?.version}</span>
              </div>
            </>
          ) : (
            // Minification statistics
            <>
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
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
