import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { adminSessionCookieOptions } from '@/lib/adminSessionCookie';
import { ADMIN_TOKEN_COOKIE } from '@/lib/constants';
import { connectDB, isMongoConfigured } from '@/lib/db';
import { AdminUser } from '@/models/AdminUser';

export const dynamic = 'force-dynamic';
const ONE_DAY_SECONDS = 60 * 60 * 24;
const BCRYPT_ROUNDS = 12;

/**
 * POST /api/admin/register — create the first (and only bootstrap) admin when DB is empty.
 * Body: { email: string, password: string }
 */
export async function POST(request) {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: 'JWT_SECRET is not set. Add it to .env.local first.' },
      { status: 500 }
    );
  }

  if (!isMongoConfigured()) {
    return NextResponse.json(
      {
        error:
          'MongoDB is required to create an admin account. Set MONGODB_URI in .env.local, or use ADMIN_EMAIL / ADMIN_PASSWORD for sign-in only.',
      },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const emailRaw = typeof body?.email === 'string' ? body.email.trim() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!emailRaw || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  const email = emailRaw.toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters' },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const existing = await AdminUser.countDocuments();
    if (existing > 0) {
      return NextResponse.json(
        { error: 'An admin account already exists. Sign in instead.' },
        { status: 403 }
      );
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    await AdminUser.create({ email, passwordHash });

    const token = jwt.sign({ isAdmin: true }, secret, { expiresIn: '1d' });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(
      ADMIN_TOKEN_COOKIE,
      token,
      adminSessionCookieOptions({ maxAge: ONE_DAY_SECONDS })
    );
    return res;
  } catch (err) {
    if (err.code === 11000) {
      return NextResponse.json({ error: 'That email is already registered' }, { status: 409 });
    }
    console.error('[POST /api/admin/register]', err);
    return NextResponse.json(
      { error: 'Could not create admin account. Try again.' },
      { status: 500 }
    );
  }
}
