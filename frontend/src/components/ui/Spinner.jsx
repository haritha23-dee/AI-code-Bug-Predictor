export default function Spinner({ full }) {
  const el = (
    <div
      role="status"
      aria-label="Loading"
      className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin"
    />
  );
  if (!full) return el;
  return <div className="flex items-center justify-center py-20">{el}</div>;
} 