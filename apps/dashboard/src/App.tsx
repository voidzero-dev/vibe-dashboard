import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { BarChart3, Clock, Package } from 'lucide-react'
import './App.css'
import rolldownStats from '../../../rolldown-version-stats.json'

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

function App() {
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

  const metrics = [
    { id: 'bundleSize', name: 'Bundle Size', icon: Package, data: bundleSizeDiffData, color: '#374151' },
    { id: 'buildTime', name: 'Build Time', icon: Clock, data: buildTimeData, color: '#000000' },
  ]

  const currentMetric = metrics.find(m => m.id === selectedMetric) || metrics[0]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <BarChart3 size={28} />
            <h1>Rolldown-Vite dashboard</h1>
          </div>
          <p className="header-subtitle">Statistics collected from different Rolldown-Vite versions</p>
        </div>
      </header>

      <nav className="dashboard-nav">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <button
              key={metric.id}
              className={`nav-button ${selectedMetric === metric.id ? 'active' : ''}`}
              onClick={() => setSelectedMetric(metric.id)}
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
            {selectedMetric === 'bundleSize' ? (
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
                <Legend 
                  wrapperStyle={{ color: '#374151' }}
                />
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
                <Legend 
                  wrapperStyle={{ color: '#374151' }}
                />
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
            )}
          </ResponsiveContainer>
        </div>

        <div className="stats-grid">
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
        </div>
      </main>
    </div>
  )
}

export default App
