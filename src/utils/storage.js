import { STORAGE_KEY, STORAGE_VERSION } from '../data/constants';

export function getDefaultState() {
  return {
    version: STORAGE_VERSION,
    completedModules: {},
    completionDates: {},
    projectStatus: {},
    notes: {},
    resourceChecks: {},
    courseStartDate: null,
    lastActiveDate: new Date().toISOString(),
    activeTrackFilter: null,
    preferences: {
      theme: 'dark',
      sidebarCollapsed: false,
    },
  };
}

export function migrateState(oldState) {
  const fresh = getDefaultState();
  if (!oldState || typeof oldState !== 'object') return fresh;

  const migrated = {
    ...fresh,
    ...oldState,
    version: STORAGE_VERSION,
    completedModules: { ...fresh.completedModules, ...(oldState.completedModules || {}) },
    completionDates: { ...fresh.completionDates, ...(oldState.completionDates || {}) },
    projectStatus: { ...fresh.projectStatus, ...(oldState.projectStatus || {}) },
    notes: { ...fresh.notes, ...(oldState.notes || {}) },
    resourceChecks: { ...fresh.resourceChecks, ...(oldState.resourceChecks || {}) },
    preferences: {
      ...fresh.preferences,
      ...(oldState.preferences || {}),
    },
  };

  return migrated;
}

export function loadState() {
  if (typeof window === 'undefined') return getDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) {
      return migrateState(parsed);
    }
    return migrateState(parsed);
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return getDefaultState();
  }
}

export function saveState(state) {
  if (typeof window === 'undefined') return;
  try {
    const payload = JSON.stringify({ ...state, version: STORAGE_VERSION });
    localStorage.setItem(STORAGE_KEY, payload);
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
}
