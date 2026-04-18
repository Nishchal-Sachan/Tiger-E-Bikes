import React from 'react';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';

export default function FAQ() {
  return (
    <section
      className="relative overflow-hidden border-t-2 border-tiger-yellow/25 bg-gradient-to-b from-neutral-100 via-white to-neutral-50 px-6 py-28 md:py-36"
      id="faq"
    >
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-tiger-yellow/[0.09] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-neutral-300/25 blur-[90px]"
        aria-hidden
      />

      <div className="relative z-[2] mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5 lg:pt-2">
            <div className="space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <div className="mx-auto h-px w-12 bg-matte-black lg:mx-0" />
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-matte-black md:text-xs">
                  Buyer support
                </p>
              </div>
              <h2 className="mx-auto max-w-xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-matte-black md:text-5xl lg:mx-0 lg:max-w-lg lg:text-6xl">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <div className="mx-auto h-1 w-14 rounded-full bg-tiger-yellow lg:mx-0" />
            </div>
            <p className="mx-auto mt-8 max-w-xl text-center text-base font-medium leading-relaxed text-neutral-600 md:text-lg lg:mx-0 lg:mt-10 lg:text-left">
              Everything you need to know about owning and riding a TIGER EV. For more details, visit a showroom or
              book a test ride.
            </p>
          </div>

          <div className="relative z-[2] lg:col-span-7">
            <FaqAccordion variant="light" itemIdPrefix="home-faq" />
          </div>
        </div>

        <div className="relative z-[2] mx-auto mt-20 max-w-[1400px] md:mt-24">
          <div className="rounded-3xl border-2 border-neutral-200 bg-white px-8 py-10 shadow-[0_24px_60px_rgba(0,0,0,0.06)] md:px-12 md:py-12">
            <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left">
              <div className="max-w-2xl space-y-3">
                <p className="text-lg font-bold text-matte-black md:text-xl">Still have questions?</p>
                <p className="text-base font-medium leading-relaxed text-neutral-600 md:text-lg">
                  Talk to our EV expert or visit your nearest showroom.
                </p>
              </div>
              <div className="flex w-full flex-col items-center gap-4 sm:w-auto lg:items-end lg:shrink-0">
                <Link
                  href="/dealership"
                  className="inline-flex w-full min-w-[220px] items-center justify-center rounded-2xl bg-matte-black px-10 py-5 text-center text-xs font-black uppercase tracking-[0.2em] text-white shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                >
                  Find a Showroom
                </Link>
                <p className="text-sm font-medium text-neutral-500">
                  Built for reliability, efficiency, and everyday use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
