import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SearchModal } from '../shared/SearchModal';
import { useCourse } from '../../context/CourseContext';
import { ANNOUNCE_EVENT } from '../../utils/a11y';

function getBreadcrumb(pathname) {
  if (pathname.startsWith('/track/')) return 'Dashboard > Track View';
  if (pathname.startsWith('/module/')) return 'Dashboard > Track > Module';
  if (pathname === '/timeline') return 'Dashboard > Timeline';
  if (pathname === '/progress') return 'Dashboard > Progress';
  if (pathname === '/settings') return 'Dashboard > Settings';
  return 'Dashboard';
}

function buildToast(input) {
  return {
    id: Date.now(),
    tone: input?.tone || 'info',
    title: input?.title || 'Update',
    message: input?.message || '',
  };
}

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch, selectors } = useCourse();

  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [confettiTrack, setConfettiTrack] = useState(null);
  const [srAnnouncement, setSrAnnouncement] = useState('');

  const shownMilestones = useRef(new Set());
  const completedTrackIds = useRef(new Set(selectors.tracks.filter((item) => item.completed === item.total).map((item) => item.id)));

  const breadcrumbs = useMemo(() => getBreadcrumb(location.pathname), [location.pathname]);

  useEffect(() => {
    const onAnnounce = (event) => {
      const message = event.detail?.message;
      if (!message) return;
      setSrAnnouncement('');
      window.setTimeout(() => setSrAnnouncement(message), 20);
    };

    window.addEventListener(ANNOUNCE_EVENT, onAnnounce);
    return () => window.removeEventListener(ANNOUNCE_EVENT, onAnnounce);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === '[' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: !state.preferences.sidebarCollapsed });
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dispatch, state.preferences.sidebarCollapsed]);

  useEffect(() => {
    if (!location.state?.toast) return;
    setToast(buildToast(location.state.toast));
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    const unlocked = selectors.milestones.filter((item) => item.unlocked && !shownMilestones.current.has(item.id));
    if (!unlocked.length) return;

    const next = unlocked[0];
    shownMilestones.current.add(next.id);
    setToast(buildToast({ tone: 'success', title: 'Milestone Unlocked', message: next.title }));
  }, [selectors.milestones]);

  useEffect(() => {
    const newlyCompletedTrack = selectors.tracks.find(
      (track) => track.completed === track.total && !completedTrackIds.current.has(track.id)
    );

    if (!newlyCompletedTrack) return;

    completedTrackIds.current.add(newlyCompletedTrack.id);
    setToast(
      buildToast({
        tone: 'success',
        title: 'Track Completed',
        message: `${newlyCompletedTrack.title} is complete.`,
      })
    );
    setConfettiTrack(newlyCompletedTrack.title);

    const timeout = setTimeout(() => setConfettiTrack(null), 1200);
    return () => clearTimeout(timeout);
  }, [selectors.tracks]);

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="sr-only" aria-live="polite" aria-atomic="true">{srAnnouncement}</div>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-[var(--bg-elevated)] focus:px-3 focus:py-2">
        Skip to main content
      </a>

      <div className="flex min-h-screen">
        <Sidebar
          collapsed={state.preferences.sidebarCollapsed}
          tracks={selectors.tracks}
          onTrackClick={(trackId) => navigate(`/track/${trackId}`)}
        />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <Header
            breadcrumb={breadcrumbs}
            overallPercentage={selectors.overall.percentage}
            onOpenSearch={() => setSearchOpen(true)}
          />

          <main id="main-content" className="animate-page-in flex-1 overflow-x-hidden p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <button
        type="button"
        onClick={() => dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: !state.preferences.sidebarCollapsed })}
        className="fixed bottom-4 left-4 z-30 inline-flex items-center gap-2 rounded-lg border border-[var(--border-hover)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        aria-label="Toggle sidebar"
      >
        {state.preferences.sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        {!state.preferences.sidebarCollapsed ? <span>Collapse</span> : null}
      </button>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        modules={selectors.allModules}
      />

      {toast ? (
        <div
          className={`fixed bottom-4 right-4 z-40 rounded-lg border px-4 py-3 shadow-lg ${
            toast.tone === 'success'
              ? 'border-emerald-400/50 bg-emerald-500/15'
              : toast.tone === 'warning'
                ? 'border-amber-400/50 bg-amber-500/15'
                : 'border-[var(--track-ai)] bg-[var(--bg-elevated)]'
          }`}
          role="status"
          aria-live="polite"
        >
          <p className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
            <Trophy size={16} />
            {toast.title}
          </p>
          {toast.message ? <p className="mt-1 text-sm text-[var(--text-secondary)]">{toast.message}</p> : null}
        </div>
      ) : null}

      {confettiTrack ? (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 36 }, (_, index) => (
            <span
              key={index}
              className="confetti-piece"
              style={{
                left: `${(index * 7) % 100}%`,
                background: index % 3 === 0 ? 'var(--track-ai)' : index % 3 === 1 ? 'var(--track-cyber)' : 'var(--track-lead)',
                animationDelay: `${(index % 12) * 40}ms`,
              }}
            />
          ))}
          <p className="absolute left-1/2 top-16 -translate-x-1/2 rounded-md border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-200">
            Track complete: {confettiTrack}
          </p>
        </div>
      ) : null}
    </div>
  );
}
