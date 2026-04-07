import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { adminSessionCookieOptions } from '@/lib/adminSessionCookie';
import { ADMIN_TOKEN_COOKIE } from '@/lib/constants';

export const dynamic = 'force-dynamic';
const ONE_DAY_SECONDS = 60 * 60 * 24;

/**
 * POST /api/admin/login — validate admin credentials, set HTTP-only JWT cookie.
 * Body: { email: string, password: string }
 */
export async function POST(request) {
  const secret = process.env.JWT_SECRET;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!secret?.trim() || !adminEmail?.trim() || !adminPassword) {
    return NextResponse.json(
      { error: 'Admin login is not configured' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  if (email !== adminEmail.trim() || password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ isAdmin: true }, secret, { expiresIn: '1d' });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(
    ADMIN_TOKEN_COOKIE,
    token,
    adminSessionCookieOptions({ maxAge: ONE_DAY_SECONDS })
  );

  return res;
}
