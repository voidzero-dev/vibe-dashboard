import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react'
import './App.css'

// Sample data for different metrics
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
]

const userActivityData = [
  { name: 'Mon', active: 120, inactive: 80 },
  { name: 'Tue', active: 150, inactive: 60 },
  { name: 'Wed', active: 180, inactive: 40 },
  { name: 'Thu', active: 200, inactive: 30 },
  { name: 'Fri', active: 170, inactive: 50 },
  { name: 'Sat', active: 90, inactive: 110 },
  { name: 'Sun', active: 80, inactive: 120 },
]

const revenueData = [
  { name: 'Q1', revenue: 25000 },
  { name: 'Q2', revenue: 32000 },
  { name: 'Q3', revenue: 28000 },
  { name: 'Q4', revenue: 35000 },
]

function App() {
  const [selectedMetric, setSelectedMetric] = useState('sales')

  const metrics = [
    { id: 'sales', name: 'Sales', icon: TrendingUp, data: salesData, color: '#8884d8' },
    { id: 'users', name: 'User Activity', icon: Users, data: userActivityData, color: '#82ca9d' },
    { id: 'revenue', name: 'Revenue', icon: DollarSign, data: revenueData, color: '#ffc658' },
  ]

  const currentMetric = metrics.find(m => m.id === selectedMetric) || metrics[0]

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo">
            <BarChart3 size={32} />
            <h1>Vibe Dashboard</h1>
          </div>
          <p>Real-time metrics and analytics</p>
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
            {selectedMetric === 'users' ? (
              <BarChart data={currentMetric.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#82ca9d" name="Active Users" />
                <Bar dataKey="inactive" fill="#8884d8" name="Inactive Users" />
              </BarChart>
            ) : (
              <BarChart data={currentMetric.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey={selectedMetric === 'revenue' ? 'revenue' : 'value'} 
                  fill={currentMetric.color} 
                  name={currentMetric.name}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p className="stat-value">$124,500</p>
            <span className="stat-change positive">+12.5%</span>
          </div>
          <div className="stat-card">
            <h3>Active Users</h3>
            <p className="stat-value">1,245</p>
            <span className="stat-change positive">+8.2%</span>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p className="stat-value">$98,750</p>
            <span className="stat-change negative">-3.1%</span>
          </div>
          <div className="stat-card">
            <h3>Conversion Rate</h3>
            <p className="stat-value">3.2%</p>
            <span className="stat-change positive">+0.8%</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
