import { useState } from 'react'
import { BarChart3, Package, Zap } from 'lucide-react'
import './App.css'
import RolldownStats from './RolldownStats'
import MinificationBenchmarks from './MinificationBenchmarks'

function App() {
  const [selectedPage, setSelectedPage] = useState('rolldown')
  const [selectedMetric, setSelectedMetric] = useState('bundleSize')

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

      {/* Render the appropriate component based on selected page */}
      {selectedPage === 'rolldown' ? (
        <RolldownStats 
          selectedMetric={selectedMetric} 
          setSelectedMetric={setSelectedMetric} 
        />
      ) : (
        <MinificationBenchmarks 
          selectedMetric={selectedMetric} 
          setSelectedMetric={setSelectedMetric} 
        />
      )}
    </div>
  )
}

export default App
