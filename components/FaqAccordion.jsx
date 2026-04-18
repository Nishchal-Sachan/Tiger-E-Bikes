'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/utils/cn';
import { FAQ_ITEMS } from '@/lib/content/faqs';

/**
 * Accordion list for FAQ copy. Max-height expand avoids grid `1fr` sizing bugs on auto-height containers.
 * @param {{ variant?: 'light' | 'dark'; className?: string; itemIdPrefix?: string }} props
 */
export default function FaqAccordion({ variant = 'light', className, itemIdPrefix = 'faq' }) {
  const [openIndex, setOpenIndex] = useState(null);
  const isDark = variant === 'dark';

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={cn('flex flex-col gap-4 md:gap-5', className)}>
      {FAQ_ITEMS.map((faq, index) => {
        const isOpen = openIndex === index;
        const qId = `${itemIdPrefix}-q-${index}`;
        const panelId = `${itemIdPrefix}-panel-${index}`;

        return (
          <div
            key={faq.question}
            className={cn(
              'relative z-10 overflow-hidden rounded-2xl border-2 border-l-4 shadow-sm transition-[border-color,box-shadow,background-color,ring] duration-300 ease-out motion-reduce:transition-none',
              isDark
                ? isOpen
                  ? 'border-l-tiger-yellow border-tiger-yellow/50 bg-tiger-yellow/[0.06] shadow-[0_16px_48px_rgba(0,0,0,0.35)] ring-2 ring-tiger-yellow/20'
                  : 'border-l-transparent border-white/10 bg-white/[0.04] hover:border-white/20 hover:shadow-md'
                : isOpen
                  ? 'border-l-tiger-yellow border-tiger-yellow bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-2 ring-tiger-yellow/20'
                  : 'border-l-transparent border-neutral-200/90 bg-white/80 hover:border-neutral-300 hover:shadow-md'
            )}
          >
            <button
              type="button"
              id={qId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              className={cn(
                'relative z-10 flex w-full cursor-pointer items-start justify-between gap-4 py-5 pl-5 pr-4 text-left outline-none transition-[background-color] duration-300 ease-out hover:bg-black/[0.04] active:scale-[0.995] md:py-6 md:pl-7 md:pr-6 focus-visible:ring-2 focus-visible:ring-tiger-yellow focus-visible:ring-offset-2 pointer-events-auto',
                !isDark && 'hover:bg-black/[0.02]',
                isDark && 'focus-visible:ring-offset-matte-black'
              )}
            >
              <span
                className={cn(
                  'pr-2 text-base font-black uppercase leading-snug tracking-tight transition-colors duration-300 ease-out md:text-lg',
                  isDark
                    ? isOpen
                      ? 'text-white'
                      : 'text-neutral-400'
                    : isOpen
                      ? 'text-matte-black'
                      : 'text-neutral-500'
                )}
              >
                {faq.question}
              </span>
              <span
                className={cn(
                  'mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:scale-100',
                  isDark
                    ? isOpen
                      ? 'scale-105 border-tiger-yellow bg-tiger-yellow text-matte-black shadow-lg'
                      : 'border-white/15 bg-white/5 text-tiger-yellow'
                    : isOpen
                      ? 'scale-105 border-matte-black bg-tiger-yellow text-matte-black shadow-lg'
                      : 'border-neutral-200 bg-neutral-50 text-neutral-500'
                )}
              >
                <Plus
                  size={22}
                  strokeWidth={2.5}
                  className={cn(
                    'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isOpen && 'rotate-45'
                  )}
                  aria-hidden
                />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={qId}
              hidden={!isOpen}
              className={cn(
                'border-t px-5 pb-6 pt-4 md:px-7 md:pb-7',
                isDark ? 'border-white/10' : 'border-neutral-200/90'
              )}
            >
              <p
                className={cn(
                  'text-base font-normal leading-relaxed md:text-[1.05rem]',
                  isDark ? 'text-neutral-400' : 'text-neutral-700'
                )}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
