"use client";

import { useMemo, useState, useTransition } from "react";
import { TECH, TECH_STATS } from "../lib/data";
import { Reveal } from "./ui/Reveal";

export function TechStack() {
  const [tab, setTab] = useState<string>("Бүгд");
  const [isPending, startTransition] = useTransition();

  const cats = useMemo(() => Object.keys(TECH), []);

  // ✅ Сонгогдсон tab-д тохирох технологиуд
  const shown = useMemo(() => {
    if (tab === "Бүгд") {
      return cats.flatMap((c) =>
        TECH[c].map((t) => ({ name: t[0], icon: t[1], cat: c }))
      );
    }
    return (TECH[tab] ?? []).map((t) => ({
      name: t[0],
      icon: t[1],
      cat: tab,
    }));
  }, [tab, cats]);

  function handleTab(c: string) {
    startTransition(() => setTab(c));
  }

  return (
    <section id="stack" className="grid-bg text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Технологийн стек
          </h2>
          <p className="mt-4 max-w-xl text-white/85">
            Орчин үеийн технологиудыг ашиглан таны бизнесийн хэрэгцээнд тохирсон
            өндөр чанартай системүүдийг хөгжүүлнэ.
          </p>
        </Reveal>

        {/* ============ TABS ============ */}
        <div
          role="tablist"
          aria-label="Технологийн категори"
          className="mt-10 flex flex-wrap gap-2"
        >
          {["Бүгд", ...cats].map((c) => {
            const active = tab === c;
            const count = c === "Бүгд"
              ? Object.values(TECH).reduce((s, arr) => s + arr.length, 0)
              : TECH[c].length;

            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                aria-controls="tech-panel"
                onClick={() => handleTab(c)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  active
                    ? "scale-105 bg-cyan text-ink shadow-lg shadow-cyan/30"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {c}
                <span
                  className={`ml-1.5 ${
                    active ? "opacity-80" : "opacity-60"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* ============ PANEL ============ */}
        <div
          id="tech-panel"
          role="tabpanel"
          aria-live="polite"
          className={`mt-8 transition-opacity duration-200 ${
            isPending ? "opacity-50" : "opacity-100"
          }`}
        >
          {shown.length === 0 ? (
            <p className="text-white/70">Технологи олдсонгүй.</p>
          ) : (
            <ul
              // 🔑 ГОЛ ЗАЛЬ: key нь tab-аас хамаарах ёстой
              // Ингэснээр tab солих бүрт React бүх li-г шинээр mount хийнэ
              key={tab}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {shown.map(({ name, icon, cat }, i) => (
                <li
                  key={`${cat}-${name}`}
                  style={{
                    // stagger animation — tab солих бүрт дахин эхэлнэ
                    animation: `fadeIn 0.35s ease-out ${i * 40}ms both`,
                  }}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 text-ink shadow-lg shadow-ink/20 transition-transform hover:-translate-y-1"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon}
                    alt=""
                    width={36}
                    height={36}
                    loading="lazy"
                    className="h-9 w-9 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-bold leading-tight">{name}</p>
                    <p className="text-xs text-ink/60">{cat}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ============ STATS ============ */}
        <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-white/20 pt-10 md:grid-cols-4">
          {TECH_STATS.map(([v, l]) => (
            <Reveal key={l}>
              <div>
                <dd className="font-display text-2xl font-bold text-cyan sm:text-3xl">
                  {v}
                </dd>
                <dt className="mt-1 text-sm text-white/75">{l}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}