import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAdminFromRequest, unauthorizedJson } from '@/lib/auth';
import { connectDB, isMongoConfigured } from '@/lib/db';
import { Feature } from '@/models/Feature';

export const dynamic = 'force-dynamic';

function invalidIdResponse() {
  return NextResponse.json({ error: 'Invalid feature id' }, { status: 400 });
}

/**
 * PUT /api/features/:id — update a feature.
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
    const { title, description, image, order, icon } = body ?? {};

    const update = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    if (image !== undefined) update.image = image;
    if (icon !== undefined) {
      update.icon = typeof icon === 'string' ? icon.trim() : '';
    }
    if (order !== undefined) {
      if (Number.isNaN(Number(order))) {
        return NextResponse.json(
          { error: 'Invalid order: must be a number' },
          { status: 400 }
        );
      }
      update.order = Number(order);
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

    const feature = await Feature.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).lean();

    if (!feature) {
      return NextResponse.json({ error: 'Feature not found' }, { status: 404 });
    }

    return NextResponse.json({ feature });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return NextResponse.json(
        { error: err.message, details: err.errors },
        { status: 400 }
      );
    }
    console.error('[PUT /api/features/:id]', err);
    return NextResponse.json(
      { error: 'Failed to update feature' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/features/:id — delete a feature.
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

    const feature = await Feature.findByIdAndDelete(id).lean();

    if (!feature) {
      return NextResponse.json({ error: 'Feature not found' }, { status: 404 });
    }

    return NextResponse.json({ feature });
  } catch (err) {
    console.error('[DELETE /api/features/:id]', err);
    return NextResponse.json(
      { error: 'Failed to delete feature' },
      { status: 500 }
    );
  }
}
