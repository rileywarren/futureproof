import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useCourse } from '../context/CourseContext';
import { TrackProgress } from '../components/track/TrackProgress';
import { PhaseSection } from '../components/track/PhaseSection';
import { announce } from '../utils/a11y';

export default function TrackView() {
  const { trackId } = useParams();
  const { state, selectors, dispatch } = useCourse();

  const track = useMemo(() => selectors.tracks.find((item) => item.id === trackId), [selectors.tracks, trackId]);

  if (!track) {
    return <p className="text-sm text-[var(--text-secondary)]">Track not found.</p>;
  }

  return (
    <div className="space-y-5">
      <header className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{track.icon}</span>
          <div>
            <h1 className="text-2xl font-semibold">{track.title}</h1>
            <p className="text-sm text-[var(--text-secondary)]">{track.subtitle}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">{track.description}</p>
      </header>

      <TrackProgress track={track} />

      {track.phases.map((phase) => (
        <PhaseSection
          key={phase.id}
          phase={phase}
          track={track}
          state={state}
          onToggleComplete={(moduleId) => {
            const module = track.modules.find((item) => item.id === moduleId);
            const wasComplete = Boolean(state.completedModules[moduleId]);
            dispatch({ type: 'TOGGLE_MODULE_COMPLETE', payload: { moduleId } });
            announce(`${module?.title || 'Module'} marked ${wasComplete ? 'incomplete' : 'complete'}.`);
          }}
        />
      ))}
    </div>
  );
}
