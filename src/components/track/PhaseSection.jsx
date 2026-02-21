import { ModuleCard } from './ModuleCard';
import { Badge } from '../shared/Badge';

export function PhaseSection({ phase, track, state, onToggleComplete }) {
  return (
    <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-4">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">{phase.title}</h3>
          <p className="mt-1 text-sm italic text-[var(--text-secondary)]">{phase.objective}</p>
        </div>
        <Badge tone="accent">{phase.timeframe}</Badge>
      </div>

      <p className="mb-3 text-sm text-[var(--text-secondary)]">
        Progress: <span className="font-mono text-[var(--text-primary)]">{phase.completed}/{phase.total}</span>
      </p>

      <div className="space-y-3">
        {phase.modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            track={track}
            isCompleted={Boolean(state.completedModules[module.id])}
            projectStatus={state.projectStatus[module.id] || 'not_started'}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </section>
  );
}
