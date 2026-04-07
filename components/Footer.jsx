'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-matte-black text-white pt-24 md:pt-32 pb-10 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-14 lg:gap-10 mb-16 md:mb-20">
          {/* Brand */}
          <div className="lg:col-span-3 space-y-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <img
                src="/logo.png"
                alt="Tiger E-Bikes"
                className="h-9 object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col -space-y-1">
                <span className="text-xl font-black text-white tracking-tighter uppercase italic leading-none">
                  TIGER
                </span>
                <span className="text-[10px] font-black text-tiger-yellow tracking-[0.3em] uppercase italic">
                  E-BIKES
                </span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
              TIGER E-BIKES — redefining urban mobility with performance-driven electric vehicles.
            </p>
          </div>

          {/* Products */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-500">
              Products
            </h4>
            <ul className="space-y-3">
              {['Spark', 'Volt', 'Glide', 'Nova'].map((item) => (
                <li key={item}>
                  <Link
                    href="#lineup"
                    className="text-sm font-medium text-white/90 hover:text-tiger-yellow transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-500">
              Company
            </h4>
            <ul className="space-y-3">
              {['About', 'Technology', 'Sustainability', 'Careers'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-medium text-white/90 hover:text-tiger-yellow transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-500">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#faq" className="text-sm font-medium text-white/90 hover:text-tiger-yellow transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-white/90 hover:text-tiger-yellow transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm font-medium text-white/90 hover:text-tiger-yellow transition-colors">
                  Dealership
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-neutral-500">
              Newsletter
            </h4>
            <p className="text-sm text-neutral-400 leading-snug">
              Stay updated with the future of electric mobility.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Enter your email
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-tiger-yellow/50 transition-colors"
              />
              <button
                type="submit"
                className="shrink-0 bg-tiger-yellow text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-105 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5">
          <p className="text-neutral-600 text-xs font-medium">
            © 2026 TIGER E-BIKES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
