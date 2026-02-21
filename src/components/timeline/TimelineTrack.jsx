import { TimelineModule } from './TimelineModule';

export function TimelineTrack({ track, completedModules, moduleMonthMap, currentMonth }) {
  return (
    <div className="grid h-[88px] grid-cols-10 gap-2">
      {Array.from({ length: 10 }, (_, idx) => idx + 1).map((month) => {
        const phase = track.phases.find((item) => month >= item.timelineStartMonth && month <= item.timelineEndMonth);
        const modules = track.phases
          .flatMap((item) => item.modules)
          .filter((module) => moduleMonthMap[module.id] === month);

        return (
          <div
            key={`${track.id}-${month}`}
            className="group relative rounded-lg border border-[var(--border-default)] p-2"
            style={{
              background: phase ? `${track.color}1A` : 'var(--bg-secondary)',
              outline: currentMonth === month ? `1px dashed ${track.color}` : undefined,
            }}
            title={phase ? `${phase.title} (${phase.timeframe})` : `Month ${month}`}
          >
            <p className="text-[10px] text-[var(--text-tertiary)]">M{month}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {modules.map((module) => (
                <TimelineModule
                  key={module.id}
                  module={{ ...module, trackColor: track.color }}
                  completed={completedModules[module.id]}
                  title={`${module.title} · ${completedModules[module.id] ? 'Completed' : 'Incomplete'} · ${module.duration}`}
                />
              ))}
            </div>

            {phase ? (
              <div className="pointer-events-none absolute left-2 top-2 z-20 hidden w-52 rounded-md border border-[var(--border-hover)] bg-[var(--bg-elevated)] p-2 text-[10px] text-[var(--text-primary)] shadow-lg group-hover:block">
                <p className="font-semibold">{phase.title}</p>
                <p className="mt-1 text-[var(--text-secondary)]">{phase.timeframe}</p>
                <p className="mt-1 text-[var(--text-secondary)]">{phase.completed}/{phase.total} modules complete</p>
                <p className="mt-1 leading-relaxed text-[var(--text-secondary)]">{phase.objective}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
