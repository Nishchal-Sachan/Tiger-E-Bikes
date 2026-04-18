import Footer from '@/components/Footer';
import { SITE_EMAIL } from '@/constants/site-email';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Privacy & Data Use | Tiger E-Bikes',
  description:
    'How Tiger E-Bikes collects, uses, protects, and retains your information — and how to exercise your privacy rights.',
};

const WHAT_WE_COLLECT = [
  'Name, email, and phone (from forms)',
  'Messages or inquiries submitted through the website',
  'Usage data (basic analytics)',
];

const HOW_WE_USE = [
  'Respond to inquiries (contact, test ride, careers)',
  'Process dealership or support requests',
  'Improve website performance and user experience',
];

const RETENTION = [
  'Data is stored only as long as necessary',
  'Users can request deletion anytime',
];

const YOUR_RIGHTS = [
  'Request access to your data',
  'Request correction or deletion',
  'Withdraw consent',
];

function SectionTitle({ children }) {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-black text-matte-black tracking-tight">{children}</h2>
      <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
    </>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <div className="w-full flex flex-col overflow-x-hidden bg-neutral-50">
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 text-matte-black border-b border-neutral-200/80 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <div className="space-y-4 mb-6 md:mb-8">
                <div className="w-12 h-px bg-matte-black" />
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-matte-black/80">
                  Legal
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-matte-black leading-[1.08]">
                Privacy &amp; Data Use
              </h1>
              <p className="mt-6 md:mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium border-l-[3px] border-tiger-yellow pl-5 md:pl-6 max-w-2xl">
                We collect only what&apos;s necessary to serve you better.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <SectionTitle>What We Collect</SectionTitle>
              <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                {WHAT_WE_COLLECT.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-matte-black" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <SectionTitle>How We Use Your Data</SectionTitle>
              <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                {HOW_WE_USE.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-matte-black" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <SectionTitle>Data Protection</SectionTitle>
              <p className="mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                We do not sell or share your personal data with third parties for marketing purposes. Your data is
                stored securely and accessed only when necessary.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <SectionTitle>Data Retention</SectionTitle>
              <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                {RETENTION.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-matte-black" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <SectionTitle>Your Rights</SectionTitle>
              <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                {YOUR_RIGHTS.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-matte-black" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-2xl rounded-2xl border border-neutral-200 bg-neutral-50/80 p-8 md:p-10 shadow-sm">
              <h2 className="text-xl md:text-2xl font-black text-matte-black tracking-tight">Privacy Contact</h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
              <p className="mt-6 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                For any privacy-related requests or questions, contact us.
              </p>
              <p className="mt-4">
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="text-matte-black font-semibold underline decoration-tiger-yellow/50 underline-offset-2 hover:text-tiger-yellow transition-colors"
                >
                  {SITE_EMAIL}
                </a>
              </p>
            </div>
            <p className="mt-10 max-w-3xl text-sm text-neutral-500 leading-relaxed font-medium">
              This policy may be updated periodically to reflect improvements and legal requirements.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
