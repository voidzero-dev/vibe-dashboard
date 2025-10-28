import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

// Lazy load all page components for code-splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const MinificationBenchmarksPage = lazy(() => import("./pages/MinificationBenchmarksPage"));
const NpmPackagesPage = lazy(() => import("./pages/NpmPackagesPage"));
const RolldownStatsPage = lazy(() => import("./pages/RolldownStatsPage"));
const DependentsPage = lazy(() => import("./pages/DependentsPage"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-gray-500 dark:text-gray-400">Loading...</div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="rolldown-stats"
          element={
            <Suspense fallback={<PageLoader />}>
              <RolldownStatsPage />
            </Suspense>
          }
        />
        <Route
          path="minification"
          element={
            <Suspense fallback={<PageLoader />}>
              <MinificationBenchmarksPage />
            </Suspense>
          }
        />
        <Route
          path="npm-packages"
          element={
            <Suspense fallback={<PageLoader />}>
              <NpmPackagesPage />
            </Suspense>
          }
        />
        <Route
          path="dependents"
          element={
            <Suspense fallback={<PageLoader />}>
              <DependentsPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
