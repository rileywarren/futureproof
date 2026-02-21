import { Link } from 'react-router-dom';

export function UpNext({ modules }) {
  return (
    <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
      <h2 className="text-base font-semibold">Up Next</h2>
      <ul className="mt-3 space-y-2">
        {modules.map((module) => (
          <li key={module.id}>
            <Link
              to={`/module/${module.id}`}
              className="block rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3 py-2 hover:border-[var(--border-hover)]"
            >
              <p className="text-sm text-[var(--text-primary)]">{module.title}</p>
              <p className="text-xs text-[var(--text-secondary)]">{module.trackTitle} · {module.duration}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
