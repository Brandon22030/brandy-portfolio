export default function FolderGlyph({ className = "", tint = "#f6c332" }: { className?: string; tint?: string }) {
  const gradientId = `folder-${tint.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg viewBox="0 0 64 50" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tint} />
          <stop offset="1" stopColor={tint} stopOpacity="0.78" />
        </linearGradient>
      </defs>
      <path d="M3 7a4 4 0 0 1 4-4h15.5l5 5H57a4 4 0 0 1 4 4v4H3z" fill={tint} opacity="0.7" />
      <rect x="1" y="12" width="62" height="37" rx="4.5" fill={`url(#${gradientId})`} />
      <rect x="1" y="12" width="62" height="2.2" rx="1.1" fill="#fff" opacity="0.35" />
    </svg>
  );
}
