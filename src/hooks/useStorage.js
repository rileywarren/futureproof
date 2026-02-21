import { loadState, saveState, getDefaultState, migrateState } from '../utils/storage';

export function useStorage() {
  return {
    loadState,
    saveState,
    getDefaultState,
    migrateState,
  };
}
