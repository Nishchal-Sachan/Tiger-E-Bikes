'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut } from 'lucide-react';
import HeroTab from './HeroTab';
import FeaturesTab from './FeaturesTab';
import ProductsTab from './ProductsTab';

const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'features', label: 'Features' },
  { id: 'products', label: 'Products' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState('hero');
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState(null);

  async function handleLogout() {
    setLogoutError(null);
    setLoggingOut(true);
    try {
      const res = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Logout failed');
      }
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      setLogoutError(e instanceof Error ? e.message : 'Could not sign out.');
      setLoggingOut(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-24">
      <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Admin dashboard
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Manage hero content, feature slides, and products. Images upload to
            Cloudinary.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          {logoutError && (
            <p className="text-right text-xs text-red-300/95" role="alert">
              {logoutError}
            </p>
          )}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loggingOut ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <LogOut className="h-4 w-4" aria-hidden />
            )}
            {loggingOut ? 'Signing out…' : 'Log out'}
          </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              tab === t.id
                ? 'rounded-lg bg-white px-4 py-2 text-sm font-medium text-black'
                : 'rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white'
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'hero' && <HeroTab />}
      {tab === 'features' && <FeaturesTab />}
      {tab === 'products' && <ProductsTab />}
    </div>
  );
}
