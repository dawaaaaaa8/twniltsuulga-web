"use client";

import Image from "next/image";
import { CONTACT, PIXELS } from "../../lib/data";

export function Hero() {
  return (
    <div className="grid-bg text-white">
      <div
        id="top"
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-16 md:grid-cols-2 md:pt-24"
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
            Шинэ төсөл хүлээн авч байна
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Таны санааг
            <br />
            <span className="bg-gradient-to-r from-cyan to-white bg-clip-text text-transparent">
              бодит бүтээгдэхүүн
            </span>
            <br />
            болгоно
          </h1>

          <p className="mt-6 max-w-md text-lg text-white/85">
            Вэб сайт, мобайл апп, захиалгат систем. Улаанбаатараас дэлхийд
            хүрэх дижитал шийдэл.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group rounded-full bg-cyan px-6 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              Үнэгүй зөвлөгөө авах
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#pricing"
              className="rounded-full border border-white/50 px-6 py-3 font-semibold transition-colors hover:bg-white/10"
            >
              Үнэ харах
            </a>
          </div>

          <div className="mt-6 flex items-center gap-4 text-sm text-white/70">
            <span>✓ 24 цагт хариу</span>
            <span>✓ Үнэгүй зөвлөгөө</span>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          {PIXELS.map(([t, l, s, dx, dy, d], i) => (
            <span
              key={i}
              aria-hidden
              className="px"
              style={
                {
                  top: `${t}%`,
                  left: `${l}%`,
                  width: s,
                  height: s,
                  "--dx": `${dx}px`,
                  "--dy": `${dy}px`,
                  "--delay": `${d}s`,
                } as React.CSSProperties
              }
            />
          ))}
          <div className="absolute inset-[14%]">
            <Image
              src="/bbd-globe.png"
              alt="BBD лого"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}