import Hero from '@/sections/Hero';
import FeatureSlider from '@/sections/FeatureSlider';
import BatteryTech from '@/sections/BatteryTech';
import Ecosystem from '@/sections/Ecosystem';
import ImpactStats from '@/sections/ImpactStats';
import VehicleShowcase from '@/sections/VehicleShowcase';
import FAQ from '@/sections/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-matte-black overflow-x-hidden">
      
      {/* 1. Hero */}
      <section className="w-full relative z-10 m-0 p-0">
        <Hero />
      </section>

      {/* 2. Feature Slider */}
      <section className="w-full relative z-10 m-0 p-0">
        <FeatureSlider />
      </section>

      {/* 3. Battery Tech */}
      <section className="w-full relative z-10 m-0 p-0">
        <BatteryTech />
      </section>

      {/* 4. Ecosystem Infrastructure */}
      <section className="w-full relative z-10 m-0 p-0">
        <Ecosystem />
      </section>

      {/* 5. Impact Stats */}
      <section className="w-full relative z-10 m-0 p-0">
        <ImpactStats />
      </section>

      {/* 6. Vehicle Showcase */}
      <section className="w-full relative z-10 m-0 p-0">
        <VehicleShowcase />
      </section>

      {/* 7. FAQ */}
      <section className="w-full relative z-10 m-0 p-0">
        <FAQ />
      </section>

      {/* 8. Footer (Already integrated in layout? No, I'll keep it here) */}
      <Footer />

    </div>
  );
}
