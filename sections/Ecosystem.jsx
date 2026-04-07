'use client';

import React from 'react';
import { Smartphone, Zap, Settings, ShieldCheck } from 'lucide-react';

const PILLARS = [
  {
    icon: <Zap size={28} strokeWidth={1.75} />,
    title: 'CHARGING NETWORK',
    text: "Fast DC charging stations across key routes, ensuring you're always powered.",
  },
  {
    icon: <Smartphone size={28} strokeWidth={1.75} />,
    title: 'TIGER CONTROL APP',
    text: 'Monitor battery, track rides, lock/unlock, and manage your vehicle remotely.',
  },
  {
    icon: <Settings size={28} strokeWidth={1.75} />,
    title: 'SERVICE GRID',
    text: 'Authorized service ecosystem designed for reliability and long-term performance.',
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.75} />,
    title: 'TIGER PROTECT',
    text: 'Comprehensive roadside assistance and warranty support for worry-free riding.',
  },
];

const Ecosystem = () => {
  return (
    <section className="py-24 bg-matte-black overflow-hidden relative border-t border-white/5" id="ecosystem">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-20 max-w-3xl text-center lg:text-left">
          <p className="text-tiger-yellow font-black uppercase tracking-[0.35em] text-[10px] md:text-xs mb-5">
            OWNERSHIP ECOSYSTEM
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] uppercase leading-[0.95]">
            INTEGRATED MOBILITY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PILLARS.map((item) => (
            <div
              key={item.title}
              className="group relative flex flex-col p-10 md:p-11 rounded-[2.5rem] border border-white/10 bg-white/[0.03] hover:bg-tiger-yellow hover:border-tiger-yellow/0 transition-all duration-500 hover:shadow-[0_24px_80px_rgba(250,204,21,0.12)]"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all duration-500 group-hover:border-black/10 group-hover:bg-matte-black group-hover:text-tiger-yellow">
                {item.icon}
              </div>

              <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-[0.08em] leading-snug mb-4 group-hover:text-matte-black">
                {item.title}
              </h3>
              <p className="text-sm md:text-[0.9375rem] text-neutral-400 leading-relaxed font-medium mb-8 flex-1 group-hover:text-matte-black/75">
                {item.text}
              </p>

              <button
                type="button"
                className="mt-auto inline-flex items-center gap-2 text-left text-[10px] font-black uppercase tracking-[0.22em] text-tiger-yellow transition-all duration-300 group-hover:text-matte-black group-hover:translate-x-1"
              >
                LEARN MORE <span aria-hidden>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
