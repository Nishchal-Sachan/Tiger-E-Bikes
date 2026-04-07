import { NextResponse } from 'next/server';
import { getAdminFromRequest, unauthorizedJson } from '@/lib/auth';
import { connectDB, isMongoConfigured } from '@/lib/db';
import { Feature } from '@/models/Feature';

export const dynamic = 'force-dynamic';

/**
 * GET /api/features — all features, ascending by `order`.
 */
export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({ features: [] });
    }
    await connectDB();
    const features = await Feature.find().sort({ order: 1 }).lean();
    return NextResponse.json({ features });
  } catch (err) {
    console.error('[GET /api/features]', err);
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/features — create a feature.
 */
export async function POST(request) {
  try {
    if (!getAdminFromRequest(request)) {
      return unauthorizedJson();
    }

    const body = await request.json();
    const { title, description, image, order } = body ?? {};

    const missing = [];
    if (title == null || title === '') missing.push('title');
    if (description == null || description === '') missing.push('description');
    if (image == null || image === '') missing.push('image');
    if (order === undefined || order === null || Number.isNaN(Number(order))) {
      missing.push('order');
    }

    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Missing or invalid fields', fields: missing },
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

    const feature = await Feature.create({
      title,
      description,
      image,
      order: Number(order),
    });

    return NextResponse.json({ feature: feature.toObject() }, { status: 201 });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return NextResponse.json(
        { error: err.message, details: err.errors },
        { status: 400 }
      );
    }
    console.error('[POST /api/features]', err);
    return NextResponse.json(
      { error: 'Failed to create feature' },
      { status: 500 }
    );
  }
}
