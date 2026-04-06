'use client';

import React from 'react';
import { Smartphone, Zap, Settings, ShieldCheck } from 'lucide-react';

const Ecosystem = () => {
  const features = [
    {
      icon: <Zap size={32} />,
      title: "Smart Network",
      description: "Hyper-connected charging stations that find you first.",
      tag: "INFRASTRUCTURE"
    },
    {
      icon: <Smartphone size={32} />,
      title: "TIGER Control App",
      description: "Manage your energy, lock your bike, and track health 24/7.",
      tag: "DIGITAL"
    },
    {
      icon: <Settings size={32} />,
      title: "Charging Grid",
      description: "Proprietary fast-chargers available in 500+ locations.",
      tag: "SERVICE"
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Tiger Protection",
      description: "Comprehensive roadside and warranty support everywhere.",
      tag: "WARRANTY"
    }
  ];

  return (
    <section className="py-24 bg-matte-black overflow-hidden relative border-t border-white/5" id="ecosystem">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-20 text-center lg:text-left">
            <p className="text-tiger-yellow font-black uppercase tracking-[0.4em] text-xs mb-4">Tiger Ecosystem</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] uppercase leading-none italic">
                INTEGRATED <br className="hidden md:block" /> <span className="text-white/20">MOBILITY</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:bg-tiger-yellow transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-matte-black group-hover:text-tiger-yellow transition-all duration-500 shadow-sm">
                {feature.icon}
              </div>
              <span className="text-tiger-yellow font-black uppercase text-[10px] tracking-[0.4em] mb-4 block group-hover:text-black">
                {feature.tag}
              </span>
              <h3 className="text-2xl font-black text-white group-hover:text-black uppercase italic mb-6 leading-tight">
                {feature.title}
              </h3>
              <p className="text-neutral-400 group-hover:text-black/70 text-sm font-medium leading-relaxed mb-8">
                {feature.description}
              </p>
              <button className="text-tiger-yellow group-hover:text-black font-black uppercase text-[10px] tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-all duration-500">
                  Read More &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
