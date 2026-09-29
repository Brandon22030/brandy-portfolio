export default function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-[28%] bg-os-cream font-poster font-extrabold leading-none text-os-deep ${className}`}
    >
      B
    </span>
  );
}
