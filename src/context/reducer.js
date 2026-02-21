import { getDefaultState, migrateState } from '../utils/storage';

export function courseReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_MODULE_COMPLETE': {
      const { moduleId } = action.payload;
      const isCompleting = !state.completedModules[moduleId];
      const completionDates = { ...state.completionDates };
      if (isCompleting) {
        completionDates[moduleId] = new Date().toISOString();
      } else {
        delete completionDates[moduleId];
      }

      return {
        ...state,
        completedModules: {
          ...state.completedModules,
          [moduleId]: isCompleting,
        },
        completionDates,
        lastActiveDate: new Date().toISOString(),
      };
    }

    case 'SET_PROJECT_STATUS': {
      const { moduleId, status } = action.payload;
      return {
        ...state,
        projectStatus: {
          ...state.projectStatus,
          [moduleId]: status,
        },
        lastActiveDate: new Date().toISOString(),
      };
    }

    case 'UPDATE_NOTE': {
      const { moduleId, text } = action.payload;
      return {
        ...state,
        notes: {
          ...state.notes,
          [moduleId]: text,
        },
        lastActiveDate: new Date().toISOString(),
      };
    }

    case 'TOGGLE_RESOURCE_CHECKED': {
      const { key } = action.payload;
      return {
        ...state,
        resourceChecks: {
          ...state.resourceChecks,
          [key]: !state.resourceChecks[key],
        },
        lastActiveDate: new Date().toISOString(),
      };
    }

    case 'SET_TRACK_FILTER':
      return {
        ...state,
        activeTrackFilter: action.payload,
      };

    case 'SET_THEME':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          theme: action.payload,
        },
      };

    case 'SET_SIDEBAR_COLLAPSED':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          sidebarCollapsed: action.payload,
        },
      };

    case 'SET_COURSE_START_DATE':
      return {
        ...state,
        courseStartDate: action.payload,
      };

    case 'IMPORT_STATE':
      return migrateState(action.payload);

    case 'RESET_STATE':
      return getDefaultState();

    default:
      return state;
  }
}
