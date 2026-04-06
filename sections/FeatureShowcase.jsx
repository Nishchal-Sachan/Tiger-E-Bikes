'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { cn } from '@/utils/cn';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const FeatureShowcase = () => {
  const slides = [
    {
      label: "Performance",
      title: "Hyper-Responsive Motor",
      detail: "Silent, brush-less power delivery with instant torque.",
      image: "/showcase-bike.png"
    },
    {
      label: "Intelligence",
      title: "Adaptive Vision System",
      detail: "360-degree sensor suite for autonomous safety.",
      image: "/scooter-1.png"
    },
    {
      label: "Design",
      title: "Aerodynamic Chassis",
      detail: "Lightweight carbon fiber frame with integrated lighting.",
      image: "/scooter-2.png"
    }
  ];

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background Layer (Cityscape) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[5s] scale-105"
        style={{ backgroundImage: "url('/showcase-bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <Swiper
          modules={[Navigation, EffectFade, Autoplay]}
          navigation={{
            nextEl: '.showcase-next',
            prevEl: '.showcase-prev',
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          loop={true}
          autoplay={{ delay: 5000 }}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className={cn(
                  "relative w-full h-full flex flex-col items-center justify-center px-6 transition-all duration-1000",
                  isActive ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                )}>
                  
                  {/* Glow Effect Layer */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] aspect-square rounded-full bg-white/20 blur-[100px] md:blur-[150px] animate-pulse pointer-events-none" />
                  
                  {/* Center Bike Image with Animation */}
                  <div className={cn(
                    "relative z-20 transition-all duration-[2000ms] ease-out-expo",
                    isActive ? "scale-110" : "scale-90"
                  )}>
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="max-h-[50vh] md:max-h-[60vh] object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
                    />
                  </div>

                  {/* Bottom Content Info */}
                  <div className="relative mt-12 text-center w-full max-w-[600px] flex flex-col gap-3 items-center">
                    <span className="text-white/40 font-bold uppercase tracking-[0.4em] leading-[1.4] block">
                      {slide.label}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.4]">
                       {slide.title}
                    </h2>
                    <p className="text-neutral-500 text-lg md:text-xl font-medium tracking-tight leading-[1.4]">
                      {slide.detail}
                    </p>

                    <button className="mt-8 flex items-center gap-2 mx-auto bg-white/5 border border-white/10 px-6 py-2 rounded-full text-white text-sm font-bold hover:bg-white/10 transition-all">
                       <Info size={16} /> Explore Engineering
                    </button>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 px-6 pointer-events-none flex justify-between">
          <button className="showcase-prev pointer-events-auto w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <ChevronLeft size={32} />
          </button>
          <button className="showcase-next pointer-events-auto w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Bottom Slide Indicator */}
        <div className="absolute bottom-12 z-30 flex gap-4 items-center">
            <div className="w-12 h-px bg-white/20" />
            <span className="text-white/40 text-xs font-bold tracking-widest font-mono">SCROLL TO DISCOVER</span>
            <div className="w-12 h-px bg-white/20" />
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
