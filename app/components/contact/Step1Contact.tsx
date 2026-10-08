"use client";

import { useState, type FormEvent } from "react";
import { HOW_FOUND } from "../../lib/discovery";
import type { FormData } from "./ProjectWizard";

type Props = {
  initial: FormData;
  onNext: (data: FormData) => void;
};

export function Step1Contact({ initial, onNext }: Props) {
  const [name, setName] = useState(initial.name ?? "");
  const [email, setEmail] = useState(initial.email ?? "");
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [company, setCompany] = useState(initial.company ?? "");
  const [howFound, setHowFound] = useState(initial.howFound ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = "Нэр оруулна уу";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Зөв имэйл оруулна уу";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 8)
      errs.phone = "Зөв утасны дугаар оруулна уу";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onNext({ name, email, phone, company, howFound });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <h3 className="font-display text-xl font-bold">👤 Таны тухай</h3>
      <p className="text-sm text-ink/60">
        Бидэнтэй холбогдох мэдээллээ үлдээгээрэй. Бид 24 цагийн дотор
        холбогдоно.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Нэр"
          value={name}
          onChange={setName}
          error={errors.name}
          required
          autoComplete="name"
        />
        <Field
          label="Утасны дугаар"
          value={phone}
          onChange={setPhone}
          error={errors.phone}
          required
          type="tel"
          autoComplete="tel"
          placeholder="+976 XXXX XXXX"
        />
      </div>

      <Field
        label="Имэйл"
        value={email}
        onChange={setEmail}
        error={errors.email}
        required
        type="email"
        autoComplete="email"
      />

      <Field
        label="Байгууллагын нэр (сонголтоор)"
        value={company}
        onChange={setCompany}
        autoComplete="organization"
      />

      <div>
        <label className="block text-sm font-semibold">
          Биднийг хаанаас мэдсэн бэ?
        </label>
        <select
          value={howFound}
          onChange={(e) => setHowFound(e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/20 bg-white px-3 py-2 focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/30"
        >
          <option value="">— Сонгоно уу —</option>
          {HOW_FOUND.map((h) => (
            <option key={h.id} value={h.label}>
              {h.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end pt-2">
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

// ============================================
// Дахин ашиглах боломжтой Field
// ============================================
export function Field({
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`mt-1 w-full rounded-lg border px-3 py-2 font-normal transition-colors focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-300"
            : "border-ink/20 focus:border-indigo focus:ring-indigo/30"
        }`}
      />
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </label>
  );
}