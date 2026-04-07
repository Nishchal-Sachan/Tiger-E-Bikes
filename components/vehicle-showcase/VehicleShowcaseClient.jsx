'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';

const TABS = [
  { key: 'scooter', label: 'SCOOTERS' },
  { key: 'motorcycle', label: 'MOTORCYCLES' },
];

/**
 * @param {{ initialProducts: Array<{
 *   _id: string;
 *   name: string;
 *   category: 'scooter' | 'motorcycle';
 *   image: string;
 *   power: string;
 *   topSpeed: string;
 *   range: string;
 *   isFeatured?: boolean;
 * }>;
 *   apiUnavailable?: boolean;
 *   apiErrorMessage?: string | null;
 * }} props
 */
export default function VehicleShowcaseClient({
  initialProducts = [],
  apiUnavailable = false,
  apiErrorMessage = null,
}) {
  const products = initialProducts;
  const [selectedCategory, setSelectedCategory] = useState('scooter');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!products.length) return;
    const hasS = products.some((p) => p.category === 'scooter');
    const hasM = products.some((p) => p.category === 'motorcycle');
    if (!hasS && hasM) setSelectedCategory('motorcycle');
    if (hasS && !hasM) setSelectedCategory('scooter');
  }, [products]);

  const filtered = useMemo(
    () => products.filter((p) => p.category === selectedCategory),
    [products, selectedCategory]
  );

  useEffect(() => {
    if (!filtered.length) {
      setSelectedId(null);
      return;
    }
    setSelectedId((prev) => {
      if (prev && filtered.some((p) => p._id === prev)) return prev;
      return filtered[0]._id;
    });
  }, [filtered]);

  const selectedVehicle = useMemo(
    () => filtered.find((p) => p._id === selectedId) ?? filtered[0] ?? null,
    [filtered, selectedId]
  );

  const specRows = selectedVehicle
    ? [
        { label: 'Power', value: selectedVehicle.power },
        { label: 'Top speed', value: selectedVehicle.topSpeed },
        { label: 'Range', value: selectedVehicle.range },
      ]
    : [];

  function handleCategoryChange(cat) {
    setSelectedCategory(cat);
    const next = products.filter((p) => p.category === cat);
    setSelectedId(next[0]?._id ?? null);
  }

  const hasScooters = products.some((p) => p.category === 'scooter');
  const hasMotorcycles = products.some((p) => p.category === 'motorcycle');

  return (
    <section
      id="lineup"
      className="border-y border-white/5 bg-matte-black py-32 overflow-hidden"
    >
      {apiUnavailable && (
        <ApiStatusBanner variant="warning">
          Lineup couldn&apos;t be refreshed.{apiErrorMessage ? ` ${apiErrorMessage}` : ''}
        </ApiStatusBanner>
      )}
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-24 flex flex-col items-end justify-between gap-12 lg:flex-row">
          <div className="space-y-4">
            <h2 className="text-center text-5xl font-black uppercase leading-none tracking-[-0.04em] text-white md:text-6xl lg:text-left lg:text-7xl">
              OUR LINEUP
            </h2>
          </div>

          <div
            className="mx-auto flex items-stretch overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-md lg:mx-0"
            role="tablist"
            aria-label="Product category"
          >
            {TABS.map(({ key, label }, idx) => {
              const disabled =
                key === 'scooter' ? !hasScooters : !hasMotorcycles;
              return (
                <React.Fragment key={key}>
                  {idx > 0 && (
                    <div
                      className="my-2 w-px shrink-0 self-stretch bg-white/10"
                      aria-hidden
                    />
                  )}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === key}
                    aria-controls={`lineup-panel-${key}`}
                    id={`lineup-tab-${key}`}
                    disabled={disabled}
                    onClick={() => handleCategoryChange(key)}
                    className={cn(
                      'min-w-[9rem] rounded-xl px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 sm:px-10',
                      disabled && 'cursor-not-allowed opacity-35',
                      selectedCategory === key && !disabled
                        ? 'bg-tiger-yellow text-black shadow-[0_8px_24px_rgba(250,204,21,0.18)] ring-2 ring-tiger-yellow/40 ring-offset-2 ring-offset-black'
                        : 'text-neutral-500 hover:text-white',
                      !disabled &&
                        selectedCategory !== key &&
                        'hover:bg-white/5'
                    )}
                  >
                    {label}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {!products.length && (
          <p className="py-16 text-center text-sm text-white/45">
            {apiUnavailable
              ? "We couldn't load the product lineup. Please try again later."
              : 'No products in the lineup yet.'}
          </p>
        )}

        {!!products.length && !filtered.length && (
          <p className="py-16 text-center text-sm text-white/45">
            No {selectedCategory === 'scooter' ? 'scooters' : 'motorcycles'} in
            this lineup yet.
          </p>
        )}

        {!!selectedVehicle && (
          <div
            id={`lineup-panel-${selectedCategory}`}
            role="tabpanel"
            aria-labelledby={`lineup-tab-${selectedCategory}`}
            className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12"
          >
            <div className="space-y-3 lg:col-span-3">
              <p className="mb-4 hidden text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500 lg:block">
                Select model
              </p>
              {filtered.map((vehicle) => (
                <button
                  key={vehicle._id}
                  type="button"
                  onClick={() => setSelectedId(vehicle._id)}
                  className={cn(
                    'group relative w-full overflow-hidden rounded-[2rem] border p-8 text-left transition-all duration-500',
                  selectedId === vehicle._id
                    ? 'border-white/20 bg-white/10 shadow-2xl'
                    : 'border-transparent bg-transparent hover:bg-white/5'
                  )}
                >
                  {selectedId === vehicle._id && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-tiger-yellow" />
                  )}
                  <span
                    className={cn(
                      'mb-2 block text-[11px] font-semibold leading-snug tracking-wide',
                      selectedId === vehicle._id
                        ? 'text-tiger-yellow'
                        : 'text-neutral-600'
                    )}
                  >
                    {vehicle.isFeatured ? 'Featured · ' : ''}
                    {vehicle.category === 'motorcycle'
                      ? 'Performance EV'
                      : 'Urban EV'}
                  </span>
                  <h3
                    className={cn(
                      'flex items-center justify-between text-xl font-black uppercase tracking-tight md:text-2xl',
                      selectedId === vehicle._id
                        ? 'text-white'
                        : 'text-neutral-600'
                    )}
                  >
                    {vehicle.name}
                    <ChevronRight
                      className={cn(
                        'transition-transform',
                        selectedId === vehicle._id
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-[-10px] opacity-0'
                      )}
                    />
                  </h3>
                </button>
              ))}
            </div>

            <div className="relative flex min-h-[600px] flex-col items-center justify-center rounded-[3rem] border border-white/5 bg-white/[0.02] p-8 lg:col-span-6 group/showcase">
              <div className="absolute inset-x-0 bottom-0 h-1/2 scale-125 animate-pulse rounded-full bg-tiger-yellow/10 blur-[150px]" />

              <div
                key={selectedVehicle._id}
                className="relative z-10 flex w-full max-w-xl flex-col items-center transition-opacity duration-500 md:max-w-2xl"
              >
                <div className="relative flex h-[min(400px,45vh)] w-full max-w-2xl items-center justify-center md:h-[min(500px,50vh)]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary + stable hooks in Swiper/adjacent layouts */}
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="max-h-full w-auto max-w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-transform duration-1000 group-hover/showcase:scale-105"
                  />
                </div>
                <p className="pointer-events-none absolute -bottom-12 select-none text-[7rem] font-black uppercase italic leading-none tracking-tighter text-white/10 opacity-10 md:text-[9rem]">
                  {selectedVehicle.name}
                </p>
              </div>
            </div>

            <div className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md md:p-10 lg:col-span-3">
              <div className="mb-6 border-b border-white/10 pb-5">
                <h4 className="text-[11px] font-black uppercase tracking-[0.28em] text-white md:text-xs">
                  CORE SPECIFICATIONS
                </h4>
              </div>

              <ul
                key={selectedVehicle._id + '_specs'}
                className="mb-8 flex-1 space-y-0"
              >
                {specRows.map((spec) => (
                  <li
                    key={spec.label}
                    className="border-b border-white/5 py-4 text-sm leading-snug first:pt-0 md:text-[0.9375rem]"
                  >
                    <span className="mr-2 text-tiger-yellow/90" aria-hidden>
                      •
                    </span>
                    <span className="text-neutral-400">{spec.label}:</span>{' '}
                    <span className="font-bold tabular-nums text-white">
                      {spec.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 pt-4">
                <button
                  type="button"
                  className="w-full rounded-2xl bg-tiger-yellow py-6 text-sm font-black uppercase italic tracking-widest text-black shadow-[0_20px_40px_rgba(250,204,21,0.1)] transition-all hover:scale-[1.02] active:scale-95"
                >
                  Reserve
                </button>
                <button
                  type="button"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 py-6 text-sm font-black uppercase italic tracking-widest text-white transition-all hover:bg-white/20 active:scale-95"
                >
                  Find a showroom
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
