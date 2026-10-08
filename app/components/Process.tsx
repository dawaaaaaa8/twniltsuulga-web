import { STEPS } from "../lib/data";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function Process() {
  return (
    <Section id="process" variant="white">
      <Reveal>
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo">
            Ажлын явц
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Хэрхэн ажилладаг вэ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/75">
            Тодорхой, ил тод 5 үе шат. Та хаана ч байсан хянах боломжтой.
          </p>
        </div>
      </Reveal>

      <ol className="relative mt-14 grid gap-8 md:grid-cols-5">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 100}>
            <li className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet font-display text-lg font-bold text-white shadow-lg shadow-violet/30">
                  {i + 1}
                </span>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <h3 className="mt-4 font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{s.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}