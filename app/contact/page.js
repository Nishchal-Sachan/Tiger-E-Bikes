import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { SITE_EMAIL } from '@/constants/site-email';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Contact | Tiger E-Bikes',
  description:
    'Route your inquiry: sales, service, partnerships, careers, or general. Direct channels for test rides, support, and business.',
};

const PHONE_DISPLAY = '9453605312';
const PHONE_TEL = '+919453605312';
const WHATSAPP_HREF = `https://wa.me/91${PHONE_DISPLAY}`;
const ADDRESS_LINES = ['Tiger E-Bikes', '33 W Block, Keshav Nagar', 'Kanpur, Uttar Pradesh, India'];
const HOURS = 'Monday–Saturday, 10:00–19:00 (IST). Holiday hours may vary.';

const MAP_SEARCH = '33 W Block Keshav Nagar Kanpur India';
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_SEARCH)}&output=embed`;
const MAP_OPEN_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_SEARCH)}`;

export default function ContactPage() {
  return (
    <>
      <div className="w-full flex flex-col overflow-x-hidden bg-neutral-50">
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 text-matte-black border-b border-neutral-200/80 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <div className="space-y-4 mb-6 md:mb-8">
                <div className="w-12 h-px bg-matte-black" />
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-matte-black/80">
                  Contact
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-matte-black leading-[1.08]">
                Contact
              </h1>
              <p className="mt-6 md:mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium border-l-[3px] border-tiger-yellow pl-5 md:pl-6 max-w-2xl">
                Reach out to the right team — sales, service, partnerships, or general queries.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7">
                <h2 className="text-lg md:text-xl font-black text-matte-black tracking-tight mb-6">
                  Send a message
                </h2>
                <ContactForm />
              </div>

              <aside className="lg:col-span-5 space-y-4">
                <h2 className="text-lg md:text-xl font-black text-matte-black tracking-tight mb-2">
                  Quick contact
                </h2>
                <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6 shadow-sm space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                    Sales &amp; test rides
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${PHONE_TEL}`}
                      className="inline-flex min-h-[2.75rem] items-center justify-center rounded-xl bg-matte-black px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
                    >
                      Call
                    </a>
                    <a
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[2.75rem] items-center justify-center rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-matte-black hover:border-tiger-yellow/50 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                  <p className="text-sm text-neutral-600 font-medium">{PHONE_DISPLAY}</p>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6 shadow-sm space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                    Service &amp; support
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Service and urgent roadside: use the same line — we prioritize breakdowns during working hours.
                  </p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="inline-flex text-matte-black font-black text-sm hover:text-tiger-yellow transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6 shadow-sm space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-[0.18em] text-neutral-500">
                    Business &amp; partnerships
                  </h3>
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="inline-flex break-all text-matte-black font-semibold hover:text-tiger-yellow transition-colors text-sm md:text-base"
                  >
                    {SITE_EMAIL}
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight">Visit us</h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />

            <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-4 space-y-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Address</p>
                  <address className="not-italic text-neutral-700 font-medium leading-relaxed text-base">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Working hours
                  </p>
                  <p className="text-neutral-700 font-medium leading-relaxed">{HOURS}</p>
                </div>
                <a
                  href={MAP_OPEN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-xl bg-matte-black px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
              <div className="lg:col-span-8">
                <div className="relative w-full aspect-[4/3] md:aspect-[21/9] max-h-[480px] rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
                  <iframe
                    title="Tiger E-Bikes — Keshav Nagar, Kanpur"
                    src={MAP_EMBED_SRC}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
