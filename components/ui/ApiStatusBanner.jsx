/**
 * Non-blocking notice when CMS/API data could not be refreshed.
 */
export default function ApiStatusBanner({ children, variant = 'warning' }) {
  if (!children) return null;

  const styles =
    variant === 'error'
      ? 'border-red-500/30 bg-red-500/10 text-red-100/90'
      : 'border-amber-500/30 bg-amber-500/10 text-amber-100/90';

  return (
    <div
      role="status"
      className={`border-b px-4 py-2.5 text-center text-xs leading-snug ${styles}`}
    >
      {children}
    </div>
  );
}
