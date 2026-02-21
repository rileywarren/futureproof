import { ProgressRing } from '../shared/ProgressRing';

export function OverallProgress({ overall }) {
  return (
    <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-6">
      <h2 className="text-lg font-semibold">Overall Progress</h2>
      <div className="mt-4 flex flex-col items-center gap-3 lg:flex-row lg:justify-between">
        <ProgressRing percentage={overall.percentage} size={170} color="var(--track-ai)" label="Overall completion" />
        <div className="space-y-2 text-sm">
          <p className="text-[var(--text-secondary)]">
            <span className="font-mono text-[var(--text-primary)]">{overall.completed}</span> of{' '}
            <span className="font-mono text-[var(--text-primary)]">{overall.total}</span> modules completed
          </p>
          <p className="text-[var(--text-secondary)]">
            Estimated <span className="font-mono text-[var(--text-primary)]">{overall.remainingHours}h</span> remaining
          </p>
        </div>
      </div>
    </section>
  );
}
