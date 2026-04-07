import { NextResponse } from 'next/server';
import { getAdminFromRequest, unauthorizedJson } from '@/lib/auth';
import { connectDB, isMongoConfigured } from '@/lib/db';
import { Hero } from '@/models/Hero';

export const dynamic = 'force-dynamic';

/**
 * GET /api/hero — return the single hero document (or null if none).
 */
export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ hero: null });
    }
    await connectDB();
    const hero = await Hero.findOne().lean();
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
 * POST /api/hero — create or update the only hero document (upsert).
 */
export async function POST(request) {
  try {
    if (!getAdminFromRequest(request)) {
      return unauthorizedJson();
    }

    const body = await request.json();
    const {
      title,
      subtitle,
      backgroundImage,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
    } = body ?? {};

    const missing = [];
    if (title == null || title === '') missing.push('title');
    if (subtitle == null || subtitle === '') missing.push('subtitle');
    if (backgroundImage == null || backgroundImage === '')
      missing.push('backgroundImage');
    if (primaryButtonText == null || primaryButtonText === '')
      missing.push('primaryButtonText');
    if (primaryButtonLink == null || primaryButtonLink === '')
      missing.push('primaryButtonLink');
    if (secondaryButtonText == null || secondaryButtonText === '')
      missing.push('secondaryButtonText');
    if (secondaryButtonLink == null || secondaryButtonLink === '')
      missing.push('secondaryButtonLink');

    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missing },
        { status: 400 }
      );
    }

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
        title,
        subtitle,
        backgroundImage,
        primaryButtonText,
        primaryButtonLink,
        secondaryButtonText,
        secondaryButtonLink,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

    return NextResponse.json({ hero });
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
