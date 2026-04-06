'use client';

import React, { useState } from 'react';
import { ChevronRight, Zap, Target, Gauge, Battery } from 'lucide-react';
import { cn } from '@/utils/cn';

const VehicleShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('Scooters');
  const [selectedVehicleId, setSelectedVehicleId] = useState(1);

  const vehicleData = {
    'Scooters': [
      {
        id: 1,
        name: 'TIGER X1 ELITE',
        tagline: 'The Ultimate High Speed Scooter',
        image: '/scooter-1.png',
        price: '₹ 1,14,999',
        specs: [
          { icon: <Zap size={18} />, label: 'Peak Power', value: '2.4 kW' },
          { icon: <Gauge size={18} />, label: 'Top Speed', value: '110 kmph' },
          { icon: <Battery size={18} />, label: 'Range', value: '101 km' },
          { icon: <Target size={18} />, label: 'Acceleration', value: '3.5s (0-40)' }
        ]
      },
      {
        id: 2,
        name: 'TIGER X1 PLUS',
        tagline: 'Most Reliable City Cruiser',
        image: '/scooter-2.png',
        price: '₹ 94,999',
        specs: [
          { icon: <Zap size={18} />, label: 'Peak Power', value: '1.5 kW' },
          { icon: <Gauge size={18} />, label: 'Top Speed', value: '85 kmph' },
          { icon: <Battery size={18} />, label: 'Range', value: '180 km' },
          { icon: <Target size={18} />, label: 'Acceleration', value: '4.2s (0-40)' }
        ]
      }
    ],
    'Motorcycles': [
      {
        id: 3,
        name: 'TIGER STORM 350',
        tagline: 'Limitless Performance',
        image: '/bike-1.png',
        price: '₹ 1,29,999',
        specs: [
          { icon: <Zap size={18} />, label: 'Peak Power', value: '12 kW' },
          { icon: <Gauge size={18} />, label: 'Top Speed', value: '160 kmph' },
          { icon: <Battery size={18} />, label: 'Range', value: '250 km' },
          { icon: <Target size={18} />, label: 'Acceleration', value: '3.2s (0-100)' }
        ]
      },
      {
        id: 4,
        name: 'TIGER BLAZE 350',
        tagline: 'High-End Long Range Bike',
        image: '/bike-2.png',
        price: '₹ 1,49,999',
        specs: [
          { icon: <Zap size={18} />, label: 'Peak Power', value: '10 kW' },
          { icon: <Gauge size={18} />, label: 'Top Speed', value: '140 kmph' },
          { icon: <Battery size={18} />, label: 'Range', value: '320 km' },
          { icon: <Target size={18} />, label: 'Acceleration', value: '4.5s (0-100)' }
        ]
      }
    ]
  };

  const currentVehicles = vehicleData[selectedCategory];
  const selectedVehicle = currentVehicles.find(v => v.id === selectedVehicleId) || currentVehicles[0];

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedVehicleId(vehicleData[cat][0].id);
  };

  return (
    <section className="py-32 bg-matte-black border-y border-white/5 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Top Header & Tabs */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="space-y-4">
            <span className="text-tiger-yellow font-black uppercase tracking-[0.4em] text-xs block text-center lg:text-left">Technical Excellence</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-[-0.04em] leading-none uppercase text-center lg:text-left">
                TIGER <span className="text-neutral-700 italic">LINEUP</span>
            </h2>
          </div>

          <div className="flex bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-md mx-auto lg:mx-0">
             {Object.keys(vehicleData).map(cat => (
               <button 
                 key={cat}
                 onClick={() => handleCategoryChange(cat)}
                 className={cn(
                  "px-10 py-4 rounded-[1.5rem] text-xs font-black tracking-widest uppercase transition-all duration-300",
                  selectedCategory === cat ? "bg-tiger-yellow text-black shadow-[0_10px_30px_rgba(250,204,21,0.2)]" : "text-neutral-500 hover:text-white"
                 )}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Vehicle List */}
          <div className="lg:col-span-3 space-y-3">
             {currentVehicles.map(vehicle => (
               <button 
                 key={vehicle.id}
                 onClick={() => setSelectedVehicleId(vehicle.id)}
                 className={cn(
                   "w-full text-left p-8 rounded-[2rem] border transition-all duration-500 group relative overflow-hidden",
                   selectedVehicleId === vehicle.id 
                    ? "bg-white/10 border-white/20 shadow-2xl" 
                    : "bg-transparent border-transparent hover:bg-white/5"
                 )}
               >
                 {selectedVehicleId === vehicle.id && (
                   <div className="absolute left-0 top-0 w-1 h-full bg-tiger-yellow" />
                 )}
                 <span className={cn(
                   "text-[10px] font-black uppercase tracking-[0.2em] mb-2 block",
                   selectedVehicleId === vehicle.id ? "text-tiger-yellow" : "text-neutral-600"
                 )}>
                   {vehicle.tagline}
                 </span>
                 <h3 className={cn(
                   "text-2xl font-black tracking-tight flex items-center justify-between uppercase italic",
                   selectedVehicleId === vehicle.id ? "text-white" : "text-neutral-600"
                 )}>
                   {vehicle.name}
                   <ChevronRight className={cn(
                     "transition-transform",
                     selectedVehicleId === vehicle.id ? "translate-x-0 opacity-100" : "translate-x-[-10px] opacity-0"
                   )} />
                 </h3>
               </button>
             ))}
          </div>

          {/* Center: Image Showcase */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-8 bg-white/[0.02] rounded-[3rem] border border-white/5 min-h-[600px] group/showcase">
             {/* Background glow behind image */}
             <div className="absolute inset-x-0 bottom-0 bg-tiger-yellow/10 blur-[150px] h-1/2 rounded-full scale-125 animate-pulse" />
             
             <div key={selectedVehicleId} className="relative z-10 animate-in fade-in zoom-in-95 duration-700 flex flex-col items-center">
               <img 
                 src={selectedVehicle.image} 
                 alt={selectedVehicle.name} 
                 className="max-h-[400px] md:max-h-[500px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-transform duration-1000 group-hover/showcase:scale-105"
               />
               <p className="mt-8 text-white/20 font-black text-[7rem] md:text-[9rem] leading-none absolute -bottom-12 select-none uppercase tracking-tighter opacity-10 italic">
                  {selectedVehicle.name.split(' ')[0]}
               </p>
             </div>
          </div>

          {/* Right: Technical Specs */}
          <div className="lg:col-span-3 space-y-10 bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-md">
             <div>
                <h4 className="text-tiger-yellow text-[10px] font-black uppercase tracking-[0.4em] mb-2">Technical Dossier</h4>
                <p className="text-white text-2xl font-black italic uppercase">Core Metrics</p>
             </div>

             <div key={selectedVehicleId + '_specs'} className="space-y-6">
               {selectedVehicle.specs.map((spec, i) => (
                 <div key={i} className="flex flex-col gap-1 border-b border-white/5 pb-5 last:border-0 group cursor-default">
                    <div className="flex items-center gap-3 text-neutral-500 transition-all">
                       <span className="text-tiger-yellow/50 group-hover:text-tiger-yellow transition-colors">{spec.icon}</span>
                       <span className="text-[10px] uppercase font-black tracking-widest leading-none">{spec.label}</span>
                    </div>
                    <span className="text-3xl font-black text-white tracking-tight">{spec.value}</span>
                 </div>
               ))}
             </div>

             <div className="space-y-3 pt-4">
                <button className="w-full bg-tiger-yellow text-black py-6 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-[1.02] transition-all active:scale-95 shadow-[0_20px_40px_rgba(250,204,21,0.1)] italic">
                    Reserve Now
                </button>
                <button className="w-full bg-white/10 text-white py-6 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/20 transition-all active:scale-95 italic border border-white/10">
                    Locate Showroom
                </button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;
