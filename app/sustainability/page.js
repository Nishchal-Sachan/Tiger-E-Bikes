import Link from 'next/link';
import Footer from '@/components/Footer';
import { cn } from '@/utils/cn';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Sustainability | Tiger E-Bikes',
  description:
    'How Tiger E-Bikes engineers electric two-wheelers for lower energy per kilometer, longer product life, and real-world efficiency on Indian roads.',
};

const STATS = [
  {
    title: 'Consistent Real-World Range',
    subtext: 'Engineered for predictable performance in traffic, not just ideal conditions.',
    accent: 'border-l-emerald-500/55',
  },
  {
    title: 'Lower Energy per Kilometer',
    subtext: 'Optimized motor + controller efficiency reduces overall power consumption.',
    accent: 'border-l-indigo-500/55',
  },
  {
    title: 'Zero Tailpipe Emissions',
    subtext: 'No direct emissions during use — cleaner air in dense urban environments.',
    accent: 'border-l-sky-500/55',
  },
  {
    title: 'Durable Battery Systems',
    subtext: 'Long lifecycle battery packs reduce replacement frequency and waste.',
    accent: 'border-l-amber-500/55',
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <div className="w-full flex flex-col overflow-x-hidden bg-neutral-50">
        {/* Top: no hero banner — starts with substantive copy */}
        <section className="pt-16 pb-14 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 text-matte-black border-b border-neutral-200/80 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl lg:max-w-4xl">
              <div className="space-y-4 mb-6 md:mb-8">
                <div className="w-12 h-px bg-matte-black" />
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-matte-black/80">
                  Sustainability
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-matte-black leading-[1.08]">
                Built for Real-World Efficiency
              </h1>
              <div className="mt-8 md:mt-10 space-y-5 md:space-y-6 text-neutral-600 text-base md:text-lg leading-relaxed font-medium border-l-[3px] border-tiger-yellow pl-5 md:pl-6">
                <p>
                  At Tiger E-Bikes, sustainability is not a feature — it is a result of better engineering
                  decisions.
                </p>
                <p>
                  We design electric vehicles that consume less energy per kilometer, last longer in real-world
                  conditions, and require fewer replacements over time. Instead of optimizing for lab results, we
                  optimize for daily usage across Indian roads, climates, and traffic patterns.
                </p>
                <p>
                  The goal is simple: reduce total resource consumption across the full lifecycle — not just
                  eliminate tailpipe emissions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-neutral-50 text-matte-black border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
              {STATS.map((stat) => (
                <article
                  key={stat.title}
                  className={cn(
                    'rounded-2xl border border-neutral-200/90 bg-white px-6 py-7 md:px-7 md:py-8 shadow-sm',
                    'border-l-[3px] transition-all duration-300 ease-out',
                    'hover:shadow-md hover:-translate-y-1 hover:border-neutral-300/90',
                    stat.accent
                  )}
                >
                  <p className="text-lg md:text-xl font-black text-matte-black leading-tight tracking-tight mb-3">
                    {stat.title}
                  </p>
                  <p className="text-sm md:text-[0.9375rem] text-neutral-600 leading-relaxed font-normal">
                    {stat.subtext}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white text-matte-black border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl lg:max-w-4xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-matte-black leading-tight">
                Impact Beyond Emissions
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-matte-black" aria-hidden />
              <div className="mt-8 md:mt-10 space-y-5 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                <p>
                  Electric mobility is not only about eliminating fuel — it is about using energy more efficiently
                  across every ride.
                </p>
                <p>
                  Tiger EVs reduce noise pollution, improve urban air quality, and lower dependency on fossil fuels.
                  More importantly, they are designed to maintain performance over time, avoiding early degradation
                  that leads to waste.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 lg:py-28 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 lg:items-start">
              <div className="space-y-5 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-[1.1]">
                  Lifecycle Efficiency
                </h2>
                <div className="h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
                <div className="space-y-5 text-neutral-600 text-base md:text-lg leading-relaxed font-medium border-l-4 border-neutral-200 pl-5 md:pl-6">
                  <p>
                    We design for long-term usage — fewer battery replacements, lower maintenance cycles, and
                    components that are built to last.
                  </p>
                  <p>
                    By extending product life and improving efficiency per ride, we reduce total environmental impact
                    beyond just emissions.
                  </p>
                </div>
              </div>

              <div className="space-y-5 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-[1.1]">
                  Built for Indian Cities
                </h2>
                <div className="h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
                <div className="space-y-5 text-neutral-600 text-base md:text-lg leading-relaxed font-medium border-l-4 border-neutral-200 pl-5 md:pl-6">
                  <p>
                    Electric two-wheelers are the most practical solution for urban India — compact, efficient, and
                    scalable.
                  </p>
                  <p>
                    Our focus is on making them reliable under real conditions: heat, traffic, daily commutes, and
                    long-term usage without performance drop-offs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-24 lg:py-28 bg-matte-black overflow-hidden border-t border-white/10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(250,204,21,0.07),_transparent_50%)]"
            aria-hidden
          />
          <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-16">
              <div className="max-w-2xl space-y-5">
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-tiger-yellow">
                  Tiger E-Bikes
                </p>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.05]">
                  Ready to Switch to Smarter Mobility?
                </h2>
                <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-medium">
                  Experience electric mobility built for real roads, real usage, and long-term efficiency.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[3.25rem] items-center justify-center bg-tiger-yellow text-matte-black px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-105 transition-all text-center"
                >
                  Book Test Ride
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-[3.25rem] items-center justify-center border-2 border-white/20 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:border-tiger-yellow/45 hover:text-tiger-yellow transition-all text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
