'use client';

import React from 'react';
import { cn } from '@/utils/cn';

const ImpactStats = () => {
  const stats = [
    {
      label: "Emissions Reduced",
      value: "50,000+",
      unit: "TONS",
      description: "Emissions saved by Tiger riders annually through sustainable commuting.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      label: "Global Reach",
      value: "150,000+",
      unit: "KM",
      description: "Tiger bikes have covered distance across 4 continents and 50 cities.",
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      label: "Recyclable Tech",
      value: "100%",
      unit: "RATIO",
      description: "Of TIGER battery platform components are fully recyclable.",
      color: "bg-orange-50 text-orange-600 border-orange-100"
    },
    {
      label: "Fast Charging",
      value: "45",
      unit: "MINS",
      description: "Average time to reach 80% charge at any ultra-fast Tiger station.",
      color: "bg-yellow-50 text-yellow-600 border-yellow-100"
    }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden" id="impact">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center lg:text-left">
        <div className="mb-24 flex flex-col items-center">
            <p className="text-tiger-green font-black uppercase tracking-[0.4em] text-xs mb-4">Sustainability First</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-matte-black tracking-[-0.04em] uppercase leading-none mb-8 text-center px-4">
                TIGER IMPACT
            </h2>
            <div className="w-24 h-2 bg-tiger-yellow mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center text-center p-12 rounded-[2.5rem] border transition-all duration-500 hover:scale-105 hover:shadow-2xl group",
                stat.color
              )}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 opacity-60">
                {stat.label}
              </span>
              <div className="mb-6">
                <span className="text-5xl md:text-6xl font-black tracking-tighter block">{stat.value}</span>
                <span className="text-sm font-black uppercase tracking-widest opacity-40">{stat.unit}</span>
              </div>
              <p className="text-neutral-500 text-sm font-medium leading-relaxed group-hover:text-neutral-700 transition-colors">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
