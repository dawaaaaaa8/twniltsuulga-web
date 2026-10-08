import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "../../../../lib/prisma";
import { getAdmin } from "../../../../lib/auth";
import { StatusBadge, STATUS_LIST, getStatusLabel } from "../../../components/admin/StatusBadge";

async function updateStatus(formData: FormData) {
  "use server";
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !status) return;

  await prisma.projectRequest.update({ where: { id }, data: { status } });
  await prisma.activityLog.create({
    data: {
      adminId: admin.id,
      action: "STATUS_CHANGED",
      targetId: id,
      details: status,
    },
  });
  redirect(`/admin/requests/${id}`);
}

async function saveNotes(formData: FormData) {
  "use server";
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const id = String(formData.get("id") ?? "");
  const notes = String(formData.get("internalNotes") ?? "");
  if (!id) return;

  await prisma.projectRequest.update({
    where: { id },
    data: { internalNotes: notes },
  });
  await prisma.activityLog.create({
    data: { adminId: admin.id, action: "NOTE_ADDED", targetId: id },
  });
  redirect(`/admin/requests/${id}`);
}

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const { id } = await params;

  const request = await prisma.projectRequest.findUnique({ where: { id } });
  if (!request) notFound();

  const platforms = JSON.parse(request.platforms) as string[];
  const features = JSON.parse(request.features) as string[];

  const timeline = await prisma.activityLog.findMany({
    where: { targetId: id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Back */}
      <Link
        href="/admin/requests"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 hover:text-ink"
      >
        ← Бүх хүсэлтүүд
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-violet font-display text-xl font-bold text-white">
              {request.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {request.name}
                </h1>
                <StatusBadge status={request.status} />
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/60">
                <code className="rounded bg-ink/5 px-2 py-0.5 font-mono">
                  {request.projectId}
                </code>
                <span>
                  {new Date(request.createdAt).toLocaleString("mn-MN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={`tel:${request.phone}`}
              className="rounded-full bg-cyan px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105"
            >
              📞 Залгах
            </a>
            <a
              href={`mailto:${request.email}`}
              className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:bg-ink/5"
            >
              ✉️ Имэйл
            </a>
          </div>
        </div>
      </div>

      {/* 2-баганат layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* === LEFT (2 багана) === */}
        <div className="space-y-6 lg:col-span-2">
          {/* Contact */}
          <Card title="👤 Холбоо барих">
            <Grid>
              <Field label="Нэр" value={request.name} />
              <Field label="Имэйл" value={request.email} link={`mailto:${request.email}`} />
              <Field label="Утас" value={request.phone} link={`tel:${request.phone}`} />
              <Field label="Байгууллага" value={request.company} />
            </Grid>
            <Field label="Хаанаас мэдсэн" value={request.howFound} />
          </Card>

          {/* Project */}
          <Card title="🎯 Төслийн тухай">
            <Grid>
              <Field label="Төрөл" value={request.projectType} />
              <Field label="Дизайн" value={request.hasDesign} />
              <Field label="Одоо систем" value={request.hasExisting} />
              <Field label="Систем URL" value={request.existingUrl} link={request.existingUrl ?? undefined} />
            </Grid>
            <Field label="Платформ" tags={platforms} />
            <Field label="Функцүүд" tags={features} />
            <Field label="Тайлбар" value={request.description} multiline />
          </Card>

          {/* Budget */}
          <Card title="💰 Төсөв, хугацаа">
            <Grid>
              <Field label="Төсөв" value={request.budget} />
              <Field label="Хугацаа" value={request.timeline} />
              <Field label="Дэмжлэг" value={request.maintenance} />
              <Field label="Эхлэх огноо" value={request.startDate} />
            </Grid>
            <Field label="Нэмэлт" value={request.notes} multiline />
          </Card>
        </div>

        {/* === RIGHT (1 багана) === */}
        <div className="space-y-6">
          {/* Status change */}
          <Card title="🔄 Статус">
            <form action={updateStatus} className="space-y-2">
              <input type="hidden" name="id" value={request.id} />
              {STATUS_LIST.map((s) => (
                <button
                  key={s}
                  type="submit"
                  name="status"
                  value={s}
                  className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all ${
                    request.status === s
                      ? "border-indigo bg-indigo/5 text-indigo"
                      : "border-ink/10 hover:border-indigo/30 hover:bg-ink/[0.02]"
                  }`}
                >
                  <span>{getStatusLabel(s)}</span>
                  {request.status === s && <span>✓</span>}
                </button>
              ))}
            </form>
          </Card>

          {/* Internal notes */}
          <Card title="📝 Дотоод тэмдэглэл">
            <form action={saveNotes} className="space-y-3">
              <input type="hidden" name="id" value={request.id} />
              <textarea
                name="internalNotes"
                defaultValue={request.internalNotes ?? ""}
                rows={5}
                placeholder="Зөвхөн админ харна..."
                className="w-full rounded-xl border border-ink/10 bg-paper px-3 py-2.5 text-sm focus:border-indigo focus:outline-none focus:ring-2 focus:ring-indigo/20"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-indigo py-2.5 text-sm font-semibold text-white hover:bg-indigo/90"
              >
                Хадгалах
              </button>
            </form>
          </Card>

          {/* Activity */}
          {timeline.length > 0 && (
            <Card title="📜 Түүх">
              <ul className="space-y-3">
                {timeline.map((log) => (
                  <li key={log.id} className="flex gap-3 text-sm">
                    <span className="mt-0.5 text-ink/40">
                      {log.action === "STATUS_CHANGED" ? "🔄" : "📝"}
                    </span>
                    <div className="flex-1">
                      <p className="text-ink">
                        {log.action === "STATUS_CHANGED"
                          ? `Статус: ${getStatusLabel(log.details ?? "")}`
                          : "Тэмдэглэл нэмсэн"}
                      </p>
                      <p className="text-xs text-ink/50">
                        {new Date(log.createdAt).toLocaleString("mn-MN")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}

// ============================================
// Components
// ============================================
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
      <h2 className="font-display text-base font-bold text-ink">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

function Field({
  label,
  value,
  link,
  tags,
  multiline,
}: {
  label: string;
  value?: string | null;
  link?: string;
  tags?: string[];
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-ink/40">
        {label}
      </p>
      <div className="mt-1">
        {tags ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-indigo/10 px-2.5 py-1 text-xs font-medium text-indigo"
              >
                {t}
              </span>
            ))}
          </div>
        ) : link && value ? (
          <a
            href={link}
            target={link.startsWith("http") ? "_blank" : undefined}
            rel={link.startsWith("http") ? "noopener" : undefined}
            className="text-sm font-semibold text-indigo hover:underline"
          >
            {value}
          </a>
        ) : (
          <p
            className={`text-sm font-medium text-ink ${
              multiline ? "whitespace-pre-wrap" : ""
            }`}
          >
            {value ?? "—"}
          </p>
        )}
      </div>
    </div>
  );
}