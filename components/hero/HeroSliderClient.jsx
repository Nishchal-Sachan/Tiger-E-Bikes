'use client';

import Link from 'next/link';
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
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

function CtaLink({ href, className, children }) {
  const safe = href?.trim() || '#';
  const external = /^https?:\/\//i.test(safe);

  if (external) {
    return (
      <a href={safe} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={safe} className={className}>
      {children}
    </Link>
  );
}

function alignClasses(textAlign) {
  switch (textAlign) {
    case 'center':
      return {
        block: 'items-center text-center',
        ctas: 'justify-center',
      };
    case 'right':
      return {
        block: 'items-end text-right',
        ctas: 'justify-end',
      };
    default:
      return {
        block: 'items-start text-left',
        ctas: 'justify-start',
      };
  }
}

/**
 * @param {{
 *   slides: Array<{
 *     _id?: string;
 *     title: string;
 *     subtitle?: string;
 *     description?: string;
 *     backgroundImage: string;
 *     primaryButtonText: string;
 *     primaryButtonLink: string;
 *     secondaryButtonText: string;
 *     secondaryButtonLink: string;
 *     overlayStrength?: number;
 *     textAlign?: 'left' | 'center' | 'right';
 *   }>;
 *   apiUnavailable?: boolean;
 *   apiErrorMessage?: string | null;
 * }} props
 */
export default function HeroSliderClient({
  slides,
  apiUnavailable = false,
  apiErrorMessage = null,
}) {
  if (!slides?.length) {
    return (
      <section
        id="hero"
        className="relative z-0 flex h-[calc(100vh-70px)] w-full items-center justify-center overflow-hidden bg-matte-black"
      >
        {apiUnavailable && (
          <div className="absolute left-0 right-0 top-0 z-20">
            <ApiStatusBanner>
              Hero content couldn&apos;t be loaded from the server.
              {apiErrorMessage ? ` (${apiErrorMessage})` : ''}
            </ApiStatusBanner>
          </div>
        )}
        <p className="text-sm text-white/45">No hero slides to display.</p>
      </section>
    );
  }

  const loop = slides.length > 1;

  return (
    <section
      id="hero"
      className="group relative z-0 h-[calc(100vh-70px)] w-full overflow-hidden bg-matte-black"
    >
      {apiUnavailable && (
        <div className="absolute left-0 right-0 top-0 z-30">
          <ApiStatusBanner>
            Hero content couldn&apos;t be loaded from the server. Showing
            default slides.
            {apiErrorMessage ? ` (${apiErrorMessage})` : ''}
          </ApiStatusBanner>
        </div>
      )}

      <Swiper
        modules={[Navigation, Autoplay, EffectFade, Pagination, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={loop}
        speed={900}
        autoplay={{
          delay: 7200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{ enabled: true }}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        pagination={{
          clickable: true,
          type: 'progressbar',
        }}
        className="h-full w-full [&_.swiper-pagination-progressbar]:!bottom-0 [&_.swiper-pagination-progressbar]:!top-auto [&_.swiper-pagination-progressbar]:!h-1 [&_.swiper-pagination-progressbar]:!bg-white/15 [&_.swiper-pagination-progressbar-fill]:!bg-tiger-yellow"
      >
        {slides.map((slide, idx) => {
          const strength = Math.min(
            92,
            Math.max(35, Number(slide.overlayStrength) || 72)
          );
          const t = strength / 100;
          const { block, ctas } = alignClasses(slide.textAlign);

          return (
            <SwiperSlide key={slide._id ?? `hero-${idx}`} className="!h-full">
              <div className="relative flex h-full w-full items-center">
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Swiper + remote URLs */}
                  <img
                    src={slide.backgroundImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(105deg,
 rgba(0,0,0,${0.78 + t * 0.12}) 0%,
                        rgba(0,0,0,${0.42 + t * 0.22}) 42%,
                        rgba(0,0,0,${0.14 + t * 0.18}) 72%,
                        rgba(0,0,0,${0.08 + t * 0.12}) 100%)`,
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black via-black/55 to-transparent" />
                </div>

                <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-center px-6 pb-8 md:px-24 lg:px-44">
                  <div
                    className={`flex max-w-2xl flex-col gap-5 md:max-w-3xl md:gap-7 ${block}`}
                  >
                    {slide.subtitle ? (
                      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-tiger-yellow md:text-xs">
                        {slide.subtitle}
                      </p>
                    ) : null}
                    <h1 className="text-balance text-5xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:text-7xl lg:text-[6.25rem]">
                      {slide.title}
                    </h1>
                    {slide.description ? (
                      <p className="max-w-xl text-base font-medium leading-relaxed text-neutral-100/95 md:max-w-2xl md:text-xl">
                        {slide.description}
                      </p>
                    ) : null}
                    <div
                      className={`flex flex-col gap-4 pt-2 sm:flex-row sm:gap-5 ${ctas}`}
                    >
                      <CtaLink
                        href={slide.primaryButtonLink}
                        className="inline-flex justify-center rounded-xl bg-tiger-yellow px-10 py-4 text-xs font-black uppercase tracking-[0.2em] text-black shadow-[0_16px_40px_rgba(250,204,21,0.22)] transition-all hover:brightness-105 active:scale-[0.98] md:px-12 md:py-5"
                      >
                        {slide.primaryButtonText}
                      </CtaLink>
                      <CtaLink
                        href={slide.secondaryButtonLink}
                        className="inline-flex justify-center rounded-xl border border-white/30 bg-black/25 px-10 py-4 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur-[2px] transition-colors hover:border-white hover:bg-white hover:text-black md:px-12 md:py-5"
                      >
                        {slide.secondaryButtonText}
                      </CtaLink>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            className="hero-prev absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition hover:bg-black/55 hover:text-white md:left-10 md:h-14 md:w-14 lg:opacity-0 lg:group-hover:opacity-100"
            aria-label="Previous hero slide"
          >
            <ChevronLeft className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="hero-next absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 transition hover:bg-black/55 hover:text-white md:right-10 md:h-14 md:w-14 lg:opacity-0 lg:group-hover:opacity-100"
            aria-label="Next hero slide"
          >
            <ChevronRight
              className="h-7 w-7 md:h-8 md:w-8"
              strokeWidth={1.5}
            />
          </button>
        </>
      ) : null}
    </section>
  );
}
