import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { courseReducer } from './reducer';
import { loadState, saveState } from '../utils/storage';
import { useProgress } from '../hooks/useProgress';

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const [state, dispatch] = useReducer(courseReducer, undefined, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    document.documentElement.dataset.theme = state.preferences.theme;
  }, [state.preferences.theme]);

  const progress = useProgress(state);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      selectors: progress,
    }),
    [state, progress]
  );

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within CourseProvider');
  }
  return context;
}
