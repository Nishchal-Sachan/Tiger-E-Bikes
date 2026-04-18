import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/bootstrap — public; tells the login UI whether env-based admin sign-in is ready.
 */
export async function GET() {
  const jwtConfigured = !!process.env.JWT_SECRET?.trim();
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const envLoginAvailable =
    jwtConfigured && !!adminEmail && adminPassword != null && adminPassword !== '';

  return NextResponse.json({
    jwtConfigured,
    envLoginAvailable,
  });
}
