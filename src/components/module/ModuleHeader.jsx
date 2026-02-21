import { CheckCircle2, Circle } from 'lucide-react';
import { Badge } from '../shared/Badge';
import { formatDate, formatRelativeDate } from '../../utils/dates';

export function ModuleHeader({ module, track, isCompleted, completionDate, onToggleComplete }) {
  return (
    <header className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">{module.title}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge>{module.duration}</Badge>
            <Badge tone="accent">{track.title}</Badge>
          </div>
          {completionDate ? (
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Last studied: {formatRelativeDate(completionDate)} ({formatDate(completionDate)})
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onToggleComplete}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hover)] bg-[var(--bg-primary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--track-ai)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {isCompleted ? <CheckCircle2 size={18} className="text-[var(--success)]" /> : <Circle size={18} />}
          {isCompleted ? 'Completed' : 'Mark Complete'}
        </button>
      </div>
    </header>
  );
}
