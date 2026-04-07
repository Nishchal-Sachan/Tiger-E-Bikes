import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

const FORM_FIELDS = ['file', 'image'];

function isCloudinaryConfigured() {
  return (
    !!process.env.CLOUDINARY_CLOUD_NAME &&
    !!process.env.CLOUDINARY_API_KEY &&
    !!process.env.CLOUDINARY_API_SECRET
  );
}

/**
 * True if the value looks like an image/* MIME type.
 */
function isImageMimeType(type) {
  return typeof type === 'string' && type.toLowerCase().startsWith('image/');
}

/**
 * POST /api/upload — multipart FormData with an image field (`file` or `image`).
 * Returns { secure_url } from Cloudinary.
 */
export async function POST(request) {
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: 'Cloudinary is not configured' },
      { status: 500 }
    );
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: 'Expected multipart form data' },
      { status: 400 }
    );
  }

  let file = null;
  for (const key of FORM_FIELDS) {
    const value = formData.get(key);
    if (value && typeof value !== 'string') {
      file = value;
      break;
    }
  }

  if (!file) {
    return NextResponse.json(
      { error: 'No image file provided (use field "file" or "image")' },
      { status: 400 }
    );
  }

  if (!isImageMimeType(file.type)) {
    return NextResponse.json(
      { error: 'Only image files are allowed' },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'ev-landing',
        },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      );
      uploadStream.end(buffer);
    });

    if (!result?.secure_url) {
      return NextResponse.json(
        { error: 'Upload did not return a URL' },
        { status: 500 }
      );
    }

    return NextResponse.json({ secure_url: result.secure_url });
  } catch (err) {
    console.error('[POST /api/upload]', err);
    return NextResponse.json(
      { error: err.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
