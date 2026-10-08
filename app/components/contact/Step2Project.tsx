"use client";

import { useState, type FormEvent } from "react";
import { FEATURES, PLATFORMS, PROJECT_TYPES } from "../../../lib/discovery";
import { Field } from "./Step1Contact";
import type { FormData } from "./ProjectWizard";

type Props = {
  initial: FormData;
  onNext: (data: FormData) => void;
  onBack: () => void;
};

export function Step2Project({ initial, onNext, onBack }: Props) {
  const [projectType, setProjectType] = useState(initial.projectType ?? "");
  const [platforms, setPlatforms] = useState<string[]>(
    initial.platforms ?? []
  );
  const [features, setFeatures] = useState<string[]>(initial.features ?? []);
  const [description, setDescription] = useState(initial.description ?? "");
  const [hasDesign, setHasDesign] = useState<"yes" | "no" | "partial" | "">(
    initial.hasDesign ?? ""
  );
  const [hasExistingSystem, setHasExistingSystem] = useState<
    "yes" | "no" | ""
  >(initial.hasExistingSystem ?? "");
  const [existingSystemUrl, setExistingSystemUrl] = useState(
    initial.existingSystemUrl ?? ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggle<T>(list: T[], value: T): T[] {
    return list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!projectType) errs.projectType = "Төслийн төрөл сонгоно уу";
    if (platforms.length === 0)
      errs.platforms = "Дор хаяж нэг платформ сонгоно уу";
    if (description.trim().length < 20)
      errs.description = "Дор хаяж 20 тэмдэгт бичнэ үү";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onNext({
      projectType,
      platforms,
      features,
      description,
      hasDesign: hasDesign || undefined,
      hasExistingSystem: hasExistingSystem || undefined,
      existingSystemUrl: existingSystemUrl || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <h3 className="font-display text-xl font-bold">🎯 Төслийн тухай</h3>
        <p className="text-sm text-ink/60">
          Юу хийлгэхийг хүсэж байгаагаа тодорхой хэлээрэй. Энэ нь бидэнд
          үнэ, хугацааг зөв тооцоолоход тусална.
        </p>
      </div>

      {/* Төслийн төрөл */}
      <div>
        <label className="block text-sm font-semibold">
          Төслийн төрөл <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PROJECT_TYPES.map((t) => {
            const active = projectType === t.label;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setProjectType(t.label)}
                className={`rounded-xl border-2 p-3 text-left transition-all ${
                  active
                    ? "border-indigo bg-indigo/5 ring-2 ring-indigo/20"
                    : "border-ink/10 hover:border-indigo/40"
                }`}
              >
                <div className="text-xl">{t.icon}</div>
                <div className="mt-1 text-sm font-bold">{t.label}</div>
                <div className="text-xs text-ink/60">{t.desc}</div>
              </button>
            );
          })}
        </div>
        {errors.projectType && (
          <p className="mt-1 text-xs font-medium text-red-600">
            {errors.projectType}
          </p>
        )}
      </div>

      {/* Платформ */}
      <div>
        <label className="block text-sm font-semibold">
          Платформ <span className="text-red-500">*</span>
          <span className="ml-2 text-xs font-normal text-ink/50">
            (олныг сонгож болно)
          </span>
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {PLATFORMS.map((p) => {
            const active = platforms.includes(p.label);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlatforms(toggle(platforms, p.label))}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? "bg-indigo text-white"
                    : "bg-ink/5 text-ink/70 hover:bg-ink/10"
                }`}
              >
                {active && "✓ "}
                {p.label}
              </button>
            );
          })}
        </div>
        {errors.platforms && (
          <p className="mt-1 text-xs font-medium text-red-600">
            {errors.platforms}
          </p>
        )}
      </div>

      {/* Функцүүд */}
      <div>
        <label className="block text-sm font-semibold">
          Ямар функцүүд хэрэгтэй вэ?
          <span className="ml-2 text-xs font-normal text-ink/50">
            (олныг сонгож болно)
          </span>
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {FEATURES.map((f) => {
            const active = features.includes(f.label);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFeatures(toggle(features, f.label))}
                className={`rounded-full border px-3 py-1.5 text-sm transition-all ${
                  active
                    ? "border-cyan bg-cyan/10 font-semibold text-indigo"
                    : "border-ink/15 text-ink/70 hover:border-cyan/50"
                }`}
              >
                {active && "✓ "}
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Тайлбар */}
      <div>
        <label className="block text-sm font-semibold">
          Төслийн тухай дэлгэрэнгүй <span className="text-red-500">*</span>
          <span className="ml-2 text-xs font-normal text-ink/50">
            ({description.length}/1000)
          </span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
          rows={5}
          placeholder="Жишээ: Манай компани гоо сайхны бүтээгдэхүүн зардаг. Онлайн дэлгүүр нээхийг хүсэж байна. Хэрэглэгч бүртгүүлж, сагсанд хийж, QPay-ээр төлбөр төлөх..."
          className={`mt-1 w-full rounded-lg border px-3 py-2 font-normal focus:outline-none focus:ring-2 ${
            errors.description
              ? "border-red-400 focus:ring-red-300"
              : "border-ink/20 focus:border-indigo focus:ring-indigo/30"
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-xs font-medium text-red-600">
            {errors.description}
          </p>
        )}
      </div>

      {/* Дизайн / Одоо систем */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold">Дизайн байгаа юу?</label>
          <div className="mt-2 flex gap-2">
            {(
              [
                { v: "yes", l: "Тийм" },
                { v: "partial", l: "Хэсэгчлэн" },
                { v: "no", l: "Үгүй" },
              ] as const
            ).map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => setHasDesign(o.v)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  hasDesign === o.v
                    ? "border-indigo bg-indigo/5 text-indigo"
                    : "border-ink/15 text-ink/70"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold">
            Одоо систем байгаа юу?
          </label>
          <div className="mt-2 flex gap-2">
            {(
              [
                { v: "yes", l: "Тийм" },
                { v: "no", l: "Үгүй" },
              ] as const
            ).map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => setHasExistingSystem(o.v)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  hasExistingSystem === o.v
                    ? "border-indigo bg-indigo/5 text-indigo"
                    : "border-ink/15 text-ink/70"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {hasExistingSystem === "yes" && (
        <Field
          label="Одоо системийн URL (сонголтоор)"
          value={existingSystemUrl}
          onChange={setExistingSystemUrl}
          placeholder="https://..."
        />
      )}

      <div className="flex justify-between gap-2 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-ink/20 px-6 py-3 font-semibold text-ink/70 transition-colors hover:bg-ink/5"
        >
          ← Буцах
        </button>
        <button
          type="submit"
          className="rounded-full bg-indigo px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          Үргэлжлүүлэх →
        </button>
      </div>
    </form>
  );
}