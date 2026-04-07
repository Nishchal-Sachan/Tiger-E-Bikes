import 'server-only';

import { headers } from 'next/headers';
import { getApiBaseUrl } from '@/lib/getApiBaseUrl';
import { DEFAULT_REVALIDATE_SECONDS } from '@/lib/revalidate';

/**
 * Same-origin base URL for server-side fetches. Prefers the incoming request host
 * so dev works on any port (e.g. 3001); falls back to env / localhost when headers
 * are unavailable (e.g. build-time static generation).
 */
function getRequestBaseUrl() {
  try {
    const h = headers();
    const host = h.get('host');
    if (!host) return getApiBaseUrl();
    const isLocal =
      host.startsWith('localhost') || host.startsWith('127.');
    const forwarded = h.get('x-forwarded-proto');
    const scheme =
      forwarded === 'https' || forwarded === 'http'
        ? forwarded
        : isLocal
          ? 'http'
          : 'https';
    return `${scheme}://${host}`;
  } catch {
    return getApiBaseUrl();
  }
}

/**
 * Cached JSON fetch to same-origin API routes (ISR via `next.revalidate`).
 * @param {string} path - e.g. `/api/hero`
 * @param {{ revalidate?: number }} [options]
 * @returns {Promise<{ ok: boolean; status: number; data: unknown; error: string | null }>}
 */
export async function fetchPublicApi(path, options = {}) {
  const revalidate = options.revalidate ?? DEFAULT_REVALIDATE_SECONDS;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const url = `${getRequestBaseUrl()}${normalized}`;

  try {
    const res = await fetch(url, {
      next: { revalidate },
    });

    const text = await res.text();
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }
    }

    if (!res.ok) {
      const msg =
        (data && typeof data === 'object' && data.error && String(data.error)) ||
        res.statusText ||
        'Request failed';
      return {
        ok: false,
        status: res.status,
        data: null,
        error: String(msg),
      };
    }

    return {
      ok: true,
      status: res.status,
      data,
      error: null,
    };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: e instanceof Error ? e.message : 'Network error',
    };
  }
}
