import { PROJECT_STATUSES, THEME_OPTIONS } from '../data/constants';
import { getDefaultState, migrateState } from './storage';

const PROJECT_STATUS_RANK = {
  not_started: 0,
  in_progress: 1,
  completed: 2,
};

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function ensureRecord(value, fieldName) {
  if (value === undefined) return {};
  if (!isObject(value)) {
    throw new Error(`${fieldName} must be an object map`);
  }
  return value;
}

function validateBooleanRecord(value, fieldName) {
  const record = ensureRecord(value, fieldName);
  for (const [key, item] of Object.entries(record)) {
    if (typeof key !== 'string' || typeof item !== 'boolean') {
      throw new Error(`${fieldName}.${key} must be boolean`);
    }
  }
  return record;
}

function validateStringRecord(value, fieldName, allowEmpty = true) {
  const record = ensureRecord(value, fieldName);
  for (const [key, item] of Object.entries(record)) {
    if (typeof key !== 'string' || typeof item !== 'string') {
      throw new Error(`${fieldName}.${key} must be string`);
    }
    if (!allowEmpty && !item.trim()) {
      throw new Error(`${fieldName}.${key} cannot be empty`);
    }
  }
  return record;
}

function validateCompletionDates(value) {
  const record = validateStringRecord(value, 'completionDates');
  for (const [key, item] of Object.entries(record)) {
    if (Number.isNaN(new Date(item).getTime())) {
      throw new Error(`completionDates.${key} must be a valid ISO date`);
    }
  }
  return record;
}

function validateProjectStatus(value) {
  const record = validateStringRecord(value, 'projectStatus');
  for (const [key, item] of Object.entries(record)) {
    if (!PROJECT_STATUSES.includes(item)) {
      throw new Error(`projectStatus.${key} must be one of: ${PROJECT_STATUSES.join(', ')}`);
    }
  }
  return record;
}

function validatePreferences(value) {
  if (value === undefined) return getDefaultState().preferences;
  if (!isObject(value)) {
    throw new Error('preferences must be an object');
  }

  const next = { ...getDefaultState().preferences, ...value };

  if (!THEME_OPTIONS.includes(next.theme)) {
    throw new Error(`preferences.theme must be one of: ${THEME_OPTIONS.join(', ')}`);
  }
  if (typeof next.sidebarCollapsed !== 'boolean') {
    throw new Error('preferences.sidebarCollapsed must be boolean');
  }

  return next;
}

export function validateImportedStateShape(payload) {
  if (!isObject(payload)) {
    throw new Error('Import payload must be an object');
  }

  const validated = {
    ...payload,
    completedModules: validateBooleanRecord(payload.completedModules, 'completedModules'),
    completionDates: validateCompletionDates(payload.completionDates),
    projectStatus: validateProjectStatus(payload.projectStatus),
    notes: validateStringRecord(payload.notes, 'notes'),
    resourceChecks: validateBooleanRecord(payload.resourceChecks, 'resourceChecks'),
    preferences: validatePreferences(payload.preferences),
  };

  if (payload.courseStartDate !== null && payload.courseStartDate !== undefined) {
    if (typeof payload.courseStartDate !== 'string' || Number.isNaN(new Date(payload.courseStartDate).getTime())) {
      throw new Error('courseStartDate must be null or an ISO date string');
    }
  }

  if (payload.activeTrackFilter !== null && payload.activeTrackFilter !== undefined && typeof payload.activeTrackFilter !== 'string') {
    throw new Error('activeTrackFilter must be null or string');
  }

  return migrateState(validated);
}

function chooseProjectStatus(existing, incoming) {
  const current = existing || 'not_started';
  const next = incoming || 'not_started';
  return PROJECT_STATUS_RANK[next] > PROJECT_STATUS_RANK[current] ? next : current;
}

export function mergeImportedState(existingState, incomingState) {
  const existing = migrateState(existingState);
  const incoming = migrateState(incomingState);

  const moduleKeys = new Set([
    ...Object.keys(existing.completedModules),
    ...Object.keys(incoming.completedModules),
    ...Object.keys(existing.projectStatus),
    ...Object.keys(incoming.projectStatus),
    ...Object.keys(existing.notes),
    ...Object.keys(incoming.notes),
    ...Object.keys(existing.completionDates),
    ...Object.keys(incoming.completionDates),
  ]);

  const mergedCompleted = {};
  const mergedDates = {};
  const mergedProjects = {};
  const mergedNotes = {};

  for (const key of moduleKeys) {
    const completed = Boolean(existing.completedModules[key] || incoming.completedModules[key]);
    if (completed) {
      mergedCompleted[key] = true;
      mergedDates[key] = existing.completionDates[key] || incoming.completionDates[key] || new Date().toISOString();
    }

    mergedProjects[key] = chooseProjectStatus(existing.projectStatus[key], incoming.projectStatus[key]);

    const existingNote = existing.notes[key] || '';
    const incomingNote = incoming.notes[key] || '';
    mergedNotes[key] = existingNote.trim() ? existingNote : incomingNote;
  }

  return {
    ...existing,
    version: existing.version,
    completedModules: mergedCompleted,
    completionDates: mergedDates,
    projectStatus: mergedProjects,
    notes: mergedNotes,
    resourceChecks: {
      ...existing.resourceChecks,
      ...incoming.resourceChecks,
    },
    courseStartDate: existing.courseStartDate || incoming.courseStartDate,
    activeTrackFilter: existing.activeTrackFilter || incoming.activeTrackFilter,
    lastActiveDate: new Date().toISOString(),
    preferences: {
      ...existing.preferences,
      ...incoming.preferences,
    },
  };
}
