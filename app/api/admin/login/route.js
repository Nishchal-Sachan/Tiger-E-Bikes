import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { adminSessionCookieOptions } from '@/lib/adminSessionCookie';
import { ADMIN_TOKEN_COOKIE } from '@/lib/constants';
import { connectDB, isMongoConfigured } from '@/lib/db';
import { AdminUser } from '@/models/AdminUser';

export const dynamic = 'force-dynamic';
const ONE_DAY_SECONDS = 60 * 60 * 24;

function jsonWithAdminCookie(secret) {
  const token = jwt.sign({ isAdmin: true }, secret, { expiresIn: '1d' });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(
    ADMIN_TOKEN_COOKIE,
    token,
    adminSessionCookieOptions({ maxAge: ONE_DAY_SECONDS })
  );
  return res;
}

/**
 * POST /api/admin/login — JWT cookie. Uses Mongo admin users when any exist; otherwise .env credentials.
 * Body: { email: string, password: string }
 */
export async function POST(request) {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: 'JWT_SECRET is not set in .env.local' },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const emailInput =
    typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!emailInput || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? '';
  const adminPassword = process.env.ADMIN_PASSWORD;
  const envLoginReady =
    !!adminEmail && adminPassword != null && adminPassword !== '';

  let dbAdminCount = null;
  if (isMongoConfigured()) {
    try {
      await connectDB();
      dbAdminCount = await AdminUser.countDocuments();
      if (dbAdminCount > 0) {
        const user = await AdminUser.findOne({ email: emailInput });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
          return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
        return jsonWithAdminCookie(secret);
      }
    } catch (err) {
      console.error('[POST /api/admin/login]', err);
      return NextResponse.json(
        { error: 'Cannot reach the database. Check MONGODB_URI.' },
        { status: 503 }
      );
    }
  }

  if (isMongoConfigured() && dbAdminCount === 0 && !envLoginReady) {
    return NextResponse.json(
      {
        error:
          'No admin account yet. Use “Create administrator account” on the login page, or set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local.',
      },
      { status: 403 }
    );
  }

  if (!envLoginReady) {
    return NextResponse.json(
      {
        error:
          'Admin login is not configured. Set ADMIN_EMAIL, ADMIN_PASSWORD, and JWT_SECRET in .env.local.',
      },
      { status: 500 }
    );
  }

  if (emailInput !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return jsonWithAdminCookie(secret);
}
