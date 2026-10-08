import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";
import { getAdmin } from "../lib/auth";
import { StatCard } from "../components/admin/StatCard";
import { StatusBadge } from "../components/admin/StatusBadge";
import { EmptyState } from "../components/admin/EmptyState";

const STATUSES = [
  { key: "NEW", label: "Шинэ", icon: "🆕" },
  { key: "REVIEWING", label: "Хянаж байна", icon: "🔍" },
  { key: "CONTACTED", label: "Холбогдсон", icon: "📞" },
  { key: "PROPOSAL_SENT", label: "Санал илгээсэн", icon: "📄" },
  { key: "CONTRACTED", label: "Гэрээ байгуулсан", icon: "✍️" },
  { key: "REJECTED", label: "Татгалзсан", icon: "❌" },
] as const;

export default async function AdminDashboard() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const [recent, counts, total] = await Promise.all([
    prisma.projectRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    prisma.projectRequest.groupBy({
      by: ["status"],
      _count: true,
    }),
    prisma.projectRequest.count(),
  ]);

  const stats = STATUSES.map((s) => ({
    ...s,
    count: counts.find((c) => c.status === s.key)?._count ?? 0,
  }));

  // Энэ долоо хоногийн тоо
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const thisWeek = await prisma.projectRequest.count({
    where: { createdAt: { gte: weekAgo } },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* ============ Welcome ============ */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Сайн байна уу, {admin.name.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Өнөөдрийн байдлаар <strong>{total}</strong> хүсэлт байна.
        </p>
      </div>

      {/* ============ Stats ============ */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Нийт хүсэлт" value={total} icon="📊" accent />
        <StatCard
          label="Энэ долоо хоног"
          value={thisWeek}
          icon="📅"
          trend={{ value: 12, label: "өмнөх долоо хоногоос" }}
        />
        <StatCard
          label="Шинэ"
          value={stats.find((s) => s.key === "NEW")?.count ?? 0}
          icon="🆕"
        />
        <StatCard
          label="Гэрээ байгуулсан"
          value={stats.find((s) => s.key === "CONTRACTED")?.count ?? 0}
          icon="✍️"
        />
      </div>

      {/* ============ Status breakdown ============ */}
      <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <h2 className="font-display text-lg font-bold text-ink">
          Статусаар хуваарилалт
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <Link
              key={s.key}
              href={`/admin/requests?status=${s.key}`}
              className="group rounded-xl border border-ink/10 p-3 transition-all hover:-translate-y-0.5 hover:border-indigo/30 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{s.icon}</span>
                <span className="font-display text-xl font-bold text-ink">
                  {s.count}
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-ink/60 group-hover:text-indigo">
                {s.label}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* ============ Recent ============ */}
      <div className="mt-6 rounded-2xl border border-ink/10 bg-white">
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4 sm:px-6">
          <h2 className="font-display text-lg font-bold text-ink">
            Сүүлийн хүсэлтүүд
          </h2>
          <Link
            href="/admin/requests"
            className="text-sm font-semibold text-indigo hover:underline"
          >
            Бүгдийг харах →
          </Link>
        </div>

        {recent.length === 0 ? (
          <EmptyState
            icon="📭"
            title="Одоогоор хүсэлт байхгүй"
            desc="Хэрэглэгчид форм бөглөхөд энд харагдана."
          />
        ) : (
          <ul className="divide-y divide-ink/5">
            {recent.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/admin/requests/${r.id}`}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-ink/[0.02] sm:px-6"
                >
                  {/* Avatar */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo/10 to-violet/10 font-bold text-indigo">
                    {r.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate font-semibold text-ink">
                        {r.name}
                      </p>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="mt-0.5 truncate text-xs text-ink/60">
                      {r.projectType} · {r.budget} · {r.timeline}
                    </p>
                  </div>

                  {/* Time */}
                  <div className="hidden shrink-0 text-right sm:block">
                    <p className="text-xs text-ink/50">
                      {new Date(r.createdAt).toLocaleDateString("mn-MN")}
                    </p>
                    <p className="text-[10px] text-ink/40">
                      {new Date(r.createdAt).toLocaleTimeString("mn-MN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <span className="text-ink/30">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}