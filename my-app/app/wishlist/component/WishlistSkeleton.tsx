export default function WishlistSkeleton() {
  return (
    <div
      className="
      animate-pulse
      rounded-xl
      border
      p-4
      "
    >
      <div className="h-72 rounded-lg bg-muted" />

      <div className="mt-4 h-5 rounded bg-muted" />

      <div className="mt-2 h-4 rounded bg-muted" />

      <div className="mt-6 h-10 rounded bg-muted" />
    </div>
  );
}