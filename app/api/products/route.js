import { NextResponse } from 'next/server';
import { getAdminFromRequest, unauthorizedJson } from '@/lib/auth';
import { connectDB, isMongoConfigured } from '@/lib/db';
import { Product, PRODUCT_CATEGORIES } from '@/models/Product';
import { getPublicProducts } from '@/lib/products/getPublicProducts';

export const dynamic = 'force-dynamic';

/**
 * GET /api/products — all products, optional ?category=scooter|motorcycle
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const filter = {};
    if (category != null && category !== '') {
      if (!PRODUCT_CATEGORIES.includes(category)) {
        return NextResponse.json(
          {
            error: 'Invalid category',
            allowed: PRODUCT_CATEGORIES,
          },
          { status: 400 }
        );
      }
      filter.category = category;
    }

    const { ok, products, error } = await getPublicProducts(filter);
    if (!ok) {
      return NextResponse.json(
        { error: error || 'Failed to fetch products' },
        { status: 500 }
      );
    }
    return NextResponse.json({ products });
  } catch (err) {
    console.error('[GET /api/products]', err);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products — create a product.
 */
export async function POST(request) {
  try {
    if (!getAdminFromRequest(request)) {
      return unauthorizedJson();
    }

    const body = await request.json();
    const {
      name,
      category,
      image,
      power,
      topSpeed,
      range,
      isFeatured,
    } = body ?? {};

    const missing = [];
    if (name == null || name === '') missing.push('name');
    if (category == null || category === '') missing.push('category');
    if (image == null || image === '') missing.push('image');
    if (power == null || power === '') missing.push('power');
    if (topSpeed == null || topSpeed === '') missing.push('topSpeed');
    if (range == null || range === '') missing.push('range');

    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missing },
        { status: 400 }
      );
    }

    if (!PRODUCT_CATEGORIES.includes(category)) {
      return NextResponse.json(
        {
          error: 'Invalid category',
          allowed: PRODUCT_CATEGORIES,
        },
        { status: 400 }
      );
    }

    if (
      isFeatured !== undefined &&
      typeof isFeatured !== 'boolean'
    ) {
      return NextResponse.json(
        { error: 'isFeatured must be a boolean' },
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

    const product = await Product.create({
      name,
      category,
      image,
      power,
      topSpeed,
      range,
      ...(isFeatured !== undefined ? { isFeatured } : {}),
    });

    return NextResponse.json({ product: product.toObject() }, { status: 201 });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return NextResponse.json(
        { error: err.message, details: err.errors },
        { status: 400 }
      );
    }
    console.error('[POST /api/products]', err);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
