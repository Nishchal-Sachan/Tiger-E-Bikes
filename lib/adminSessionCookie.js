import 'server-only';

/**
 * Admin JWT cookie — always HTTP-only (never readable from JavaScript in the browser).
 * Use only from Route Handlers / Server Actions; never mirror tokens in localStorage.
 */

/** @returns {Record<string, unknown>} Cookie options for NextResponse.cookies.set */
export function adminSessionCookieOptions(overrides = {}) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    ...overrides,
  };
}
