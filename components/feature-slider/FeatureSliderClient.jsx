'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

/**
 * @param {{
 *   features: Array<{ _id: string; title: string; description: string; image: string; order?: number }>;
 *   apiUnavailable?: boolean;
 *   apiErrorMessage?: string | null;
 * }} props
 */
export default function FeatureSliderClient({
  features,
  apiUnavailable = false,
  apiErrorMessage = null,
}) {
  if (!features?.length) {
    return (
      <section className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-24">
        {apiUnavailable && (
          <div className="absolute left-0 right-0 top-0">
            <ApiStatusBanner variant="error">
              Couldn&apos;t load features.{apiErrorMessage ? ` ${apiErrorMessage}` : ''}
            </ApiStatusBanner>
          </div>
        )}
        <p className="text-center text-sm text-white/45">
          {apiUnavailable
            ? 'Features are temporarily unavailable.'
            : 'No features to display yet.'}
        </p>
      </section>
    );
  }

  const loop = features.length > 1;

  return (
    <section className="group relative flex h-[calc(100vh-70px)] w-full items-center justify-center overflow-hidden bg-black">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={loop}
        speed={900}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: '.feature-next',
          prevEl: '.feature-prev',
        }}
        pagination={{ clickable: true }}
        className="h-full w-full [&_.swiper-pagination]:!bottom-8 [&_.swiper-pagination]:z-20 [&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!bg-white/30 [&_.swiper-pagination-bullet-active]:!bg-tiger-yellow [&_.swiper-pagination-bullet-active]:!w-6"
      >
        {features.map((slide) => (
          <SwiperSlide key={slide._id} className="!h-full">
            <div className="relative flex h-full min-h-[calc(100vh-70px)] w-full items-center">
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element -- avoids next/image + Swiper/Fast Refresh hook issues */}
                <img
                  src={slide.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/[0.55] to-black/85" />
                <div className="absolute inset-0 bg-black/35" />
              </div>

              <div className="relative z-10 flex h-full w-full items-center justify-center px-6 md:px-12 lg:px-16">
                <div className="flex w-full max-w-xl flex-col items-center rounded-2xl border border-white/10 bg-white/[0.06] p-8 text-center backdrop-blur-xl md:max-w-2xl md:p-12 lg:p-14">
                  <h2 className="mb-5 text-balance text-4xl font-black leading-[0.98] tracking-tight text-white md:mb-6 md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h2>

                  <p className="text-base font-medium leading-relaxed text-neutral-300 md:text-lg">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {features.length > 1 && (
        <>
          <button
            type="button"
            className="feature-prev absolute left-8 top-1/2 z-30 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/5 bg-black/10 text-white/50 opacity-60 backdrop-blur-md transition-all hover:text-white md:left-12 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            type="button"
            className="feature-next absolute right-8 top-1/2 z-30 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/5 bg-black/10 text-white/50 opacity-60 backdrop-blur-md transition-all hover:text-white md:right-12 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight size={36} />
          </button>
        </>
      )}
    </section>
  );
}
