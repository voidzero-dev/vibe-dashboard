import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import RolldownStatsPage from './pages/RolldownStatsPage'
import MinificationBenchmarksPage from './pages/MinificationBenchmarksPage'

function App() {
  return (
    <BrowserRouter basename="/vibe-dashboard">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<RolldownStatsPage />} />
          <Route path="minification" element={<MinificationBenchmarksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
