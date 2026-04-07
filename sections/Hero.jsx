import Image from 'next/image';
import Link from 'next/link';
import { fetchPublicApi } from '@/lib/fetchPublicApi';
import ApiStatusBanner from '@/components/ui/ApiStatusBanner';

const DEFAULT_HERO = {
  title: 'SPARK',
  subtitle:
    'Built for the city. Lightweight, responsive, and effortlessly quick—perfect for everyday urban movement.',
  backgroundImage: '/scooter-1.png',
  primaryButtonText: 'BUY NOW',
  primaryButtonLink: '#',
  secondaryButtonText: 'BOOK A TEST DRIVE',
  secondaryButtonLink: '#',
};

function mergeHero(hero) {
  if (!hero) return DEFAULT_HERO;
  return {
    title: hero.title || DEFAULT_HERO.title,
    subtitle: hero.subtitle || DEFAULT_HERO.subtitle,
    backgroundImage: hero.backgroundImage || DEFAULT_HERO.backgroundImage,
    primaryButtonText: hero.primaryButtonText || DEFAULT_HERO.primaryButtonText,
    primaryButtonLink: hero.primaryButtonLink || DEFAULT_HERO.primaryButtonLink,
    secondaryButtonText:
      hero.secondaryButtonText || DEFAULT_HERO.secondaryButtonText,
    secondaryButtonLink:
      hero.secondaryButtonLink || DEFAULT_HERO.secondaryButtonLink,
  };
}

function CtaLink({ href, className, children }) {
  const safe = href?.trim() || '#';
  const external = /^https?:\/\//i.test(safe);

  if (external) {
    return (
      <a href={safe} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={safe} className={className}>
      {children}
    </Link>
  );
}

export default async function Hero() {
  const result = await fetchPublicApi('/api/hero');
  const raw =
    result.ok && result.data && typeof result.data === 'object'
      ? result.data.hero ?? null
      : null;
  const hero = mergeHero(raw);
  const apiUnavailable = !result.ok;

  return (
    <section
      id="hero"
      className="relative z-0 w-full overflow-hidden bg-matte-black h-[calc(100vh-70px)]"
    >
      {apiUnavailable && (
        <ApiStatusBanner>
          Hero content couldn&apos;t be loaded from the server. Showing default
          content.{result.error ? ` (${result.error})` : ''}
        </ApiStatusBanner>
      )}

      <div className="relative flex h-full w-full items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.72] opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-24 lg:px-44">
          <h1 className="mb-6 text-5xl font-black uppercase leading-[0.92] tracking-[-0.04em] text-white md:mb-8 md:text-7xl lg:text-[6.5rem]">
            {hero.title}
          </h1>

          <p className="mb-10 max-w-xl text-base font-medium leading-relaxed text-neutral-300 md:mb-12 md:max-w-2xl md:text-xl">
            {hero.subtitle}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            <CtaLink
              href={hero.primaryButtonLink}
              className="inline-flex justify-center rounded-xl bg-tiger-yellow px-10 py-4 text-xs font-black uppercase tracking-[0.2em] text-black shadow-[0_16px_40px_rgba(250,204,21,0.22)] transition-all hover:brightness-105 active:scale-[0.98] md:px-12 md:py-5"
            >
              {hero.primaryButtonText}
            </CtaLink>
            <CtaLink
              href={hero.secondaryButtonLink}
              className="inline-flex justify-center rounded-xl border border-white/25 px-10 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black md:px-12 md:py-5"
            >
              {hero.secondaryButtonText}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
