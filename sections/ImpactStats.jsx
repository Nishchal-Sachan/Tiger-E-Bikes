import { cn } from '@/utils/cn';

const TRUST_ITEMS = ['Low Maintenance', 'Eco-Friendly', 'Cost Efficient', 'Built for Indian Roads'];

export const IMPACT_STATS_DEFAULT = [
  {
    title: '50–140 KM Range Per Charge',
    subtext: 'Optimized for daily commuting with extended range efficiency.',
    accent: 'border-l-emerald-500/55',
  },
  {
    title: 'Up to 80% Lower Running Cost',
    subtext: 'Significantly cheaper than petrol vehicles with minimal maintenance.',
    accent: 'border-l-indigo-500/55',
  },
  {
    title: 'Zero Tailpipe Emissions',
    subtext: 'Cleaner rides that actively reduce urban pollution.',
    accent: 'border-l-sky-500/55',
  },
  {
    title: 'Smart Charging (3–5 Hours)',
    subtext: 'Convenient charging designed for everyday usage.',
    accent: 'border-l-amber-500/55',
  },
];

export default function ImpactStats({
  sectionId = 'impact',
  showIntro = true,
  title = 'Driving a Cleaner Future',
  description =
    'Every TIGER EV ride reduces emissions, lowers fuel dependency, and supports a smarter, more sustainable way of commuting. Designed for efficiency and affordability, our vehicles redefine urban mobility.',
  stats = IMPACT_STATS_DEFAULT,
} = {}) {
  return (
    <section
      className="py-24 md:py-28 bg-neutral-50 text-matte-black overflow-hidden border-t border-neutral-200/80"
      id={sectionId}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {showIntro ? (
          <div className="mb-10 md:mb-14 max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-matte-black tracking-[-0.04em] leading-none mb-4">
              {title}
            </h2>
            <p className="text-neutral-600 text-base md:text-[1.05rem] leading-relaxed font-medium">
              {description}
            </p>
            <div className="w-14 h-1 bg-tiger-yellow rounded-full mt-6" />
          </div>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat) => {
            const key = stat.title ?? stat.line;
            const heading = stat.title ?? stat.line;
            return (
              <article
                key={key}
                className={cn(
                  'rounded-2xl border border-neutral-200/90 bg-white px-6 py-7 md:px-7 md:py-8 shadow-sm',
                  'border-l-[3px] transition-all duration-300 ease-out',
                  'hover:shadow-md hover:-translate-y-1 hover:border-neutral-300/90',
                  stat.accent
                )}
              >
                <p className="text-lg md:text-xl font-black text-matte-black leading-tight tracking-tight mb-3">
                  {heading}
                </p>
                {stat.subtext ? (
                  <p className="text-sm md:text-[0.9375rem] text-neutral-600 leading-relaxed font-normal">
                    {stat.subtext}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>

        <div
          className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-center sm:justify-start text-[11px] sm:text-xs md:text-[0.9375rem] text-neutral-600 font-medium"
          aria-label="Sustainability highlights"
        >
          {TRUST_ITEMS.map((label, i) => (
            <span key={label} className="inline-flex items-center">
              {i > 0 ? (
                <span className="text-neutral-300 select-none px-1.5 sm:px-2.5" aria-hidden>
                  •
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1 text-neutral-700">
                <span className="text-tiger-green shrink-0" aria-hidden>
                  {'\u2714'}
                </span>
                {label}
              </span>
            </span>
          ))}
        </div>

        <p className="mt-8 md:mt-10 text-center sm:text-left text-sm md:text-base text-neutral-600 font-medium leading-relaxed max-w-3xl mx-auto sm:mx-0 border-l-4 border-tiger-green/50 pl-5">
          Electric mobility isn&apos;t just the future — it&apos;s the smarter choice today.
        </p>
      </div>
    </section>
  );
}
