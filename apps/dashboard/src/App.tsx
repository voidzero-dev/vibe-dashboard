import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { BarChart3, Clock, Package, Settings } from 'lucide-react'
import './App.css'
import rolldownStats from '../../../rolldown-version-stats.json'

// Utility function to format numbers with commas
const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString()
}

// Transform rolldown stats data for charts
// Group by version and strictExecutionOrder
interface StatEntry {
  version: string;
  timestamp: string;
  files: Array<{
    path: string;
    size: number;
    type: string;
  }>;
  totalSize: number;
  totalGzipSize: number;
  buildTime: number;
  strictExecutionOrder?: boolean;
}

interface ConfigGroup {
  normal?: StatEntry;
  strict?: StatEntry;
}

const groupedStats: Record<string, ConfigGroup> = rolldownStats.reduce((acc: Record<string, ConfigGroup>, stat: StatEntry) => {
  const key = stat.version;
  if (!acc[key]) {
    acc[key] = {};
  }
  acc[key][stat.strictExecutionOrder ? 'strict' : 'normal'] = stat;
  return acc;
}, {});

// Build time comparison data showing both configurations
const buildTimeData = Object.entries(groupedStats).map(([version, configs]) => {
  const data: any = { name: `v${version}` };
  if (configs.normal) data.normal = configs.normal.buildTime;
  if (configs.strict) data.strict = configs.strict.buildTime;
  return data;
});

// Bundle size comparison data showing both configurations
const bundleSizeData = Object.entries(groupedStats).map(([version, configs]) => {
  const data: any = { name: `v${version}` };
  if (configs.normal) data.normal = configs.normal.totalSize;
  if (configs.strict) data.strict = configs.strict.totalSize;
  return data;
});

// Calculate bundle size differences between normal and strict for each version
const bundleSizeDiffData = Object.entries(groupedStats).map(([version, configs]) => {
  const normalSize = configs.normal?.totalSize || 0;
  const strictSize = configs.strict?.totalSize || 0;
  const diff = strictSize - normalSize;
  
  return {
    name: `v${version}`,
    value: diff,
    normalSize,
    strictSize,
    hasBoth: !!(configs.normal && configs.strict)
  };
});

function App() {
  const [selectedMetric, setSelectedMetric] = useState('bundleSize')

  // Custom tooltip formatter for bundle size differences
  const bundleSizeDiffTooltipFormatter = (value: any, name: string, props: any) => {
    const data = props.payload
    if (!data) return [value, name]
    
    if (!data.hasBoth) {
      return [`${formatNumberWithCommas(data.normalSize || data.strictSize)} bytes (only one config)`, 'Bundle Size']
    }
    
    const sign = value >= 0 ? '+' : ''
    const changeText = `${sign}${formatNumberWithCommas(value)} bytes`
    const fromTo = `(normal: ${formatNumberWithCommas(data.normalSize)} → strict: ${formatNumberWithCommas(data.strictSize)})`
    
    return [`${changeText} ${fromTo}`, 'strictExecutionOrder Impact']
  }

  const metrics = [
    { id: 'bundleSize', name: 'Bundle Size Comparison', icon: Package, data: bundleSizeData, color: '#374151' },
    { id: 'buildTime', name: 'Build Time Comparison', icon: Clock, data: buildTimeData, color: '#000000' },
    { id: 'strictDiff', name: 'strictExecutionOrder Impact', icon: Settings, data: bundleSizeDiffData, color: '#dc2626' },
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
            {selectedMetric === 'bundleSize' || selectedMetric === 'buildTime' ? (
              // Comparison charts showing both normal and strict configurations
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
                  dataKey="normal" 
                  fill="#6b7280"
                  name={selectedMetric === 'buildTime' ? 'Build Time (ms) - Normal' : 'Bundle Size (bytes) - Normal'}
                />
                <Bar 
                  dataKey="strict" 
                  fill="#dc2626"
                  name={selectedMetric === 'buildTime' ? 'Build Time (ms) - Strict' : 'Bundle Size (bytes) - Strict'}
                />
              </BarChart>
            ) : (
              // strictExecutionOrder impact chart
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
                <Bar dataKey="value" name="Bundle Size Impact (bytes)">
                  {currentMetric.data.map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={!entry.hasBoth ? '#94a3b8' : (entry.value >= 0 ? '#dc2626' : '#16a34a')}
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Average Build Time (Normal)</h3>
            <p className="stat-value">{Math.round(buildTimeData.reduce((sum, item) => sum + (item.normal || 0), 0) / buildTimeData.filter(item => item.normal).length)}ms</p>
            <span className="stat-change positive">strictExecutionOrder: false</span>
          </div>
          <div className="stat-card">
            <h3>Average Build Time (Strict)</h3>
            <p className="stat-value">{Math.round(buildTimeData.reduce((sum, item) => sum + (item.strict || 0), 0) / buildTimeData.filter(item => item.strict).length)}ms</p>
            <span className="stat-change positive">strictExecutionOrder: true</span>
          </div>
          <div className="stat-card">
            <h3>Average Bundle Size Impact</h3>
            <p className="stat-value">{Math.round(bundleSizeDiffData.filter(d => d.hasBoth).reduce((sum, d) => sum + d.value, 0) / bundleSizeDiffData.filter(d => d.hasBoth).length / 1024)}KB</p>
            <span className="stat-change positive">Strict vs Normal</span>
          </div>
          <div className="stat-card">
            <h3>Configurations Tested</h3>
            <p className="stat-value">{rolldownStats.length}</p>
            <span className="stat-change positive">{Object.keys(groupedStats).length} versions × 2 modes</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
