import { cn } from '@/utils/cn';

export default function StaticPageShell({
  eyebrow,
  title,
  subtitle,
  children,
  contentClassName,
  titleClassName,
}) {
  return (
    <div className="w-full flex flex-col bg-matte-black overflow-x-hidden text-white">
      <header className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(250,204,21,0.08),_transparent_55%)] pointer-events-none" aria-hidden />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
          {eyebrow ? (
            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.28em] text-tiger-yellow mb-5">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              'text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] uppercase leading-[0.95] max-w-5xl text-white',
              titleClassName
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg lg:text-xl font-medium leading-relaxed text-neutral-400 border-l-[3px] border-tiger-yellow/70 pl-5 md:pl-6">
              {subtitle}
            </p>
          ) : null}
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-14 md:py-20 w-full">
        <div
          className={
            contentClassName ??
            'max-w-3xl space-y-6 text-neutral-400 text-base md:text-lg leading-relaxed font-medium'
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}
