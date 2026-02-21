import { useRef, useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { useExport } from '../hooks/useExport';
import { migrateState } from '../utils/storage';
import { mergeImportedState } from '../utils/importState';

export default function Settings() {
  const fileRef = useRef(null);
  const { state, dispatch, selectors } = useCourse();
  const [importError, setImportError] = useState('');
  const [notice, setNotice] = useState('');
  const [resetPrompt, setResetPrompt] = useState('');

  const { handleExportJson, handleExportMarkdown, handleExportNotes, readImportFile } = useExport(state, selectors);

  async function onImport(mode) {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setImportError('Select a JSON file first.');
      return;
    }

    try {
      const imported = await readImportFile(file);
      const migrated = migrateState(imported);

      if (mode === 'merge') {
        const confirmMerge = window.confirm(
          'Merge imported data into current progress? Existing completed modules and non-empty notes will be preserved.'
        );
        if (!confirmMerge) return;
        const merged = mergeImportedState(state, migrated);
        dispatch({ type: 'IMPORT_STATE', payload: merged });
        setNotice('Merge import completed.');
      } else {
        const confirmReplace = window.confirm(
          'Replace current progress with imported state? This will overwrite your existing data.'
        );
        if (!confirmReplace) return;
        dispatch({ type: 'IMPORT_STATE', payload: migrated });
        setNotice('Replace import completed.');
      }
      setImportError('');
    } catch (error) {
      setImportError(error.message);
      setNotice('');
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Export/import data, preferences, and reset controls.</p>
      </header>

      <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
        <h2 className="text-lg font-semibold">Export</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={handleExportJson} className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm">Export Progress as JSON</button>
          <button type="button" onClick={handleExportMarkdown} className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm">Export Progress as Markdown</button>
          <button type="button" onClick={handleExportNotes} className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm">Export All Notes</button>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
        <h2 className="text-lg font-semibold">Import</h2>
        <input ref={fileRef} type="file" accept="application/json" className="mt-3 block text-sm" />
        <p className="mt-2 text-xs text-[var(--text-secondary)]">Importing can merge into your current state or replace it completely.</p>
        <div className="mt-3 flex gap-2">
          <button type="button" onClick={() => onImport('merge')} className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm">Merge Import</button>
          <button type="button" onClick={() => onImport('replace')} className="rounded-lg border border-[var(--border-default)] px-3 py-2 text-sm">Replace Import</button>
        </div>
        <p className="mt-2 text-xs text-[var(--text-tertiary)]">Import validation enforces schema integrity before any state mutation.</p>
        {importError ? <p className="mt-2 text-sm text-red-300">{importError}</p> : null}
        {!importError && notice ? <p className="mt-2 text-sm text-emerald-300">{notice}</p> : null}
      </section>

      <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
        <h2 className="text-lg font-semibold">Preferences</h2>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <label className="text-sm">
            <span className="mb-1 block text-[var(--text-secondary)]">Theme</span>
            <select
              value={state.preferences.theme}
              onChange={(event) => dispatch({ type: 'SET_THEME', payload: event.target.value })}
              className="w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-primary)] px-2 py-2"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-[var(--text-secondary)]">Sidebar Default</span>
            <select
              value={state.preferences.sidebarCollapsed ? 'collapsed' : 'expanded'}
              onChange={(event) => dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: event.target.value === 'collapsed' })}
              className="w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-primary)] px-2 py-2"
            >
              <option value="expanded">Expanded</option>
              <option value="collapsed">Collapsed</option>
            </select>
          </label>

          <label className="text-sm">
            <span className="mb-1 block text-[var(--text-secondary)]">Course Start Date</span>
            <input
              type="date"
              value={state.courseStartDate ? state.courseStartDate.slice(0, 10) : ''}
              onChange={(event) => dispatch({ type: 'SET_COURSE_START_DATE', payload: event.target.value ? new Date(event.target.value).toISOString() : null })}
              className="w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-primary)] px-2 py-2"
            />
          </label>
        </div>
      </section>

      <section id="self-directed-guidance" className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
        <h2 className="text-lg font-semibold">Reset</h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">This is irreversible. Type <code>RESET</code> to confirm.</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            value={resetPrompt}
            onChange={(event) => setResetPrompt(event.target.value)}
            placeholder="Type RESET"
            className="rounded-md border border-[var(--border-default)] bg-[var(--bg-primary)] px-2 py-2 text-sm"
          />
          <button
            type="button"
            disabled={resetPrompt !== 'RESET'}
            onClick={() => {
              const firstConfirm = window.confirm('Are you sure you want to reset all progress?');
              if (!firstConfirm) return;
              dispatch({ type: 'RESET_STATE' });
              setResetPrompt('');
              setNotice('All progress has been reset.');
            }}
            className="rounded-lg border border-red-500/40 px-3 py-2 text-sm text-red-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset All Progress
          </button>
        </div>
      </section>
    </div>
  );
}
