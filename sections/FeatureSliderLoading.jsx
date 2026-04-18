/**
 * Loading fallback for the dynamic feature slider (split layout, no glass).
 */
export default function FeatureSliderLoading() {
  return (
    <section
      className="relative grid min-h-[calc(100vh-70px)] w-full animate-pulse overflow-hidden bg-matte-black lg:grid-cols-2"
      aria-busy="true"
      aria-label="Loading features"
    >
      <div className="relative min-h-[42vh] bg-neutral-900 lg:min-h-[calc(100vh-70px)]" />
      <div className="flex flex-col justify-center border-t border-white/10 bg-neutral-950 px-6 py-12 md:px-12 lg:border-l lg:border-t-0 lg:px-14">
        <div className="mx-auto w-full max-w-lg space-y-5 lg:mx-0">
          <div className="h-12 w-12 rounded-xl border border-white/10 bg-white/5" />
          <div className="h-10 w-4/5 rounded-lg bg-white/10" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-5/6 rounded bg-white/10" />
            <div className="h-4 w-2/3 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
