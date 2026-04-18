'use client';

import { useMemo, useState } from 'react';

const SUCCESS_COPY =
  'Your test ride request has been sent. Our team will confirm your slot shortly.';

const DEFAULT_CITY = 'Kanpur';

export default function ShowroomTestRideForm() {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);
  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      city: String(data.get('city') ?? '').trim(),
      preferredDate: String(data.get('preferredDate') ?? '').trim(),
      preferredTime: String(data.get('preferredTime') ?? '').trim(),
      vehicleInterest: String(data.get('vehicleInterest') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };

    setNotice(null);
    setLoading(true);

    try {
      const res = await fetch('/api/test-ride', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        const msg =
          typeof json.message === 'string' ? json.message : 'Something went wrong. Please try again.';
        setNotice({ type: 'error', text: msg });
        return;
      }

      form.reset();
      setNotice({ type: 'success', text: SUCCESS_COPY });
    } catch {
      setNotice({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm text-matte-black placeholder:text-neutral-400 focus:outline-none focus:border-tiger-yellow/60 focus:ring-1 focus:ring-tiger-yellow/30 transition-colors disabled:opacity-50';

  const labelClass = 'text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500';

  return (
    <form
      className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm space-y-4 md:space-y-5"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="tr-name" className={labelClass}>
            Name <span className="text-red-600/90">*</span>
          </label>
          <input
            id="tr-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={loading}
            className={inputClass}
            placeholder="Full name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="tr-phone" className={labelClass}>
            Phone <span className="text-red-600/90">*</span>
          </label>
          <input
            id="tr-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            disabled={loading}
            className={inputClass}
            placeholder="Mobile number"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="tr-city" className={labelClass}>
            City <span className="text-red-600/90">*</span>
          </label>
          <input
            id="tr-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            disabled={loading}
            defaultValue={DEFAULT_CITY}
            className={inputClass}
            placeholder="City"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="tr-date" className={labelClass}>
            Preferred date <span className="text-red-600/90">*</span>
          </label>
          <input
            id="tr-date"
            name="preferredDate"
            type="date"
            required
            min={minDate}
            disabled={loading}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="tr-time" className={labelClass}>
            Preferred time slot <span className="text-red-600/90">*</span>
          </label>
          <input
            id="tr-time"
            name="preferredTime"
            type="time"
            required
            disabled={loading}
            className={inputClass}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="tr-vehicle" className={labelClass}>
            Vehicle interest <span className="text-red-600/90">*</span>
          </label>
          <input
            id="tr-vehicle"
            name="vehicleInterest"
            type="text"
            required
            disabled={loading}
            className={inputClass}
            placeholder="Model or category you want to try"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="tr-message" className={labelClass}>
            Message <span className="text-neutral-400 font-semibold normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            id="tr-message"
            name="message"
            rows={3}
            disabled={loading}
            className={`${inputClass} resize-y min-h-[88px]`}
            placeholder="Anything we should know before your visit?"
          />
        </div>
      </div>

      {notice ? (
        <p
          className={
            notice.type === 'success'
              ? 'text-sm font-medium text-neutral-800 rounded-xl border border-tiger-green/25 bg-tiger-green/10 px-4 py-3'
              : 'text-sm text-red-800 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3'
          }
          role={notice.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {notice.text}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full sm:w-auto bg-matte-black text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading ? 'Sending…' : 'Schedule test ride'}
      </button>
    </form>
  );
}
