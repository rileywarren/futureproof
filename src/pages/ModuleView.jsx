import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getAdjacentModules, getModuleById } from '../data/courseData';
import { useCourse } from '../context/CourseContext';
import { ModuleHeader } from '../components/module/ModuleHeader';
import { ResourceList } from '../components/module/ResourceList';
import { ProjectSection } from '../components/module/ProjectSection';
import { NotesEditor } from '../components/module/NotesEditor';
import { ModuleNav } from '../components/module/ModuleNav';
import { Breadcrumb } from '../components/shared/Breadcrumb';
import { announce } from '../utils/a11y';

export default function ModuleView() {
  const { moduleId } = useParams();
  const { state, dispatch } = useCourse();

  const lookup = useMemo(() => getModuleById(moduleId), [moduleId]);
  const adjacent = useMemo(() => getAdjacentModules(moduleId), [moduleId]);

  if (!lookup) {
    return <p className="text-sm text-[var(--text-secondary)]">Module not found.</p>;
  }

  const { module, phase, track } = lookup;

  return (
    <div className="space-y-5">
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/' },
          { label: track.title, to: `/track/${track.id}` },
          { label: phase.title, to: `/track/${track.id}` },
          { label: module.title },
        ]}
      />

      <ModuleHeader
        module={module}
        track={track}
        isCompleted={Boolean(state.completedModules[module.id])}
        completionDate={state.completionDates[module.id]}
        onToggleComplete={() => {
          const wasComplete = Boolean(state.completedModules[module.id]);
          dispatch({ type: 'TOGGLE_MODULE_COMPLETE', payload: { moduleId: module.id } });
          announce(`${module.title} marked ${wasComplete ? 'incomplete' : 'complete'}.`);
        }}
      />

      <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
        <h2 className="text-lg font-semibold">Module Overview</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-secondary)]">{module.description}</p>
      </section>

      <ResourceList
        moduleId={module.id}
        resources={module.resources}
        resourceChecks={state.resourceChecks}
        onToggleResource={(key) => dispatch({ type: 'TOGGLE_RESOURCE_CHECKED', payload: { key } })}
      />

      <ProjectSection
        trackColor={track.color}
        deliverable={module.deliverable}
        status={state.projectStatus[module.id] || 'not_started'}
        onStatusChange={(status) => {
          dispatch({ type: 'SET_PROJECT_STATUS', payload: { moduleId: module.id, status } });
          announce(`Project status for ${module.title} set to ${status.replace('_', ' ')}.`);
        }}
      />

      <NotesEditor
        moduleId={module.id}
        initialText={state.notes[module.id] || ''}
        onSave={(text) => dispatch({ type: 'UPDATE_NOTE', payload: { moduleId: module.id, text } })}
        onAnnounce={() => announce(`Notes saved for ${module.title}.`)}
      />

      <ModuleNav prev={adjacent.prev} next={adjacent.next} trackId={track.id} />
    </div>
  );
}
