import { TESTIMONIALS } from "../../lib/data";
import { Reveal } from "./ui/Reveal";

export function Testimonials() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-indigo">
              Сэтгэгдэл
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Харилцагчид юу гэж хэлдэг
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-ink/10 bg-paper p-6">
                <div className="flex gap-0.5 text-cyan" aria-label={`${t.rating} од`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-ink/80">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-4 border-t border-ink/10 pt-4">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-ink/60">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}