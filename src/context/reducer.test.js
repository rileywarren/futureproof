import { describe, expect, it, vi } from 'vitest';
import { courseReducer } from './reducer';
import { getDefaultState } from '../utils/storage';

describe('courseReducer', () => {
  it('toggles module completion and writes completion date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-02-21T12:00:00.000Z'));

    const initial = getDefaultState();
    const next = courseReducer(initial, {
      type: 'TOGGLE_MODULE_COMPLETE',
      payload: { moduleId: 'ai-1-1' },
    });

    expect(next.completedModules['ai-1-1']).toBe(true);
    expect(next.completionDates['ai-1-1']).toBe('2026-02-21T12:00:00.000Z');

    const reverted = courseReducer(next, {
      type: 'TOGGLE_MODULE_COMPLETE',
      payload: { moduleId: 'ai-1-1' },
    });

    expect(reverted.completedModules['ai-1-1']).toBe(false);
    expect(reverted.completionDates['ai-1-1']).toBeUndefined();

    vi.useRealTimers();
  });

  it('updates project status and notes', () => {
    const initial = getDefaultState();

    const withProject = courseReducer(initial, {
      type: 'SET_PROJECT_STATUS',
      payload: { moduleId: 'ai-1-1', status: 'completed' },
    });
    expect(withProject.projectStatus['ai-1-1']).toBe('completed');

    const withNote = courseReducer(withProject, {
      type: 'UPDATE_NOTE',
      payload: { moduleId: 'ai-1-1', text: 'example note' },
    });
    expect(withNote.notes['ai-1-1']).toBe('example note');
  });
});
