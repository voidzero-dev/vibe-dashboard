import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChart3, Clock, Package, FileText } from 'lucide-react'
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

const bundleSizeData = rolldownStats.map(stat => ({
  name: `v${stat.version}`,
  value: stat.totalSize // Use actual bytes instead of KB
}))

// Calculate file type breakdown from all versions
const fileTypeStats = rolldownStats.reduce((acc, stat) => {
  stat.files.forEach(file => {
    if (!acc[file.type]) {
      acc[file.type] = 0
    }
    acc[file.type] += file.size
  })
  return acc
}, {} as Record<string, number>)

const fileTypeData = Object.entries(fileTypeStats).map(([type, size]) => ({
  name: type.toUpperCase(),
  js: type === 'js' ? Math.round(size / 1024) : 0,
  css: type === 'css' ? Math.round(size / 1024) : 0,
  html: type === 'html' ? Math.round(size / 1024) : 0,
  other: type === 'other' ? Math.round(size / 1024) : 0,
})).filter(item => item.js > 0 || item.css > 0 || item.html > 0 || item.other > 0)

function App() {
  const [selectedMetric, setSelectedMetric] = useState('buildTime')

  // Custom tooltip formatter for bundle size
  const customTooltipFormatter = (value: any, name: string) => {
    if (selectedMetric === 'bundleSize') {
      return [formatNumberWithCommas(value), name]
    }
    return [value, name]
  }

  const metrics = [
    { id: 'buildTime', name: 'Build Time', icon: Clock, data: buildTimeData, color: '#8884d8' },
    { id: 'bundleSize', name: 'Bundle Size', icon: Package, data: bundleSizeData, color: '#82ca9d' },
    { id: 'fileTypes', name: 'File Types', icon: FileText, data: fileTypeData, color: '#ffc658' },
  ]

  const currentMetric = metrics.find(m => m.id === selectedMetric) || metrics[0]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <BarChart3 size={32} />
            <h1>Rolldown-Vite dashboard</h1>
          </div>
          <p>statistics collected from different Rolldown-Vite versions</p>
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
            {selectedMetric === 'fileTypes' ? (
              <BarChart data={currentMetric.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="js" fill="#f7df1e" name="JavaScript (KB)" />
                <Bar dataKey="css" fill="#1572b6" name="CSS (KB)" />
                <Bar dataKey="html" fill="#e34c26" name="HTML (KB)" />
                <Bar dataKey="other" fill="#6b7280" name="Other (KB)" />
              </BarChart>
            ) : (
              <BarChart data={currentMetric.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={selectedMetric === 'bundleSize' ? customTooltipFormatter : undefined} />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill={currentMetric.color} 
                  name={selectedMetric === 'buildTime' ? 'Build Time (ms)' : 'Bundle Size (bytes)'}
                />
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
            <p className="stat-value">{formatNumberWithCommas(bundleSizeData[bundleSizeData.length - 1]?.value || 0)} bytes</p>
            <span className="stat-change positive">v{rolldownStats[rolldownStats.length - 1]?.version}</span>
          </div>
          <div className="stat-card">
            <h3>Total File Types</h3>
            <p className="stat-value">{fileTypeData.length}</p>
            <span className="stat-change positive">JS, CSS, HTML, Other</span>
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
