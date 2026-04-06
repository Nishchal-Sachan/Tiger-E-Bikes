import React from 'react';

const CTA = () => {
  return (
    <section className="bg-white py-24 px-6 flex flex-col items-center justify-center text-center border-t border-neutral-100">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* CENTER: Text title */}
        <h2 className="text-4xl md:text-7xl font-black text-black tracking-tighter leading-none scale-95 md:scale-100 italic transition-transform duration-700">
          READY TO FEEL <br className="md:hidden"/> THE TIGER DIFFERENCE?
        </h2>

        {/* BELOW: Two buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-black text-white px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform shadow-xl active:scale-95">
             Locate Nearest Dealer
          </button>
          <button className="border-2 border-black text-black px-10 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all shadow-lg active:scale-95">
             Contact Sales
          </button>
        </div>

      </div>
    </section>
  );
};

export default CTA;
