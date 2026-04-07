export default function VehicleShowcaseLoading() {
  return (
    <section
      className="border-y border-white/5 bg-matte-black py-32"
      aria-busy="true"
      aria-label="Loading lineup"
    >
      <div className="mx-auto max-w-[1600px] animate-pulse px-6 md:px-12">
        <div className="mb-24 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="mx-auto h-14 w-64 rounded-lg bg-white/10 lg:mx-0 lg:h-16 lg:w-80" />
          <div className="mx-auto flex gap-2 rounded-2xl bg-white/5 p-2 lg:mx-0">
            <div className="h-12 w-36 rounded-xl bg-white/15" />
            <div className="h-12 w-40 rounded-xl bg-white/10" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-3">
            <div className="h-24 rounded-[2rem] bg-white/10" />
            <div className="h-24 rounded-[2rem] bg-white/5" />
          </div>
          <div className="min-h-[400px] rounded-[3rem] bg-white/[0.04] lg:col-span-6" />
          <div className="rounded-[2rem] bg-white/[0.04] lg:col-span-3">
            <div className="h-8 w-40 bg-white/10" />
            <div className="mt-6 space-y-4">
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-full rounded bg-white/10" />
              <div className="h-4 w-3/4 rounded bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
