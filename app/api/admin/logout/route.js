import { NextResponse } from 'next/server';
import { adminSessionCookieOptions } from '@/lib/adminSessionCookie';
import { ADMIN_TOKEN_COOKIE } from '@/lib/constants';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/logout — clear admin JWT cookie.
 */
export async function POST() {
  const res = NextResponse.json({ message: 'Logged out successfully' });
  res.cookies.set(
    ADMIN_TOKEN_COOKIE,
    '',
    adminSessionCookieOptions({ maxAge: 0 })
  );
  return res;
}
