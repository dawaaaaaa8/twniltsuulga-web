"use client";

import { useMemo, useState } from "react";
import {
  PORTFOLIO,
  PORTFOLIO_CATEGORIES,
  TECH_ICONS,
  type PortfolioCategory,
} from "../lib/data";
import { Reveal } from "./ui/Reveal";

export function Portfolio() {
  const [filter, setFilter] = useState<PortfolioCategory>("all");

  const shown = useMemo(() => {
    if (filter === "all") return PORTFOLIO;
    return PORTFOLIO.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="portfolio" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* ============ Header ============ */}
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-indigo">
              Ажлууд
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Хийсэн төслүүд
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink/75">
              Бидний хэрэгжүүлсэн зарим төслүүд. Таны төсөл дараагийнх байж
              болно.
            </p>
          </div>
        </Reveal>

        {/* ============ Filter ============ */}
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {PORTFOLIO_CATEGORIES.map((c) => {
              const active = filter === c.key;
              const count =
                c.key === "all"
                  ? PORTFOLIO.length
                  : PORTFOLIO.filter((p) => p.category === c.key).length;

              return (
                <button
                  key={c.key}
                  onClick={() => setFilter(c.key)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all sm:text-sm ${
                    active
                      ? "bg-indigo text-white shadow-lg shadow-indigo/30"
                      : "bg-ink/5 text-ink/70 hover:bg-ink/10"
                  }`}
                >
                  {c.label}
                  <span
                    className={`ml-1.5 text-xs ${
                      active ? "opacity-80" : "opacity-60"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ============ Grid — 4 багана ============ */}
        <div
          key={filter}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {shown.map((project, i) => (
            <Reveal key={project.id} delay={i * 50}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* ============ CTA ============ */}
        <Reveal>
          <div className="mt-16 rounded-3xl bg-gradient-to-br from-indigo to-violet p-8 text-center text-white sm:p-10">
            <h3 className="font-display text-xl font-bold sm:text-2xl lg:text-3xl">
              Таны төсөл дараагийнх байж болно
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/85 sm:text-base">
              Санаагаа бидэнтэй хуваалцаарай. Үнэгүй зөвлөгөө, тодорхой үнэ,
              тогтсон хугацаа.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-block rounded-full bg-cyan px-7 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-105 sm:text-base"
            >
              Төслөө ярилцах →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============================================
// Project Card
// ============================================
type Project = (typeof PORTFOLIO)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo/30 hover:shadow-xl hover:shadow-indigo/10">
      {/* ============ Preview ============ */}
      <div
        className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${project.color}`}
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Icon (том) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl transition-transform duration-500 group-hover:scale-110">
            {project.icon}
          </span>
        </div>

        {/* Category badge */}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-ink backdrop-blur">
          {project.categoryLabel}
        </span>

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute right-3 top-3 rounded-full bg-cyan px-2.5 py-0.5 text-[10px] font-bold text-ink">
            ⭐
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-transform hover:scale-105"
              aria-label="GitHub repo"
            >
              ⌘ GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener"
              className="rounded-full bg-cyan px-3 py-1.5 text-xs font-semibold text-ink transition-transform hover:scale-105"
              aria-label="Live demo"
            >
              ↗ Demo
            </a>
          )}
        </div>
      </div>

      {/* ============ Content ============ */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-sm font-bold leading-snug text-ink">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-ink/70">
          {project.desc}
        </p>

        {/* Features — 2-ыг л харуулах */}
        {project.features.length > 0 && (
          <ul className="mt-3 space-y-1">
            {project.features.slice(0, 2).map((f) => (
              <li
                key={f}
                className="flex items-start gap-1.5 text-[11px] text-ink/70"
              >
                <span className="text-cyan">✓</span>
                <span className="line-clamp-1">{f}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Stack — 3-ыг л харуулах */}
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-ink/5 pt-3">
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-medium text-ink/70"
            >
              {TECH_ICONS[tech] && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={TECH_ICONS[tech]}
                  alt=""
                  width={12}
                  height={12}
                  loading="lazy"
                  className="h-3 w-3"
                />
              )}
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-medium text-ink/50">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}