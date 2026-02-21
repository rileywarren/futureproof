import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
} from 'recharts';
import { Fragment } from 'react';
import { useCourse } from '../context/CourseContext';
import { formatDate } from '../utils/dates';

export default function Progress() {
  const { selectors, state } = useCourse();

  const trackDonutData = selectors.tracks.map((track) => ({
    name: track.title,
    value: track.percentage,
    color: track.color,
  }));

  const hoursData = selectors.tracks.map((track) => ({
    name: track.title.split('&')[0].trim(),
    completed: track.completedHours,
    remaining: track.remainingHours,
  }));

  const radarData = selectors.tracks.map((track) => ({
    axis: track.title.split('&')[0].trim(),
    completion: track.percentage,
  }));

  const statsRows = selectors.tracks.map((track) => {
    const phaseRows = track.phases.map((phase) => {
      const phaseModules = track.modules.filter((module) => module.phaseId === phase.id);
      return {
        id: phase.id,
        label: `└ ${phase.title}`,
        completed: phase.completed,
        total: phase.total,
        projectsCompleted: phaseModules.filter((module) => state.projectStatus[module.id] === 'completed').length,
        notesWritten: phaseModules.filter((module) => state.notes[module.id]?.trim()).length,
        hoursCompleted: phaseModules
          .filter((module) => state.completedModules[module.id])
          .reduce((sum, module) => sum + (module.durationHours || 0), 0),
      };
    });

    return { track, phaseRows };
  });

  const totals = selectors.tracks.reduce(
    (sum, track) => ({
      completed: sum.completed + track.completed,
      total: sum.total + track.total,
      projectsCompleted: sum.projectsCompleted + track.projectsCompleted,
      notesWritten: sum.notesWritten + track.notesWritten,
      hoursCompleted: sum.hoursCompleted + track.completedHours,
    }),
    { completed: 0, total: 0, projectsCompleted: 0, notesWritten: 0, hoursCompleted: 0 }
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Progress Analytics</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Completion trends, time estimates, and milestone tracking.</p>
      </header>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
          <h2 className="text-base font-semibold">Overall Completion by Track</h2>
          <div className="mt-3 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trackDonutData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label>
                  {trackDonutData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
          <h2 className="text-base font-semibold">Completion Over Time</h2>
          <div className="mt-3 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectors.completionByWeek}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
                <XAxis dataKey="label" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <ChartTooltip />
                <Line type="monotone" dataKey="cumulative" stroke="var(--track-ai)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
          <h2 className="text-base font-semibold">Time Invested Estimate (Hours)</h2>
          <div className="mt-3 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <ChartTooltip />
                <Bar dataKey="completed" stackId="a" fill="var(--success)" />
                <Bar dataKey="remaining" stackId="a" fill="var(--track-cyber)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
          <h2 className="text-base font-semibold">Track Comparison Radar</h2>
          <div className="mt-3 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border-default)" />
                <PolarAngleAxis dataKey="axis" stroke="var(--text-secondary)" />
                <Radar dataKey="completion" stroke="var(--track-lead)" fill="var(--track-lead)" fillOpacity={0.35} />
                <ChartTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="overflow-x-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
        <h2 className="text-base font-semibold">Statistics Table</h2>
        <table className="mt-3 min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-[var(--text-tertiary)]">
            <tr>
              <th className="px-2 py-2">Scope</th>
              <th className="px-2 py-2">Modules</th>
              <th className="px-2 py-2">Projects</th>
              <th className="px-2 py-2">Notes</th>
              <th className="px-2 py-2">Hours Spent</th>
            </tr>
          </thead>
          <tbody>
            {statsRows.map(({ track, phaseRows }) => (
              <Fragment key={track.id}>
                <tr className="border-t border-[var(--border-default)] bg-[var(--bg-primary)]">
                  <td className="px-2 py-2 font-semibold" style={{ color: track.color }}>{track.title}</td>
                  <td className="px-2 py-2 font-mono">{track.completed}/{track.total}</td>
                  <td className="px-2 py-2 font-mono">{track.projectsCompleted}/{track.total}</td>
                  <td className="px-2 py-2 font-mono">{track.notesWritten}</td>
                  <td className="px-2 py-2 font-mono">{track.completedHours}</td>
                </tr>
                {phaseRows.map((phase) => (
                  <tr key={phase.id} className="border-t border-[var(--border-default)]">
                    <td className="px-2 py-2 text-xs text-[var(--text-secondary)]">{phase.label}</td>
                    <td className="px-2 py-2 font-mono text-xs text-[var(--text-secondary)]">{phase.completed}/{phase.total}</td>
                    <td className="px-2 py-2 font-mono text-xs text-[var(--text-secondary)]">{phase.projectsCompleted}/{phase.total}</td>
                    <td className="px-2 py-2 font-mono text-xs text-[var(--text-secondary)]">{phase.notesWritten}</td>
                    <td className="px-2 py-2 font-mono text-xs text-[var(--text-secondary)]">{phase.hoursCompleted}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
            <tr className="border-t border-[var(--border-hover)] bg-[var(--bg-primary)]">
              <td className="px-2 py-2 font-semibold">Overall Totals</td>
              <td className="px-2 py-2 font-mono">{totals.completed}/{totals.total}</td>
              <td className="px-2 py-2 font-mono">{totals.projectsCompleted}/{totals.total}</td>
              <td className="px-2 py-2 font-mono">{totals.notesWritten}</td>
              <td className="px-2 py-2 font-mono">{totals.hoursCompleted}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
        <h2 className="text-base font-semibold">Milestones</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {selectors.milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`rounded-lg border p-3 ${
                milestone.unlocked
                  ? 'border-emerald-400/40 bg-emerald-500/10'
                  : 'border-[var(--border-default)] bg-[var(--bg-primary)]'
              }`}
            >
              <p className="text-sm font-semibold">{milestone.icon} {milestone.title}</p>
              <p className="text-xs text-[var(--text-secondary)]">
                {milestone.unlocked
                  ? `Unlocked ${formatDate(milestone.unlockedDate)}`
                  : `${milestone.remaining} to go`}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
