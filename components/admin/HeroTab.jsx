'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { uploadImageToCloudinary } from './uploadClient';

const emptyHero = {
  title: '',
  subtitle: '',
  backgroundImage: '',
  primaryButtonText: '',
  primaryButtonLink: '',
  secondaryButtonText: '',
  secondaryButtonLink: '',
};

export default function HeroTab() {
  const [form, setForm] = useState(emptyHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/hero', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load hero');
      if (data.hero) {
        setForm({
          title: data.hero.title ?? '',
          subtitle: data.hero.subtitle ?? '',
          backgroundImage: data.hero.backgroundImage ?? '',
          primaryButtonText: data.hero.primaryButtonText ?? '',
          primaryButtonLink: data.hero.primaryButtonLink ?? '',
          secondaryButtonText: data.hero.secondaryButtonText ?? '',
          secondaryButtonLink: data.hero.secondaryButtonLink ?? '',
        });
      } else {
        setForm(emptyHero);
      }
    } catch (e) {
      setMessage({ type: 'error', text: e.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleBackgroundUpload(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const url = await uploadImageToCloudinary(file);
      update('backgroundImage', url);
      setMessage({ type: 'success', text: 'Background image uploaded.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setMessage({ type: 'success', text: 'Hero saved.' });
      if (data.hero) {
        setForm({
          title: data.hero.title ?? '',
          subtitle: data.hero.subtitle ?? '',
          backgroundImage: data.hero.backgroundImage ?? '',
          primaryButtonText: data.hero.primaryButtonText ?? '',
          primaryButtonLink: data.hero.primaryButtonLink ?? '',
          secondaryButtonText: data.hero.secondaryButtonText ?? '',
          secondaryButtonLink: data.hero.secondaryButtonLink ?? '',
        });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/60">
        <Loader2 className="h-5 w-5 animate-spin" />
        Loading hero…
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {message && (
        <div
          role="status"
          className={
            message.type === 'error'
              ? 'rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200'
              : 'rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200'
          }
        >
          {message.text}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">Background image</label>
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
            <Upload className="h-4 w-4" />
            {uploading ? 'Uploading…' : 'Upload to Cloudinary'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={handleBackgroundUpload}
            />
          </label>
          {form.backgroundImage ? (
            <a
              href={form.backgroundImage}
              target="_blank"
              rel="noreferrer"
              className="truncate text-sm text-cyan-400 underline max-w-xs"
            >
              View current image
            </a>
          ) : (
            <span className="text-sm text-white/40">No image yet</span>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" value={form.title} onChange={(v) => update('title', v)} />
        <Field label="Subtitle" value={form.subtitle} onChange={(v) => update('subtitle', v)} className="sm:col-span-2" />
        <Field label="Primary button text" value={form.primaryButtonText} onChange={(v) => update('primaryButtonText', v)} />
        <Field label="Primary button link" value={form.primaryButtonLink} onChange={(v) => update('primaryButtonLink', v)} />
        <Field label="Secondary button text" value={form.secondaryButtonText} onChange={(v) => update('secondaryButtonText', v)} />
        <Field label="Secondary button link" value={form.secondaryButtonLink} onChange={(v) => update('secondaryButtonLink', v)} />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-50"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        Save hero
      </button>
    </form>
  );
}

function Field({ label, value, onChange, className = '' }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-white/80">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
      />
    </div>
  );
}
