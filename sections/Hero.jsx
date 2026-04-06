'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Hero = () => {
  const slides = [
    {
      title: "TIGER X1 ELITE",
      description: "Unleash the ultimate power of the Tiger X-Platform. Engineered for long-distance urban dominance and peak performance.",
      image: "/hero-1.png",
      price: "1,14,999",
      mileage: "151 KM",
      rangeLabel: "TIGER RANGE"
    },
    {
      title: "TIGER STORM 350",
      description: "Silent power delivery with instant torque. Our electric motorcycles are built for those who refuse to compromise on style or speed.",
      image: "/hero-2.png",
      price: "1,45,999",
      mileage: "201 KM",
      rangeLabel: "TIGER RANGE"
    }
  ];

  return (
    <section className="relative w-full h-[calc(100vh-70px)] overflow-hidden bg-matte-black z-0 group/hero">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full h-full overflow-hidden">
            {({ isActive }) => (
              <div className="relative w-full h-full flex items-center">
                
                {/* BACKGROUND IMAGE - Improved visibility */}
                <div 
                  className={cn(
                    "absolute inset-0 z-0 transition-transform duration-[8000ms] ease-out",
                    isActive ? "scale-100" : "scale-110"
                  )}
                >
                  <img 
                    src={slide.image} 
                    className="w-full h-full object-cover filter brightness-[0.7] opacity-90" 
                    alt={slide.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black to-transparent" />
                </div>

                {/* CONTENT - Reduced typographic scale to prevent overflow */}
                <div className="relative z-10 w-full px-6 md:px-24 lg:px-44 max-w-[1600px] mx-auto">
                  
                  {/* BADGES */}
                  <div className={cn(
                    "flex flex-wrap gap-4 mb-10 transition-all duration-1000 delay-[100ms]",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}>
                    <div className="bg-tiger-yellow text-black px-6 py-2.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-[0_10px_30px_rgba(250,204,21,0.3)]">
                      STARTING AT ₹ {slide.price}/-
                    </div>
                    <div className="bg-white/10 backdrop-blur-md text-white px-6 py-2.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest border border-white/10">
                      {slide.mileage} {slide.rangeLabel}
                    </div>
                  </div>

                  {/* HEADING - Stabilized scale for laptop viewports */}
                  <div className={cn(
                    "transition-all duration-[1000ms] delay-[200ms]",
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[100px]"
                  )}>
                    <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black text-white tracking-[-0.04em] uppercase leading-[0.9] mb-8">
                      {slide.title.split(' ')[0]} <br />
                      <span className="text-neutral-500 italic opacity-40">{slide.title.split(' ').slice(1).join(' ')}</span>
                    </h1>
                  </div>

                  {/* PARAGRAPH */}
                  <p className={cn(
                    "text-neutral-300 text-base md:text-xl font-medium leading-relaxed max-w-xl md:max-w-2xl mb-14 transition-all duration-[1000ms] delay-[400ms]",
                    isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[100px]"
                  )}>
                    {slide.description}
                  </p>

                  {/* CTAs */}
                  <div className={cn(
                    "flex flex-col sm:flex-row gap-6 transition-all duration-[1000ms] delay-[600ms]",
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[40px]"
                  )}>
                    <button className="bg-tiger-yellow text-black px-12 md:px-14 py-5 md:py-6 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(250,204,21,0.2)] transition-all duration-300 ease-out italic">
                        BUY NOW
                    </button>
                    <button className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-12 md:px-14 py-5 md:py-6 rounded-2xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-white hover:text-matte-black transition-all duration-300 ease-out italic text-center">
                        BOOK TEST DRIVE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        {/* CONTROLS */}
        <button className="hero-prev absolute top-1/2 left-8 md:left-12 -translate-y-1/2 z-30 w-16 h-16 flex items-center justify-center text-white/30 hover:text-white transition-all bg-black/10 border border-white/5 rounded-full backdrop-blur-md opacity-0 group-hover/hero:opacity-100">
          <ChevronLeft size={40} />
        </button>
        <button className="hero-next absolute top-1/2 right-8 md:right-12 -translate-y-1/2 z-30 w-16 h-16 flex items-center justify-center text-white/30 hover:text-white transition-all bg-black/10 border border-white/5 rounded-full backdrop-blur-md opacity-0 group-hover/hero:opacity-100">
          <ChevronRight size={40} />
        </button>
      </Swiper>
    </section>
  );
};

export default Hero;
