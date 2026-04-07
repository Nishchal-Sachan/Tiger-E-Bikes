/**
 * Route-level loading UI (e.g. navigations). Home sections also use Suspense fallbacks.
 */
export default function Loading() {
  return (
    <div className="min-h-[50vh] w-full animate-pulse bg-black px-6 py-24">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-12 w-2/3 rounded-lg bg-white/10" />
        <div className="h-4 w-full rounded bg-white/10" />
        <div className="h-4 w-5/6 rounded bg-white/10" />
        <div className="h-64 w-full rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}
