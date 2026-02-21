import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Calendar, ChevronDown, Gauge, Home, Settings } from 'lucide-react';
import { ProgressBar } from '../shared/ProgressBar';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/timeline', label: 'Timeline', icon: Calendar },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ collapsed, tracks, onTrackClick }) {
  const [openTracks, setOpenTracks] = useState({});

  return (
    <aside
      className={`sticky top-0 h-screen border-r border-[var(--border-default)] bg-[var(--bg-secondary)] transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-[var(--border-default)] px-4 py-4">
          <p className="font-display text-xl tracking-wide text-[var(--text-primary)]">{collapsed ? 'FP' : 'FUTUREPROOF'}</p>
          {!collapsed ? <p className="mt-1 text-xs text-[var(--text-secondary)]">Career Development OS</p> : null}
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-3" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.to} className="group relative">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                      isActive
                        ? 'border-l-2 border-[var(--track-ai)] bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                    }`
                  }
                >
                  <Icon size={16} aria-hidden="true" />
                  {!collapsed ? <span>{item.label}</span> : null}
                </NavLink>
                {collapsed ? (
                  <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-[var(--border-hover)] bg-[var(--bg-elevated)] px-2 py-1 text-xs text-[var(--text-primary)] opacity-0 transition group-hover:opacity-100">
                    {item.label}
                  </span>
                ) : null}
              </div>
            );
          })}

          <div className="pt-2">
            {!collapsed ? <p className="mb-2 px-3 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">Tracks</p> : null}
            {tracks.map((track) => {
              const isOpen = openTracks[track.id];
              return (
                <div key={track.id} className="group relative mb-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)]">
                  <button
                    type="button"
                    onClick={() => {
                      onTrackClick(track.id);
                      setOpenTracks((prev) => ({ ...prev, [track.id]: !prev[track.id] }));
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[var(--text-primary)]"
                  >
                    <span className="text-base">{track.icon}</span>
                    {!collapsed ? (
                      <>
                        <span className="flex-1 truncate">{track.title}</span>
                        <span className="font-mono text-xs text-[var(--text-secondary)]">{track.percentage}%</span>
                        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </>
                    ) : null}
                  </button>

                  {collapsed ? (
                    <span className="pointer-events-none absolute left-full top-1/2 z-20 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-[var(--border-hover)] bg-[var(--bg-elevated)] px-2 py-1 text-xs text-[var(--text-primary)] opacity-0 transition group-hover:opacity-100">
                      {track.title} · {track.percentage}%
                    </span>
                  ) : null}

                  {!collapsed ? (
                    <div className="px-3 pb-3">
                      <ProgressBar percentage={track.percentage} color={track.color} height={6} />
                      {isOpen ? (
                        <div className="mt-2 space-y-1">
                          {track.phases.map((phase) => (
                            <p key={phase.id} className="truncate text-xs text-[var(--text-secondary)]">
                              {phase.title} · {phase.percentage}%
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-[var(--border-default)] p-3 text-xs text-[var(--text-tertiary)]">
          <div className="flex items-center gap-2">
            <Gauge size={14} />
            {!collapsed ? <span>Shortcut: [</span> : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
