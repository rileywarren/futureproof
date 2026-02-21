import { exportAllNotes, exportProgressJSON, exportProgressMarkdown, parseImportedState } from '../utils/export';

export function useExport(state, progressSummary) {
  function handleExportJson() {
    exportProgressJSON(state);
  }

  function handleExportMarkdown() {
    exportProgressMarkdown(state, progressSummary);
  }

  function handleExportNotes() {
    exportAllNotes(state);
  }

  async function readImportFile(file) {
    const text = await file.text();
    return parseImportedState(text);
  }

  return {
    handleExportJson,
    handleExportMarkdown,
    handleExportNotes,
    readImportFile,
  };
}
