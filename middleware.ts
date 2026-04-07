/**
 * Edge middleware: JWT verified with JWT_SECRET (server env only, never sent to the browser).
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { ADMIN_TOKEN_COOKIE } from '@/lib/constants';

const LOGIN_PATH = '/admin/login';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === LOGIN_PATH || pathname.startsWith(`${LOGIN_PATH}/`)) {
    const loginToken = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
    const loginSecret = process.env.JWT_SECRET?.trim();
    if (loginToken && loginSecret) {
      try {
        const key = new TextEncoder().encode(loginSecret);
        const { payload } = await jwtVerify(loginToken, key, {
          algorithms: ['HS256'],
        });
        if (payload.isAdmin === true) {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      } catch {
        // Invalid or expired token — show login form
      }
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  const secret = process.env.JWT_SECRET?.trim();

  if (!token || !secret) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
    if (payload.isAdmin !== true) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    }
  } catch {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
