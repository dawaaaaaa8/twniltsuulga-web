"use client";

import { useState, type FormEvent } from "react";
import {
  BUDGET_RANGES,
  MAINTENANCE_OPTIONS,
  TIMELINES,
} from "../../lib/discovery";
import type { FormData } from "./ProjectWizard";

type Props = {
  initial: FormData;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
  pending: boolean;
};

export function Step3Budget({ initial, onSubmit, onBack, pending }: Props) {
  const [budget, setBudget] = useState(initial.budget ?? "");
  const [timeline, setTimeline] = useState(initial.timeline ?? "");
  const [maintenance, setMaintenance] = useState(initial.maintenance ?? "");
  const [startDate, setStartDate] = useState(initial.startDate ?? "");
  const [additionalNotes, setAdditionalNotes] = useState(
    initial.additionalNotes ?? ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!budget) errs.budget = "Төсөв сонгоно уу";
    if (!timeline) errs.timeline = "Хугацаа сонгоно уу";
    if (!maintenance) errs.maintenance = "Дэмжлэг сонгоно уу";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onSubmit({ budget, timeline, maintenance, startDate, additionalNotes });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <h3 className="font-display text-xl font-bold">💰 Төсөв, хугацаа</h3>
        <p className="text-sm text-ink/60">
          Эцсийн шат! Эдгээр нь бидэнд тохирох шийдэл санал болгоход тусална.
        </p>
      </div>

      {/* Төсөв */}
      <div>
        <label className="block text-sm font-semibold">
          Төсөв <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {BUDGET_RANGES.map((b) => {
            const active = budget === b.label;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBudget(b.label)}
                className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                  active
                    ? "border-cyan bg-cyan/5 text-indigo"
                    : "border-ink/10 hover:border-cyan/40"
                }`}
              >
                {active && "✓ "}
                {b.label}
              </button>
            );
          })}
        </div>
        {errors.budget && (
          <p className="mt-1 text-xs font-medium text-red-600">{errors.budget}</p>
        )}
      </div>

      {/* Хугацаа */}
      <div>
        <label className="block text-sm font-semibold">
          Хугацаа <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {TIMELINES.map((t) => {
            const active = timeline === t.label;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTimeline(t.label)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? "bg-indigo text-white"
                    : "bg-ink/5 text-ink/70 hover:bg-ink/10"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        {errors.timeline && (
          <p className="mt-1 text-xs font-medium text-red-600">
            {errors.timeline}
          </p>
        )}
      </div>

      {/* Эхлэх огноо */}
      <div>
        <label className="block text-sm font-semibold">
          Хэзээ эхлэхийг хүсэж байна вэ? (сонголтоор)
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 font-normal focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/30"
        />
      </div>

      {/* Дэмжлэг */}
      <div>
        <label className="block text-sm font-semibold">
          Хүлээлгэн өгсний дараа дэмжлэг <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {MAINTENANCE_OPTIONS.map((m) => {
            const active = maintenance === m.label;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMaintenance(m.label)}
                className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${
                  active
                    ? "border-indigo bg-indigo/5 text-indigo"
                    : "border-ink/10 hover:border-indigo/40"
                }`}
              >
                {active && "✓ "}
                {m.label}
              </button>
            );
          })}
        </div>
        {errors.maintenance && (
          <p className="mt-1 text-xs font-medium text-red-600">
            {errors.maintenance}
          </p>
        )}
      </div>

      {/* Нэмэлт тэмдэглэл */}
      <div>
        <label className="block text-sm font-semibold">
          Нэмэлт тэмдэглэл (сонголтоор)
        </label>
        <textarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value.slice(0, 500))}
          rows={3}
          placeholder="Бидэнд мэдэх ёстой өөр зүйл байвал энд бичнэ үү..."
          className="mt-1 w-full rounded-lg border border-ink/20 px-3 py-2 font-normal focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/30"
        />
      </div>

      <div className="flex justify-between gap-2 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={pending}
          className="rounded-full border border-ink/20 px-6 py-3 font-semibold text-ink/70 transition-colors hover:bg-ink/5 disabled:opacity-50"
        >
          ← Буцах
        </button>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-cyan px-8 py-3 font-semibold text-ink transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
              Илгээж байна...
            </span>
          ) : (
            "Хүсэлт илгээх ✓"
          )}
        </button>
      </div>
    </form>
  );
}