"use client";

import { WIZARD_STEPS } from "../../../lib/discovery";

type Props = {
  current: number;
  total?: number;
};

export function StepProgress({ current, total = WIZARD_STEPS.length }: Props) {
  return (
    <ol className="mb-8 flex items-center justify-between gap-2">
      {WIZARD_STEPS.map((step, i) => {
        const num = i + 1;
        const done = num < current;
        const active = num === current;

        return (
          <li key={step.id} className="flex flex-1 items-center gap-2">
            <div className="flex flex-1 flex-col items-start">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    done
                      ? "bg-cyan text-ink"
                      : active
                        ? "bg-indigo text-white ring-4 ring-indigo/20"
                        : "bg-ink/10 text-ink/50"
                  }`}
                >
                  {done ? "✓" : num}
                </span>
                <div className="hidden sm:block">
                  <p
                    className={`text-sm font-semibold ${
                      active ? "text-indigo" : "text-ink/60"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-ink/50">{step.desc}</p>
                </div>
              </div>
            </div>
            {num < total && (
              <div
                className={`h-0.5 flex-1 transition-colors ${
                  done ? "bg-cyan" : "bg-ink/10"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}