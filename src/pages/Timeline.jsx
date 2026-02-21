import { useMemo } from 'react';
import { TimelineTrack } from '../components/timeline/TimelineTrack';
import { useCourse } from '../context/CourseContext';

const TIMELINE_DEPENDENCIES = [
  { from: 'ai-3-2', to: 'ai-2-2', label: 'Red team your own RAG system' },
  { from: 'cyber-2-1', to: 'ai-3-2', label: 'Offensive AI techniques feed red teaming' },
  { from: 'lead-2-3', to: 'ai-3-4', label: 'Business case supports governance capstone' },
];

const HEADER_HEIGHT = 24;
const ROW_HEIGHT = 88;
const ROW_GAP = 14;
const HEADER_TO_ROWS_GAP = 8;

function clampMonth(value) {
  return Math.max(1, Math.min(10, value));
}

export default function Timeline() {
  const { state, selectors } = useCourse();

  const moduleMonthMap = useMemo(() => {
    const map = {};
    for (const track of selectors.tracks) {
      for (const phase of track.phases) {
        const span = Math.max(1, phase.timelineEndMonth - phase.timelineStartMonth + 1);
        const list = phase.modules || [];
        list.forEach((module, index) => {
          const offset = ((index + 1) / (list.length + 1)) * span;
          const month = clampMonth(Math.round(phase.timelineStartMonth + offset - 0.5));
          map[module.id] = month;
        });
      }
    }
    return map;
  }, [selectors.tracks]);

  const overlayHeight = HEADER_HEIGHT + HEADER_TO_ROWS_GAP + selectors.tracks.length * ROW_HEIGHT + (selectors.tracks.length - 1) * ROW_GAP;

  const dependencyLines = useMemo(() => {
    const moduleById = new Map(selectors.allModules.map((item) => [item.id, item]));
    const trackIndexById = new Map(selectors.tracks.map((item, index) => [item.id, index]));

    const getModuleCoordinate = (moduleId) => {
      const module = moduleById.get(moduleId);
      if (!module) return null;
      const rowIndex = trackIndexById.get(module.trackId);
      if (rowIndex === undefined) return null;
      const month = moduleMonthMap[moduleId] || 1;
      const x = ((month - 0.5) / 10) * 100;
      const y = HEADER_HEIGHT + HEADER_TO_ROWS_GAP + rowIndex * (ROW_HEIGHT + ROW_GAP) + ROW_HEIGHT / 2;
      return { x, y };
    };

    return TIMELINE_DEPENDENCIES.map((dependency) => {
      const from = getModuleCoordinate(dependency.from);
      const to = getModuleCoordinate(dependency.to);
      if (!from || !to) return null;
      return { ...dependency, from, to };
    }).filter(Boolean);
  }, [selectors.allModules, selectors.tracks, moduleMonthMap]);

  const currentMonth = clampMonth(selectors.timelineMonthOffset || 1);
  const hasStartDate = Boolean(state.courseStartDate);
  const markerX = ((currentMonth - 0.5) / 10) * 100;

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold">Learning Timeline</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Recommended 10-month roadmap across all tracks.</p>
      </header>

      <div className="overflow-x-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
        <div className="flex min-w-[980px] gap-3">
          <div className="w-52 pt-8">
            <div className="space-y-[14px]">
              {selectors.tracks.map((track) => (
                <div key={track.id} className="flex h-[88px] flex-col justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] px-3">
                  <p className="text-sm font-semibold" style={{ color: track.color }}>{track.icon} {track.title}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{track.completed}/{track.total} complete</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-[760px] flex-1">
            <div className="grid h-6 grid-cols-10 gap-2 text-xs text-[var(--text-secondary)]">
              {Array.from({ length: 10 }, (_, idx) => (
                <p key={idx} className="text-center">Month {idx + 1}</p>
              ))}
            </div>

            <div className="mt-2 space-y-[14px]">
              {selectors.tracks.map((track) => (
                <TimelineTrack
                  key={track.id}
                  track={track}
                  completedModules={state.completedModules}
                  moduleMonthMap={moduleMonthMap}
                  currentMonth={hasStartDate ? currentMonth : null}
                />
              ))}
            </div>

            <svg
              className="pointer-events-none absolute left-0 top-0 w-full"
              style={{ height: overlayHeight }}
              viewBox={`0 0 100 ${overlayHeight}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {hasStartDate ? (
                <>
                  <line
                    x1={markerX}
                    y1={HEADER_HEIGHT}
                    x2={markerX}
                    y2={overlayHeight}
                    stroke="var(--warning)"
                    strokeWidth="0.35"
                    strokeDasharray="2 1.5"
                  />
                  <circle cx={markerX} cy={HEADER_HEIGHT - 1} r="1" fill="var(--warning)" />
                </>
              ) : null}

              {dependencyLines.map((line) => (
                <g key={`${line.from}-${line.to}`}>
                  <line
                    x1={line.from.x}
                    y1={line.from.y}
                    x2={line.to.x}
                    y2={line.to.y}
                    stroke="var(--track-cyber)"
                    strokeWidth="0.28"
                    strokeDasharray="1.2 1.2"
                    opacity="0.8"
                  />
                  <circle cx={line.from.x} cy={line.from.y} r="0.7" fill="var(--track-cyber)" />
                  <circle cx={line.to.x} cy={line.to.y} r="0.7" fill="var(--track-cyber)" />
                </g>
              ))}
            </svg>

            {hasStartDate ? (
              <p
                className="pointer-events-none absolute z-10 rounded-md border border-amber-400/50 bg-amber-500/15 px-2 py-1 text-[10px] font-semibold text-amber-200"
                style={{ left: `calc(${markerX}% - 34px)`, top: '-6px' }}
              >
                You are here · M{currentMonth}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
        <h2 className="text-sm font-semibold">Cross-Track Dependencies</h2>
        <ul className="mt-2 space-y-1 text-xs text-[var(--text-secondary)]">
          {dependencyLines.map((item) => (
            <li key={`${item.from}-${item.to}`}>
              {item.label}: {item.from} → {item.to}
            </li>
          ))}
        </ul>
      </section>

      {!state.courseStartDate ? (
        <p className="text-sm text-[var(--text-secondary)]">
          Set a course start date in Settings to enable the visual “You are here” marker.
        </p>
      ) : null}
    </div>
  );
}
