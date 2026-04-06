'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const ProductGallery = () => {
  const productImages = [
    '/scooter-1.png',
    '/scooter-2.png',
    '/showcase-bike.png',
    '/bike-1.png',
    '/bike-2.png'
  ];

  return (
    <section className="bg-black py-[100px] flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Subtle glow effect behind the slider */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[600px] relative z-10">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full"
          >
            {productImages.map((image, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <img 
                  src={image} 
                  alt={`Product View ${index + 1}`} 
                  className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default ProductGallery;
