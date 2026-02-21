import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { X } from 'lucide-react';

export function SearchModal({ isOpen, onClose, modules }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fuse = useMemo(
    () =>
      new Fuse(modules, {
        keys: ['title', 'description', 'trackTitle', 'resources.name'],
        threshold: 0.35,
      }),
    [modules]
  );

  const results = useMemo(() => {
    if (!query.trim()) {
      return modules.slice(0, 15).map((item) => ({ item }));
    }
    return fuse.search(query).slice(0, 20);
  }, [fuse, modules, query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === 'Enter') {
        const target = results[selectedIndex]?.item;
        if (target) {
          onClose();
          navigate(`/module/${target.id}`);
        }
      }
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, navigate, onClose, results, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Search modules">
      <div className="mx-auto mt-16 w-full max-w-3xl overflow-hidden rounded-xl border border-[var(--border-hover)] bg-[var(--bg-secondary)] shadow-2xl">
        <div className="flex items-center border-b border-[var(--border-default)] px-4 py-3">
          <input
            className="w-full bg-transparent font-mono text-base text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search modules, concepts, resources..."
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-md p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="max-h-[60vh] overflow-y-auto p-2">
          {results.map((result, index) => {
            const module = result.item;
            const selected = index === selectedIndex;
            const previousTrack = results[index - 1]?.item?.trackTitle;
            const showTrackHeader = module.trackTitle !== previousTrack;
            return (
              <li key={module.id}>
                {showTrackHeader ? (
                  <p className="px-2 py-1 text-xs uppercase tracking-wide text-[var(--text-tertiary)]">
                    {module.trackTitle}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate(`/module/${module.id}`);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left transition ${
                    selected ? 'bg-[var(--bg-tertiary)]' : 'hover:bg-[var(--bg-tertiary)]'
                  }`}
                >
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{module.title}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{module.phaseTitle} · {module.duration}</p>
                </button>
              </li>
            );
          })}
          {!results.length ? (
            <li className="px-3 py-10 text-center text-sm text-[var(--text-secondary)]">No results found.</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
