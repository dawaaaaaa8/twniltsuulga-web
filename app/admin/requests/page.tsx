import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { getAdmin } from "../../../lib/auth";
import { StatusBadge, STATUS_LIST } from "../../components/admin/StatusBadge";
import { EmptyState } from "../../components/admin/EmptyState";

type Row = {
  id: string;
  projectId: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  status: string;
  createdAt: Date;
};

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const { status, q } = await searchParams;

  const requests = await prisma.projectRequest.findMany({
    where: {
      ...(status && status !== "ALL" ? { status } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { email: { contains: q } },
              { phone: { contains: q } },
              { projectId: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Захиалгууд
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Нийт <strong>{requests.length}</strong> хүсэлт
          </p>
        </div>

        {/* Search */}
        <form className="flex gap-2">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40">
              🔍
            </span>
            <input
              name="q"
              defaultValue={q}
              placeholder="Хайх: нэр, имэйл, ID..."
              className="w-56 rounded-xl border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/20 sm:w-64"
            />
          </div>
          {status && <input type="hidden" name="status" value={status} />}
        </form>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap gap-2">
        <FilterChip
          href="/admin/requests"
          active={!status || status === "ALL"}
        >
          Бүгд
        </FilterChip>
        {STATUS_LIST.map((s) => (
          <FilterChip
            key={s}
            href={`/admin/requests?status=${s}${q ? `&q=${q}` : ""}`}
            active={status === s}
          >
            {s}
          </FilterChip>
        ))}
      </div>

      {/* Table */}
      {requests.length === 0 ? (
        <div className="rounded-2xl border border-ink/10 bg-white">
          <EmptyState
            icon="🔍"
            title="Хүсэлт олдсонгүй"
            desc="Хайлтын шалгуурыг өөрчлөөд дахин оролдоно уу."
          />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ink/10 bg-ink/[0.02] text-left text-xs font-semibold uppercase tracking-wider text-ink/50">
                  <th className="px-5 py-3">Харилцагч</th>
                  <th className="px-5 py-3">Project ID</th>
                  <th className="px-5 py-3">Төрөл</th>
                  <th className="px-5 py-3">Төсөв</th>
                  <th className="px-5 py-3">Статус</th>
                  <th className="px-5 py-3">Огноо</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {requests.map((r: Row) => (
                  <tr
                    key={r.id}
                    className="group transition-colors hover:bg-indigo/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo/10 to-violet/10 text-sm font-bold text-indigo">
                          {r.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/admin/requests/${r.id}`}
                            className="block truncate font-semibold text-ink hover:text-indigo"
                          >
                            {r.name}
                          </Link>
                          <p className="truncate text-xs text-ink/50">
                            {r.email} · {r.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <code className="rounded bg-ink/5 px-2 py-0.5 font-mono text-xs">
                        {r.projectId}
                      </code>
                    </td>
                    <td className="px-5 py-4 text-sm text-ink/70">
                      {r.projectType}
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-ink">
                      {r.budget}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-5 py-4 text-xs text-ink/60">
                      {new Date(r.createdAt).toLocaleDateString("mn-MN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/requests/${r.id}`}
                        className="inline-flex items-center gap-1 rounded-full bg-indigo/5 px-3 py-1.5 text-xs font-semibold text-indigo opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        Харах →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-indigo text-white shadow-md shadow-indigo/20"
          : "bg-white text-ink/60 ring-1 ring-inset ring-ink/10 hover:bg-ink/5"
      }`}
    >
      {children}
    </Link>
  );
}