"use client";

import { useEffect, useState } from "react";

function goToDashboard() {
  window.location.assign("/admin");
}

export default function AdminLoginPage() {
  const [bootstrap, setBootstrap] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/bootstrap", {
          credentials: "include",
        });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        setBootstrap(data);
      } catch {
        if (!cancelled) setLoadError("Could not load setup status.");
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
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      goToDashboard();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  const ready = bootstrap !== null;
  const jwtOk = bootstrap?.jwtConfigured === true;
  const envReady = bootstrap?.envLoginAvailable === true;

  return (
    <div className="flex min-h-[calc(100vh-70px)] w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px] rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="mb-8 text-center">
          <h1 className="text-lg font-semibold tracking-tight text-white">
            Admin sign in
          </h1>
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
            Add <span className="font-mono text-xs">JWT_SECRET</span> to{" "}
            <span className="font-mono text-xs">.env.local</span>, restart the
            dev server, then refresh this page.
          </div>
        )}

        {ready && jwtOk && !envReady && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-500/35 bg-red-500/[0.12] px-3.5 py-2.5 text-sm text-red-100/95"
          >
            Set <span className="font-mono text-xs">ADMIN_EMAIL</span> and{" "}
            <span className="font-mono text-xs">ADMIN_PASSWORD</span> in{" "}
            <span className="font-mono text-xs">.env.local</span>, restart the
            server, then refresh.
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

        {ready && jwtOk && envReady && (
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
              {pending ? "Signing in…" : "Sign in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
