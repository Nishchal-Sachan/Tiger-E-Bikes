'use client';

import { useState } from 'react';

import { CAREER_ROLE_GROUPS } from '@/lib/careers-roles';

const SUCCESS_COPY =
  "Application submitted. We'll review and get back if there's a match.";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export default function CareersApplyForm() {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const resume = data.get('resume');

    if (!(resume instanceof File) || resume.size === 0) {
      setNotice({ type: 'error', text: 'Please attach your resume (PDF or Word).' });
      return;
    }
    if (resume.size > MAX_RESUME_BYTES) {
      setNotice({ type: 'error', text: 'Resume must be 5 MB or smaller.' });
      return;
    }

    setNotice(null);
    setLoading(true);

    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        body: data,
      });

      const payload = await res.json().catch(() => ({}));

      if (!res.ok || !payload.success) {
        const apiMessage =
          typeof payload.message === 'string'
            ? payload.message
            : typeof payload.error === 'string'
              ? payload.error
              : 'Something went wrong. Please try again.';
        setNotice({ type: 'error', text: apiMessage });
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
      className="rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 shadow-sm space-y-4 md:space-y-5"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      noValidate
    >
      <div className="space-y-2">
        <label htmlFor="careers-name" className={labelClass}>
          Name <span className="text-red-600/90">*</span>
        </label>
        <input
          id="careers-name"
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
        <label htmlFor="careers-email" className={labelClass}>
          Email <span className="text-red-600/90">*</span>
        </label>
        <input
          id="careers-email"
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
        <label htmlFor="careers-phone" className={labelClass}>
          Phone <span className="text-neutral-400 font-semibold normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="careers-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          disabled={loading}
          className={inputClass}
          placeholder="Phone number"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="careers-position-select" className={labelClass}>
          Role / track <span className="text-red-600/90">*</span>
        </label>
        <select
          id="careers-position-select"
          name="position_select"
          required
          disabled={loading}
          defaultValue=""
          className={`${inputClass} appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          }}
        >
          <option value="" disabled>
            Select role or track…
          </option>
          {CAREER_ROLE_GROUPS.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="careers-resume" className={labelClass}>
          Resume <span className="text-red-600/90">*</span>
        </label>
        <input
          id="careers-resume"
          name="resume"
          type="file"
          required
          disabled={loading}
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className={`${inputClass} file:mr-4 file:rounded-lg file:border-0 file:bg-matte-black file:px-4 file:py-2 file:text-xs file:font-black file:uppercase file:tracking-wider file:text-white hover:file:bg-neutral-800`}
        />
        <p className="text-xs text-neutral-500 leading-relaxed">PDF or Word, up to 5 MB.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="careers-portfolio" className={labelClass}>
          Portfolio / links{' '}
          <span className="text-neutral-400 font-semibold normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="careers-portfolio"
          name="portfolio_links"
          type="text"
          disabled={loading}
          className={inputClass}
          placeholder="GitHub, portfolio, LinkedIn, or relevant work"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="careers-message" className={labelClass}>
          Message <span className="text-red-600/90">*</span>
        </label>
        <textarea
          id="careers-message"
          name="message"
          rows={5}
          required
          disabled={loading}
          className={`${inputClass} resize-y min-h-[128px]`}
          placeholder="What have you built? What problems have you solved? Why do you want to work at Tiger?"
        />
      </div>

      {notice ? (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            notice.type === 'success'
              ? 'bg-tiger-green/10 text-neutral-800 border border-tiger-green/25'
              : 'bg-red-500/10 text-red-800 border border-red-500/25'
          }`}
          role={notice.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {notice.text}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full sm:w-auto bg-matte-black text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading ? 'Submitting…' : 'Submit application'}
      </button>
    </form>
  );
}
