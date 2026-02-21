export function StreakTracker({ weeks }) {
  return (
    <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-4">
      <h2 className="text-base font-semibold">Consistency (12 weeks)</h2>
      <div className="mt-3 grid grid-cols-6 gap-2 md:grid-cols-12">
        {weeks.map((week) => (
          <div key={week.weekStart} className="text-center">
            <div
              className="h-8 rounded-md border"
              style={{
                background: week.worked ? 'var(--success)' : 'var(--bg-tertiary)',
                borderColor: week.worked ? 'rgba(52,211,153,0.4)' : 'var(--border-default)',
              }}
              title={`${week.label}: ${week.worked ? 'active' : 'inactive'}`}
            />
            <p className="mt-1 text-[10px] text-[var(--text-tertiary)]">{week.label.split(' ')[0]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
