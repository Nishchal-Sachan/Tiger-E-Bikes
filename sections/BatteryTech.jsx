import { Battery, Gauge, ShieldCheck, Zap } from 'lucide-react';

const FEATURES = [
  {
    title: 'FAST CHARGING',
    detail:
      'Charge up to 70% in just 20 minutes with optimized fast-charging technology designed for minimal downtime.',
  },
  {
    title: 'THERMAL CONTROL',
    detail:
      'Advanced thermal management system maintains optimal temperature across extreme weather conditions.',
  },
  {
    title: 'SMART BMS',
    detail:
      'Intelligent Battery Management System monitors performance, voltage, and safety in real-time.',
  },
  {
    title: 'LONG LIFE',
    detail:
      'Engineered for 5000+ charge cycles with minimal degradation for long-term reliability.',
  },
];

const SPEC_STRIP = [
  { label: '5000+ Charge Cycles', icon: Battery },
  { label: 'Fast Charging Support', icon: Zap },
  { label: 'Smart BMS Protection', icon: ShieldCheck },
  { label: 'High Energy Density', icon: Gauge },
];

export default function BatteryTech({ hideEyebrow = false, sectionId = 'battery-tech' } = {}) {
  return (
    <section
      className="py-32 pb-36 md:pb-32 bg-white text-matte-black overflow-hidden relative border-t border-neutral-200/80"
      id={sectionId}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_15%_20%,rgba(250,204,21,0.07),transparent_55%)]"
        aria-hidden
      />
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-[1]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-0">
          {/* Left: copy + features */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-10 xl:sticky xl:top-28">
            {!hideEyebrow ? (
              <div className="space-y-4">
                <div className="w-12 h-px bg-matte-black" />
                <p className="text-matte-black text-[10px] md:text-xs font-semibold uppercase tracking-[0.35em]">
                  ENGINEERED ENERGY
                </p>
              </div>
            ) : null}

            <div className="space-y-5 max-w-xl">
              <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-matte-black leading-[1.05] uppercase tracking-tight">
                Advanced{' '}
                <span className="text-tiger-yellow">Battery Technology</span>
              </h3>
              <div className="w-14 h-1 bg-tiger-yellow rounded-full" aria-hidden />
            </div>

            <p className="text-neutral-600 text-base md:text-lg font-medium leading-relaxed max-w-lg border-l-4 border-tiger-yellow/80 pl-6">
              Every TIGER EV is powered by a high-efficiency lithium-ion battery system engineered for performance,
              safety, and long-term durability. Designed for real-world Indian conditions, it delivers consistent
              power, faster charging, and extended lifecycle reliability.
            </p>

            <p className="text-[11px] md:text-xs text-neutral-600 leading-relaxed max-w-lg pl-5 pr-4 py-3 border border-neutral-200 border-l-4 border-l-tiger-yellow bg-gradient-to-r from-tiger-yellow/[0.08] via-tiger-yellow/[0.03] to-transparent rounded-r-lg shadow-sm">
              <span className="font-bold text-matte-black uppercase tracking-wide text-[10px] md:text-[11px]">
                Tested across 10,000+ km
              </span>{' '}
              <span className="font-medium">in real-world riding conditions.</span>
            </p>

            <dl className="space-y-0 max-w-xl border border-neutral-200 rounded-2xl overflow-hidden bg-neutral-50 shadow-sm">
              {FEATURES.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-neutral-200 last:border-b-0 px-5 py-4 md:px-6 md:py-5 transition-all duration-300 hover:bg-white hover:shadow-md hover:z-[1] relative"
                >
                  <dt className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-matte-black mb-1.5">
                    {item.title}
                  </dt>
                  <dd className="text-sm md:text-[0.9375rem] text-neutral-600 leading-relaxed font-normal">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: battery visual + lifecycle badge (single container) */}
          <div className="lg:col-span-12 xl:col-span-7 mt-8 xl:mt-0">
            <div className="relative rounded-[2.5rem] border border-neutral-200 bg-neutral-50/90 overflow-hidden aspect-square md:aspect-[16/10] isolate">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_65%_55%,rgba(250,204,21,0.14),rgba(250,250,250,0.4)_45%,transparent_72%)]"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-neutral-100/60" aria-hidden />

              <div className="relative z-[1] flex h-full items-center justify-center p-8 sm:p-10 md:p-14 group">
                <img
                  src="/battery-tech.png"
                  alt="TIGER high-efficiency lithium-ion battery system"
                  className="w-full h-full max-h-[min(100%,420px)] md:max-h-none object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.12)] shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-7 md:right-7 z-10 flex flex-col items-end gap-2 max-w-[min(calc(100%-2rem),300px)] text-right">
                <div className="bg-matte-black px-5 py-4 sm:px-7 sm:py-5 md:px-8 md:py-6 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                  <p className="text-tiger-yellow font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter tabular-nums leading-none">
                    5000+
                  </p>
                  <p className="text-white/50 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.26em] mt-2">
                    CHARGE CYCLES
                  </p>
                </div>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500 pr-0.5">
                  Battery Lifecycle
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spec strip */}
        <div
          className="mt-14 md:mt-20 pt-8 md:pt-10 border-t border-neutral-200"
          aria-label="Battery specifications"
        >
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50/90 px-4 py-5 md:px-8 md:py-6 shadow-sm">
            <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:items-center lg:justify-between lg:gap-6">
              {SPEC_STRIP.map(({ label, icon: Icon }, i) => (
                <li
                  key={label}
                  className={`flex items-center gap-3 text-matte-black text-xs md:text-sm font-semibold leading-snug ${
                    i > 0 ? 'lg:pl-8 lg:ml-1 lg:border-l lg:border-neutral-200' : ''
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-matte-black shadow-sm [&>svg]:h-[18px] [&>svg]:w-[18px] [&>svg]:stroke-[1.5]">
                    <Icon aria-hidden />
                  </span>
                  <span className="tracking-tight text-neutral-700">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
