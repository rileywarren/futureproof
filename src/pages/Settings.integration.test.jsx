import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings from './Settings';

const mocks = vi.hoisted(() => ({
  dispatch: vi.fn(),
  readImportFile: vi.fn(),
  handleExportJson: vi.fn(),
  handleExportMarkdown: vi.fn(),
  handleExportNotes: vi.fn(),
}));

vi.mock('../context/CourseContext', () => ({
  useCourse: () => ({
    state: {
      completedModules: {},
      completionDates: {},
      projectStatus: {},
      notes: {},
      resourceChecks: {},
      courseStartDate: null,
      lastActiveDate: new Date().toISOString(),
      activeTrackFilter: null,
      preferences: { theme: 'dark', sidebarCollapsed: false },
    },
    dispatch: mocks.dispatch,
    selectors: {
      overall: { percentage: 0, remainingHours: 312, completed: 0, total: 28 },
      tracks: [],
      milestones: [],
      allModules: [],
    },
  }),
}));

vi.mock('../hooks/useExport', () => ({
  useExport: () => ({
    handleExportJson: mocks.handleExportJson,
    handleExportMarkdown: mocks.handleExportMarkdown,
    handleExportNotes: mocks.handleExportNotes,
    readImportFile: mocks.readImportFile,
  }),
}));

describe('Settings integration', () => {
  beforeEach(() => {
    mocks.dispatch.mockReset();
    mocks.readImportFile.mockReset();
    mocks.handleExportJson.mockReset();
    mocks.handleExportMarkdown.mockReset();
    mocks.handleExportNotes.mockReset();
  });

  it('shows import errors without mutating state', async () => {
    const user = userEvent.setup();
    mocks.readImportFile.mockRejectedValue(new Error('Invalid JSON file: bad schema'));

    const { container } = render(<Settings />);
    const fileInput = container.querySelector('input[type="file"]');
    const file = new File(['{}'], 'import.json', { type: 'application/json' });
    await user.upload(fileInput, file);

    await user.click(screen.getByRole('button', { name: 'Merge Import' }));

    expect(await screen.findByText(/Invalid JSON file: bad schema/)).toBeInTheDocument();
    expect(mocks.dispatch).not.toHaveBeenCalled();
  });

  it('requires RESET and confirmation before dispatching reset', async () => {
    const user = userEvent.setup();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<Settings />);

    await user.type(screen.getAllByPlaceholderText('Type RESET')[0], 'RESET');
    await user.click(screen.getByRole('button', { name: 'Reset All Progress' }));

    await waitFor(() => {
      expect(confirmSpy).toHaveBeenCalled();
      expect(mocks.dispatch).toHaveBeenCalledWith({ type: 'RESET_STATE' });
    });

    confirmSpy.mockRestore();
  });
});
