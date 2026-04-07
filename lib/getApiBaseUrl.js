/**
 * Base URL for server-side fetch to this app's API routes (RSC / Route Handlers only).
 * Prefer `SITE_URL` — server-only, not exposed to the browser. On Vercel, `VERCEL_URL` is set automatically.
 * Legacy: `NEXT_PUBLIC_SITE_URL` is still read if `SITE_URL` is unset (public origin only, never a secret).
 */
export function getApiBaseUrl() {
  const siteUrl =
    process.env.SITE_URL?.replace(/\/$/, '') ||
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (siteUrl) return siteUrl;

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const port = process.env.PORT?.trim() || '3000';
  return `http://127.0.0.1:${port}`;
}
