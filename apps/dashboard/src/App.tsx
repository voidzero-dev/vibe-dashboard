import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import MinificationBenchmarksPage from './pages/MinificationBenchmarksPage';
import NpmDownloadsPage from './pages/NpmDownloadsPage';
import RolldownStatsPage from './pages/RolldownStatsPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<RolldownStatsPage />} />
        <Route path='minification' element={<MinificationBenchmarksPage />} />
        <Route path='npm-downloads' element={<NpmDownloadsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
