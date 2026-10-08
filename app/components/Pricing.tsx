import { PRICING } from "../lib/data";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function Pricing() {
  return (
    <Section id="pricing" variant="light">
      <Reveal>
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo">
            Үнэ
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Танд тохирох багц
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/75">
            Ил тод үнэ, далд төлбөр байхгүй. Бүх багцад source code, сургалт
            багтсан.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PRICING.map((p, i) => (
          <Reveal key={p.name} delay={i * 100}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border-2 p-6 transition-all hover:-translate-y-1 ${
                p.popular
                  ? "border-cyan bg-gradient-to-br from-indigo to-violet text-white shadow-2xl shadow-indigo/30"
                  : "border-ink/10 bg-white"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan px-3 py-1 text-xs font-bold text-ink">
                  ⭐ Хамгийн эрэлттэй
                </span>
              )}

              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p
                className={`mt-1 text-sm ${
                  p.popular ? "text-white/80" : "text-ink/60"
                }`}
              >
                {p.desc}
              </p>

              <div className="mt-6">
                <p className="font-display text-3xl font-bold">{p.price}</p>
                <p
                  className={`mt-1 text-xs ${
                    p.popular ? "text-white/70" : "text-ink/50"
                  }`}
                >
                  ⏱ {p.duration}
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span
                      className={
                        p.popular ? "text-cyan" : "text-indigo"
                      }
                    >
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 block rounded-full py-3 text-center font-semibold transition-transform hover:scale-105 ${
                  p.popular
                    ? "bg-cyan text-ink"
                    : "bg-indigo text-white"
                }`}
              >
                Захиалах
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ink/60">
        💡 Том төсөл эсвэл тусгай шаардлагатай бол{" "}
        <a href="#contact" className="font-semibold text-indigo underline">
          холбоо барина уу
        </a>
        .
      </p>
    </Section>
  );
}