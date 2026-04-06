'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How long does it take to charge a Tiger E-Bike?",
      answer: "With our Ultra-Fast DC charging stations, you can reach 80% charge in just 45 minutes. Home charging typically takes 4-6 hours for a full charge."
    },
    {
      question: "What is the battery life expectancy?",
      answer: "Our Tiger Lithium-ion battery packs are engineered for 5000+ charge cycles, ensuring over 1.5 lakh kilometers of worry-free riding."
    },
    {
      question: "Are Tiger E-Bikes waterproof?",
      answer: "Yes, all Tiger models are IP67 rated, meaning the motor, battery, and controller are fully protected against dust and water immersion."
    },
    {
      question: "Do I need a special license to ride?",
      answer: "Low-speed Tiger Scooters do not require a license or registration. For high-speed models, a standard two-wheeler driving license is required."
    },
    {
      question: "What is the warranty on Tiger batteries?",
      answer: "We offer a standard 3-year warranty on our Tiger battery packs, extendable up to 5 years under certain maintenance programs."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-white py-24 md:py-32 px-6 md:px-12 overflow-hidden border-t border-matte-black/5" id="faq">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 font-['Inter', sans-serif]">
        
        {/* LEFT: Section Title */}
        <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4 text-center lg:text-left">
              <p className="text-tiger-yellow font-black uppercase tracking-[0.4em] text-xs">Customer Support</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-matte-black tracking-[-0.04em] uppercase leading-[0.9]">
                  FREQUENTLY <br className="hidden lg:block" /> ASKED <br className="hidden lg:block" /> <span className="text-neutral-300 italic">QUESTIONS</span>
              </h2>
            </div>
            <p className="text-neutral-500 text-lg md:text-xl font-medium leading-relaxed max-w-sm mx-auto lg:mx-0 text-center lg:text-left">
                Have a specific question? Explore our comprehensive FAQ or visit your nearest showroom.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button className="flex items-center gap-3 bg-matte-black text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95 italic">
                  Locate Showroom
              </button>
            </div>
        </div>

        {/* RIGHT: Accordion */}
        <div className="lg:col-span-7 space-y-2">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={cn(
                "border-b transition-all duration-300 group",
                openIndex === index ? "border-tiger-yellow" : "border-neutral-100"
              )}
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className={cn(
                  "text-xl md:text-2xl font-black uppercase tracking-tight transition-colors italic",
                  openIndex === index ? "text-matte-black" : "text-neutral-400 group-hover:text-matte-black"
                )}>
                  {faq.question}
                </span>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300",
                  openIndex === index ? "rotate-90 bg-tiger-yellow text-black border-tiger-yellow shadow-lg" : "bg-transparent text-neutral-300 border-neutral-100 group-hover:border-neutral-300"
                )}>
                  <Plus size={20} strokeWidth={3} />
                </div>
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-500",
                  openIndex === index ? "max-h-[400px] pb-12" : "max-h-0"
                )}
              >
                <p className="text-neutral-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl italic">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
