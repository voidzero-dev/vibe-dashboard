import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load all page components for code-splitting
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const MinificationBenchmarksPage = lazy(() => import('./pages/MinificationBenchmarksPage'));
const NpmDownloadsPage = lazy(() => import('./pages/NpmDownloadsPage'));
const RolldownStatsPage = lazy(() => import('./pages/RolldownStatsPage'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-gray-500 dark:text-gray-400">Loading...</div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        } />
        <Route path='rolldown-stats' element={
          <Suspense fallback={<PageLoader />}>
            <RolldownStatsPage />
          </Suspense>
        } />
        <Route path='minification' element={
          <Suspense fallback={<PageLoader />}>
            <MinificationBenchmarksPage />
          </Suspense>
        } />
        <Route path='npm-downloads' element={
          <Suspense fallback={<PageLoader />}>
            <NpmDownloadsPage />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;
