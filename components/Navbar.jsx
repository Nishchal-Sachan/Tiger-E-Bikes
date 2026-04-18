'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Menu } from 'lucide-react';

const Navbar = () => {
  const centerLinks = [
    { label: 'TIGER POWER', href: '/#battery-tech' },
    { label: 'TIGER EV', href: '/#lineup' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-matte-black/95 backdrop-blur-xl z-50 border-b border-white/10">
      <div className="relative flex items-center justify-between h-full px-6 md:px-12 max-w-[1920px] mx-auto">
        {/* Left: logo */}
        <div className="flex-shrink-0 z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Tiger E-Bikes" className="h-8 md:h-10 object-contain transition-transform group-hover:scale-105" />
            <div className="flex flex-col -space-y-1">
              <span className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase italic">TIGER</span>
              <span className="text-[10px] font-black text-tiger-yellow tracking-[0.3em] uppercase italic ml-0.5">E-BIKES</span>
            </div>
          </Link>
        </div>

        {/* Center: exactly two links */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-14 text-[10px] uppercase font-black tracking-[0.28em] text-neutral-400">
          {centerLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: phone + menu */}
        <div className="flex items-center gap-6 md:gap-8 flex-shrink-0 z-10">
          <div className="flex items-center gap-2.5 text-white">
            <Phone size={14} className="text-tiger-yellow shrink-0" />
            <a
              href="tel:+919453605312"
              className="text-[9px] sm:text-[10px] font-black tracking-[0.18em] sm:tracking-[0.2em] uppercase whitespace-nowrap hover:text-tiger-yellow transition-colors"
            >
              9453605312
            </a>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="text-white hover:text-tiger-yellow transition-colors p-2 -mr-2"
          >
            <Menu size={22} strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
