"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/admin/logout-action";

const CRUMBS: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/requests": "Захиалгууд",
  "/admin/clients": "Харилцагчид",
  "/admin/analytics": "Статистик",
  "/admin/settings": "Тохиргоо",
};

export function Topbar({ admin }: { admin: { name: string; email: string } }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const crumbs = pathname.split("/").filter(Boolean);
  const current = CRUMBS[pathname] ?? crumbs[crumbs.length - 1] ?? "Admin";

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink/10 lg:hidden"
            aria-label="Меню"
          >
            <span className="text-lg">☰</span>
          </button>

          <div className="hidden sm:block">
            <p className="text-xs text-ink/50">Admin / {current}</p>
            <h1 className="font-display text-lg font-bold text-ink">
              {current}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-ink">{admin.name}</p>
            <p className="text-xs text-ink/50">{admin.email}</p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo to-violet text-sm font-bold text-white">
            {admin.name.charAt(0).toUpperCase()}
          </div>

          {/* ⭐ Server Action — зөв */}
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-ink/10 px-3 py-1.5 text-xs font-medium text-ink/70 transition-colors hover:bg-ink/5"
            >
              Гарах
            </button>
          </form>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-ink/10 p-3 lg:hidden">
          <nav className="space-y-1">
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm hover:bg-ink/5"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/admin/requests"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm hover:bg-ink/5"
            >
              📋 Захиалгууд
            </Link>
            <Link
              href="/"
              className="block rounded-lg px-3 py-2.5 text-sm hover:bg-ink/5"
            >
              🌐 Сайт руу буцах
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}