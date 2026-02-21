export function ProgressBar({
  percentage,
  color = 'var(--track-ai)',
  height = 8,
  showLabel = false,
  animated = true,
  label,
}) {
  return (
    <div className="w-full">
      <div
        className="relative w-full overflow-hidden rounded-full"
        style={{ height, background: 'var(--bg-tertiary)' }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={animated ? 'transition-all duration-500 ease-out' : ''}
          style={{
            width: `${Math.max(0, Math.min(100, percentage))}%`,
            height,
            background: color,
          }}
        />
      </div>
      {showLabel ? (
        <div className="mt-1 flex justify-between text-xs text-[var(--text-secondary)]">
          <span>{label || 'Progress'}</span>
          <span className="font-mono">{percentage}%</span>
        </div>
      ) : null}
    </div>
  );
}
