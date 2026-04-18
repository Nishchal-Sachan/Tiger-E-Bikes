import { NextResponse } from 'next/server';
import { connectDB, isMongoConfigured } from '@/lib/db';
import { AdminUser } from '@/models/AdminUser';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/bootstrap — public; tells the login UI whether first-admin signup is available.
 */
export async function GET() {
  const jwtConfigured = !!process.env.JWT_SECRET?.trim();
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const envLoginAvailable =
    jwtConfigured && !!adminEmail && adminPassword != null && adminPassword !== '';

  if (!jwtConfigured) {
    return NextResponse.json({
      jwtConfigured: false,
      needsFirstAdmin: false,
      envLoginAvailable: false,
      dbAdminExists: false,
    });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json({
      jwtConfigured: true,
      needsFirstAdmin: false,
      envLoginAvailable,
      dbAdminExists: false,
    });
  }

  try {
    await connectDB();
    const count = await AdminUser.countDocuments();
    const dbAdminExists = count > 0;
    return NextResponse.json({
      jwtConfigured: true,
      needsFirstAdmin: !dbAdminExists,
      envLoginAvailable: envLoginAvailable && !dbAdminExists,
      dbAdminExists,
    });
  } catch (err) {
    console.error('[GET /api/admin/bootstrap]', err);
    return NextResponse.json(
      {
        jwtConfigured: true,
        needsFirstAdmin: false,
        envLoginAvailable,
        dbAdminExists: false,
        warning: 'Could not reach the database. Check MONGODB_URI.',
      },
      { status: 200 }
    );
  }
}
