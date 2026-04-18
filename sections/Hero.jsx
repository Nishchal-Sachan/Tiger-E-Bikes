import { fetchPublicApi } from '@/lib/fetchPublicApi';
import { normalizeHeroResponse } from '@/lib/normalizeHero';
import { DEFAULT_HERO_SLIDES } from '@/lib/defaultHeroSlides';
import HeroSliderClient from '@/components/hero/HeroSliderClient';

export default async function Hero() {
  const result = await fetchPublicApi('/api/hero');
  const raw =
    result.ok && result.data && typeof result.data === 'object'
      ? result.data.hero ?? null
      : null;

  const { slides } = normalizeHeroResponse(raw);
  const slidesToUse =
    slides && slides.length > 0 ? slides : DEFAULT_HERO_SLIDES;

  return (
    <HeroSliderClient
      slides={slidesToUse}
      apiUnavailable={!result.ok}
      apiErrorMessage={result.error}
    />
  );
}
