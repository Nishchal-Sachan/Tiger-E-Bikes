'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const MobilitySlider = () => {
  const cards = [
    { title: "Smart Charging", category: "Infrastructure", image: "/mob-1.png" },
    { title: "Next-Gen Battery", category: "Technology", image: "/mob-2.png" },
    { title: "Urban Agility", category: "Performance", image: "/mob-3.png" },
    { title: "Connected Eco", category: "Ecosystem", image: "/scooter-1.png" },
    { title: "Vision Drive", category: "Intelligence", image: "/scooter-2.png" }
  ];

  return (
    <section className="py-12 bg-black overflow-hidden">
      <div className="pl-6 md:pl-12 lg:pl-24">
        <Swiper
          modules={[Mousewheel, FreeMode]}
          slidesPerView="auto"
          spaceBetween={30}
          freeMode={true}
          mousewheel={true}
          className="w-full !overflow-visible"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} className="!w-[300px] md:!w-[450px]">
              <div className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${card.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-8 w-full transition-transform duration-500 group-hover:translate-x-2">
                   <span className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 block">{card.category}</span>
                   <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{card.title}</h3>
                   
                   {/* Hover Revealed Content */}
                   <div className="mt-4 flex items-center gap-2 text-white/60 text-sm font-bold opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      View Details 
                      <div className="w-8 h-px bg-white/40" />
                   </div>
                </div>

                {/* Glassmorphism Badge */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                  <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MobilitySlider;
