'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Zap, Settings, ShieldCheck } from 'lucide-react';

const PILLARS = [
  {
    icon: Zap,
    title: 'Charging Network',
    text: 'Access a growing network of fast and standard charging solutions designed for everyday convenience. Optimized smart charging ensures efficient power usage and reduced charging time.',
    href: '/#battery-tech',
  },
  {
    icon: Smartphone,
    title: 'Smart Control App',
    text: 'Stay connected with your vehicle through a dedicated mobile app. Track battery health, monitor rides, enable anti-theft protection, and remotely control key vehicle functions.',
    href: '/#battery-tech',
  },
  {
    icon: Settings,
    title: 'Service Network',
    text: 'Authorized service centers ensure consistent performance and reliability. Built for low maintenance, our EVs reduce service costs while delivering long-term durability.',
    href: '/dealership',
  },
  {
    icon: ShieldCheck,
    title: 'Warranty & Protection',
    text: 'Comprehensive warranty coverage with advanced safety systems including battery protection, over-voltage safeguards, and thermal monitoring for worry-free ownership.',
    href: '/#faq',
  },
];

const TRUST_STRIP = ['Low Maintenance', 'Smart Charging', 'Connected Experience', 'Reliable Performance'];

const Ecosystem = () => {
  return (
    <section className="py-24 bg-matte-black text-white overflow-hidden relative border-t border-white/5" id="ecosystem">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(250,204,21,0.14),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent" aria-hidden />
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-[1]">
        <div className="mb-16 md:mb-20 max-w-3xl text-center lg:text-left space-y-6 md:space-y-8">
          <p className="text-tiger-yellow font-black uppercase tracking-[0.35em] text-[10px] md:text-xs">
            OWNERSHIP ECOSYSTEM
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] leading-[0.95] uppercase">
            Complete Ownership Ecosystem
          </h2>
          <div className="w-14 h-1 bg-tiger-yellow rounded-full mx-auto lg:mx-0" aria-hidden />
          <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0 border-l-4 border-tiger-yellow/70 pl-5 md:pl-6">
            Beyond just a vehicle — TIGER EV offers a connected ecosystem designed for seamless riding, smarter control,
            and long-term reliability.
          </p>
        </div>

        <div
          className="mb-12 md:mb-16 flex flex-wrap items-center justify-center gap-x-1 gap-y-3 lg:justify-start text-center lg:text-left max-w-5xl mx-auto lg:mx-0 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3.5 sm:px-6 sm:py-4 backdrop-blur-sm shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
          aria-label="Ownership ecosystem highlights"
        >
          {TRUST_STRIP.map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 ? (
                <span className="text-white/30 select-none px-1.5 sm:px-2 font-light" aria-hidden>
                  •
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs md:text-[0.9375rem] font-semibold text-neutral-200 tracking-tight">
                <span className="text-tiger-yellow shrink-0" aria-hidden>
                  {'\u2714'}
                </span>
                {label}
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-9 lg:gap-8">
          {PILLARS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col p-10 md:p-11 rounded-[2.5rem] border border-white/10 bg-white/[0.04] shadow-[0_12px_48px_rgba(0,0,0,0.35)] hover:bg-tiger-yellow hover:border-tiger-yellow/0 transition-all duration-500 hover:shadow-[0_28px_90px_rgba(250,204,21,0.22)] hover:-translate-y-1"
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] text-white transition-all duration-500 group-hover:border-black/10 group-hover:bg-matte-black group-hover:text-tiger-yellow group-hover:shadow-[0_0_36px_rgba(250,204,21,0.5)] group-hover:ring-2 group-hover:ring-tiger-yellow/35">
                  <Icon size={28} strokeWidth={1.75} aria-hidden />
                </div>

                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-[0.08em] leading-snug mb-4 group-hover:text-matte-black">
                  {item.title}
                </h3>
                <p className="text-sm md:text-[0.9375rem] text-neutral-300 leading-relaxed font-medium mb-8 flex-1 min-h-0 group-hover:text-matte-black/80">
                  {item.text}
                </p>

                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center gap-2 text-left text-[10px] font-black uppercase tracking-[0.22em] text-tiger-yellow transition-all duration-300 group-hover:text-matte-black group-hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tiger-yellow"
                >
                  LEARN MORE <span aria-hidden>→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
