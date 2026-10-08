import { TRUST_STATS } from "../../lib/data";

export function TrustBar() {
  return (
    <section className="border-y border-ink/10 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
        {TRUST_STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p className="font-display text-2xl font-bold text-indigo sm:text-3xl">
              {value}
            </p>
            <p className="mt-1 text-xs text-ink/60 sm:text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}