import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "white";
};

const VARIANTS = {
  light: "bg-white text-ink",
  dark: "grid-bg text-white",
  white: "bg-white text-ink",
} as const;

export function Section({
  id,
  children,
  className = "",
  variant = "light",
}: Props) {
  return (
    <section id={id} className={`${VARIANTS[variant]} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-24">{children}</div>
    </section>
  );
}