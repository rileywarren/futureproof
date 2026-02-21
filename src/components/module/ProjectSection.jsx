import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS } from '../../data/constants';

export function ProjectSection({ trackColor, deliverable, status, onStatusChange }) {
  const previousStatus = useRef(status);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    if (status === 'completed' && previousStatus.current !== 'completed') {
      setCelebrate(true);
      const timeout = setTimeout(() => setCelebrate(false), 700);
      previousStatus.current = status;
      return () => clearTimeout(timeout);
    }
    previousStatus.current = status;
    return undefined;
  }, [status]);

  return (
    <section
      className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5"
      style={{ borderLeftColor: trackColor, borderLeftWidth: 4 }}
    >
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        Capstone Project
        {status === 'completed' ? (
          <CheckCircle2
            size={18}
            className={celebrate ? 'text-emerald-300 animate-[pulse_0.6s_ease-in-out]' : 'text-emerald-300'}
            aria-label="Project completed"
          />
        ) : null}
      </h2>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-secondary)]">{deliverable}</p>

      <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Project status">
        {PROJECT_STATUSES.map((item) => (
          <button
            key={item}
            type="button"
            role="radio"
            aria-checked={status === item}
            onClick={() => onStatusChange(item)}
            className={`rounded-lg border px-3 py-2 text-sm transition ${
              status === item
                ? 'border-[var(--track-ai)] bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                : 'border-[var(--border-default)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {PROJECT_STATUS_LABELS[item]}
          </button>
        ))}
      </div>
    </section>
  );
}
