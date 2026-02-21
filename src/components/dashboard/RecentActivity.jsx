import { Link } from 'react-router-dom';
import { EmptyState } from '../shared/EmptyState';

export function RecentActivity({ items }) {
  return (
    <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
      <h2 className="text-base font-semibold">Recent Activity</h2>
      <div className="mt-3">
        {items.length ? (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.moduleId}>
                <Link
                  to={`/module/${item.moduleId}`}
                  className="block rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 hover:border-[var(--border-hover)]"
                >
                  <p className="text-sm text-[var(--text-primary)]">{item.title}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{item.trackTitle} · {item.displayDate}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No modules completed yet"
            description="Start with Track 1, Module 1.1"
          />
        )}
      </div>
    </section>
  );
}
