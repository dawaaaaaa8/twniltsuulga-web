export function EmptyState({
  icon = "📭",
  title,
  desc,
  action,
}: {
  icon?: string;
  title: string;
  desc?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <span className="text-5xl opacity-60">{icon}</span>
      <h3 className="mt-4 font-display text-lg font-bold text-ink">{title}</h3>
      {desc && <p className="mt-1 max-w-md text-sm text-ink/60">{desc}</p>}
      {action && (
        <a
          href={action.href}
          className="mt-5 rounded-full bg-indigo px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}