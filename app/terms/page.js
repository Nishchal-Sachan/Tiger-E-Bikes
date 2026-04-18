import Footer from '@/components/Footer';
import { SITE_EMAIL } from '@/constants/site-email';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Terms of Use | Tiger E-Bikes',
  description:
    'Terms governing use of the Tiger E-Bikes website: acceptable use, product information, intellectual property, liability, and contact.',
};

const USE_OF_WEBSITE = [
  'Do not misuse forms, uploads, or APIs — including submitting false, misleading, or fraudulent information',
  'Do not attempt to disrupt, damage, or gain unauthorized access to the website, our systems, or other users',
  'Use the website only for legitimate inquiries and purposes related to Tiger E-Bikes products and services',
];

const PRODUCT_INFO = [
  'Specifications, pricing, promotions, and availability may change without prior notice on this website',
  'Content on this website is provided for general reference and does not constitute an offer or binding quote',
  'Final purchase terms, delivery, registration, and after-sales arrangements are confirmed with an authorized dealership',
];

const INTELLECTUAL_PROPERTY = [
  'All content on this website — including design, layout, text, graphics, logos, and branding — is owned by Tiger E-Bikes or its licensors',
  'Unauthorized copying, modification, distribution, or commercial use of our content is not permitted without prior written consent',
];

const THIRD_PARTY = [
  'This website may include links to third-party websites or services for convenience',
  'We do not control and are not responsible for the content, policies, or practices of third-party sites',
  'Your use of external links is at your own risk; review each site’s terms and privacy policy before sharing information',
];

function SectionTitle({ children }) {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-black text-matte-black tracking-tight">{children}</h2>
      <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
    </>
  );
}

export default function TermsPage() {
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
                Terms of Use
              </h1>
              <p className="mt-6 md:mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium border-l-[3px] border-tiger-yellow pl-5 md:pl-6 max-w-2xl">
                Please read these terms before using our website or services.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-neutral-50 border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <SectionTitle>Acceptance of Terms</SectionTitle>
              <p className="mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                By accessing or using this website, you agree to comply with these terms and with applicable laws and
                regulations. If you do not agree, please do not use the website.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <SectionTitle>Use of Website</SectionTitle>
              <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                {USE_OF_WEBSITE.map((line) => (
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
              <SectionTitle>Product Information</SectionTitle>
              <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                {PRODUCT_INFO.map((line) => (
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
              <SectionTitle>Intellectual Property</SectionTitle>
              <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                {INTELLECTUAL_PROPERTY.map((line) => (
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
              <SectionTitle>Limitation of Liability</SectionTitle>
              <p className="mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                To the fullest extent permitted by law, Tiger E-Bikes and its affiliates are not liable for any indirect,
                incidental, special, consequential, or punitive damages, or for any loss of profits, data, or goodwill,
                arising from your use of this website or reliance on its content — even if we have been advised of the
                possibility of such damages. Nothing in these terms excludes liability that cannot be limited under
                applicable law.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <SectionTitle>Third-Party Links</SectionTitle>
              <ul className="mt-8 space-y-3 text-neutral-600 text-base leading-relaxed font-medium">
                {THIRD_PARTY.map((line) => (
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
              <SectionTitle>Changes to Terms</SectionTitle>
              <p className="mt-8 text-neutral-600 text-base md:text-lg leading-relaxed font-medium">
                These terms may be updated periodically to reflect changes to our website, services, or legal
                requirements. The revised terms will be posted on this page. Continued use of the website after changes
                take effect constitutes your acceptance of the updated terms, unless applicable law requires a different
                process.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white border-t border-neutral-200/80">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="max-w-2xl rounded-2xl border border-neutral-200 bg-neutral-50/80 p-8 md:p-10 shadow-sm">
              <h2 className="text-xl md:text-2xl font-black text-matte-black tracking-tight">Questions?</h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-tiger-yellow" aria-hidden />
              <p className="mt-6 text-neutral-600 text-base leading-relaxed font-medium">
                For questions about these terms, contact us at{' '}
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="font-semibold text-matte-black underline decoration-tiger-yellow/50 underline-offset-2 hover:text-tiger-yellow transition-colors"
                >
                  {SITE_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
