import Link from 'next/link';
import Footer from '@/components/Footer';
import { SITE_EMAIL } from '@/constants/site-email';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Warranty & Coverage | Tiger E-Bikes',
  description:
    'Tiger E-Bikes warranty: battery, motor & controller, and vehicle coverage. What is covered, claim steps, and support — clear and specific.',
};

const WARRANTY_CARDS = [
  {
    title: 'Battery Warranty',
    term: '3 Years or 30,000 km (whichever comes first)',
    includes: ['Manufacturing defects', 'Performance issues under normal usage'],
  },
  {
    title: 'Motor & Controller',
    term: '2 Years warranty',
    includes: ['Electrical faults', 'Manufacturing defects'],
  },
  {
    title: 'Vehicle (General Components)',
    term: '1 Year warranty',
    includes: ['Frame defects', 'Wiring issues', 'Factory defects'],
  },
];

const COVERED = [
  'Manufacturing defects',
  'Electrical system failures',
  'Battery performance issues under standard usage',
  'Controller and motor faults',
];

const NOT_COVERED = [
  'Accidental damage',
  'Water damage due to misuse',
  'Unauthorized modifications',
  'Wear and tear (tyres, brake pads, etc.)',
  'Improper charging practices',
];

const RELIABILITY_BULLETS = [
  'Heat-tested battery systems',
  'Daily usage durability',
  'Optimized for stop-and-go traffic',
];

const CLAIM_STEPS = [
  'Visit authorized service center',
  'Vehicle inspection',
  'Issue validation',
  'Repair or replacement',
];

export default function WarrantyPage() {
  return (
    <>
      <div className="w-full flex flex-col overflow-x-hidden bg-neutral-50">
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 text-matte-black border-b border-neutral-200/80 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <div className="space-y-4 mb-6 md:mb-8">
                <div className="w-12 h-px bg-matte-black" />
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-matte-black/80">
                  Support
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-matte-black leading-[1.08]">
                Warranty &amp; Coverage
              </h1>
              <p className="mt-6 md:mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium border-l-[3px] border-tiger-yellow pl-5 md:pl-6 max-w-2xl">
                Built for real-world use. Backed by reliable coverage.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <h2 className="text-xl md:text-2xl font-black text-matte-black tracking-tight">Coverage overview</h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
            <ul className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 list-none p-0 m-0">
              {WARRANTY_CARDS.map((card) => (
                <li key={card.title}>
                  <article className="h-full rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 shadow-sm border-l-[3px] border-l-tiger-yellow">
                    <h3 className="text-base md:text-lg font-black text-matte-black tracking-tight leading-snug">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base font-semibold text-neutral-800 leading-snug">{card.term}</p>
                    <p className="mt-4 text-[10px] font-black uppercase tracking-[0.18em] text-neutral-500">Includes</p>
                    <ul className="mt-2 space-y-2 text-sm text-neutral-600 leading-relaxed">
                      {card.includes.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-matte-black" aria-hidden />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-matte-black tracking-tight">What&apos;s Covered</h2>
                <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
                <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                  {COVERED.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-matte-black" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-matte-black tracking-tight">
                  What&apos;s Not Covered
                </h2>
                <div className="mt-3 h-1 w-14 rounded-full bg-neutral-300" aria-hidden />
                <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                  {NOT_COVERED.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h2 className="text-xl md:text-2xl font-black text-matte-black tracking-tight">
                Designed for Indian Conditions
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
              <p className="mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                Our vehicles are tested across real road conditions — traffic, heat, and daily commutes — to ensure
                long-term durability and consistent performance.
              </p>
              <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                {RELIABILITY_BULLETS.map((line) => (
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
            <div className="max-w-3xl">
              <h2 className="text-xl md:text-2xl font-black text-matte-black tracking-tight">How to Claim Warranty</h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
              <ol className="mt-8 space-y-4 text-neutral-600 text-base leading-relaxed font-medium list-none p-0 m-0">
                {CLAIM_STEPS.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-matte-black text-xs font-black text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600 font-medium leading-relaxed">
                All claims are subject to inspection and usage conditions.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-2xl rounded-2xl border border-neutral-200 bg-white p-8 md:p-10 shadow-sm">
              <h2 className="text-xl md:text-2xl font-black text-matte-black tracking-tight">Need Help?</h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
              <p className="mt-6 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                For warranty claims, service history, or support, contact our team.
              </p>
              <p className="mt-4">
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="text-matte-black font-semibold underline decoration-tiger-yellow/50 underline-offset-2 hover:text-tiger-yellow transition-colors"
                >
                  {SITE_EMAIL}
                </a>
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-xl bg-matte-black px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
                >
                  Contact support
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
