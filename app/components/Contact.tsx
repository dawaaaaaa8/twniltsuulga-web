import { CONTACT } from "../../lib/data";
import { ProjectWizard } from "./contact/ProjectWizard";
import { Reveal } from "./ui/Reveal";

export function Contact() {
  return (
    <section id="contact" className="grid-bg text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.5fr]">
        <Reveal>
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Төслөө эхлүүлье
            </h2>
            <p className="mt-4 max-w-sm text-white/85">
              Хэдэн минутын дотор хүсэлтээ үлдээгээрэй. Бид 24 цагийн дотор
              холбогдож, үнэгүй зөвлөгөө өгнө.
            </p>

            <dl className="mt-8 space-y-5">
              <div>
                <dt className="text-sm text-white/70">Утас</dt>
                <dd>
                  <a
                    className="text-xl font-semibold hover:text-cyan hover:underline"
                    href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  >
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/70">Имэйл</dt>
                <dd>
                  <a
                    className="text-xl font-semibold hover:text-cyan hover:underline"
                    href={`mailto:${CONTACT.email}`}
                  >
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/70">Хаяг</dt>
                <dd className="text-xl font-semibold">{CONTACT.address}</dd>
              </div>
            </dl>

            {/* Яагаад BBD? */}
            <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-5">
              <p className="text-sm font-semibold">Яагаад BBD гэж?</p>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li className="flex gap-2">
                  <span className="text-cyan">✓</span>
                  24 цагийн дотор хариу
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan">✓</span>
                  Үнэгүй 30 минутын зөвлөгөө
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan">✓</span>
                  Тодорхой үнэ, далд төлбөргүй
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan">✓</span>
                  Source code бүрэн танд
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan">✓</span>
                  Багц бүрд үнэгүй дэмжлэг
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <ProjectWizard />
        </Reveal>
      </div>
    </section>
  );
}