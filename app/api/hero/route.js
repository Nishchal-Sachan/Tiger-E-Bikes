import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAdminFromRequest, unauthorizedJson } from '@/lib/auth';
import { connectDB, isMongoConfigured } from '@/lib/db';
import { normalizeHeroResponse } from '@/lib/normalizeHero';
import { Hero } from '@/models/Hero';

export const dynamic = 'force-dynamic';

function clampOverlay(n) {
  const x = Number(n);
  if (Number.isNaN(x)) return 72;
  return Math.min(92, Math.max(35, Math.round(x)));
}

function validateSlides(slides) {
  if (!Array.isArray(slides) || slides.length === 0) {
    return { ok: false, error: 'At least one slide is required', fields: ['slides'] };
  }

  const missing = [];
  const cleaned = [];

  slides.forEach((s, i) => {
    const prefix = `slides[${i}]`;
    if (s == null || typeof s !== 'object') {
      missing.push(`${prefix}`);
      return;
    }
    const title = typeof s.title === 'string' ? s.title.trim() : '';
    const backgroundImage =
      typeof s.backgroundImage === 'string' ? s.backgroundImage.trim() : '';
    const primaryButtonText =
      typeof s.primaryButtonText === 'string' ? s.primaryButtonText.trim() : '';
    const primaryButtonLink =
      typeof s.primaryButtonLink === 'string' ? s.primaryButtonLink.trim() : '';
    const secondaryButtonText =
      typeof s.secondaryButtonText === 'string'
        ? s.secondaryButtonText.trim()
        : '';
    const secondaryButtonLink =
      typeof s.secondaryButtonLink === 'string'
        ? s.secondaryButtonLink.trim()
        : '';

    const rowMissing = [];
    if (!title) rowMissing.push(`${prefix}.title`);
    if (!backgroundImage) rowMissing.push(`${prefix}.backgroundImage`);
    if (!primaryButtonText) rowMissing.push(`${prefix}.primaryButtonText`);
    if (!primaryButtonLink) rowMissing.push(`${prefix}.primaryButtonLink`);
    if (!secondaryButtonText) rowMissing.push(`${prefix}.secondaryButtonText`);
    if (!secondaryButtonLink) rowMissing.push(`${prefix}.secondaryButtonLink`);
    if (rowMissing.length) {
      missing.push(...rowMissing);
      return;
    }

    const subtitle = typeof s.subtitle === 'string' ? s.subtitle.trim() : '';
    const description =
      typeof s.description === 'string' ? s.description.trim() : '';
    const textAlign = ['left', 'center', 'right'].includes(s.textAlign)
      ? s.textAlign
      : 'left';

    const slide = {
      title,
      subtitle,
      description,
      backgroundImage,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      overlayStrength: clampOverlay(s.overlayStrength),
      textAlign,
    };

    if (s._id && mongoose.isValidObjectId(String(s._id))) {
      slide._id = s._id;
    }

    cleaned.push(slide);
  });

  if (missing.length) {
    return { ok: false, error: 'Missing required slide fields', fields: missing };
  }

  return { ok: true, slides: cleaned };
}

/**
 * GET /api/hero — single hero document with normalized `slides[]`.
 */
export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ hero: null });
    }
    await connectDB();
    const doc = await Hero.findOne().lean();
    const { hero } = normalizeHeroResponse(doc);
    return NextResponse.json({ hero });
  } catch (err) {
    console.error('[GET /api/hero]', err);
    return NextResponse.json(
      { error: 'Failed to fetch hero' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/hero — upsert hero. Body: `{ slides: [...] }` or legacy flat fields (one slide).
 */
export async function POST(request) {
  try {
    if (!getAdminFromRequest(request)) {
      return unauthorizedJson();
    }

    const body = await request.json();
    let slidesPayload = body?.slides;

    if (!Array.isArray(slidesPayload) || slidesPayload.length === 0) {
      const {
        title,
        subtitle,
        description = '',
        backgroundImage,
        primaryButtonText,
        primaryButtonLink,
        secondaryButtonText,
        secondaryButtonLink,
        overlayStrength,
        textAlign,
      } = body ?? {};

      const legacyMissing = [];
      if (title == null || title === '') legacyMissing.push('title');
      if (subtitle == null || subtitle === '') legacyMissing.push('subtitle');
      if (backgroundImage == null || backgroundImage === '')
        legacyMissing.push('backgroundImage');
      if (primaryButtonText == null || primaryButtonText === '')
        legacyMissing.push('primaryButtonText');
      if (primaryButtonLink == null || primaryButtonLink === '')
        legacyMissing.push('primaryButtonLink');
      if (secondaryButtonText == null || secondaryButtonText === '')
        legacyMissing.push('secondaryButtonText');
      if (secondaryButtonLink == null || secondaryButtonLink === '')
        legacyMissing.push('secondaryButtonLink');

      if (legacyMissing.length > 0) {
        return NextResponse.json(
          { error: 'Missing required fields', fields: legacyMissing },
          { status: 400 }
        );
      }

      slidesPayload = [
        {
          title,
          subtitle,
          description:
            typeof description === 'string' ? description.trim() : '',
          backgroundImage,
          primaryButtonText,
          primaryButtonLink,
          secondaryButtonText,
          secondaryButtonLink,
          overlayStrength: clampOverlay(overlayStrength),
          textAlign: ['left', 'center', 'right'].includes(textAlign)
            ? textAlign
            : 'left',
        },
      ];
    }

    const validated = validateSlides(slidesPayload);
    if (!validated.ok) {
      return NextResponse.json(
        { error: validated.error, fields: validated.fields },
        { status: 400 }
      );
    }

    const slides = validated.slides;
    const first = slides[0];

    if (!isMongoConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured. Set MONGODB_URI in .env.local' },
        { status: 503 }
      );
    }

    await connectDB();

    const hero = await Hero.findOneAndUpdate(
      {},
      {
        slides,
        title: first.title,
        subtitle: first.subtitle,
        description: first.description,
        backgroundImage: first.backgroundImage,
        primaryButtonText: first.primaryButtonText,
        primaryButtonLink: first.primaryButtonLink,
        secondaryButtonText: first.secondaryButtonText,
        secondaryButtonLink: first.secondaryButtonLink,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

    const { hero: normalized } = normalizeHeroResponse(hero);
    return NextResponse.json({ hero: normalized });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return NextResponse.json(
        { error: err.message, details: err.errors },
        { status: 400 }
      );
    }
    console.error('[POST /api/hero]', err);
    return NextResponse.json(
      { error: 'Failed to save hero' },
      { status: 500 }
    );
  }
}
