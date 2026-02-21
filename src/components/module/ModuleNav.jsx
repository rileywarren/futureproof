import { Link } from 'react-router-dom';

export function ModuleNav({ prev, next, trackId }) {
  return (
    <nav className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4" aria-label="Module navigation">
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          {prev ? (
            <Link to={`/module/${prev.id}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              ← Previous: {prev.title}
            </Link>
          ) : (
            <span className="text-sm text-[var(--text-tertiary)]">Start of course</span>
          )}
        </div>
        <div className="text-center">
          <Link to={`/track/${trackId}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            Back to Track
          </Link>
        </div>
        <div className="text-right">
          {next ? (
            <Link to={`/module/${next.id}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              Next: {next.title} →
            </Link>
          ) : (
            <span className="text-sm text-[var(--text-tertiary)]">End of course</span>
          )}
        </div>
      </div>
    </nav>
  );
}
