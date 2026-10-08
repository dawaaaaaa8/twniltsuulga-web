"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ⭐ Type тодорхойлно
type NavItem = {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
  soon?: boolean;
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/requests", label: "Захиалгууд", icon: "📋" },
  { href: "/admin/clients", label: "Харилцагчид", icon: "👥", soon: true },
  { href: "/admin/analytics", label: "Статистик", icon: "📈", soon: true },
  { href: "/admin/settings", label: "Тохиргоо", icon: "⚙️", soon: true },
];

export function Sidebar() {
  const pathname = usePathname();

  // Login хуудсанд sidebar харуулахгүй
  if (pathname === "/admin/login") return null;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-ink text-white lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        {/* Logo */}
        <div className="border-b border-white/10 px-6 py-5">
          <Link
            href="/admin"
            className="flex items-center gap-2 font-display text-xl font-bold"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan to-violet text-sm">
              B
            </span>
            BBD Admin
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            if (item.soon) {
              return (
                <div
                  key={item.href}
                  className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/40"
                  title="Удахгүй"
                >
                  <span>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
                    Удахгүй
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <span>🌐</span>
            <span>Сайт руу буцах</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}