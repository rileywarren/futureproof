import { formatDate } from './dates';
import { getAllModules } from '../data/courseData';
import { PROJECT_STATUS_LABELS } from '../data/constants';
import { validateImportedStateShape } from './importState';

function downloadBlob(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function exportProgressJSON(state) {
  const filename = `futureproof-progress-${new Date().toISOString().slice(0, 10)}.json`;
  downloadBlob(filename, JSON.stringify(state, null, 2), 'application/json');
}

export function exportAllNotes(state) {
  const lines = ['# FUTUREPROOF Notes', ''];
  const allModules = getAllModules();

  for (const module of allModules) {
    const note = state.notes[module.id];
    if (!note?.trim()) continue;
    lines.push(`## ${module.trackTitle} - ${module.title}`);
    lines.push('');
    lines.push(note.trim());
    lines.push('');
  }

  if (lines.length <= 2) {
    lines.push('_No notes recorded yet._');
  }

  const filename = `futureproof-notes-${new Date().toISOString().slice(0, 10)}.md`;
  downloadBlob(filename, lines.join('\n'), 'text/markdown');
}

export function exportProgressMarkdown(state, progressSummary) {
  const allModules = getAllModules();
  const completedCount = Object.values(state.completedModules).filter(Boolean).length;

  const lines = [
    '# FUTUREPROOF Progress Report',
    '',
    `Generated: ${formatDate(new Date().toISOString())}`,
    '',
    `Overall Completion: **${progressSummary.overall.percentage}%** (${completedCount}/${allModules.length})`,
    `Estimated Remaining Hours: **${progressSummary.overall.remainingHours}**`,
    '',
    '## Track Progress',
    '',
  ];

  for (const track of progressSummary.tracks) {
    lines.push(`### ${track.title}`);
    lines.push(`- Completion: ${track.percentage}% (${track.completed}/${track.total})`);
    lines.push(`- Projects Complete: ${track.projectsCompleted}/${track.total}`);
    lines.push(`- Estimated Remaining Hours: ${track.remainingHours}`);
    lines.push('');
  }

  lines.push('## Completed Modules');
  lines.push('');

  const completed = allModules
    .filter((module) => state.completedModules[module.id])
    .sort((a, b) => (state.completionDates[a.id] || '').localeCompare(state.completionDates[b.id] || ''));

  if (!completed.length) {
    lines.push('_No completed modules yet._');
  } else {
    for (const module of completed) {
      const completedOn = formatDate(state.completionDates[module.id]);
      const projectLabel = PROJECT_STATUS_LABELS[state.projectStatus[module.id] || 'not_started'];
      lines.push(`- **${module.title}** (${module.trackTitle}) — completed ${completedOn}, project: ${projectLabel}`);
    }
  }

  lines.push('');
  lines.push('## Notes Snapshot');
  lines.push('');

  const notedModules = allModules.filter((module) => state.notes[module.id]?.trim());
  if (!notedModules.length) {
    lines.push('_No notes recorded yet._');
  } else {
    for (const module of notedModules) {
      lines.push(`### ${module.trackTitle} - ${module.title}`);
      lines.push(state.notes[module.id].trim());
      lines.push('');
    }
  }

  const filename = `futureproof-report-${new Date().toISOString().slice(0, 10)}.md`;
  downloadBlob(filename, lines.join('\n'), 'text/markdown');
}

export function parseImportedState(fileText) {
  try {
    const parsed = JSON.parse(fileText);
    return validateImportedStateShape(parsed);
  } catch (error) {
    throw new Error(`Invalid JSON file: ${error.message}`);
  }
}
