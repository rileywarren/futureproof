import { Badge } from '../shared/Badge';
import { RESOURCE_TYPE_ICONS, RESOURCE_TYPE_LABELS } from '../../data/constants';

export function ResourceList({ moduleId, resources, resourceChecks, onToggleResource }) {
  const grouped = resources.reduce((acc, resource, index) => {
    const key = resource.type || 'article';
    if (!acc[key]) acc[key] = [];
    acc[key].push({ ...resource, index });
    return acc;
  }, {});

  const orderedTypes = Object.keys(grouped).sort();

  return (
    <section className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] p-5">
      <h2 className="text-lg font-semibold">Resources</h2>
      <div className="mt-4 space-y-5">
        {orderedTypes.map((type) => (
          <div key={type}>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              {RESOURCE_TYPE_ICONS[type]} {RESOURCE_TYPE_LABELS[type] || type}
            </h3>
            <ul className="space-y-2">
              {grouped[type]
                .sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary))
                .map((resource) => {
                  const key = `${moduleId}::${resource.index}`;
                  const checked = Boolean(resourceChecks[key]);

                  return (
                    <li key={key} className="flex items-start gap-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-primary)] p-3">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={checked}
                        onChange={() => onToggleResource(key)}
                        aria-label={`Mark ${resource.name} as reviewed`}
                      />
                      <div className="min-w-0 flex-1">
                        {resource.url ? (
                          <a
                            href={resource.url}
                            target={resource.url.startsWith('#/') ? undefined : '_blank'}
                            rel={resource.url.startsWith('#/') ? undefined : 'noreferrer'}
                            className={`block text-sm ${resource.isPrimary ? 'font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} hover:underline`}
                          >
                            {resource.name}
                          </a>
                        ) : (
                          <p className="text-sm text-[var(--text-secondary)]">{resource.name}</p>
                        )}
                      </div>
                      <Badge tone={resource.isPrimary ? 'success' : 'default'}>
                        {resource.isPrimary ? 'Primary' : 'Supplementary'}
                      </Badge>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
