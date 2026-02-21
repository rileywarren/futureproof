import { describe, expect, it, vi } from 'vitest';
import { STORAGE_KEY } from '../data/constants';
import { getDefaultState, loadState, saveState } from './storage';

describe('storage integration', () => {
  it('saves and loads state roundtrip', () => {
    const state = {
      ...getDefaultState(),
      completedModules: { 'ai-1-1': true },
      notes: { 'ai-1-1': 'saved note' },
    };

    saveState(state);
    const loaded = loadState();

    expect(loaded.completedModules['ai-1-1']).toBe(true);
    expect(loaded.notes['ai-1-1']).toBe('saved note');
  });

  it('falls back to defaults when JSON is invalid', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid');
    const loaded = loadState();
    expect(loaded.version).toBe(getDefaultState().version);
  });

  it('falls back to defaults when storage throws', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage blocked');
    });

    const loaded = loadState();
    expect(loaded.version).toBe(getDefaultState().version);

    getItemSpy.mockRestore();
  });
});
