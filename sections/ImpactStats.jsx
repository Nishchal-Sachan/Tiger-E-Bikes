'use client';

import React from 'react';
import { cn } from '@/utils/cn';

const STATS = [
  { line: '1,24,095+ Tons CO2 Saved', accent: 'border-l-emerald-500' },
  { line: '306 Million+ KM Electric Driven', accent: 'border-l-indigo-600' },
  { line: '26,000+ Lithium Efficiency Optimized', accent: 'border-l-blue-600' },
  { line: '78% Riders Choose Electric', accent: 'border-l-amber-600' },
];

const ImpactStats = () => {
  return (
    <section className="py-24 md:py-28 bg-neutral-50 overflow-hidden border-t border-neutral-200/80" id="impact">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-10 md:mb-12 max-w-xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-matte-black tracking-[-0.04em] leading-none mb-4">
            Driving Change
          </h2>
          <p className="text-neutral-600 text-base md:text-[1.05rem] leading-snug font-medium">
            Every TIGER ride contributes to a cleaner, smarter, and more sustainable future.
          </p>
          <div className="w-14 h-1 bg-tiger-yellow rounded-full mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {STATS.map((stat) => (
            <article
              key={stat.line}
              className={cn(
                'rounded-2xl border border-neutral-200 bg-white px-6 py-7 md:px-7 md:py-8 shadow-sm',
                'border-l-4 transition-shadow duration-300 hover:shadow-md',
                stat.accent
              )}
            >
              <p className="text-lg md:text-xl font-black text-matte-black leading-tight tracking-tight">
                {stat.line}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
