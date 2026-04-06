'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

// Import Swiper styles correctly for version 12
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const FeatureSliderSection = () => {
  const slides = [
    {
      label: "PERFORMANCE REINVENTED",
      title: <>HYPER<br className="md:hidden"/> RESPONSIVE MOTOR</>,
      description: "Silent, brushless power delivery with instant torque, making every ride effortless and exhilarating. Engineered for those who refuse to compromise on speed or sustainability.",
      image: "/showcase-bg.png"
    },
    {
      label: "INTELLIGENCE AT SCALE",
      title: <>ADAPTIVE<br className="md:hidden"/> VISION SYSTEM</>,
      description: "360-degree sensor suite for autonomous safety. Experience the next generation of predictive urban travel with onboard deep learning assets.",
      image: "/hero-1.png"
    },
    {
      label: "AESTHETIC INNOVATION",
      title: <>CARBON<br className="md:hidden"/> FIBER CHASSIS</>,
      description: "Lightweight, ultra-durable carbon fiber frame with integrated lighting. Engineered for aerodynamics and unrivaled urban presence.",
      image: "/hero-2.png"
    }
  ];

  return (
    <section className="relative w-full h-[calc(100vh-70px)] overflow-hidden bg-black flex items-center justify-center group">
      
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.feature-next',
          prevEl: '.feature-prev',
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              
              {/* BACKGROUND: absolute inset-0 */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt="Feature Background" 
                  className="w-full h-full object-cover" 
                />
                {/* ENHANCED OVERLAY: bg-gradient-to-b from-black/40 via-black/60 to-black/80 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
              </div>

              {/* CONTENT CENTERED: relative z-10 flex items-center justify-center */}
              <div className="relative z-10 flex items-center justify-center h-full px-6">
                
                {/* GLASSMORPHIC CONTAINER: backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 md:p-12 */}
                <div className="text-center text-white max-w-4xl flex flex-col items-center justify-center backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8 md:p-16 transition-all hover:bg-white/10 group/card">
                  
                  <p className="text-base md:text-lg uppercase tracking-[0.4em] text-neutral-300 font-bold leading-none italic mb-8">
                    {slide.label}
                  </p>

                  <h2 className="text-4xl md:text-8xl font-black leading-none uppercase tracking-tighter mb-8">
                    {slide.title}
                  </h2>

                  <p className="text-neutral-300 text-lg md:text-xl leading-[1.4] max-w-2xl mx-auto font-medium mb-10">
                    {slide.description}
                  </p>

                  <div className="pt-2">
                    {/* EXPLORE ENGINEERING BUTTON: border -> bg-black/white hover transition */}
                    <button className="border-2 border-white/40 text-white px-12 py-5 rounded-full hover:bg-white hover:text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 ease-out font-black uppercase text-xs tracking-widest active:scale-95">
                      EXPLORE ENGINEERING &rarr;
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CUSTOM NAVIGATION: Floating Arrows */}
      <button className="feature-prev absolute top-1/2 left-8 -translate-y-1/2 z-30 w-16 h-16 flex items-center justify-center text-white/30 hover:text-white transition-all bg-black/10 border border-white/5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100">
        <ChevronLeft size={36} />
      </button>
      <button className="feature-next absolute top-1/2 right-8 -translate-y-1/2 z-30 w-16 h-16 flex items-center justify-center text-white/30 hover:text-white transition-all bg-black/10 border border-white/5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100">
        <ChevronRight size={36} />
      </button>

    </section>
  );
};

export default FeatureSliderSection;
