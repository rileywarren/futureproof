import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressRing } from './ProgressRing';

describe('ProgressRing accessibility', () => {
  it('renders semantic progressbar attributes', () => {
    render(<ProgressRing percentage={72} label="Overall completion" />);

    const progressbar = screen.getByRole('progressbar', { name: 'Overall completion' });
    expect(progressbar).toHaveAttribute('aria-valuenow', '72');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(progressbar).toHaveAttribute('aria-valuetext', '72%');
  });
});
