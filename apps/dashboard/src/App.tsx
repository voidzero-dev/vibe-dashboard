import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import MinificationBenchmarksPage from './pages/MinificationBenchmarksPage';
import RolldownStatsPage from './pages/RolldownStatsPage';

function App() {
  return (
    <BrowserRouter basename='/vibe-dashboard'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<RolldownStatsPage />} />
          <Route path='minification' element={<MinificationBenchmarksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
