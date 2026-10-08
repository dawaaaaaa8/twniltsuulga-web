import { Sidebar } from "../components/admin/Sidebar";
import { Topbar } from "../components/admin/Topbar";
import { getAdmin } from "../../lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdmin();

  // Login хуудас дээр layout харуулахгүй
  // (Next.js-д үүнийг route group-аар хийх нь дээр, гэхдээ одоохондоо
  //  admin байхгүй бол Topbar-ийг нуух)

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {admin && <Topbar admin={admin} />}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}