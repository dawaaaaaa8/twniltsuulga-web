"use client";

import { useState, useTransition } from "react";
import {
  submitProject,
  type ProjectSubmission,
} from "@/app/actions/submit-project";
import { StepProgress } from "./StepProgress";
import { Step1Contact } from "./Step1Contact";
import { Step2Project } from "./Step2Project";
import { Step3Budget } from "./Step3Budget";

export type FormData = Partial<ProjectSubmission>;

export function ProjectWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({});
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    projectId?: string;
    error?: string;
  } | null>(null);
  const [pending, startTransition] = useTransition();

  function update(partial: FormData) {
    setData((d) => ({ ...d, ...partial }));
  }

  function next(partial: FormData) {
    update(partial);
    setStep((s) => Math.min(s + 1, 3));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  function submit(partial: FormData) {
    const finalData = { ...data, ...partial };
    update(partial);

    startTransition(async () => {
      const res = await submitProject(finalData as ProjectSubmission);
      setResult(res);
      if (res.success) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  // ============================================
  // Амжилттай дууссан
  // ============================================
  if (result?.success) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-ink shadow-2xl shadow-ink/30">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan text-3xl">
          ✓
        </div>
        <h3 className="mt-4 font-display text-2xl font-bold">
          Хүсэлт хүлээн авагдлаа!
        </h3>
        <p className="mt-2 text-ink/70">{result.message}</p>

        {result.projectId && (
          <div className="mt-6 rounded-xl bg-indigo/5 p-4">
            <p className="text-xs uppercase tracking-wider text-ink/60">
              Таны хүсэлтийн дугаар
            </p>
            <p className="mt-1 font-display text-xl font-bold text-indigo">
              {result.projectId}
            </p>
            <p className="mt-1 text-xs text-ink/60">
              Энэ дугаарыг хадгалж, холбогдох үед ашиглана уу.
            </p>
          </div>
        )}

        <button
          onClick={() => {
            setResult(null);
            setData({});
            setStep(1);
          }}
          className="mt-6 text-sm font-semibold text-indigo hover:underline"
        >
          Шинэ хүсэлт илгээх →
        </button>
      </div>
    );
  }

  // ============================================
  // Wizard
  // ============================================
  return (
    <div className="rounded-2xl bg-white p-6 text-ink shadow-2xl shadow-ink/30 sm:p-8">
      <StepProgress current={step} />

      {step === 1 && (
        <Step1Contact
          initial={data}
          onNext={next}
        />
      )}

      {step === 2 && (
        <Step2Project
          initial={data}
          onNext={next}
          onBack={back}
        />
      )}

      {step === 3 && (
        <Step3Budget
          initial={data}
          onSubmit={submit}
          onBack={back}
          pending={pending}
        />
      )}

      {result?.error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-700"
        >
          {result.error}
        </p>
      )}
    </div>
  );
}