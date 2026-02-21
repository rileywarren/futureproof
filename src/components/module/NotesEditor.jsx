import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export function NotesEditor({ moduleId, initialText, onSave, onAnnounce }) {
  const [localText, setLocalText] = useState(initialText || '');
  const [status, setStatus] = useState('idle');
  const [preview, setPreview] = useState(false);
  const textareaRef = useRef(null);
  const lastSavedRef = useRef(initialText || '');

  useEffect(() => {
    setLocalText(initialText || '');
    lastSavedRef.current = initialText || '';
  }, [initialText, moduleId]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, window.innerHeight * 0.6)}px`;
  }, [localText]);

  useEffect(() => {
    if (localText === lastSavedRef.current) return;
    setStatus('saving');
    const timeout = setTimeout(() => {
      onSave(localText);
      lastSavedRef.current = localText;
      setStatus('saved');
      onAnnounce?.();
      const done = setTimeout(() => setStatus('idle'), 2000);
      return () => clearTimeout(done);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [localText, onAnnounce, onSave]);

  const count = useMemo(() => localText.length, [localText]);

  return (
    <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold">Notes</h2>
        <button
          type="button"
          onClick={() => setPreview((prev) => !prev)}
          className="rounded-md border border-[var(--border-default)] px-2 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {preview ? (
        <article className="prose prose-invert max-w-none rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] p-4 text-sm">
          {localText.trim() ? <ReactMarkdown>{localText}</ReactMarkdown> : <p className="text-[var(--text-secondary)]">No notes yet.</p>}
        </article>
      ) : (
        <textarea
          ref={textareaRef}
          value={localText}
          onChange={(event) => setLocalText(event.target.value)}
          placeholder="Capture key takeaways, questions, and ideas..."
          className="min-h-28 w-full resize-y rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] p-3 font-mono text-sm text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--track-ai)]"
        />
      )}

      <div className="mt-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <span>{status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved ✓' : ' '}</span>
        <span className="font-mono">{count} chars</span>
      </div>
    </section>
  );
}
