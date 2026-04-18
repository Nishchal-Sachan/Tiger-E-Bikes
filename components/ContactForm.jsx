'use client';

import { useState } from 'react';

import { cn } from '@/utils/cn';
import {
  CONTACT_REQUEST_TYPES,
  contactRequestRequiresCity,
} from '@/lib/contact-request-types';

const SUCCESS_COPY = 'Your request has been sent. Our team will reach out shortly.';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);
  const [requestType, setRequestType] = useState('general');
  const [city, setCity] = useState('');

  const needsCity = contactRequestRequiresCity(requestType);
  const typeMeta =
    CONTACT_REQUEST_TYPES.find((t) => t.id === requestType) ??
    CONTACT_REQUEST_TYPES.find((t) => t.id === 'general');

  function selectType(id) {
    setRequestType(id);
    if (!contactRequestRequiresCity(id)) {
      setCity('');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const cityValue = needsCity ? city.trim() : '';

    if (needsCity && !cityValue) {
      setNotice({ type: 'error', text: 'City is required for this request type.' });
      return;
    }

    setNotice(null);
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          requestType,
          city: cityValue,
          message,
        }),
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok || !payload.success) {
        const apiMessage =
          typeof payload.message === 'string'
            ? payload.message
            : typeof payload.error === 'string'
              ? payload.error
              : 'Something went wrong.';
        setNotice({ type: 'error', text: apiMessage });
        return;
      }

      form.reset();
      setRequestType('general');
      setCity('');
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
      className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 shadow-sm space-y-5"
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <p className={labelClass}>Choose your request type</p>
        <div
          className="flex flex-wrap gap-2"
          role="radiogroup"
          aria-label="Request type"
        >
          {CONTACT_REQUEST_TYPES.map((t) => {
            const active = requestType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={loading}
                onClick={() => selectType(t.id)}
                className={cn(
                  'rounded-xl border px-3.5 py-2.5 text-left text-xs font-bold uppercase tracking-wide transition-colors sm:px-4 sm:text-[11px] sm:tracking-wider',
                  active
                    ? 'border-matte-black bg-matte-black text-white'
                    : 'border-neutral-200 bg-neutral-50 text-matte-black hover:border-neutral-300'
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-name" className={labelClass}>
          Name <span className="text-red-600/90">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          disabled={loading}
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-email" className={labelClass}>
          Email <span className="text-red-600/90">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={loading}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-phone" className={labelClass}>
          Phone <span className="text-neutral-400 font-semibold normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          disabled={loading}
          className={inputClass}
          placeholder="Phone number"
        />
      </div>

      {needsCity ? (
        <div className="space-y-2">
          <label htmlFor="contact-city" className={labelClass}>
            City <span className="text-red-600/90">*</span>
          </label>
          <input
            id="contact-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            required
            disabled={loading}
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
            className={inputClass}
            placeholder="Your city"
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <label htmlFor="contact-message" className={labelClass}>
          Message <span className="text-red-600/90">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          disabled={loading}
          className={`${inputClass} resize-y min-h-[120px]`}
          placeholder={typeMeta?.placeholder ?? 'How can we help?'}
          key={requestType}
        />
      </div>

      {notice ? (
        <p
          className={
            notice.type === 'success'
              ? 'text-sm font-medium text-neutral-800 rounded-xl border border-tiger-green/25 bg-tiger-green/10 px-4 py-3'
              : 'text-sm text-red-700 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3'
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
        {loading ? 'Sending…' : 'Send'}
      </button>
    </form>
  );
}
