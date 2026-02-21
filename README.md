# FUTUREPROOF

Interactive, self-paced career development LMS for a senior cybersecurity/GRC professional.

This app is a single-user React SPA that tracks module completion, project status, notes, milestones, and timeline progress across 3 tracks:
- AI & Intelligent Automation
- Next-Generation Cybersecurity
- Strategic Leadership & Executive Readiness

## Tech Stack

- React 19 + Vite
- Tailwind CSS
- React Router (`HashRouter`)
- Recharts
- Lucide React
- `react-markdown`
- `fuse.js`
- localStorage persistence (with state migration)
- Vitest + Testing Library

## Core Features

- Dashboard with overall + per-track progress
- Track view with phase/module breakdown
- Module detail view with:
  - completion toggle
  - resources
  - project status
  - notes (autosave + markdown preview)
- Timeline view (10-month layout + dependency lines + "You are here" marker)
- Progress analytics (charts + milestones + stats table)
- Settings for export/import/reset/preferences
- Keyboard shortcuts:
  - `[` toggle sidebar
  - `Cmd/Ctrl+K` open search
  - `Esc` close modal
- Accessibility support:
  - skip link
  - focus-visible states
  - ARIA progress semantics
  - live announcements for state changes

## Project Structure

```text
src/
  components/
  context/
  data/
  hooks/
  pages/
  utils/
scripts/
  extract-syllabus.js
  validate-course-data.js
```

## Prerequisites

- Node.js 20+ (tested with Node 24)
- npm 10+
- macOS includes `textutil` by default (used for `.docx` parsing)

## Setup

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Course Data Pipeline

The app data is generated from a syllabus docx.

### Default extraction script

```bash
npm run data:extract
```

This currently reads from:
`/Users/rileywarren/Downloads/futureproof-syllabus.docx`

### Custom extraction path

```bash
node scripts/extract-syllabus.js /absolute/path/to/futureproof-syllabus.docx src/data/courseData.js
```

### Validate extracted data

```bash
npm run data:validate
```

Validation checks:
- 3 tracks
- 7 phases
- 28 modules
- unique module IDs
- required descriptions/deliverables
- numeric `durationHours`
- valid resource URLs or internal links

## Testing

```bash
npm run test:run
```

Current test coverage includes:
- reducer behavior
- import validation + merge logic
- storage persistence/fallback behavior
- settings import/reset flows
- ARIA semantics on progress ring

## Linting

```bash
npm run lint
```

## Export / Import Behavior

### Export
- JSON state export
- Markdown progress report export
- Markdown notes export

### Import
- schema validation before mutation
- merge mode preserves:
  - existing completed modules
  - existing non-empty notes
- replace mode overwrites state after confirmation

## Deployment

This is a static app. The `dist/` output can be deployed to:
- GitHub Pages
- Vercel
- Netlify

Because routing uses `HashRouter`, static hosting works without server rewrite rules.

## Notes

- This is intentionally single-user and offline-first.
- No backend, auth, or external API is required.
- localStorage failures are handled gracefully with fallback state.

## Repository

- GitHub: [https://github.com/rileywarren/futureproof](https://github.com/rileywarren/futureproof)
- Default branch: `main`
- Working branch: `codex/futureproof-final`
