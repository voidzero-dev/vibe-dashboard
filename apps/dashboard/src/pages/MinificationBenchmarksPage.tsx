import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import MinificationBenchmarks from '../MinificationBenchmarks'

function MinificationBenchmarksPage() {
  const [selectedMetric, setSelectedMetric] = useState('minTime')

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <BarChart3 size={28} />
            <h1>Minification Benchmarks</h1>
          </div>
          <p className="header-subtitle">
            Performance comparison of JavaScript minification tools
          </p>
        </div>
      </header>

      <MinificationBenchmarks 
        selectedMetric={selectedMetric} 
        setSelectedMetric={setSelectedMetric} 
      />
    </div>
  )
}

export default MinificationBenchmarksPage