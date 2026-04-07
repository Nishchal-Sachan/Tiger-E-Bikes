'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/utils/cn';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How long does it take to charge a TIGER EV?',
      answer:
        'Reach up to 70% in 15–20 minutes with fast charging. Full charge takes 4–6 hours.',
    },
    {
      question: 'What is the battery life expectancy?',
      answer:
        'Designed for over 1500 cycles, delivering 8–10 years of reliable performance.',
    },
    {
      question: 'Are TIGER EV vehicles waterproof?',
      answer:
        'Yes, IP67-rated protection ensures durability in all weather conditions.',
    },
    {
      question: 'Do I need a special license?',
      answer:
        'Depends on model—standard license for low-speed, motorcycle license for high-performance models.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-white py-24 md:py-32 px-6 md:px-12 overflow-hidden border-t border-matte-black/5" id="faq">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 font-['Inter', sans-serif]">
        
        {/* LEFT: Section Title */}
        <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-matte-black tracking-[-0.04em] uppercase leading-[0.95] max-w-lg mx-auto lg:mx-0">
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>
            <p className="text-neutral-600 text-lg md:text-xl font-medium leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              Answers to common questions. Visit a showroom for a test ride or detailed consultation.
            </p>
            <div className="flex justify-center lg:justify-start">
              <button
                type="button"
                className="flex items-center gap-3 bg-matte-black text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
              >
                FIND A SHOWROOM
              </button>
            </div>
        </div>

        {/* RIGHT: Accordion */}
        <div className="lg:col-span-7 space-y-2">
          {faqs.map((faq, index) => (
            <div 
              key={faq.question} 
              className={cn(
                "border-b transition-all duration-300 group",
                openIndex === index ? "border-tiger-yellow" : "border-neutral-100"
              )}
            >
              <button 
                type="button"
                onClick={() => toggleFAQ(index)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className={cn(
                  "text-xl md:text-2xl font-black uppercase tracking-tight transition-colors",
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
                <p className="text-neutral-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
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
