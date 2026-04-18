'use client';

import { useEffect, useState } from 'react';

function goToDashboard() {
  window.location.assign('/admin');
}

export default function AdminLoginPage() {
  const [bootstrap, setBootstrap] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regPassword2, setRegPassword2] = useState('');
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  const [tab, setTab] = useState('login');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/bootstrap', { credentials: 'include' });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        setBootstrap(data);
        if (data.needsFirstAdmin && data.jwtConfigured) {
          setTab('register');
        }
        if (data.warning) {
          setLoadError(data.warning);
        }
      } catch {
        if (!cancelled) setLoadError('Could not load setup status.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }
      goToDashboard();
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setPending(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);
    if (password !== regPassword2) {
      setError('Passwords do not match.');
      return;
    }
    setPending(true);
    try {
      const res = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Could not create account');
        return;
      }
      goToDashboard();
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setPending(false);
    }
  }

  const ready = bootstrap !== null;
  const jwtOk = bootstrap?.jwtConfigured === true;
  const showRegister =
    Boolean(bootstrap?.needsFirstAdmin) && jwtOk && !bootstrap?.dbAdminExists;
  const showEnvTab = Boolean(bootstrap?.envLoginAvailable) && showRegister;

  return (
    <div className="flex min-h-[calc(100vh-70px)] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px] rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="mb-8 text-center">
          <h1 className="text-lg font-semibold tracking-tight text-white">
            {showRegister && tab === 'register'
              ? 'Create administrator'
              : 'Admin sign in'}
          </h1>
          <p className="mt-1.5 text-sm text-white/45">
            {showRegister && tab === 'register'
              ? 'First-time setup: this creates the login used for the admin dashboard.'
              : 'Enter your credentials to continue'}
          </p>
        </div>

        {!ready && !loadError && (
          <p className="mb-4 text-center text-sm text-white/40">Loading…</p>
        )}

        {loadError && (
          <div
            role="status"
            className="mb-4 rounded-xl border border-amber-500/35 bg-amber-500/[0.12] px-3.5 py-2.5 text-center text-sm text-amber-100/95"
          >
            {loadError}
          </div>
        )}

        {ready && !jwtOk && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-500/35 bg-red-500/[0.12] px-3.5 py-2.5 text-sm text-red-100/95"
          >
            Add <span className="font-mono text-xs">JWT_SECRET</span> to{' '}
            <span className="font-mono text-xs">.env.local</span>, restart the dev server, then
            refresh this page.
          </div>
        )}

        {showRegister && showEnvTab && (
          <div className="mb-6 flex rounded-xl border border-white/10 p-1">
            <button
              type="button"
              onClick={() => {
                setTab('register');
                setError(null);
              }}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                tab === 'register'
                  ? 'bg-white text-black'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              New admin
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setError(null);
              }}
              className={`flex-1 rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                tab === 'login'
                  ? 'bg-white text-black'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              .env login
            </button>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-500/35 bg-red-500/[0.12] px-3.5 py-2.5 text-center text-sm text-red-100/95"
          >
            {error}
          </div>
        )}

        {ready && (!showRegister || tab === 'login') && jwtOk && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/25 focus:ring-1 focus:ring-white/10"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/25 focus:ring-1 focus:ring-white/10"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-2 w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        )}

        {ready && showRegister && tab === 'register' && jwtOk && (
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-1.5">
              <label
                htmlFor="reg-email"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Email
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/25 focus:ring-1 focus:ring-white/10"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="reg-password"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Password (min. 8 characters)
              </label>
              <input
                id="reg-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/25 focus:ring-1 focus:ring-white/10"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="reg-password2"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Confirm password
              </label>
              <input
                id="reg-password2"
                type="password"
                autoComplete="new-password"
                value={regPassword2}
                onChange={(e) => setRegPassword2(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-white/25 focus:ring-1 focus:ring-white/10"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-2 w-full rounded-xl bg-tiger-yellow py-3 text-sm font-semibold text-matte-black transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? 'Creating account…' : 'Create account & sign in'}
            </button>
          </form>
        )}

        {bootstrap?.dbAdminExists && (
          <p className="mt-6 text-center text-xs text-white/35">
            Sign in with the email and password you chose when the admin account was created.
          </p>
        )}
      </div>
    </div>
  );
}
