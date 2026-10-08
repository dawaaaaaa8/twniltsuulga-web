import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import { setSession, verifyPassword, getAdmin } from "../../lib/auth";

async function login(formData: FormData) {
  "use server";

  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) redirect("/admin/login?error=1");

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.password)) {
    redirect("/admin/login?error=1");
  }

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  await setSession(user.id, user.email);
  redirect("/admin");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const admin = await getAdmin();
  if (admin) redirect("/admin");

  const { error } = await searchParams;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo/30 via-ink to-violet/30" />
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet/30 blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan to-violet font-display text-2xl font-bold text-white shadow-xl shadow-cyan/20">
            B
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-white">
            BBD Admin
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Захиалгын удирдлагын систем
          </p>
        </div>

        <form
          action={login}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
              Имэйл
            </span>
            <input
              name="email"
              type="email"
              required
              autoFocus
              autoComplete="email"
              defaultValue="admin@bbd.mn"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30"
              placeholder="admin@bbd.mn"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
              Нууц үг
            </span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30"
              placeholder="••••••••"
            />
          </label>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
            >
              ❌ Имэйл эсвэл нууц үг буруу
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-cyan to-violet py-3 font-semibold text-ink transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Нэвтрэх →
          </button>

          <p className="text-center text-xs text-white/40">
            Анхдагч: <code className="text-cyan">admin@bbd.mn</code> /{" "}
            <code className="text-cyan">Admin123!</code>
          </p>
        </form>
      </div>
    </div>
  );
}