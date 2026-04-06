import React from 'react';

const SplitBanner = () => {
  return (
    <section className="bg-neutral-50 px-6 py-20 lg:p-24 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* LEFT: Product image (scooter) */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img 
            src="/scooter-1.png" 
            alt="SUMMER SAVINGS EVENT Scooter" 
            className="w-full max-w-[600px] h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)]"
          />
        </div>

        {/* RIGHT: Text content and button */}
        <div className="md:w-1/2 text-left space-y-10">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-neutral-400">Featured Offer</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-none tracking-tighter">
              SUMMER <br/> SAVINGS EVENT
            </h2>
            <p className="text-neutral-500 text-lg md:text-xl font-medium max-w-sm leading-relaxed">
              Unlock exclusive benefits and cash-back rewards on your next Tiger E-Bike purchase. Limited time only.
            </p>
          </div>

          <button className="bg-black text-white px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
            VIEW MORE DETAILS
          </button>
        </div>

      </div>
    </section>
  );
};

export default SplitBanner;
