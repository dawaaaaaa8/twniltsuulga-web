import { SERVICES } from "../lib/data";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function Services() {
  return (
    <Section id="services" variant="white">
      <Reveal>
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo">
            Үйлчилгээ
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Бид юу хийдэг вэ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/75">
            Таны бизнесийн хэрэгцээнд тохирсон бүрэн дижитал шийдлүүд.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 60}>
            <div className="group h-full rounded-2xl border border-ink/10 bg-white p-6 transition-all hover:-translate-y-1 hover:border-cyan hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo/10 text-2xl">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{s.text}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium text-ink/70"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}