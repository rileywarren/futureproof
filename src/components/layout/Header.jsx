import { Search } from 'lucide-react';

export function Header({ breadcrumb, overallPercentage, onOpenSearch }) {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-default)] bg-[var(--bg-primary)]/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs text-[var(--text-secondary)]">{breadcrumb}</p>
          <p className="mt-1 text-sm text-[var(--text-primary)]">Overall Completion: {overallPercentage}%</p>
        </div>
        <button
          type="button"
          onClick={onOpenSearch}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-hover)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Open search"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Search</span>
          <span className="font-mono text-xs">⌘K</span>
        </button>
      </div>
    </header>
  );
}
