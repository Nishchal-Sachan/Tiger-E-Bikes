import 'server-only';

/**
 * JWT verification with JWT_SECRET — import this only from server code (Route Handlers,
 * Server Actions, server components). Never verify or trust tokens in client components.
 */
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ADMIN_TOKEN_COOKIE } from '@/lib/constants';

/** Standard 401 for mutating routes when JWT is missing or not admin. */
export function unauthorizedJson() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export { ADMIN_TOKEN_COOKIE };

/**
 * Verify a JWT using JWT_SECRET. Returns the decoded payload or null.
 * @param {string | undefined | null} token
 * @returns {import('jsonwebtoken').JwtPayload | string | null}
 */
export function verifyToken(token) {
  if (token == null || typeof token !== 'string' || !token.trim()) {
    return null;
  }
  const secret = process.env.JWT_SECRET;
  if (!secret?.trim()) {
    return null;
  }
  try {
    return jwt.verify(token.trim(), secret);
  } catch {
    return null;
  }
}

/**
 * Read admin cookie from a Next.js request, verify JWT, return whether the user is admin.
 * @param {import('next/server').NextRequest | Request} request
 * @returns {boolean}
 */
export function getAdminFromRequest(request) {
  const raw =
    'cookies' in request && typeof request.cookies?.get === 'function'
      ? request.cookies.get(ADMIN_TOKEN_COOKIE)?.value
      : parseCookieHeader(request.headers.get('cookie'), ADMIN_TOKEN_COOKIE);

  const decoded = verifyToken(raw);
  if (decoded == null || typeof decoded !== 'object') {
    return false;
  }
  return decoded.isAdmin === true;
}

/**
 * @param {string | null} header
 * @param {string} name
 * @returns {string | null}
 */
function parseCookieHeader(header, name) {
  if (!header) return null;
  const parts = header.split(';');
  for (const part of parts) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) {
      return decodeURIComponent(rest.join('=').trim());
    }
  }
  return null;
}
