/**
 * Loading fallback for the dynamic feature slider.
 */
export default function FeatureSliderLoading() {
  return (
    <section
      className="relative flex h-[calc(100vh-70px)] w-full animate-pulse items-center justify-center overflow-hidden bg-black"
      aria-busy="true"
      aria-label="Loading features"
    >
      <div className="absolute inset-0 bg-neutral-900" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80" />
      <div className="relative z-10 mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-md md:max-w-2xl md:p-12">
        <div className="mx-auto mb-6 h-10 w-3/4 rounded-lg bg-white/10 md:h-12" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-4 w-5/6 rounded bg-white/10" />
          <div className="h-4 w-4/6 rounded bg-white/10" />
        </div>
      </div>
    </section>
  );
}
