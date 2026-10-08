"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // ⚠️ Анхнаасаа visible=true — JS ажиллахгүй ч контент харагдана
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver дэмжигдэхгүй бол шууд харуулна
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Reduced motion — animation хэрэггүй
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // ✅ Эхлээд нуух, дараа нь observer асаах
    setVisible(false);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);

    // 🛡️ Safety net: 1.5 секундын дараа албадан харуулах
    const fallback = window.setTimeout(() => setVisible(true), 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}