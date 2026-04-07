'use client';

import React from 'react';

const FEATURES = [
  {
    title: 'FAST CHARGING',
    detail: 'Charge up to 70% in under 20 minutes',
  },
  {
    title: 'THERMAL CONTROL',
    detail: 'Maintains optimal performance across all conditions',
  },
  {
    title: 'SMART BMS',
    detail: 'Real-time battery health monitoring',
  },
  {
    title: 'LONG LIFE',
    detail: 'Designed for thousands of charge cycles',
  },
];

const BatteryTech = () => {
  return (
    <section className="py-32 pb-36 md:pb-32 bg-white overflow-hidden relative" id="charging">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-0">
          {/* Left: spec sheet */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-10 xl:sticky xl:top-28">
            <div className="space-y-4">
              <div className="w-12 h-px bg-matte-black" />
              <p className="text-matte-black text-[10px] md:text-xs font-semibold uppercase tracking-[0.35em]">
                ENGINEERED ENERGY
              </p>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-matte-black leading-[1.05] uppercase tracking-tight max-w-xl">
              POWER THAT DRIVES{' '}
              <span className="text-tiger-yellow">EVERY MODEL</span>
            </h3>

            <p className="text-neutral-600 text-base md:text-lg font-normal leading-relaxed max-w-lg border-l border-neutral-200 pl-6">
              From SPARK to NOVA, every TIGER vehicle is powered by advanced battery architecture designed for efficiency,
              safety, and long-term reliability.
            </p>

            <dl className="space-y-0 max-w-xl border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50/50">
              {FEATURES.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-neutral-200 last:border-b-0 px-5 py-4 md:px-6 md:py-5"
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

          {/* Right: product visual + badge */}
          <div className="lg:col-span-12 xl:col-span-7 relative group mt-8 xl:mt-0">
            <div className="relative z-10 p-10 md:p-14 bg-neutral-50 rounded-[2.5rem] border border-neutral-200 overflow-hidden aspect-square md:aspect-[16/10] flex items-center justify-center">
              <img
                src="/battery-tech.png"
                alt="TIGER battery architecture — shared across SPARK, GLIDE, VOLT, and NOVA"
                className="w-full h-full object-contain drop-shadow-[0_0_80px_rgba(250,204,21,0.15)] transition-transform duration-1000 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-tiger-yellow/[0.06] blur-[120px] rounded-full scale-90 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            </div>

            <div className="absolute -bottom-6 left-0 md:-bottom-8 md:left-4 z-20 bg-matte-black px-8 py-6 md:px-10 md:py-8 rounded-2xl border border-white/10 shadow-2xl max-w-[min(100%,320px)]">
              <p className="text-tiger-yellow font-black text-4xl md:text-5xl tracking-tighter tabular-nums leading-none">
                5000+
              </p>
              <p className="text-white/50 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.28em] mt-2">
                CHARGE CYCLES
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BatteryTech;
