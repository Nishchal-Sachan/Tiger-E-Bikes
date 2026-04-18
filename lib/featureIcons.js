import {
  Battery,
  Bike,
  Gauge,
  IndianRupee,
  Leaf,
  ShieldCheck,
  ThermometerSun,
  TrendingDown,
  Wrench,
  Zap,
} from 'lucide-react';

/** Curated Lucide icons for feature slides (admin picks by name). */
export const FEATURE_ICON_MAP = {
  Battery,
  Bike,
  Gauge,
  IndianRupee,
  Leaf,
  ShieldCheck,
  ThermometerSun,
  TrendingDown,
  Wrench,
  Zap,
};

export const FEATURE_ICON_OPTIONS = Object.keys(FEATURE_ICON_MAP).sort();

/**
 * @param {string | undefined | null} name
 * @returns {import('lucide-react').LucideIcon | null}
 */
export function resolveFeatureIcon(name) {
  if (!name || typeof name !== 'string') return null;
  const trimmed = name.trim();
  return FEATURE_ICON_MAP[trimmed] ?? null;
}
