export const STORAGE_KEY = 'futureproof-state';
export const STORAGE_VERSION = 1;

export const PROJECT_STATUSES = ['not_started', 'in_progress', 'completed'];

export const PROJECT_STATUS_LABELS = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export const PROJECT_STATUS_COLORS = {
  not_started: 'var(--text-secondary)',
  in_progress: 'var(--warning)',
  completed: 'var(--success)',
};

export const RESOURCE_TYPE_ICONS = {
  video: '🎬',
  course: '🎓',
  book: '📚',
  article: '📖',
  documentation: '📄',
  tool: '🔧',
  practice: '💪',
};

export const RESOURCE_TYPE_LABELS = {
  video: 'Videos',
  course: 'Courses',
  book: 'Books',
  article: 'Reading',
  documentation: 'Documentation',
  tool: 'Tools',
  practice: 'Practice',
};

export const THEME_OPTIONS = ['dark', 'light'];

export const MILESTONE_THRESHOLDS = [
  { id: 'first-module', title: 'First Module Complete', target: 1, icon: '✅' },
  { id: 'getting-started', title: 'Getting Started', target: 5, icon: '🚀' },
  { id: 'building-momentum', title: 'Building Momentum', target: 10, icon: '📈' },
  { id: 'halfway', title: 'Halfway There', target: 14, icon: '🎯' },
  { id: 'futureproof', title: 'FUTUREPROOF', target: 28, icon: '🏁' },
];

export const APP_SHORTCUTS = {
  toggleSidebar: '[',
  openSearch: 'k',
  closeModal: 'Escape',
};
