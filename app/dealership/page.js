import Footer from '@/components/Footer';
import ShowroomTestRideForm from '@/components/ShowroomTestRideForm';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Showroom | Tiger E-Bikes',
  description:
    'Visit the Tiger EV showroom in Kanpur: test rides, product walkthroughs, pricing, and service guidance — built for real-world evaluation.',
};

const PHONE_DISPLAY = '9453605312';
const PHONE_TEL = '+919453605312';

const CITY = 'Kanpur';
const ADDRESS_LINES = ['Tiger E-Bikes', '33 W Block, Keshav Nagar', 'Kanpur, Uttar Pradesh, India'];
const HOURS = 'Monday–Saturday, 10:00–19:00 (IST). Holiday hours may vary.';

const MAP_QUERY = '33 W Block Keshav Nagar Kanpur India';
const DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

const WHAT_HERE = [
  {
    title: 'Test ride experience',
    body: 'Ride our vehicles in real conditions — not just a short demo loop.',
  },
  {
    title: 'Product walkthrough',
    body: 'Understand battery, range, and performance with our team.',
  },
  {
    title: 'On-road pricing & finance',
    body: 'Get exact pricing, EMI options, and ownership cost breakdown.',
  },
  {
    title: 'Service & support guidance',
    body: 'Learn about maintenance, service intervals, and support network.',
  },
];

const SHOWROOM_BULLETS = [
  'Real-world range discussion',
  'Charging explanation',
  'Ride comfort demo',
];

const WHY_VISIT = [
  'Experience actual ride quality',
  'Understand real-world range',
  'Get honest answers (no inflated claims)',
  'Compare models side-by-side',
];

export default function DealershipPage() {
  return (
    <>
      <div className="w-full flex flex-col overflow-x-hidden bg-neutral-50">
        <section className="pt-16 pb-14 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 text-matte-black border-b border-neutral-200/80 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <div className="space-y-4 mb-6 md:mb-8">
                <div className="w-12 h-px bg-matte-black" />
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-matte-black/80">
                  Showroom
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-matte-black leading-[1.08]">
                Visit a Tiger EV Showroom
              </h1>
              <p className="mt-6 md:mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium border-l-[3px] border-tiger-yellow pl-5 md:pl-6 max-w-2xl">
                Experience our vehicles up close, get expert guidance, and take a test ride built for real Indian
                roads.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-tight">
              What you can do here
            </h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
            <ul className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 list-none p-0 m-0">
              {WHAT_HERE.map((item) => (
                <li key={item.title}>
                  <article className="h-full rounded-2xl border border-neutral-200 bg-white px-5 py-6 md:px-6 md:py-7 shadow-sm border-l-[3px] border-l-tiger-yellow">
                    <h3 className="text-sm md:text-base font-black text-matte-black tracking-tight leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-[0.9375rem] text-neutral-600 leading-relaxed font-normal">
                      {item.body}
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-tight">
              Location
            </h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />

            <article className="mt-10 md:mt-12 max-w-2xl rounded-2xl border border-neutral-200 bg-neutral-50/80 p-6 md:p-8 shadow-sm border-l-4 border-l-tiger-yellow">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-neutral-500 mb-2">City</p>
              <p className="text-xl md:text-2xl font-black text-matte-black tracking-tight mb-6">{CITY}</p>

              <div className="space-y-6 text-neutral-700">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Address</p>
                  <address className="not-italic font-medium leading-relaxed text-base">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">Phone</p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="font-semibold text-matte-black hover:text-tiger-yellow transition-colors text-base"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1.5">
                    Working hours
                  </p>
                  <p className="font-medium leading-relaxed">{HOURS}</p>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    <span className="font-bold text-matte-black">Availability:</span> Test rides available daily. Call
                    ahead for same-day slots.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-xl bg-matte-black px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
                >
                  Call now
                </a>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-xl border-2 border-neutral-300 bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-matte-black hover:border-tiger-yellow/60 transition-colors"
                >
                  Get directions
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-tight">
                Built for real-world testing
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
              <p className="mt-8 md:mt-10 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                Our showroom is designed to simulate real riding conditions. From traffic responsiveness to ride
                comfort, you can evaluate performance beyond spec sheets.
              </p>
              <ul className="mt-8 space-y-3 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                {SHOWROOM_BULLETS.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-matte-black" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-5 space-y-5">
                <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-tight">
                  Book a test ride
                </h2>
                <div className="h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
                <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                  Share your preferred slot and model. We&apos;ll confirm by phone.
                </p>
              </div>
              <div className="lg:col-span-7 w-full max-w-xl lg:max-w-none">
                <ShowroomTestRideForm />
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-tight">
              Why visit in person?
            </h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
            <ul className="mt-8 md:mt-10 max-w-2xl space-y-4 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
              {WHY_VISIT.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-matte-black" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
