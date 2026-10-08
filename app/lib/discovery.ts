// ============================================
// BBD Standard — Section 3: Project Discovery
// ============================================

export const PROJECT_TYPES = [
  {
    id: "website",
    label: "Вэб сайт",
    desc: "Компанийн танилцуулга, портал",
    icon: "🌐",
  },
  {
    id: "ecommerce",
    label: "Онлайн дэлгүүр",
    desc: "Бүтээгдэхүүн, захиалга, төлбөр",
    icon: "🛒",
  },
  {
    id: "mobile",
    label: "Мобайл апп",
    desc: "iOS / Android аппликейшн",
    icon: "📱",
  },
  {
    id: "system",
    label: "Захиалгат систем",
    desc: "CRM, ERP, удирдлагын систем",
    icon: "⚙️",
  },
  {
    id: "both",
    label: "Вэб + Мобайл",
    desc: "Хоёуланг нэг дор",
    icon: "🚀",
  },
  {
    id: "other",
    label: "Бусад",
    desc: "Тодорхойгүй, зөвлөгөө хэрэгтэй",
    icon: "💡",
  },
] as const;

export const PLATFORMS = [
  { id: "web", label: "Вэб" },
  { id: "ios", label: "iOS" },
  { id: "android", label: "Android" },
  { id: "admin", label: "Admin panel" },
  { id: "api", label: "API / Backend" },
] as const;

export const FEATURES = [
  { id: "auth", label: "Хэрэглэгчийн бүртгэл / Login" },
  { id: "payment", label: "Төлбөрийн интеграц" },
  { id: "admin", label: "Admin удирдлагын хэсэг" },
  { id: "notification", label: "Мэдэгдэл (Email / Push)" },
  { id: "chat", label: "Чат / Мессеж" },
  { id: "report", label: "Тайлан, статистик" },
  { id: "multilang", label: "Олон хэлний дэмжлэг" },
  { id: "search", label: "Хайлт / Filter" },
  { id: "map", label: "Газрын зураг" },
  { id: "upload", label: "Файл / Зураг upload" },
  { id: "export", label: "Excel / PDF export" },
  { id: "integration", label: "Гадны системтэй холбох" },
] as const;

export const BUDGET_RANGES = [
  { id: "under-2", label: "2 сая ₮ хүртэл" },
  { id: "2-5", label: "2 – 5 сая ₮" },
  { id: "5-10", label: "5 – 10 сая ₮" },
  { id: "10-20", label: "10 – 20 сая ₮" },
  { id: "over-20", label: "20 сая ₮+" },
  { id: "unknown", label: "Тодорхойгүй — зөвлөгөө хэрэгтэй" },
] as const;

export const TIMELINES = [
  { id: "urgent", label: "Яаралтай (2 долоо хоног)" },
  { id: "normal", label: "1 сар" },
  { id: "relaxed", label: "2-3 сар" },
  { id: "long", label: "3+ сар" },
  { id: "flexible", label: "Уян хатан" },
] as const;

export const MAINTENANCE_OPTIONS = [
  { id: "none", label: "Одоохондоо хэрэггүй" },
  { id: "basic", label: "1 сарын дэмжлэг" },
  { id: "standard", label: "3 сарын дэмжлэг" },
  { id: "premium", label: "1 жилийн дэмжлэг" },
  { id: "discuss", label: "Ярилцаж шийднэ" },
] as const;

export const HOW_FOUND = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "friend", label: "Найз / Танил" },
  { id: "google", label: "Google хайлт" },
  { id: "referral", label: "Өмнөх харилцагч" },
  { id: "other", label: "Бусад" },
] as const;

// Wizard-ийн алхмууд
export const WIZARD_STEPS = [
  {
    id: 1,
    title: "Таны тухай",
    desc: "Хэн хүсэлт илгээж байгаа",
  },
  {
    id: 2,
    title: "Төслийн тухай",
    desc: "Юу хийлгэхийг хүсэж байна",
  },
  {
    id: 3,
    title: "Төсөв, хугацаа",
    desc: "Хэзээ, хэр их",
  },
] as const;