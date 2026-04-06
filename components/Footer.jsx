'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-matte-black text-white pt-32 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="flex items-center gap-3 group">
                <img src="/logo.png" alt="Tiger E-Bikes" className="h-10 object-contain transition-transform group-hover:scale-105" />
                <div className="flex flex-col -space-y-1">
                    <span className="text-2xl font-black text-white tracking-tighter uppercase italic">TIGER</span>
                    <span className="text-[10px] font-black text-tiger-yellow tracking-[0.3em] uppercase italic ml-0.5">E-BIKES</span>
                </div>
            </Link>
            <div className="space-y-6">
                <h4 className="text-neutral-500 text-[10px] uppercase font-black tracking-widest leading-none">Headquarters</h4>
                <p className="text-white text-lg font-medium leading-relaxed max-w-xs">
                    Tiger E-Bikes India, H.No 12-13, <br />
                    Tiger Plaza, Jeedimetla, <br />
                    Hyderabad, Telangana 500055
                </p>
                <div className="flex gap-4 pt-4">
                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <button key={i} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-tiger-yellow hover:text-black transition-all duration-500 group">
                        <Icon size={20} strokeWidth={2.5} />
                    </button>
                    ))}
                </div>
            </div>
          </div>

          {/* LINKS COLUMNS */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-neutral-500 text-[10px] uppercase font-black tracking-widest leading-none">Models</h4>
            <ul className="space-y-4">
              {['Tiger X1 Elite', 'Tiger X1 Plus', 'Tiger Storm 350', 'Tiger Blaze 350', 'Ecostorm Max'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white text-sm font-black uppercase tracking-wider hover:text-tiger-yellow transition-all block italic">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-neutral-500 text-[10px] uppercase font-black tracking-widest leading-none">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Media Center', 'Careers', 'Showrooms', 'Sustainability'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white text-sm font-black uppercase tracking-wider hover:text-tiger-yellow transition-all block italic">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-neutral-500 text-[10px] uppercase font-black tracking-widest leading-none">Community</h4>
            <ul className="space-y-4">
              {['Owner Stories', 'Tiger Network', 'Help Center', 'Safety', 'Privacy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-white text-sm font-black uppercase tracking-wider hover:text-tiger-yellow transition-all block italic">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-neutral-500 text-[10px] uppercase font-black tracking-widest leading-none">Connect</h4>
            <div className="space-y-6">
                <div>
                    <p className="text-tiger-yellow text-sm font-black uppercase tracking-widest mb-1 italic">+91 1800-TIGER-EB</p>
                    <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">support@tigerebikes.in</p>
                </div>
                <button className="w-full bg-white/5 border border-white/10 hover:border-tiger-yellow hover:text-tiger-yellow py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all italic">
                    Contact Form
                </button>
                <div className="flex items-center gap-3 text-neutral-500 hover:text-tiger-yellow transition-all cursor-pointer group">
                    <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Tiger Insights</span>
                </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-neutral-600 text-[10px] font-black uppercase tracking-[0.3em]">
                &copy; {new Date().getFullYear()} TIGER E-BIKES INDIA. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8">
                {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
                    <Link key={item} href="#" className="text-neutral-600 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                        {item}
                    </Link>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
