'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';

import { SITE_EMAIL } from '@/constants/site-email';

const COLUMN_HEAD =
  'mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-neutral-500 md:mb-3.5';

const LINK_CLASS =
  'inline-block text-sm font-medium text-white/90 transition-all duration-200 hover:translate-x-0.5 hover:text-tiger-yellow';

const Footer = () => {
  return (
    <footer className="overflow-hidden border-t border-white/10 bg-matte-black pb-8 pt-20 text-white md:pb-10 md:pt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-12 grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:mb-14 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10 xl:gap-x-10">
          {/* Brand + contact + social */}
          <div className="space-y-4 lg:col-span-3">
            <Link href="/" className="group flex w-fit items-center gap-3">
              <img
                src="/logo.png"
                alt="Tiger E-Bikes"
                className="h-9 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="-space-y-1 flex flex-col">
                <span className="text-xl font-black uppercase italic leading-none tracking-tighter text-white">
                  TIGER
                </span>
                <span className="text-[10px] font-black uppercase italic tracking-[0.3em] text-tiger-yellow">
                  E-BIKES
                </span>
              </div>
            </Link>
            <p className="text-base font-black uppercase tracking-tight text-white">TIGER E-BIKES</p>
            <p className="max-w-md text-sm font-medium leading-relaxed text-neutral-400">
              TIGER E-BIKES is building the future of urban mobility with high-performance electric vehicles designed
              for efficiency, sustainability, and everyday reliability. Engineered for Indian roads.
            </p>

            <div className="max-w-md border-t border-white/10 pt-4">
              <p className={COLUMN_HEAD}>Contact info</p>
              <ul className="space-y-2.5 text-sm text-neutral-300">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-tiger-yellow/85" strokeWidth={1.75} aria-hidden />
                  <a href="tel:+919453605312" className="font-medium transition-colors hover:text-tiger-yellow">
                    +91 94536 05312
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-tiger-yellow/85" strokeWidth={1.75} aria-hidden />
                  <a href={`mailto:${SITE_EMAIL}`} className="font-medium transition-colors hover:text-tiger-yellow">
                    {SITE_EMAIL}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-tiger-yellow/85" strokeWidth={1.75} aria-hidden />
                  <address className="not-italic leading-snug">
                    Tiger E-Bikes
                    <br />
                    33 W Block, Keshav Nagar
                    <br />
                    Kanpur, Uttar Pradesh, India
                  </address>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <p className={COLUMN_HEAD}>Follow us</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 shadow-sm transition-all duration-300 hover:scale-110 hover:border-tiger-yellow/50 hover:bg-white/10 hover:text-tiger-yellow hover:shadow-[0_0_24px_rgba(250,204,21,0.35)]"
                  aria-label="Tiger E-Bikes on Instagram"
                >
                  <Instagram className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 shadow-sm transition-all duration-300 hover:scale-110 hover:border-tiger-yellow/50 hover:bg-white/10 hover:text-tiger-yellow hover:shadow-[0_0_24px_rgba(250,204,21,0.35)]"
                  aria-label="Tiger E-Bikes on LinkedIn"
                >
                  <Linkedin className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-400 shadow-sm transition-all duration-300 hover:scale-110 hover:border-tiger-yellow/50 hover:bg-white/10 hover:text-tiger-yellow hover:shadow-[0_0_24px_rgba(250,204,21,0.35)]"
                  aria-label="Tiger E-Bikes on YouTube"
                >
                  <Youtube className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h4 className={COLUMN_HEAD}>Products</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#lineup" className={LINK_CLASS}>
                  All Vehicles
                </Link>
              </li>
              {['Spark', 'Volt', 'Glide', 'Nova'].map((item) => (
                <li key={item}>
                  <Link href="/#lineup" className={LINK_CLASS}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className={COLUMN_HEAD}>Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About', href: '/about' },
                { label: 'Technology', href: '/#battery-tech' },
                { label: 'Sustainability', href: '/sustainability' },
                { label: 'Careers', href: '/careers' },
                { label: 'Our Vision', href: '/about#vision' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className={COLUMN_HEAD}>Support</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'FAQ', href: '/#faq' },
                { label: 'Contact', href: '/contact' },
                { label: 'Dealership', href: '/dealership' },
                { label: 'Warranty Policy', href: '/warranty' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms & Conditions', href: '/terms' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={LINK_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className={COLUMN_HEAD}>Newsletter</h4>
            <p className="text-sm leading-snug text-neutral-400">
              Be the first to know about new launches, exclusive offers, and EV insights.
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-tiger-yellow/90">
              Join 1000+ EV enthusiasts
            </p>
            <form className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 transition-colors focus:border-tiger-yellow/50 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-tiger-yellow px-6 py-2.5 text-xs font-black uppercase tracking-widest text-black transition-all hover:brightness-105"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs font-medium text-neutral-600">No spam. Only valuable updates.</p>

            <ul className="mt-5 space-y-2 border-t border-white/10 pt-5 text-xs font-medium leading-relaxed text-neutral-500">
              <li className="flex gap-2">
                <span className="shrink-0 text-tiger-yellow" aria-hidden>
                  {'\u2714'}
                </span>
                Warranty-backed vehicles
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-tiger-yellow" aria-hidden>
                  {'\u2714'}
                </span>
                Low maintenance cost
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 text-tiger-yellow" aria-hidden>
                  {'\u2714'}
                </span>
                Smart EV technology
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-3 border-t border-white/10 pt-8">
          <p className="text-center text-[11px] font-medium leading-relaxed tracking-wide text-neutral-500 md:text-xs lg:text-left">
            Engineered for performance <span className="text-white/20">·</span> Built for Indian roads{' '}
            <span className="text-white/20">·</span> Powered by clean energy
          </p>
          <p className="text-center text-xs font-medium text-neutral-600 lg:text-left">
            © 2026 TIGER E-BIKES. All rights reserved. Built for the future of mobility.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
