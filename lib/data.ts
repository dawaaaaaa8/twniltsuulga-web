// ============================================
// CONTACT
// ============================================
export const CONTACT = {
  phone: "+976 80901944",
  email: "dawaauugan787@gmail.com.com",
  address: "Улаанбаатар, Монгол улс",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  github: "https://github.com/boldmnx",
} as const;

// ============================================
// NAVIGATION
// ============================================
export const NAV_LINKS = [
  { href: "#services", label: "Үйлчилгээ" },
  { href: "#pricing", label: "Үнэ" },
  { href: "#portfolio", label: "Ажлууд" },
  { href: "#stack", label: "Технологи" },
  { href: "#process", label: "Ажлын явц" },
  { href: "#faq", label: "Асуулт" },
] as const;

// ============================================
// TRUST STATS
// ============================================
export const TRUST_STATS = [
  { value: "8+", label: "Хэрэгжүүлсэн төсөл" },
  { value: "1+", label: "Жилийн туршлага" },
  { value: "0+", label: "Байнгын харилцагч" },
  { value: "24/7", label: "Техникийн дэмжлэг" },
] as const;

// ============================================
// SERVICES
// ============================================
export const SERVICES = [
  { title: "Вэб сайт", text: "Компанийн танилцуулга, онлайн дэлгүүр, портал. Хурдан, SEO-д ээлтэй.", icon: "🌐", tags: ["Next.js", "Tailwind", "CMS"] },
  { title: "Мобайл апп", text: "iOS болон Android дээр нэг кодоор ажиллах апп. Push, offline, payment.", icon: "📱", tags: ["React Native", "Expo", "iOS/Android"] },
  { title: "Захиалгат систем", text: "CRM, ERP, агуулах, тайлангийн систем. Таны процессд яг тохирсон.", icon: "⚙️", tags: ["Laravel", "PostgreSQL", "REST API"] },
  { title: "UI/UX дизайн", text: "Figma дээр бүрэн прототип, дизайн систем, хэрэглэгчийн судалгаа.", icon: "🎨", tags: ["Figma", "Prototype", "Design System"] },
  { title: "Дэмжлэг, засвар", text: "Одоо байгаа системийг шинэчлэх, алдаа засах, хурд сайжруулах.", icon: "🛠️", tags: ["Bug fix", "Optimization", "Maintenance"] },
  { title: "Cloud, DevOps", text: "Сервер тохируулах, автомат deploy, backup, monitoring.", icon: "☁️", tags: ["Docker", "Nginx", "CI/CD"] },
] as const;

// ============================================
// PRICING
// ============================================
export const PRICING = [
  {
    name: "Starter",
    price: "0.7 сая ₮",
    duration: "2-3 долоо хоног",
    desc: "Жижиг бизнес, хувь хүний танилцуулга",
    features: ["5 хуудас хүртэл", "Responsive дизайн", "Холбоо барих форм", "SEO үндсэн тохиргоо", "1 сар үнэгүй дэмжлэг"],
    popular: false,
  },
  {
    name: "Standard",
    price: "3.5 сая ₮",
    duration: "4-6 долоо хоног",
    desc: "Дунд бизнес, онлайн дэлгүүр",
    features: ["15 хуудас хүртэл", "Admin panel", "Payment интеграц", "Олон хэлний дэмжлэг", "Analytics холболт", "3 сар үнэгүй дэмжлэг"],
    popular: true,
  },
  {
    name: "Premium",
    price: "Тохиролцоно",
    duration: "2+ сар",
    desc: "Том компани, захиалгат систем",
    features: ["Хязгааргүй хуудас", "Захиалгат функц", "Мобайл апп", "Cloud тохиргоо", "Dedicated баг", "1 жил дэмжлэг"],
    popular: false,
  },
] as const;

