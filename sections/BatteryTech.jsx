'use client';

import React from 'react';
import { Battery, Zap, Target } from 'lucide-react';

const BatteryTech = () => {
  return (
    <section className="py-32 bg-white overflow-hidden relative" id="charging">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Main 50/50 Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center mb-32">
            {/* LEFT: Info */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-12">
              <div className="space-y-4">
                <div className="w-12 h-1 bg-tiger-yellow" />
                <h4 className="text-neutral-400 text-xs font-black uppercase tracking-[0.4em]">Engineered for Thrill</h4>
              </div>
              
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-matte-black leading-[0.9] uppercase tracking-tighter">
                TIGER <br /> <span className="text-tiger-yellow">CELL</span> <br /> ARCHITECTURE
              </h3>

              <div className="space-y-8 max-w-md">
                <p className="text-neutral-500 text-lg md:text-xl font-medium leading-relaxed">
                  Our proprietary battery technology delivers higher energy density and thermal stability, ensuring consistent power delivery even under extreme riding conditions.
                </p>
                
                <ul className="space-y-4">
                  {['Thermal Management System', 'Intelligent BMS', 'IP67 Waterproof', 'Fast Charge Ready'].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-matte-black font-black uppercase text-xs tracking-widest italic translate-hover transition-all">
                      <div className="w-1.5 h-1.5 bg-tiger-yellow rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: Visual Element */}
            <div className="lg:col-span-12 xl:col-span-7 relative group mt-12 xl:mt-0">
               <div className="relative z-10 p-12 bg-neutral-50 rounded-[3rem] border border-neutral-100 backdrop-blur-3xl overflow-hidden aspect-square md:aspect-video flex items-center justify-center">
                 <img 
                  src="/battery-tech.png" 
                  alt="TIGER Battery Technology" 
                  className="w-full h-full object-contain drop-shadow-[0_0_100px_rgba(250,204,21,0.2)] transition-transform duration-1000 group-hover:scale-110"
                 />
                 
                 {/* Floating Glow */}
                 <div className="absolute inset-0 bg-tiger-yellow/10 blur-[150px] rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
               </div>

               {/* Stats Overlay */}
               <div className="absolute -bottom-10 -left-10 z-20 bg-matte-black p-10 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-2 group-hover:-translate-y-4 transition-transform duration-500 hidden md:block">
                  <p className="text-tiger-yellow font-black text-5xl tracking-tighter">5000+</p>
                  <p className="text-white/40 text-[10px] uppercase font-black tracking-widest">Charge Cycles</p>
               </div>
            </div>
          </div>

          {/* Value Props Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap size={32} />, title: "Ultra Efficient", desc: "98% Energy conversion rate for maximum tiger range." },
              { icon: <Target size={32} />, title: "Smart BMS", desc: "AI-driven algorithms to monitor cell health 24/7." },
              { icon: <Battery size={32} />, title: "Fast Charge", desc: "Recoup 80% energy in just 45 minutes of top-up." }
            ].map((prop, i) => (
              <div key={i} className="group p-10 bg-neutral-50 rounded-[2.5rem] border border-neutral-100 hover:border-tiger-yellow/30 transition-all duration-500">
                <div className="w-16 h-16 flex items-center justify-center bg-matte-black rounded-[1.5rem] shadow-xl group-hover:bg-tiger-yellow group-hover:text-black transition-colors duration-500 text-white mb-8">
                  {prop.icon}
                </div>
                <h4 className="text-xl font-black text-matte-black uppercase italic mb-4">{prop.title}</h4>
                <p className="text-neutral-500 text-sm font-medium leading-relaxed">{prop.desc}</p>
                <div className="mt-8 h-[3px] w-12 bg-tiger-yellow opacity-20 group-hover:opacity-100 group-hover:w-24 transition-all duration-500" />
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default BatteryTech;
