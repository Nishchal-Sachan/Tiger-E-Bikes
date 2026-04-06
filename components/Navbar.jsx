'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-matte-black/95 backdrop-blur-xl z-50 border-b border-white/10">
      <div className="flex justify-between items-center h-full px-6 md:px-12 max-w-[1920px] mx-auto">
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Tiger E-Bikes" className="h-8 md:h-10 object-contain transition-transform group-hover:scale-105" />
            <div className="flex flex-col -space-y-1">
              <span className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase italic">TIGER</span>
              <span className="text-[10px] font-black text-tiger-yellow tracking-[0.3em] uppercase italic ml-0.5">E-BIKES</span>
            </div>
          </Link>
        </div>

        {/* CENTERED LINKS */}
        <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase font-black tracking-[0.3em] text-neutral-400">
          {['TIGERPOWER', 'LINEUP', 'CHARGING', 'SHOWROOMS', 'ABOUT'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* RIGHT: CONTACT / MENU */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-3 text-white">
            <Phone size={14} className="text-tiger-yellow" />
            <span className="text-[10px] font-black tracking-widest uppercase hover:text-tiger-yellow cursor-pointer transition-colors">+91 1800-TIGER-EB</span>
          </div>
          
          <button className="text-white hover:text-tiger-yellow transition-colors p-2">
            <div className="w-6 h-[2px] bg-current mb-1.5" />
            <div className="w-4 h-[2px] bg-current" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
