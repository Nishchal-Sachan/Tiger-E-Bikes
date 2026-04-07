import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAdminFromRequest, unauthorizedJson } from '@/lib/auth';
import { connectDB, isMongoConfigured } from '@/lib/db';
import { Product, PRODUCT_CATEGORIES } from '@/models/Product';

export const dynamic = 'force-dynamic';

function invalidIdResponse() {
  return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
}

/**
 * PUT /api/products/:id — update a product.
 */
export async function PUT(request, { params }) {
  try {
    if (!getAdminFromRequest(request)) {
      return unauthorizedJson();
    }

    const { id } = params;
    if (!mongoose.isValidObjectId(id)) {
      return invalidIdResponse();
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

    const update = {};
    if (name !== undefined) update.name = name;
    if (category !== undefined) {
      if (!PRODUCT_CATEGORIES.includes(category)) {
        return NextResponse.json(
          { error: 'Invalid category', allowed: PRODUCT_CATEGORIES },
          { status: 400 }
        );
      }
      update.category = category;
    }
    if (image !== undefined) update.image = image;
    if (power !== undefined) update.power = power;
    if (topSpeed !== undefined) update.topSpeed = topSpeed;
    if (range !== undefined) update.range = range;
    if (isFeatured !== undefined) {
      if (typeof isFeatured !== 'boolean') {
        return NextResponse.json(
          { error: 'isFeatured must be a boolean' },
          { status: 400 }
        );
      }
      update.isFeatured = isFeatured;
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
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

    const product = await Product.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return NextResponse.json(
        { error: err.message, details: err.errors },
        { status: 400 }
      );
    }
    console.error('[PUT /api/products/:id]', err);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/:id — delete a product.
 */
export async function DELETE(request, { params }) {
  try {
    if (!getAdminFromRequest(request)) {
      return unauthorizedJson();
    }

    const { id } = params;
    if (!mongoose.isValidObjectId(id)) {
      return invalidIdResponse();
    }

    if (!isMongoConfigured()) {
      return NextResponse.json(
        { error: 'Database not configured. Set MONGODB_URI in .env.local' },
        { status: 503 }
      );
    }

    await connectDB();

    const product = await Product.findByIdAndDelete(id).lean();

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (err) {
    console.error('[DELETE /api/products/:id]', err);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
