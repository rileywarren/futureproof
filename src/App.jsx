import { Suspense, lazy } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CourseProvider } from './context/CourseContext';
import { Layout } from './components/layout/Layout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const TrackView = lazy(() => import('./pages/TrackView'));
const ModuleView = lazy(() => import('./pages/ModuleView'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Progress = lazy(() => import('./pages/Progress'));
const Settings = lazy(() => import('./pages/Settings'));
const NotFoundRedirect = lazy(() => import('./pages/NotFoundRedirect'));

function App() {
  const withSuspense = (component) => (
    <Suspense fallback={<div className="p-6 text-sm text-[var(--text-secondary)]">Loading...</div>}>{component}</Suspense>
  );

  return (
    <HashRouter>
      <CourseProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={withSuspense(<Dashboard />)} />
            <Route path="track/:trackId" element={withSuspense(<TrackView />)} />
            <Route path="module/:moduleId" element={withSuspense(<ModuleView />)} />
            <Route path="timeline" element={withSuspense(<Timeline />)} />
            <Route path="progress" element={withSuspense(<Progress />)} />
            <Route path="settings" element={withSuspense(<Settings />)} />
            <Route path="home" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="*" element={withSuspense(<NotFoundRedirect />)} />
        </Routes>
      </CourseProvider>
    </HashRouter>
  );
}

export default App;