// ============================================
// TECH ICON HELPERS (1 удаа л тодорхойлно!)
// ============================================
const D = (n: string, v = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-${v}.svg`;
const S = (n: string) =>
  `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/${n}.svg`;

// ============================================
// PORTFOLIO
// ============================================
export const PORTFOLIO_CATEGORIES = [
  { key: "all", label: "Бүгд" },
  { key: "web", label: "Вэб" },
  { key: "mobile", label: "Мобайл" },
  { key: "system", label: "Систем" },
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number]["key"];

export const PORTFOLIO = [
  {
    id: "lms",
    title: "Хичээлийн хуваарь гаргах систем",
    slug: "class-schedule-system",
    category: "system",          
     categoryLabel: "Систем",     
    desc: "Сургууль, их сургуулийн хичээлийн хуваарийг автоматаар үүсгэх, багш, анги, танхимын зөрчил шалгах систем.",
    features: ["Автомат хуваарь үүсгэх", "Багш, танхим, ангийн удирдлага", "Зөрчил шалгах", "Excel export"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    color: "from-cyan to-indigo",
    icon: "📅",
    github: "https://github.com/boldmnx/class-schedule-system",
    demo: null,
    featured: true,
  },
  {
    id: "ecommerce",
    title: "E-commerce платформ",
    slug: "ecommerce-platform",
    category: "web" as const,
    categoryLabel: "Вэб",
    desc: "1,000+ бүтээгдэхүүнтэй онлайн дэлгүүр. Сагс, төлбөр, хүргэлт, admin panel бүрэн.",
    features: ["Бүтээгдэхүүний каталог", "Сагс, төлбөрийн интеграц", "Admin panel", "Олон хэл"],
    stack: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    color: "from-violet to-indigo",
    icon: "🛒",
    github: "https://github.com/boldmnx/ecommerce",
    demo: null,
    featured: true,
  },
  {
    id: "whois",
    title: "WHOIS хайлтын систем",
    slug: "whois-lookup",
    category: "web" as const,
    categoryLabel: "Вэб",
    desc: "Домэйн, IP хаягийн WHOIS мэдээллийг хурдан хайх, түүх хадгалах вэб систем.",
    features: ["Домэйн WHOIS хайлт", "IP хаягийн мэдээлэл", "Хайлтын түүх", "API интеграц"],
    stack: ["Next.js", "Node.js", "MongoDB"],
    color: "from-cyan to-violet",
    icon: "🔍",
    github: "https://github.com/boldmnx/whois",
    demo: null,
    featured: false,
  },
  {
    id: "booking-clone",
    title: "Booking Clone",
    slug: "booking-clone",
    category: "web" as const,
    categoryLabel: "Вэб",
    desc: "Booking.com-той төстэй зочид буудал, өрөө захиалгын систем. Хайлт, шүүлт, төлбөр.",
    features: ["Зочид буудал хайлт", "Өрөө захиалга", "Огнооны календарь", "Төлбөрийн интеграц"],
    stack: ["Next.js", "Prisma", "Stripe", "PostgreSQL"],
    color: "from-indigo to-violet",
    icon: "🏨",
    github: "https://github.com/boldmnx/booking-clone",
    demo: null,
    featured: true,
  },
  {
    id: "flutter",
    title: "Flutter Апп",
    slug: "flutter-app",
    category: "mobile" as const,
    categoryLabel: "Мобайл",
    desc: "Flutter-ээр хөгжүүлсэн кросс-платформ мобайл аппликейшн. iOS + Android.",
    features: ["iOS + Android", "Нэг код", "Material Design", "Push notification"],
    stack: ["Flutter", "Dart", "Firebase"],
    color: "from-cyan to-blue-500",
    icon: "📱",
    github: "https://github.com/boldmnx/flutter-app",
    demo: null,
    featured: false,
  },
  {
    id: "resort-booking",
    title: "Амралтын газар захиалгын систем",
    slug: "resort-booking",
    category: "web" as const,
    categoryLabel: "Вэб",
    desc: "Амралтын газар, жуулчны баазын өрөө, байшин захиалгын систем. Огноо, хүн тоо, төлбөр.",
    features: ["Байр, өрөөний каталог", "Огноо сонголт", "Захиалга бүртгэл", "Admin удирдлага"],
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    color: "from-violet to-cyan",
    icon: "🏕️",
    github: "https://github.com/boldmnx/resort-booking",
    demo: null,
    featured: true,
  },
  {
    id: "sport-web",
    title: "Спорт тэмцээний оноо, статус",
    slug: "sport-score-system",
    category: "web" as const,
    categoryLabel: "Вэб",
    desc: "Спортын тэмцээний оноо, тоглолтын хуваарь, багийн статусыг бодит цагт харуулах систем.",
    features: ["Тоглолтын хуваарь", "Оноо, статус", "Багийн удирдлага", "Real-time update"],
    stack: ["Next.js", "WebSocket", "PostgreSQL"],
    color: "from-cyan to-green-500",
    icon: "⚽",
    github: "https://github.com/boldmnx/sport-web",
    demo: null,
    featured: false,
  },
  {
    id: "doctor-appointment",
    title: "Эмийн цаг захиалгын апп",
    slug: "doctor-appointment",
    category: "mobile" as const,
    categoryLabel: "Мобайл",
    desc: "Эмнэлэг, эмчийн цаг захиалах мобайл аппликейшн. Эмч хайх, цаг сонгох, сануулга.",
    features: ["Эмч хайлт", "Цаг захиалга", "Сануулга", "Түүх харах"],
    stack: ["React Native", "Expo", "Node.js", "MongoDB"],
    color: "from-blue-500 to-indigo",
    icon: "🏥",
    github: "https://github.com/boldmnx/doctor-appointment",
    demo: null,
    featured: true,
  },
] as const;

// ============================================
// TECH ICONS (portfolio-д)
// ============================================
export const TECH_ICONS: Record<string, string> = {
  "Next.js": D("nextjs"),
  TypeScript: D("typescript"),
  JavaScript: D("javascript"),
  React: D("react"),
  "React Native": D("react"),
  "Node.js": D("nodejs"),
  PostgreSQL: D("postgresql"),
  MongoDB: D("mongodb"),
  MySQL: D("mysql"),
  Prisma: S("prisma"),
  Tailwind: D("tailwindcss"),
  Stripe: D("stripe"),
  Flutter: D("flutter"),
  Dart: D("dart"),
  Firebase: D("firebase"),
  Expo: S("expo"),
  WebSocket: S("socketdotio"),
  AWS: D("amazonwebservices", "original-wordmark"),
};

// ============================================
// TESTIMONIALS
// ============================================
export const TESTIMONIALS = [
  { name: "Б. Батбаяр", role: "CEO, TechStore", text: "BBD баг манай онлайн дэлгүүрийг 4 долоо хоногт бүтээж өгсөн. Борлуулалт 3 дахин өссөн.", rating: 5 },
  { name: "С. Сарангэрэл", role: "Founder, EduMN", text: "Маш мэргэжлийн баг. Тайлбарлах, дэмжих нь гайхалтай. Дараагийн төслөө ч даатгана.", rating: 5 },
  { name: "Д. Тэмүүлэн", role: "CTO, LogiTrans", text: "Хүргэлтийн апп маань цагтаа гарсан. Код чанартай, documentation бүрэн.", rating: 5 },
] as const;

// ============================================
// STEPS
// ============================================
export const STEPS = [
  { title: "Хүсэлт", text: "Та форм бөглөж, бид 24 цагийн дотор холбогдоно.", icon: "📩" },
  { title: "Уулзалт", text: "Үнэгүй 30 минутын зөвлөгөө. Шаардлага тодорхойлно.", icon: "☕" },
  { title: "Санал", text: "Үнэ, хугацаа, техникийн шийдэл бүхий дэлгэрэнгүй санал.", icon: "📋" },
  { title: "Хөгжүүлэлт", text: "Долоо хоног бүр demo. Та цаг тутамд хянана.", icon: "💻" },
  { title: "Хүлээлгэн өгөх", text: "Сургалт, documentation, 30 хоногийн баталгаа.", icon: "🎉" },
] as const;

// ============================================
// FAQ
// ============================================
export const FAQ = [
  { q: "Төсөл хэдэн хугацаанд хийгдэх вэ?", a: "Энгийн танилцуулга сайт 2-3 долоо хоног, онлайн дэлгүүр 4-6 долоо хоног, захиалгат систем 2-6 сар." },
  { q: "Төлбөрийн нөхцөл ямар вэ?", a: "40% урьдчилгаа, 30% дунд, 30% хүлээлгэн өгөх үед." },
  { q: "Код маань надад харьяалагдах уу?", a: "Тийм. Төлбөр бүрэн дууссаны дараа бүх source code, copyright танд шилжинэ." },
  { q: "Хүлээлгэн өгсний дараа дэмжлэг байх уу?", a: "Тийм. Багц бүрд 1-3 сарын үнэгүй дэмжлэг багтсан." },
  { q: "Дизайныг өөрсдөө хийх үү?", a: "Тийм, манай UI/UX дизайнер Figma дээр бүрэн прототип хийнэ." },
  { q: "Аль улс, хотод ажилладаг вэ?", a: "Улаанбаатарт төвтэй. Монголын бүх аймаг, гадаад дахь монгол бизнестэй онлайн ажиллана." },
] as const;

// ============================================
// TECH STACK
// ============================================
export const TECH: Record<string, [string, string][]> = {
  Frontend: [
    ["React", D("react")],
    ["Next.js", D("nextjs")],
    ["Livewire", S("livewire")],
    ["Alpine.js", S("alpinedotjs")],
  ],
  Mobile: [
    ["React Native", D("react")],
    ["Expo", S("expo")],
    ["Flutter", D("flutter")],
  ],
  Backend: [
    ["Laravel", D("laravel")],
    ["Laravel Octane", D("laravel")],
    ["PHP", D("php")],
    ["Go", D("go", "original-wordmark")],
    ["Node.js", D("nodejs")],
    ["C++", D("cplusplus")],
  ],
  Database: [
    ["PostgreSQL", D("postgresql")],
    ["MSSQL", D("microsoftsqlserver")],  // ← plain хассан
    ["Prisma", S("prisma")],
  ],
  API: [["GraphQL", D("graphql")]],  // ← plain хассан
  Styling: [["Tailwind CSS", D("tailwindcss")]],
  DevOps: [
    ["Docker", D("docker")],
    ["Nginx", D("nginx")],
    ["Apache", D("apache")],
  ],
};

export const TECH_STATS = [
  ["20+", "Технологи"],
  ["7", "Категори"],
  ["Full Stack", "Хөгжүүлэлт"],
  ["Modern", "Architecture"],
] as const;

// ============================================
// HERO PIXELS
// ============================================
export const PIXELS: [number, number, number, number, number, number][] = [
  [4, 28, 22, -120, -90, 0.1],
  [8, 72, 30, 140, -100, 0.25],
  [26, 6, 34, -160, -20, 0.4],
  [30, 90, 40, 170, 10, 0.15],
  [62, 4, 26, -150, 60, 0.5],
  [58, 92, 24, 160, 70, 0.3],
  [86, 22, 30, -110, 120, 0.2],
  [90, 66, 34, 120, 130, 0.45],
  [92, 46, 22, 0, 140, 0.35],
  [2, 50, 18, 20, -130, 0.55],
];