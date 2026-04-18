import 'server-only';

import { connectDB, isMongoConfigured } from '@/lib/db';
import { Product } from '@/models/Product';

function serializeLeanDoc(doc) {
  if (doc == null || typeof doc !== 'object') return doc;
  const out = { ...doc };
  if (out._id != null) out._id = String(out._id);
  if (out.createdAt instanceof Date) out.createdAt = out.createdAt.toISOString();
  if (out.updatedAt instanceof Date) out.updatedAt = out.updatedAt.toISOString();
  return out;
}

/**
 * Read products for the public site / API. Uses Mongo directly so server components
 * avoid same-origin HTTP self-fetch (can stall the dev server).
 * @param {Record<string, unknown>} [filter]
 * @returns {Promise<{ ok: boolean; products: Array<Record<string, unknown>>; error: string | null }>}
 */
export async function getPublicProducts(filter = {}) {
  if (!isMongoConfigured()) {
    return { ok: true, products: [], error: null };
  }

  try {
    await connectDB();
    const raw = await Product.find(filter).sort({ createdAt: -1 }).lean();
    return {
      ok: true,
      products: raw.map(serializeLeanDoc),
      error: null,
    };
  } catch (err) {
    console.error('[getPublicProducts]', err);
    return {
      ok: false,
      products: [],
      error: err instanceof Error ? err.message : 'Failed to load products',
    };
  }
}
