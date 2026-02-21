import { ProgressBar } from '../shared/ProgressBar';

export function TrackCard({ track, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4 text-left transition hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-md)]"
      style={{ backgroundImage: `linear-gradient(160deg, ${track.colorMuted}, transparent 45%)` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xl">{track.icon}</p>
          <h3 className="mt-2 text-base font-semibold text-[var(--text-primary)]">{track.title}</h3>
          <p className="text-xs text-[var(--text-secondary)]">{track.subtitle}</p>
        </div>
        <span className="font-mono text-sm text-[var(--text-primary)]">{track.percentage}%</span>
      </div>

      <div className="mt-4">
        <ProgressBar percentage={track.percentage} color={track.color} height={8} />
      </div>

      <p className="mt-2 text-xs text-[var(--text-secondary)]">
        {track.completed}/{track.total} complete
      </p>

      <div className="mt-3 space-y-2">
        {track.phases.map((phase) => (
          <div key={phase.id}>
            <div className="mb-1 flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="truncate">{phase.title}</span>
              <span className="font-mono">{phase.percentage}%</span>
            </div>
            <ProgressBar percentage={phase.percentage} color={track.color} height={4} />
          </div>
        ))}
      </div>
    </button>
  );
}
