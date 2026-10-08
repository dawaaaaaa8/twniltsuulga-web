type StatCardProps = {
  label: string;
  value: number;
  icon?: string;
  accent?: boolean;
  trend?: { value: number; label: string };
};

export function StatCard({
  label,
  value,
  icon,
  accent,
  trend,
}: StatCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 transition-all hover:-translate-y-0.5 ${
        accent
          ? "border-transparent bg-gradient-to-br from-indigo via-violet to-indigo text-white shadow-lg shadow-indigo/30"
          : "border-ink/10 bg-white hover:border-ink/20"
      }`}
    >
      {/* Gradient glow (accent) */}
      {accent && (
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan/30 blur-2xl" />
      )}

      <div className="relative flex items-start justify-between">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${
              accent ? "text-white/80" : "text-ink/50"
            }`}
          >
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold">{value}</p>

          {trend && (
            <p
              className={`mt-1 flex items-center gap-1 text-xs ${
                trend.value >= 0
                  ? accent
                    ? "text-cyan"
                    : "text-green-600"
                  : "text-red-500"
              }`}
            >
              {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%{" "}
              <span className={accent ? "text-white/60" : "text-ink/50"}>
                {trend.label}
              </span>
            </p>
          )}
        </div>

        {icon && (
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${
              accent ? "bg-white/15" : "bg-ink/5"
            }`}
          >
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}