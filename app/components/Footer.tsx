import { CONTACT, NAV_LINKS } from "../../lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-bold">BBD</p>
            <p className="mt-2 text-sm text-white/70">
              Build Better Development. Вэб, апп, захиалгат систем.
            </p>
          </div>

          <div>
            <p className="font-semibold">Холбоос</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-cyan">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold">Холбоо барих</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-cyan">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-cyan">
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.address}</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold">Дагах</p>
            <div className="mt-3 flex gap-3">
              <a
                href={CONTACT.facebook}
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-cyan hover:text-ink"
              >
                f
              </a>
              <a
                href={CONTACT.instagram}
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-cyan hover:text-ink"
              >
                ◎
              </a>
              <a
                href={CONTACT.github}
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-cyan hover:text-ink"
              >
                ⌘
              </a>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} BBD. Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </div>
    </footer>
  );
}