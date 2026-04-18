'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
import { uploadImageToCloudinary } from './uploadClient';

function emptySlide() {
  return {
    _id: undefined,
    title: '',
    subtitle: '',
    description: '',
    backgroundImage: '',
    primaryButtonText: '',
    primaryButtonLink: '',
    secondaryButtonText: '',
    secondaryButtonLink: '',
    overlayStrength: 72,
    textAlign: 'left',
  };
}

export default function HeroTab() {
  const [slides, setSlides] = useState([emptySlide()]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [message, setMessage] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/hero', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load hero');
      const list = data.hero?.slides;
      if (Array.isArray(list) && list.length > 0) {
        setSlides(
          list.map((s) => ({
            _id: s._id,
            title: s.title ?? '',
            subtitle: s.subtitle ?? '',
            description: s.description ?? '',
            backgroundImage: s.backgroundImage ?? '',
            primaryButtonText: s.primaryButtonText ?? '',
            primaryButtonLink: s.primaryButtonLink ?? '',
            secondaryButtonText: s.secondaryButtonText ?? '',
            secondaryButtonLink: s.secondaryButtonLink ?? '',
            overlayStrength:
              typeof s.overlayStrength === 'number' ? s.overlayStrength : 72,
            textAlign: ['left', 'center', 'right'].includes(s.textAlign)
              ? s.textAlign
              : 'left',
          }))
        );
      } else {
        setSlides([emptySlide()]);
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

  function updateSlide(index, field, value) {
    setSlides((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addSlide() {
    setSlides((prev) => [...prev, emptySlide()]);
  }

  function removeSlide(index) {
    setSlides((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

  async function handleSlideUpload(index, e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingIndex(index);
    setMessage(null);
    try {
      const url = await uploadImageToCloudinary(file);
      updateSlide(index, 'backgroundImage', url);
      setMessage({ type: 'success', text: 'Slide image uploaded.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setUploadingIndex(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const payload = {
        slides: slides.map((s) => ({
          _id: s._id,
          title: s.title,
          subtitle: s.subtitle,
          description: s.description,
          backgroundImage: s.backgroundImage,
          primaryButtonText: s.primaryButtonText,
          primaryButtonLink: s.primaryButtonLink,
          secondaryButtonText: s.secondaryButtonText,
          secondaryButtonLink: s.secondaryButtonLink,
          overlayStrength: Number(s.overlayStrength) || 72,
          textAlign: s.textAlign,
        })),
      };
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setMessage({ type: 'success', text: 'Hero saved.' });
      if (data.hero?.slides?.length) {
        setSlides(
          data.hero.slides.map((s) => ({
            _id: s._id,
            title: s.title ?? '',
            subtitle: s.subtitle ?? '',
            description: s.description ?? '',
            backgroundImage: s.backgroundImage ?? '',
            primaryButtonText: s.primaryButtonText ?? '',
            primaryButtonLink: s.primaryButtonLink ?? '',
            secondaryButtonText: s.secondaryButtonText ?? '',
            secondaryButtonLink: s.secondaryButtonLink ?? '',
            overlayStrength:
              typeof s.overlayStrength === 'number' ? s.overlayStrength : 72,
            textAlign: ['left', 'center', 'right'].includes(s.textAlign)
              ? s.textAlign
              : 'left',
          }))
        );
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
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

      <p className="text-sm text-white/55">
        Each slide is a story beat: product name + positioning in{' '}
        <strong className="text-white/80">Title</strong>, a short kicker in{' '}
        <strong className="text-white/80">Subtitle</strong>, and a concrete value
        prop in <strong className="text-white/80">Description</strong>. Use two
        CTAs per slide. Overlay and alignment control on-site readability.
      </p>

      <div className="space-y-6">
        {slides.map((slide, index) => (
          <div
            key={slide._id ?? `new-${index}`}
            className="rounded-xl border border-white/15 bg-white/[0.03] p-5 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-white">
                Slide {index + 1}
              </h3>
              <div className="flex flex-wrap gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10">
                  <Upload className="h-3.5 w-3.5" />
                  {uploadingIndex === index ? 'Uploading…' : 'Upload background'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingIndex !== null}
                    onChange={(e) => handleSlideUpload(index, e)}
                  />
                </label>
                {slides.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeSlide(index)}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-500/35 px-3 py-1.5 text-xs text-red-200 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                ) : null}
              </div>
            </div>

            {slide.backgroundImage ? (
              <a
                href={slide.backgroundImage}
                target="_blank"
                rel="noreferrer"
                className="block truncate text-xs text-cyan-400 underline"
              >
                {slide.backgroundImage}
              </a>
            ) : (
              <p className="text-xs text-white/40">No background image URL yet.</p>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Title (product + positioning)"
                value={slide.title}
                onChange={(v) => updateSlide(index, 'title', v)}
                className="sm:col-span-2"
              />
              <Field
                label="Subtitle (kicker)"
                value={slide.subtitle}
                onChange={(v) => updateSlide(index, 'subtitle', v)}
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-white/80">
                  Description (value proposition)
                </label>
                <textarea
                  value={slide.description}
                  onChange={(e) =>
                    updateSlide(index, 'description', e.target.value)
                  }
                  rows={3}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
                />
              </div>
              <Field
                label="Primary CTA label"
                value={slide.primaryButtonText}
                onChange={(v) => updateSlide(index, 'primaryButtonText', v)}
              />
              <Field
                label="Primary CTA link"
                value={slide.primaryButtonLink}
                onChange={(v) => updateSlide(index, 'primaryButtonLink', v)}
              />
              <Field
                label="Secondary CTA label"
                value={slide.secondaryButtonText}
                onChange={(v) => updateSlide(index, 'secondaryButtonText', v)}
              />
              <Field
                label="Secondary CTA link"
                value={slide.secondaryButtonLink}
                onChange={(v) => updateSlide(index, 'secondaryButtonLink', v)}
              />
              <div>
                <label className="mb-1 block text-sm font-medium text-white/80">
                  Overlay strength ({slide.overlayStrength}% — darker = more
                  contrast)
                </label>
                <input
                  type="range"
                  min={35}
                  max={92}
                  value={slide.overlayStrength}
                  onChange={(e) =>
                    updateSlide(
                      index,
                      'overlayStrength',
                      Number(e.target.value)
                    )
                  }
                  className="w-full accent-tiger-yellow"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-white/80">
                  Text alignment
                </label>
                <select
                  value={slide.textAlign}
                  onChange={(e) =>
                    updateSlide(index, 'textAlign', e.target.value)
                  }
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/40"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSlide}
        className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
      >
        <Plus className="h-4 w-4" />
        Add slide
      </button>

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
      <label className="mb-1 block text-sm font-medium text-white/80">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
      />
    </div>
  );
}
