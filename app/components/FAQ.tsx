"use client";

import { useState } from "react";
import { FAQ as FAQ_DATA } from "../../lib/data";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" variant="light">
      <Reveal>
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-indigo">
            Асуулт
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Түгээмэл асуултууд
          </h2>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl">
        {FAQ_DATA.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 50}>
              <div className="border-b border-ink/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold transition-colors hover:text-indigo"
                >
                  <span>{item.q}</span>
                  <span
                    className={`shrink-0 text-2xl transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] pb-5 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="min-h-0 text-ink/75">{item.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}