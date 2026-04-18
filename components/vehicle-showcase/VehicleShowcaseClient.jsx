'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';

/** Matches Product.category from admin (`scooter` | `motorcycle`). */
const TABS = [
  { key: 'scooter', label: 'SCOOTERS' },
  { key: 'motorcycle', label: 'MOTORCYCLES' },
];

const HIGHLIGHTS_STRIP = ['Low Maintenance', 'Eco-Friendly', 'Smart Charging', 'Cost Efficient'];

const SELECTOR_HINTS = {
  SPARK: 'City Ride',
  VOLT: 'High Performance',
  GLIDE: 'Daily Commute',
  NOVA: 'Flagship Ride',
};

/**
 * @param {{ initialProducts: Array<Record<string, unknown>>;
 *   apiUnavailable?: boolean;
 *   apiErrorMessage?: string | null;
 * }} props
 */
export default function VehicleShowcaseClient({
  initialProducts = [],
  apiUnavailable = false,
  apiErrorMessage = null,
}) {
  const router = useRouter();
  const products = initialProducts;

  const [activeCategory, setActiveCategory] = useState('scooter');
  /** When null, lineup shows the first model in the current (effective) category. */
  const [selectedModelId, setSelectedModelId] = useState(null);

  const hasScooters = products.some((p) => normalizeCategory(p.category) === 'scooter');
  const hasMotorcycles = products.some((p) => normalizeCategory(p.category) === 'motorcycle');

  const displayCategory = useMemo(() => {
    if (!hasScooters && hasMotorcycles) return 'motorcycle';
    if (hasScooters && !hasMotorcycles) return 'scooter';
    return activeCategory;
  }, [hasScooters, hasMotorcycles, activeCategory]);

  const filteredProducts = useMemo(
    () => products.filter((p) => normalizeCategory(p.category) === displayCategory),
    [products, displayCategory]
  );

  const selectedModel = useMemo(() => {
    if (!filteredProducts.length) return null;
    if (selectedModelId != null) {
      const found = filteredProducts.find((p) => selectionKey(p) === selectedModelId);
      if (found) return found;
    }
    return filteredProducts[0];
  }, [filteredProducts, selectedModelId]);

  const heroKey = selectedModel ? selectionKey(selectedModel) : '';

  const specRows = useMemo(() => {
    if (!selectedModel) return [];
    const v = selectedModel;
    const rangeRaw = pickStr(v.range);
    const speedRaw = pickStr(v.topSpeed);
    const chargingRaw =
      pickStr(v.chargingTime) || (looksLikeChargingDuration(v.power) ? pickStr(v.power) : '');
    const batteryRaw = pickStr(v.batteryType) || 'Lithium-ion';
    return [
      { label: 'Range', value: formatRange(rangeRaw) },
      { label: 'Top Speed', value: formatSpeed(speedRaw) },
      { label: 'Charging Time', value: formatCharging(chargingRaw) },
      { label: 'Battery', value: batteryRaw },
    ];
  }, [selectedModel]);

  const categoryLabel = useMemo(() => {
    if (!selectedModel) return '';
    const custom = pickStr(selectedModel.usageType);
    if (custom) return custom;
    return normalizeCategory(selectedModel.category) === 'motorcycle' ? 'Performance EV' : 'Urban EV';
  }, [selectedModel]);

  const shortDescription = selectedModel ? pickStr(selectedModel.shortDescription) : '';

  return (
    <section
      id="lineup"
      className="relative z-20 overflow-hidden border-y border-white/10 bg-matte-black py-28 text-white md:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(250,204,21,0.16),transparent_52%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_100%,rgba(250,204,21,0.06),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.035] via-transparent to-black/40"
        aria-hidden
      />

      {apiUnavailable && (
        <ApiStatusBanner variant="warning">
          Lineup couldn&apos;t be refreshed.{apiErrorMessage ? ` ${apiErrorMessage}` : ''}
        </ApiStatusBanner>
      )}
      <div className="relative z-[2] mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-16 flex flex-col gap-12 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-6 text-center lg:max-w-2xl lg:text-left">
            <div className="space-y-4 lg:space-y-5">
              <div className="mx-auto h-px w-12 bg-tiger-yellow lg:mx-0" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-tiger-yellow md:text-xs">
                Model lineup
              </p>
            </div>
            <h2 className="text-5xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
              OUR LINEUP
            </h2>
            <div className="mx-auto h-1 w-14 rounded-full bg-tiger-yellow lg:mx-0" />
            <p className="text-base font-medium leading-relaxed text-neutral-400 md:text-lg lg:max-w-lg">
              Explore every TIGER EV — real specs from the panel, built for Indian roads. Switch category, compare
              models, then book a ride.
            </p>
          </div>

          <div
            className="mx-auto flex w-full max-w-md items-stretch overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-md sm:max-w-none lg:mx-0 lg:w-auto"
            role="tablist"
            aria-label="Product category"
          >
            {TABS.map(({ key, label }, idx) => {
              const disabled = key === 'scooter' ? !hasScooters : !hasMotorcycles;
              return (
                <React.Fragment key={key}>
                  {idx > 0 && (
                    <div className="my-2 w-px shrink-0 self-stretch bg-white/15" aria-hidden />
                  )}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={displayCategory === key}
                    aria-controls={`lineup-panel-${key}`}
                    id={`lineup-tab-${key}`}
                    disabled={disabled}
                    onClick={() => {
                      setActiveCategory(key);
                      setSelectedModelId(null);
                    }}
                    className={cn(
                      'pointer-events-auto min-w-0 flex-1 rounded-xl px-6 py-4 text-[10px] font-black uppercase tracking-[0.22em] transition-all duration-300 sm:min-w-[10rem] sm:px-10 sm:text-[11px]',
                      disabled && 'cursor-not-allowed opacity-35',
                      displayCategory === key && !disabled
                        ? 'bg-tiger-yellow text-matte-black shadow-[0_10px_32px_rgba(250,204,21,0.28)] ring-2 ring-tiger-yellow/50 ring-offset-2 ring-offset-[#0a0a0a]'
                        : 'text-neutral-400 hover:text-white',
                      !disabled && displayCategory !== key && 'hover:bg-white/[0.07]'
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

        {!!products.length && !filteredProducts.length && (
          <p className="py-16 text-center text-sm text-white/45">
            No {displayCategory === 'scooter' ? 'scooters' : 'motorcycles'} in this lineup yet.
          </p>
        )}

        {!!products.length && !!filteredProducts.length && selectedModel && (
          <div
            id={`lineup-panel-${displayCategory}`}
            role="tabpanel"
            aria-labelledby={`lineup-tab-${displayCategory}`}
            className="relative isolate grid grid-cols-1 items-start gap-10 md:gap-14 lg:grid-cols-12 lg:gap-10"
          >
            <div className="relative z-30 flex flex-col gap-4 lg:col-span-3">
              <p className="mb-1 hidden text-[10px] font-black uppercase tracking-[0.28em] text-neutral-500 lg:block">
                Select model
              </p>
              {filteredProducts.map((product) => {
                const sid = selectionKey(product);
                const isActive = selectionKey(selectedModel) === sid;
                return (
                  <button
                    key={sid}
                    type="button"
                    onClick={() => setSelectedModelId(sid)}
                    className={cn(
                      'pointer-events-auto group relative z-10 w-full overflow-hidden rounded-[1.75rem] border-2 p-7 text-left transition-all duration-300 md:rounded-[2rem] md:p-8',
                      isActive
                        ? 'border-tiger-yellow bg-gradient-to-br from-white/[0.14] to-white/[0.04] shadow-[0_24px_70px_rgba(0,0,0,0.5)] ring-2 ring-tiger-yellow/25'
                        : 'border-white/10 bg-white/[0.03] hover:border-tiger-yellow/25 hover:bg-white/[0.07] hover:shadow-xl'
                    )}
                  >
                    {isActive ? (
                      <div className="absolute inset-y-3 left-0 w-1 rounded-full bg-tiger-yellow shadow-[0_0_20px_rgba(250,204,21,0.55)]" />
                    ) : null}
                    <span
                      className={cn(
                        'mb-2 inline-flex rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em]',
                        isActive
                          ? 'border-tiger-yellow/40 bg-tiger-yellow/15 text-tiger-yellow'
                          : 'border-white/10 bg-white/[0.04] text-neutral-500 group-hover:border-white/20 group-hover:text-neutral-300'
                      )}
                    >
                      {product.isFeatured ? 'Featured · ' : ''}
                      {normalizeCategory(product.category) === 'motorcycle' ? 'Performance EV' : 'Urban EV'}
                    </span>
                    <h3
                      className={cn(
                        'flex items-center justify-between gap-3 text-xl font-black uppercase tracking-tight md:text-2xl',
                        isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-200'
                      )}
                    >
                      <span>{product.name}</span>
                      <ChevronRight
                        className={cn(
                          'h-5 w-5 shrink-0 transition-all duration-300',
                          isActive
                            ? 'translate-x-0 text-tiger-yellow opacity-100'
                            : 'translate-x-[-6px] text-neutral-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-70'
                        )}
                      />
                    </h3>
                    <p
                      className={cn(
                        'mt-2 text-[13px] font-medium leading-snug',
                        isActive ? 'text-neutral-300' : 'text-neutral-600 group-hover:text-neutral-500'
                      )}
                    >
                      {pickStr(product.selectorSubtext) ||
                        SELECTOR_HINTS[String(product.name || '').toUpperCase()] ||
                        (normalizeCategory(product.category) === 'motorcycle' ? 'Performance' : 'City Ride')}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="relative z-10 order-first flex min-h-[min(520px,62vh)] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-2 border-white/10 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-black/30 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] md:min-h-[600px] md:rounded-[3rem] md:p-10 lg:order-none lg:col-span-6">
              <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-white/5 md:inset-6 md:rounded-[2.5rem]" aria-hidden />
              <div
                className="pointer-events-none absolute inset-x-[8%] bottom-[14%] h-[32%] rounded-[100%] bg-tiger-yellow/[0.18] blur-[72px]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-tiger-yellow/[0.12] via-transparent to-transparent opacity-80"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-[20%] top-[58%] h-[6%] rounded-[100%] bg-black/50 blur-2xl"
                aria-hidden
              />

              <div
                key={heroKey || 'lineup-hero'}
                className="relative z-10 flex w-full max-w-xl flex-col items-center md:max-w-2xl"
              >
                <div className="relative flex h-[min(360px,42vh)] w-full max-w-2xl items-center justify-center md:h-[min(480px,48vh)]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary URLs from admin */}
                  <img
                    src={selectedModel.image}
                    alt={selectedModel.name}
                    className="relative z-[1] max-h-full w-auto max-w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.65)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                  />
                </div>
                <div className="relative z-[2] mt-6 w-full max-w-lg px-2 text-center md:mt-10">
                  <p className="mb-3 inline-flex items-center rounded-full border border-tiger-yellow/35 bg-tiger-yellow/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-tiger-yellow">
                    {categoryLabel}
                  </p>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                    {selectedModel.name}
                  </h3>
                  {shortDescription ? (
                    <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-relaxed text-neutral-400 md:text-base">
                      {shortDescription}
                    </p>
                  ) : null}
                </div>
                <p
                  className="pointer-events-none absolute bottom-0 z-0 select-none text-[clamp(4rem,14vw,9rem)] font-black uppercase italic leading-none tracking-tighter text-white/[0.06]"
                  aria-hidden
                >
                  {selectedModel.name}
                </p>
              </div>
            </div>

            <div className="relative z-30 flex flex-col rounded-[2rem] border-2 border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:rounded-[2.25rem] md:p-10 lg:col-span-3">
              <div className="absolute left-0 top-10 hidden h-12 w-1 rounded-full bg-tiger-yellow/80 lg:block" aria-hidden />
              <div className="mb-6 border-b border-white/10 pb-5">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-tiger-yellow/90">
                  Tech sheet
                </p>
                <h4 className="text-xs font-black uppercase tracking-[0.22em] text-white md:text-sm">
                  Core specifications
                </h4>
              </div>

              <ul
                key={productId(selectedModel._id) + '_specs'}
                className="mb-6 flex flex-1 flex-col gap-2"
              >
                {specRows.map((spec) => (
                  <li
                    key={spec.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 md:px-4 md:py-4"
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                      {spec.label}
                    </span>
                    <span className="mt-1 block text-base font-bold tabular-nums text-white md:text-lg">
                      {spec.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mb-6 flex flex-wrap gap-2">
                {HIGHLIGHTS_STRIP.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-300"
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div className="relative z-30 space-y-3 border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => router.push('/contact')}
                  className="relative z-30 flex w-full items-center justify-center rounded-2xl bg-tiger-yellow py-5 text-xs font-black uppercase tracking-[0.2em] text-matte-black shadow-[0_20px_48px_rgba(250,204,21,0.22)] transition-all hover:brightness-105 active:scale-[0.98]"
                >
                  Book Test Ride
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/dealership')}
                  className="relative z-30 flex w-full items-center justify-center rounded-2xl border-2 border-white/20 bg-white/[0.05] py-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:border-tiger-yellow/40 hover:bg-white/10 active:scale-[0.98]"
                >
                  Find a Showroom
                </button>
              </div>

              <p className="mt-6 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-center text-[10px] font-medium leading-relaxed tracking-tight text-neutral-500 sm:text-[11px]">
                Designed for Indian roads <span className="text-white/25">·</span> Reliable performance{' '}
                <span className="text-white/25">·</span> Everyday efficiency
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function pickStr(v) {
  if (v == null) return '';
  return String(v).trim();
}

function normalizeCategory(cat) {
  return String(cat ?? '').trim().toLowerCase();
}

function productId(raw) {
  if (raw == null) return '';
  if (typeof raw === 'object' && raw !== null) {
    if ('$oid' in raw) {
      return String(/** @type {{ $oid: string }} */ (raw).$oid);
    }
    if (typeof raw.toString === 'function') {
      const s = raw.toString();
      if (s && s !== '[object Object]') return s;
    }
  }
  const s = String(raw);
  return s === '[object Object]' ? '' : s;
}

/** Unique per product for list keys, selection state, and hero remount. */
function selectionKey(product) {
  const id = productId(product._id);
  if (id) return id;
  return `${normalizeCategory(product.category)}::${pickStr(product.name)}`;
}

function formatRange(raw) {
  if (!raw) return '—';
  if (/\bkm\b/i.test(raw)) return raw;
  if (/^\s*[\d–—\-,.]+\s*$/i.test(raw)) return `${raw} KM`.replace(/\s+/g, ' ').trim();
  return raw;
}

function formatSpeed(raw) {
  if (!raw) return '—';
  if (/km\s*\/?\s*h/i.test(raw)) return raw;
  if (/^\s*[\d–—\-,.]+\s*$/i.test(raw)) return `${raw} km/h`.replace(/\s+/g, ' ').trim();
  return raw;
}

function formatCharging(raw) {
  if (!raw) return '—';
  return raw;
}

function looksLikeChargingDuration(s) {
  if (s == null || String(s).trim() === '') return false;
  const t = String(s).trim();
  if (!/\d/.test(t)) return false;
  return /\b(hr|hrs|hour|hours|h|min|mins)\b/i.test(t) || /~\s*\d/.test(t) || /\d+\s*[–—-]\s*\d+/.test(t);
}
