const STATUS_STYLES = {
  NEW: "bg-blue-50 text-blue-700 ring-blue-200",
  REVIEWING: "bg-yellow-50 text-yellow-700 ring-yellow-200",
  CONTACTED: "bg-purple-50 text-purple-700 ring-purple-200",
  PROPOSAL_SENT: "bg-cyan/10 text-indigo ring-cyan/30",
  CONTRACTED: "bg-green-50 text-green-700 ring-green-200",
  REJECTED: "bg-red-50 text-red-700 ring-red-200",
} as const;

const STATUS_LABELS: Record<string, string> = {
  NEW: "Шинэ",
  REVIEWING: "Хянаж байна",
  CONTACTED: "Холбогдсон",
  PROPOSAL_SENT: "Санал илгээсэн",
  CONTRACTED: "Гэрээ байгуулсан",
  REJECTED: "Татгалзсан",
};

export const STATUS_LIST = Object.keys(STATUS_STYLES);

export function StatusBadge({ status }: { status: string }) {
  const styles = STATUS_STYLES[status as keyof typeof STATUS_STYLES] ?? "bg-gray-100 text-gray-700 ring-gray-200";
  const label = STATUS_LABELS[status] ?? status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export function getStatusLabel(status: string) {
  return STATUS_LABELS[status] ?? status;
}