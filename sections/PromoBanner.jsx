'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFlip } from 'swiper/modules';
import { ArrowUpRight, Zap } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const PromoBanner = () => {
  const promos = [
    {
      title: "SUMMER SAVINGS EVENT",
      description: "Get up to ₹15,000 off on the Tiger Stealth series. Limited time offer only.",
      highlight: "Save ₹15k",
      image: "/promo-scooter.png"
    },
    {
      title: "ZERO EMISSION REWARDS",
      description: "Exchange your old petrol scooter and get an additional ₹5,000 bonus on your Tiger.",
      highlight: "Exchange Bonus",
       image: "/scooter-1.png"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Pagination, Autoplay, EffectFlip]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="rounded-[3rem] overflow-hidden shadow-[0_30px_80px_rgba(250,204,21,0.25)]"
        >
          {promos.map((promo, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gradient-to-br from-yellow-400 via-yellow-400 to-yellow-500 w-full min-h-[450px] flex flex-col md:flex-row items-center justify-between p-12 md:p-20 group">
                
                {/* Left Side: Image Content */}
                <div className="relative md:w-1/2 flex items-center justify-center mb-12 md:mb-0 transition-transform duration-700 group-hover:scale-105">
                   {/* Decorative background glow behind image */}
                   <div className="absolute inset-x-0 bottom-0 bg-black/10 blur-3xl h-1/2 rounded-full scale-125" />
                   <img 
                     src={promo.image} 
                     alt={promo.title}
                     className="relative z-10 max-h-[350px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] pointer-events-none"
                   />
                </div>

                {/* Right Side: Text Content */}
                <div className="md:w-1/2 text-left md:pl-16">
                  <div className="flex items-center gap-3 mb-6 bg-black/10 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                    <Zap size={18} className="text-black" />
                    <span className="text-xs font-black uppercase tracking-widest text-black">{promo.highlight}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-7xl font-black text-black tracking-tighter leading-[0.9] mb-8">
                     {promo.title}
                  </h2>
                  <p className="text-black/70 text-lg md:text-xl font-medium leading-relaxed max-w-sm mb-12">
                    {promo.description}
                  </p>

                  <button className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-95 group/btn">
                    View More Details
                    <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

       <style jsx global>{`
        .swiper-pagination-bullet {
          background: black !important;
          opacity: 0.2 !important;
          width: 50px !important;
          height: 4px !important;
          border-radius: 2px !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 80px !important;
        }
      `}</style>
    </section>
  );
};

export default PromoBanner;
