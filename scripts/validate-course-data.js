import { COURSE } from '../src/data/courseData.js';

const allModules = COURSE.tracks.flatMap((track) =>
  track.phases.flatMap((phase) =>
    phase.modules.map((module) => ({ module, track, phase }))
  )
);

const errors = [];
const ids = new Set();

if (COURSE.tracks.length !== 3) {
  errors.push(`Expected 3 tracks, got ${COURSE.tracks.length}`);
}

if (allModules.length !== 28) {
  errors.push(`Expected 28 modules, got ${allModules.length}`);
}

for (const { module, track, phase } of allModules) {
  if (ids.has(module.id)) {
    errors.push(`Duplicate module id: ${module.id}`);
  }
  ids.add(module.id);

  if (!module.description || module.description.length < 20) {
    errors.push(`${module.id}: missing/short description`);
  }

  if (!module.deliverable || module.deliverable.length < 20) {
    errors.push(`${module.id}: missing/short deliverable`);
  }

  if (typeof module.durationHours !== 'number' || Number.isNaN(module.durationHours) || module.durationHours <= 0) {
    errors.push(`${module.id}: invalid durationHours (${module.durationHours})`);
  }

  if (!Array.isArray(module.resources) || module.resources.length === 0) {
    errors.push(`${module.id}: no resources`);
  }

  for (const resource of module.resources) {
    if (!resource.name) {
      errors.push(`${module.id}: resource missing name`);
    }
    if (!resource.url) {
      errors.push(`${module.id}: resource missing url: ${resource.name}`);
    }
    if (resource.url && !resource.url.startsWith('http') && !resource.url.startsWith('#/')) {
      errors.push(`${module.id}: resource url must be http(s) or internal #/ link: ${resource.url}`);
    }
  }

  if (!track.title || !phase.title) {
    errors.push(`${module.id}: broken hierarchy context`);
  }
}

if (errors.length) {
  console.error('Validation failed with errors:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

const totals = {
  tracks: COURSE.tracks.length,
  phases: COURSE.tracks.reduce((sum, track) => sum + track.phases.length, 0),
  modules: allModules.length,
  resources: allModules.reduce((sum, { module }) => sum + module.resources.length, 0),
  totalEstimatedHours: COURSE.totalEstimatedHours,
};

console.log('Validation passed:', totals);
