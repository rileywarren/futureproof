import { ProgressBar } from '../shared/ProgressBar';

export function TrackProgress({ track }) {
  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
      <ProgressBar percentage={track.percentage} color={track.color} showLabel label="Track Progress" />
      <div className="mt-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
        <div>
          <p className="text-[var(--text-tertiary)]">Total Modules</p>
          <p className="font-mono text-[var(--text-primary)]">{track.total}</p>
        </div>
        <div>
          <p className="text-[var(--text-tertiary)]">Completed</p>
          <p className="font-mono text-[var(--text-primary)]">{track.completed}</p>
        </div>
        <div>
          <p className="text-[var(--text-tertiary)]">Projects Done</p>
          <p className="font-mono text-[var(--text-primary)]">{track.projectsCompleted}</p>
        </div>
        <div>
          <p className="text-[var(--text-tertiary)]">Hours Remaining</p>
          <p className="font-mono text-[var(--text-primary)]">{track.remainingHours}</p>
        </div>
      </div>
    </div>
  );
}
