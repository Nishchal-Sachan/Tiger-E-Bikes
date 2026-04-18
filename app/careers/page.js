import Footer from '@/components/Footer';
import CareersApplyForm from '@/components/CareersApplyForm';
import { SITE_EMAIL } from '@/constants/site-email';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Careers | Tiger E-Bikes',
  description:
    'Hiring at Tiger E-Bikes: engineering-first electric two-wheelers for Indian roads. Clear expectations, deliberate hiring, applications with resume.',
};

const WHO_WE_SEEK = [
  'People who care about real-world impact over optics',
  'Engineers who prioritize reliability over quick hacks',
  'Individuals who take ownership and follow through',
  'Builders who are comfortable working across functions',
  'People who prefer solving problems over discussing them',
];

const WHY_CARDS = [
  {
    title: 'Real Product Impact',
    body: 'You work on systems that directly affect performance, safety, and rider experience.',
  },
  {
    title: 'Engineering-Driven Culture',
    body: 'Decisions are made based on product behavior, not assumptions.',
  },
  {
    title: 'Cross-Functional Execution',
    body: 'Hardware, software, and operations collaborate tightly.',
  },
  {
    title: 'Ownership',
    body: 'You own outcomes — not just tasks.',
  },
];

export default function CareersPage() {
  return (
    <>
      <div className="w-full flex flex-col overflow-x-hidden bg-neutral-50">
        <section className="pt-16 pb-14 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 text-matte-black border-b border-neutral-200/80 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <div className="space-y-4 mb-6 md:mb-8">
                <div className="w-12 h-px bg-matte-black" />
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-matte-black/80">
                  Careers
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-matte-black leading-[1.08]">
                Careers
              </h1>
              <p className="mt-6 md:mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium border-l-[3px] border-tiger-yellow pl-5 md:pl-6 max-w-2xl">
                We&apos;re building electric vehicles for real-world use. If you care about solving practical problems
                and shipping reliable products, you&apos;ll fit in here.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-tight">
                How We Work
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
              <div className="mt-8 md:mt-10 space-y-5 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                <p>Work at Tiger is hands-on and outcome-driven.</p>
                <p>
                  We operate in small teams with clear ownership. Engineers, designers, and operators work closely to
                  build products that perform in real-world conditions — not just in controlled environments.
                </p>
                <p>
                  Decisions are driven by usability, durability, and long-term performance — not presentation or hype.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-tight">
                Who We&apos;re Looking For
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
              <ul className="mt-8 md:mt-10 space-y-4 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                {WHO_WE_SEEK.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-matte-black" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
              {WHY_CARDS.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-neutral-200 bg-white px-5 py-7 md:px-6 md:py-8 shadow-sm border-l-4 border-l-tiger-yellow transition-shadow duration-300 hover:shadow-md"
                >
                  <h3 className="text-sm md:text-base font-black text-matte-black leading-snug mb-3 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-[0.9375rem] text-neutral-600 leading-relaxed font-normal">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-tight">
                We Hire Deliberately
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
              <div className="mt-8 md:mt-10 space-y-5 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                <p>We hire carefully — not to fill roles, but to build a strong team.</p>
                <p>
                  We look for people who can think independently, execute reliably, and take responsibility for outcomes.
                </p>
                <p>If your role isn&apos;t listed, you can still apply — we review every application.</p>
              </div>
              <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 px-5 py-5 md:px-6 md:py-6">
                <p className="text-matte-black font-black text-sm md:text-base tracking-tight">
                  No open roles right now, but we&apos;re always open to strong builders.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-tight">
                Before You Apply
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
              <div className="mt-8 md:mt-10 space-y-5 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                <p>We value clarity, ownership, and real work.</p>
                <p>
                  If you&apos;ve built things, solved problems, or improved systems — show us. We care more about what
                  you&apos;ve done than what your resume says.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start border-t border-neutral-200/80 pt-12 md:pt-14">
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-4">
                  <div className="w-12 h-px bg-matte-black" />
                  <p className="text-matte-black text-[10px] md:text-xs font-black uppercase tracking-[0.35em]">
                    Application
                  </p>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-matte-black tracking-tight leading-tight">
                  Apply
                </h2>
                <div className="space-y-4 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                  <p>
                    Use the form to send your resume and a short note. We read what you write — generic applications
                    rarely help.
                  </p>
                  <p>
                    Prefer email?{' '}
                    <a
                      href={`mailto:${SITE_EMAIL}`}
                      className="font-semibold text-matte-black underline decoration-tiger-yellow/50 underline-offset-2 hover:text-tiger-yellow transition-colors"
                    >
                      {SITE_EMAIL}
                    </a>
                  </p>
                </div>
                <div className="w-14 h-1 bg-tiger-yellow rounded-full" />
              </div>
              <div className="lg:col-span-7 w-full max-w-xl lg:max-w-none lg:pl-4">
                <CareersApplyForm />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
