import { Link } from 'react-router-dom';
import { Check, Circle } from 'lucide-react';
import { Badge } from '../shared/Badge';
import { PROJECT_STATUS_LABELS } from '../../data/constants';

export function ModuleCard({ module, track, isCompleted, projectStatus, onToggleComplete }) {
  return (
    <article
      className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--border-hover)]"
      style={{
        borderLeftColor: isCompleted ? track.color : undefined,
        borderLeftWidth: isCompleted ? 4 : 1,
        opacity: isCompleted ? 0.88 : 1,
      }}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          aria-label={isCompleted ? 'Mark module incomplete' : 'Mark module complete'}
          onClick={() => onToggleComplete(module.id)}
          className="mt-1 rounded-full text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {isCompleted ? <Check size={20} /> : <Circle size={20} />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link to={`/module/${module.id}`} className="text-base font-semibold text-[var(--text-primary)] hover:underline">
              {module.title}
            </Link>
            <Badge>{module.duration}</Badge>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">{module.description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone="info">{module.resources.length} resources</Badge>
            <Badge tone={projectStatus === 'completed' ? 'success' : projectStatus === 'in_progress' ? 'warning' : 'default'}>
              Project: {PROJECT_STATUS_LABELS[projectStatus || 'not_started']}
            </Badge>
          </div>
        </div>
      </div>
    </article>
  );
}
