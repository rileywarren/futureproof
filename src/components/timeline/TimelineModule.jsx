import { Link } from 'react-router-dom';

export function TimelineModule({ module, completed, title }) {
  return (
    <Link
      to={`/module/${module.id}`}
      className="group relative inline-flex h-5 w-5 items-center justify-center rounded-full border"
      style={{
        borderColor: module.trackColor,
        background: completed ? module.trackColor : 'transparent',
      }}
      title={title}
      aria-label={title}
    >
      <span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-[var(--bg-elevated)] px-2 py-1 text-[10px] text-[var(--text-primary)] group-hover:block">
        {module.title}
      </span>
    </Link>
  );
}
