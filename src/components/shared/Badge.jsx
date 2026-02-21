import clsx from 'clsx';

export function Badge({ children, tone = 'default', className }) {
  const tones = {
    default: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-default)]',
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    info: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    accent: 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border-[var(--border-hover)]',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
