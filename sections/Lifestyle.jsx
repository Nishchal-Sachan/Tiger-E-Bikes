import React from 'react';

const Lifestyle = () => {
  return (
    <section className="bg-black py-20 px-10 md:px-20 lg:p-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10">
        
        {/* LEFT: Big heading */}
        <div className="md:w-1/2">
          <h2 className="text-white text-4xl font-bold uppercase leading-tight tracking-tight">
            UNLOCK LIMITLESS ELECTRIC MOBILITY
          </h2>
        </div>

        {/* RIGHT: Paragraph text */}
        <div className="md:w-1/2 max-w-[400px] text-gray-400 text-lg leading-[1.4]">
          <p>
            Experience a new era of urban travel where range anxiety is a thing of the past. 
            Engineered for performance and designed for the modern lifestyle, our EV lineup 
            empowers you to go further, faster, and cleaner.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Lifestyle;
