import { Info } from 'lucide-react';

export function Tooltip({ content, ariaLabel = 'More info' }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={ariaLabel}
        className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <Info size={14} />
      </button>
      <span className="pointer-events-none absolute left-5 top-5 z-20 w-64 rounded-lg border border-[var(--border-hover)] bg-[var(--bg-elevated)] p-2 text-xs text-[var(--text-primary)] opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        {content}
      </span>
    </span>
  );
}
