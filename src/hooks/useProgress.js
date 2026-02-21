import { useMemo } from 'react';
import { COURSE, getAllModules } from '../data/courseData';
import { MILESTONE_THRESHOLDS } from '../data/constants';
import { formatDate, getMonthOffset, getWeekStart } from '../utils/dates';

function byTimelineOrder(a, b) {
  if (a.trackOrder !== b.trackOrder) return a.trackOrder - b.trackOrder;
  if (a.phaseOrder !== b.phaseOrder) return a.phaseOrder - b.phaseOrder;
  return a.moduleOrder - b.moduleOrder;
}

function getCompletionCount(completedModules) {
  return Object.values(completedModules).filter(Boolean).length;
}

function getEstimatedHours(completionMap, modules, mode = 'remaining') {
  return modules.reduce((sum, module) => {
    const isComplete = Boolean(completionMap[module.id]);
    if ((mode === 'remaining' && isComplete) || (mode === 'completed' && !isComplete)) {
      return sum;
    }
    return sum + (module.durationHours || 0);
  }, 0);
}

export function useProgress(state) {
  return useMemo(() => {
    const allModules = getAllModules();
    const completedCount = getCompletionCount(state.completedModules);
    const totalCount = allModules.length;
    const overallPercentage = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

    const tracks = COURSE.tracks.map((track, trackIndex) => {
      const modules = track.phases.flatMap((phase, phaseIndex) =>
        phase.modules.map((module, moduleIndex) => ({
          ...module,
          trackId: track.id,
          trackTitle: track.title,
          trackColor: track.color,
          phaseId: phase.id,
          phaseTitle: phase.title,
          trackOrder: trackIndex + 1,
          phaseOrder: phaseIndex + 1,
          moduleOrder: moduleIndex + 1,
        }))
      );

      const completed = modules.filter((module) => state.completedModules[module.id]).length;
      const total = modules.length;
      const percentage = total ? Math.round((completed / total) * 100) : 0;
      const remainingHours = getEstimatedHours(state.completedModules, modules, 'remaining');
      const completedHours = getEstimatedHours(state.completedModules, modules, 'completed');
      const notesWritten = modules.filter((module) => state.notes[module.id]?.trim()).length;
      const projectsCompleted = modules.filter((module) => state.projectStatus[module.id] === 'completed').length;

      const phases = track.phases.map((phase) => {
        const phaseModules = phase.modules;
        const phaseCompleted = phaseModules.filter((module) => state.completedModules[module.id]).length;
        return {
          ...phase,
          completed: phaseCompleted,
          total: phaseModules.length,
          percentage: phaseModules.length ? Math.round((phaseCompleted / phaseModules.length) * 100) : 0,
        };
      });

      return {
        ...track,
        modules,
        completed,
        total,
        percentage,
        remainingHours,
        completedHours,
        notesWritten,
        projectsCompleted,
        phases,
      };
    });

    const recentActivity = Object.entries(state.completionDates)
      .filter(([, date]) => Boolean(date))
      .sort((a, b) => new Date(b[1]).getTime() - new Date(a[1]).getTime())
      .slice(0, 5)
      .map(([moduleId, date]) => {
        const module = allModules.find((item) => item.id === moduleId);
        return {
          moduleId,
          date,
          displayDate: formatDate(date),
          title: module?.title ?? moduleId,
          trackTitle: module?.trackTitle ?? 'Unknown Track',
        };
      });

    const upNextCandidates = tracks
      .flatMap((track) => track.modules.map((module) => ({ ...module, trackId: track.id, trackOrder: COURSE.tracks.findIndex((item) => item.id === track.id) + 1 })))
      .filter((module) => !state.completedModules[module.id])
      .sort(byTimelineOrder);

    const upNext = COURSE.tracks
      .map((track) => upNextCandidates.find((candidate) => candidate.trackId === track.id))
      .filter(Boolean)
      .slice(0, 3);

    const completionEntries = Object.entries(state.completionDates)
      .filter(([, value]) => Boolean(value))
      .sort((a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime());

    const completionByWeek = [];
    const weekMap = new Map();
    for (const [, date] of completionEntries) {
      const weekStart = getWeekStart(date).toISOString();
      const current = weekMap.get(weekStart) || 0;
      weekMap.set(weekStart, current + 1);
    }

    const sortedWeeks = [...weekMap.entries()].sort((a, b) => new Date(a[0]) - new Date(b[0]));
    let cumulative = 0;
    for (const [weekStart, count] of sortedWeeks) {
      cumulative += count;
      completionByWeek.push({
        weekStart,
        label: formatDate(weekStart, { month: 'short', day: 'numeric' }),
        completed: count,
        cumulative,
      });
    }

    const streakWeeks = Array.from({ length: 12 }, (_, index) => {
      const target = new Date();
      target.setDate(target.getDate() - (11 - index) * 7);
      const weekStart = getWeekStart(target).toISOString();
      const worked = weekMap.has(weekStart) ||
        (state.lastActiveDate && getWeekStart(state.lastActiveDate).toISOString() === weekStart);
      return {
        weekStart,
        label: formatDate(weekStart, { month: 'short', day: 'numeric' }),
        worked,
      };
    });

    const milestones = MILESTONE_THRESHOLDS.map((milestone) => {
      const unlocked = completedCount >= milestone.target;
      let unlockedDate = null;

      if (unlocked && completionEntries.length) {
        unlockedDate = completionEntries[Math.min(milestone.target - 1, completionEntries.length - 1)]?.[1] ?? null;
      }

      return {
        ...milestone,
        unlocked,
        unlockedDate,
        remaining: Math.max(milestone.target - completedCount, 0),
      };
    });

    const trackMasterMilestones = tracks.map((track) => ({
      id: `track-master-${track.id}`,
      title: `Track Master: ${track.title}`,
      icon: '🏆',
      unlocked: track.completed === track.total,
      unlockedDate: track.modules
        .map((module) => state.completionDates[module.id])
        .filter(Boolean)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] || null,
      remaining: track.total - track.completed,
    }));

    return {
      tracks,
      allModules,
      overall: {
        completed: completedCount,
        total: totalCount,
        percentage: overallPercentage,
        remainingHours: getEstimatedHours(state.completedModules, allModules, 'remaining'),
        completedHours: getEstimatedHours(state.completedModules, allModules, 'completed'),
      },
      recentActivity,
      upNext,
      completionByWeek,
      streakWeeks,
      milestones: [...milestones, ...trackMasterMilestones],
      timelineMonthOffset: getMonthOffset(state.courseStartDate),
    };
  }, [state]);
}
