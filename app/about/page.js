import Link from 'next/link';
import Footer from '@/components/Footer';
import StaticPageShell from '@/components/StaticPageShell';

export const dynamic = 'force-static';

export const metadata = {
  title: 'About | Tiger E-Bikes',
  description:
    'Tiger E-Bikes engineers electric two-wheelers for Indian roads — real-world range, durability, and ownership costs that hold up in traffic, heat, and daily use.',
};

const METRICS = [
  'Up to 140 KM range (real usage)',
  '5000+ battery cycles',
  'Up to 80% lower running cost',
  'Zero tailpipe emissions',
];

const WHY_POINTS = [
  {
    title: 'Designed for Daily Stress',
    body: 'From traffic congestion to rough roads, every component is built to handle real usage — not controlled environments.',
  },
  {
    title: 'Consistent Performance',
    body: 'Power delivery, range, and ride quality are engineered to remain stable over time.',
  },
  {
    title: 'Lower Cost of Ownership',
    body: 'Fewer moving parts, efficient systems, and durable components reduce long-term costs.',
  },
  {
    title: 'Built for Longevity',
    body: 'Battery and core systems are designed to last — minimizing replacements and downtime.',
  },
];

function SectionDivider() {
  return (
    <div
      className="my-14 md:my-20 h-px w-full bg-gradient-to-r from-transparent via-white/18 to-transparent"
      aria-hidden
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <StaticPageShell
        eyebrow="TIGER E-BIKES"
        title="Engineering Mobility for Real India"
        titleClassName="normal-case tracking-tight lg:text-[3.25rem]"
        subtitle="Built for traffic, heat, long commutes, and everyday reliability — not just ideal conditions."
        contentClassName="max-w-4xl lg:max-w-5xl space-y-0 text-neutral-400 text-base md:text-lg leading-relaxed font-medium"
      >
        <section className="space-y-5 md:space-y-6">
          <p>
            Tiger E-Bikes was built to solve real problems in Indian mobility — rising fuel costs, unpredictable
            traffic, and vehicles that don&apos;t hold up in daily use.
          </p>
          <p>
            Most electric vehicles are optimized for test conditions. We build for actual roads — where heat, load,
            stop-and-go traffic, and long-term usage define performance.
          </p>
          <p>
            Our focus is simple: create electric two-wheelers that people can depend on every day — not just in the
            first few months, but for years.
          </p>
        </section>

        <section
          className="mt-12 md:mt-14 rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-6 md:px-8 md:py-8"
          aria-label="Product highlights"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {METRICS.map((line) => (
              <div key={line} className="border-l-2 border-tiger-yellow/60 pl-4 md:pl-5">
                <p className="text-sm md:text-base font-black text-white leading-snug">{line}</p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        <section
          id="vision"
          className="scroll-mt-[calc(70px+1.5rem)] md:scroll-mt-[calc(70px+2rem)]"
          aria-labelledby="about-vision-heading"
        >
          <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.28em] text-tiger-yellow mb-4">
            VISION
          </p>
          <h2
            id="about-vision-heading"
            className="text-2xl md:text-3xl lg:text-[2.35rem] font-black tracking-tight text-white leading-[1.08] max-w-4xl"
          >
            Electric as the Default — Not the Alternative
          </h2>

          <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-start">
            <div className="space-y-5 md:space-y-6 text-neutral-300 leading-relaxed">
              <p>
                We believe electric mobility should not feel experimental or limiting. It should be the most practical,
                reliable, and cost-efficient way to move through cities.
              </p>
              <p>
                Our vision is to make electric two-wheelers the default choice for urban India — by solving the real
                issues that matter: range consistency, durability, serviceability, and long-term ownership experience.
              </p>
            </div>

            <aside className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 md:p-8 lg:p-9 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              <h3 className="text-base md:text-lg font-black uppercase tracking-[0.12em] text-white mb-6 md:mb-7">
                How We Approach It
              </h3>
              <ul className="space-y-4 text-sm md:text-[0.9375rem] text-neutral-400 leading-relaxed">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tiger-yellow" aria-hidden />
                  <span>Real-world range over lab numbers</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tiger-yellow" aria-hidden />
                  <span>Battery systems built for Indian climates</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tiger-yellow" aria-hidden />
                  <span>Performance consistency over peak specs</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tiger-yellow" aria-hidden />
                  <span>Low maintenance, high reliability engineering</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tiger-yellow" aria-hidden />
                  <span>Service ecosystem that supports daily riders</span>
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <SectionDivider />

        <section>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">Why TIGER EV</h2>
          <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
          <ul className="mt-8 md:mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {WHY_POINTS.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
              >
                <div className="flex gap-4">
                  <span className="shrink-0 text-tiger-yellow select-none text-lg leading-none" aria-hidden>
                    {'\u2714'}
                  </span>
                  <div className="min-w-0 space-y-2">
                    <h3 className="text-sm md:text-base font-black uppercase tracking-wide text-white">{item.title}</h3>
                    <p className="text-sm md:text-[0.9375rem] leading-relaxed text-neutral-400">{item.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <SectionDivider />

        <section>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">Our Approach</h2>
          <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
          <div className="mt-8 md:mt-10 space-y-5 md:space-y-6">
            <p>We prioritize practical innovation over unnecessary complexity.</p>
            <p>
              Every design decision — from battery architecture to ride comfort — is made to improve usability in
              real-world conditions.
            </p>
            <p>
              We build, test, gather feedback, and refine continuously — ensuring that what we ship performs reliably
              outside controlled environments.
            </p>
          </div>
        </section>

        <SectionDivider />

        <section className="rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-8 md:px-10 md:py-10">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">Built for Reliability</h2>
          <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
          <div className="mt-6 md:mt-8 max-w-3xl space-y-5 md:space-y-6 text-neutral-300 leading-relaxed">
            <p>Every Tiger EV is engineered with durability as a baseline — not an afterthought.</p>
            <p>
              We test across temperature variations, road conditions, and long usage cycles to ensure consistent
              performance.
            </p>
            <p>Our goal is simple: a vehicle that works the same way on day 500 as it did on day 1.</p>
          </div>
        </section>

        <section className="mt-14 md:mt-20 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent px-6 py-10 md:px-12 md:py-14 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
          <p className="text-xl md:text-2xl lg:text-[1.65rem] font-bold tracking-tight text-white max-w-xl mx-auto leading-snug">
            See the lineup engineered for your daily route.
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-5">
            <Link
              href="/#lineup"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-tiger-yellow px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-matte-black shadow-[0_16px_40px_rgba(250,204,21,0.25)] transition hover:brightness-105 active:scale-[0.98]"
            >
              Explore Vehicles
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl border-2 border-white/20 bg-white/[0.05] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:border-tiger-yellow/40 hover:bg-white/10 active:scale-[0.98]"
            >
              Book a Test Ride
            </Link>
          </div>
        </section>
      </StaticPageShell>
      <Footer />
    </>
  );
}
