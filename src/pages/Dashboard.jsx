import { OverallProgress } from '../components/dashboard/OverallProgress';
import { TrackCard } from '../components/dashboard/TrackCard';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { UpNext } from '../components/dashboard/UpNext';
import { StreakTracker } from '../components/dashboard/StreakTracker';
import { useCourse } from '../context/CourseContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const { selectors } = useCourse();

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold">FUTUREPROOF Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">At-a-glance progress across all tracks.</p>
      </section>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <OverallProgress overall={selectors.overall} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:col-span-2 xl:grid-cols-3">
          {selectors.tracks.map((track) => (
            <TrackCard key={track.id} track={track} onClick={() => navigate(`/track/${track.id}`)} />
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <UpNext modules={selectors.upNext} />
        </div>
        <div className="xl:col-span-1">
          <RecentActivity items={selectors.recentActivity} />
        </div>
        <div className="xl:col-span-1">
          <StreakTracker weeks={selectors.streakWeeks} />
        </div>
      </div>
    </div>
  );
}
