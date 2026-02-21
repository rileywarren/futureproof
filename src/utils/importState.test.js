import { describe, expect, it } from 'vitest';
import { validateImportedStateShape, mergeImportedState } from './importState';
import { getDefaultState } from './storage';

describe('validateImportedStateShape', () => {
  it('accepts a valid minimal payload', () => {
    const payload = {
      completedModules: { 'ai-1-1': true },
      completionDates: { 'ai-1-1': '2026-02-21T00:00:00.000Z' },
      projectStatus: { 'ai-1-1': 'in_progress' },
      notes: { 'ai-1-1': 'note' },
      resourceChecks: { 'ai-1-1::0': true },
      preferences: { theme: 'dark', sidebarCollapsed: false },
    };

    const result = validateImportedStateShape(payload);
    expect(result.completedModules['ai-1-1']).toBe(true);
    expect(result.projectStatus['ai-1-1']).toBe('in_progress');
  });

  it('rejects invalid project statuses', () => {
    const payload = {
      projectStatus: { 'ai-1-1': 'done' },
    };

    expect(() => validateImportedStateShape(payload)).toThrow('must be one of');
  });

  it('rejects invalid completion date formats', () => {
    const payload = {
      completionDates: { 'ai-1-1': 'not-a-date' },
    };

    expect(() => validateImportedStateShape(payload)).toThrow('valid ISO date');
  });
});

describe('mergeImportedState', () => {
  it('preserves existing completed modules and non-empty notes', () => {
    const existing = {
      ...getDefaultState(),
      completedModules: { 'ai-1-1': true },
      completionDates: { 'ai-1-1': '2026-02-01T00:00:00.000Z' },
      notes: { 'ai-1-1': 'keep this note' },
      projectStatus: { 'ai-1-1': 'in_progress' },
    };

    const incoming = {
      ...getDefaultState(),
      completedModules: { 'ai-1-1': false, 'ai-1-2': true },
      completionDates: { 'ai-1-2': '2026-02-03T00:00:00.000Z' },
      notes: { 'ai-1-1': 'incoming note', 'ai-1-2': 'new note' },
      projectStatus: { 'ai-1-1': 'completed', 'ai-1-2': 'not_started' },
    };

    const merged = mergeImportedState(existing, incoming);

    expect(merged.completedModules['ai-1-1']).toBe(true);
    expect(merged.completedModules['ai-1-2']).toBe(true);
    expect(merged.notes['ai-1-1']).toBe('keep this note');
    expect(merged.notes['ai-1-2']).toBe('new note');
    expect(merged.projectStatus['ai-1-1']).toBe('completed');
  });
});
