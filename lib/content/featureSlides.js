/**
 * Feature Slides — brand story (power, safety, intelligence, comfort), not products.
 * JSON: content/collections/feature_slides.json
 *
 * `backgroundImage` may be a legacy string URL/path, or `{ url, public_id }` from Cloudinary.
 */

/** Public URL for `<img>` / CSS (legacy string or Cloudinary object). */
export function featureSlideBackgroundUrl(rawBackground) {
  if (rawBackground == null) return '';
  if (typeof rawBackground === 'string') return rawBackground.trim();
  if (typeof rawBackground === 'object' && typeof rawBackground.url === 'string') {
    return rawBackground.url.trim();
  }
  return '';
}

export function getFeatureBackgroundPublicId(rawBackground) {
  if (rawBackground && typeof rawBackground === 'object' && typeof rawBackground.public_id === 'string') {
    const id = rawBackground.public_id.trim();
    return id || null;
  }
  return null;
}

export function normalizeFeatureSlide(raw, index = 0) {
  const id =
    raw.id && String(raw.id).trim() !== ''
      ? String(raw.id)
      : `feature-${index}-${(raw.title || 'slide').toString().slice(0, 20)}`;

  const bgRaw = raw.backgroundImage ?? raw.image;

  return {
    id,
    tag: raw.tag ?? '',
    title: raw.title ?? '',
    description: raw.description ?? '',
    ctaText: raw.ctaText ?? raw.cta ?? 'LEARN MORE',
    backgroundImage: featureSlideBackgroundUrl(bgRaw),
    order: typeof raw.order === 'number' && !Number.isNaN(raw.order) ? raw.order : index,
    isActive: raw.isActive !== false,
  };
}

/** Public slider: active only, sorted by order. */
export function getVisibleFeatureSlides(slides = []) {
  return slides
    .map((s, i) => normalizeFeatureSlide(s, i))
    .filter((s) => s.isActive)
    .sort((a, b) => a.order - b.order);
}

export function sortFeatureSlidesInDocument(doc) {
  if (!doc || typeof doc !== 'object') return doc;
  const slides = Array.isArray(doc.slides) ? [...doc.slides] : [];
  const indexed = slides.map((s, i) => ({ raw: s, fallback: i }));
  indexed.sort((a, b) => {
    const oa =
      typeof a.raw.order === 'number' && !Number.isNaN(a.raw.order) ? a.raw.order : a.fallback;
    const ob =
      typeof b.raw.order === 'number' && !Number.isNaN(b.raw.order) ? b.raw.order : b.fallback;
    return oa - ob;
  });
  const nextSlides = indexed.map(({ raw }, idx) => ({
    ...raw,
    order: idx,
  }));
  return { ...doc, slides: nextSlides };
}
