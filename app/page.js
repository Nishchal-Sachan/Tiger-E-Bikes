import { Suspense } from 'react';
import Hero from '@/sections/Hero';
import HeroLoading from '@/sections/HeroLoading';
import FeatureSlider from '@/sections/FeatureSlider';
import FeatureSliderLoading from '@/sections/FeatureSliderLoading';
import BatteryTech from '@/sections/BatteryTech';
import Ecosystem from '@/sections/Ecosystem';
import ImpactStats from '@/sections/ImpactStats';
import VehicleShowcase from '@/sections/VehicleShowcase';
import VehicleShowcaseLoading from '@/sections/VehicleShowcaseLoading';
import FAQ from '@/sections/FAQ';
import Footer from '@/components/Footer';

/** Ensures SSR uses the real request host/port for /api fetches (avoids wrong-port issues in dev). */
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-matte-black overflow-x-hidden">
      
      {/* 1. Hero (dynamic via /api/hero) */}
      <section className="w-full relative z-10 m-0 p-0">
        <Suspense fallback={<HeroLoading />}>
          <Hero />
        </Suspense>
      </section>

      {/* 2. Feature Slider (dynamic via /api/features) */}
      <section className="w-full relative z-10 m-0 p-0">
        <Suspense fallback={<FeatureSliderLoading />}>
          <FeatureSlider />
        </Suspense>
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

      {/* 6. Vehicle Showcase — z-20 so interactive cards stay above earlier sections */}
      <section className="w-full relative z-20 m-0 p-0">
        <Suspense fallback={<VehicleShowcaseLoading />}>
          <VehicleShowcase />
        </Suspense>
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
