/**
 * Loading fallback for the dynamic hero (matches layout / height).
 */
export default function HeroLoading() {
  return (
    <section
      id="hero"
      className="relative w-full h-[calc(100vh-70px)] overflow-hidden bg-matte-black z-0 animate-pulse"
      aria-busy="true"
      aria-label="Loading hero"
    >
      <div className="absolute inset-0 bg-neutral-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="relative z-10 w-full h-full flex items-center px-6 md:px-24 lg:px-44 max-w-[1600px] mx-auto">
        <div className="w-full max-w-2xl space-y-6 md:space-y-8">
          <div className="h-3 w-32 rounded bg-white/10" />
          <div className="h-14 md:h-20 lg:h-24 w-4/5 max-w-lg rounded bg-white/15" />
          <div className="space-y-3 max-w-xl">
            <div className="h-4 w-full rounded bg-white/10" />
            <div className="h-4 w-5/6 rounded bg-white/10" />
            <div className="h-4 w-2/3 rounded bg-white/10" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4">
            <div className="h-14 w-44 rounded-xl bg-white/10" />
            <div className="h-14 w-52 rounded-xl bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
