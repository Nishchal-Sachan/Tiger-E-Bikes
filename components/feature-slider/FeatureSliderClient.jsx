'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Autoplay,
  EffectFade,
  Keyboard,
  Navigation,
  Pagination,
} from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';
import { resolveFeatureIcon } from '@/lib/featureIcons';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

/**
 * @param {{
 *   features: Array<{
 *     _id: string;
 *     title: string;
 *     description: string;
 *     image: string;
 *     order?: number;
 *     icon?: string;
 *   }>;
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
              Couldn&apos;t load features.
              {apiErrorMessage ? ` ${apiErrorMessage}` : ''}
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
    <section className="group relative flex min-h-[calc(100vh-70px)] w-full overflow-hidden bg-matte-black">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade, Pagination, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={loop}
        speed={850}
        autoplay={{
          delay: 6800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{ enabled: true }}
        navigation={{
          nextEl: '.feature-next',
          prevEl: '.feature-prev',
        }}
        pagination={{
          clickable: true,
          type: 'progressbar',
        }}
        className="h-full min-h-[calc(100vh-70px)] w-full [&_.swiper-pagination-progressbar]:!bottom-0 [&_.swiper-pagination-progressbar]:!top-auto [&_.swiper-pagination-progressbar]:!h-1 [&_.swiper-pagination-progressbar]:!bg-white/12 [&_.swiper-pagination-progressbar-fill]:!bg-tiger-yellow"
      >
        {features.map((slide) => {
          const Icon = resolveFeatureIcon(slide.icon);
          return (
            <SwiperSlide key={slide._id} className="!h-auto">
              <div className="grid min-h-[calc(100vh-70px)] w-full lg:grid-cols-2">
                <div className="relative min-h-[42vh] lg:min-h-[calc(100vh-70px)]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Swiper + remote URLs */}
                  <img
                    src={slide.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/45 lg:bg-gradient-to-r lg:from-black/55 lg:via-black/25 lg:to-transparent" />
                </div>

                <div className="flex flex-col justify-center border-t border-white/10 bg-neutral-950 px-6 py-12 md:px-12 lg:border-l lg:border-t-0 lg:px-14 lg:py-16">
                  <div className="mx-auto w-full max-w-lg lg:mx-0">
                    {Icon ? (
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-tiger-yellow">
                        <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                      </div>
                    ) : null}
                    <h2 className="text-balance text-3xl font-black uppercase leading-[1.02] tracking-tight text-white md:text-4xl lg:text-5xl">
                      {slide.title}
                    </h2>
                    <p className="mt-5 max-w-prose text-base font-medium leading-relaxed text-neutral-300 md:text-lg">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {features.length > 1 ? (
        <>
          <button
            type="button"
            className="feature-prev absolute left-3 top-[24vh] z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/85 transition hover:bg-black/70 md:left-6 lg:top-1/2 lg:opacity-0 lg:group-hover:opacity-100"
            aria-label="Previous feature"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="feature-next absolute right-3 top-[24vh] z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/85 transition hover:bg-black/70 md:right-6 lg:top-1/2 lg:opacity-0 lg:group-hover:opacity-100"
            aria-label="Next feature"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </>
      ) : null}
    </section>
  );
}
