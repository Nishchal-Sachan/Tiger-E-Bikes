/**
 * Normalize hero from DB: legacy flat document → always exposes `slides[]` for the frontend.
 */

const LEGACY_DEFAULTS = {
  title: 'SPARK',
  subtitle: 'Built for City Riders',
  description:
    'Lightweight, responsive, and efficient — built for everyday urban miles with predictable running costs.',
  backgroundImage: '/scooter-1.png',
  primaryButtonText: 'VIEW LINEUP',
  primaryButtonLink: '/#lineup',
  secondaryButtonText: 'BOOK TEST RIDE',
  secondaryButtonLink: '/dealership',
};

export function normalizeHeroResponse(hero) {
  if (!hero) {
    return { hero: null, slides: null };
  }

  const raw = typeof hero.toObject === 'function' ? hero.toObject() : { ...hero };

  if (Array.isArray(raw.slides) && raw.slides.length > 0) {
    const slides = raw.slides.map((s) => ({
      _id: s._id?.toString?.() ?? s._id,
      title: s.title ?? '',
      subtitle: s.subtitle ?? '',
      description: s.description ?? '',
      backgroundImage: s.backgroundImage ?? LEGACY_DEFAULTS.backgroundImage,
      primaryButtonText: s.primaryButtonText ?? LEGACY_DEFAULTS.primaryButtonText,
      primaryButtonLink: s.primaryButtonLink ?? LEGACY_DEFAULTS.primaryButtonLink,
      secondaryButtonText: s.secondaryButtonText ?? LEGACY_DEFAULTS.secondaryButtonText,
      secondaryButtonLink: s.secondaryButtonLink ?? LEGACY_DEFAULTS.secondaryButtonLink,
      overlayStrength:
        typeof s.overlayStrength === 'number' ? s.overlayStrength : 72,
      textAlign: ['left', 'center', 'right'].includes(s.textAlign)
        ? s.textAlign
        : 'left',
    }));
    return { hero: { ...raw, slides }, slides };
  }

  const title = raw.title || LEGACY_DEFAULTS.title;
  const subtitle = raw.subtitle || LEGACY_DEFAULTS.subtitle;
  const description =
    raw.description || raw.subtitle || LEGACY_DEFAULTS.description;

  const slide = {
    _id: raw._id?.toString?.() ?? 'legacy',
    title,
    subtitle,
    description,
    backgroundImage: raw.backgroundImage || LEGACY_DEFAULTS.backgroundImage,
    primaryButtonText: raw.primaryButtonText || LEGACY_DEFAULTS.primaryButtonText,
    primaryButtonLink: raw.primaryButtonLink || LEGACY_DEFAULTS.primaryButtonLink,
    secondaryButtonText:
      raw.secondaryButtonText || LEGACY_DEFAULTS.secondaryButtonText,
    secondaryButtonLink:
      raw.secondaryButtonLink || LEGACY_DEFAULTS.secondaryButtonLink,
    overlayStrength:
      typeof raw.overlayStrength === 'number' ? raw.overlayStrength : 72,
    textAlign: ['left', 'center', 'right'].includes(raw.textAlign)
      ? raw.textAlign
      : 'left',
  };

  return {
    hero: { ...raw, slides: [slide] },
    slides: [slide],
  };
}
