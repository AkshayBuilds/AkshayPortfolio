export default function LogoMark({ size = 36 }) {
  const id = "lm";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Akshay logo mark"
    >
      <defs>
        {/* A body gradient — top light blue → bottom deep blue */}
        <linearGradient id={`${id}-body`} x1="80" y1="10" x2="80" y2="158" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="45%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Swoosh gradient — fades in from left, bright mid, fades out right */}
        <linearGradient id={`${id}-swoosh`} x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0" />
          <stop offset="25%"  stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="65%"  stopColor="#60a5fa" stopOpacity="1" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.2" />
        </linearGradient>

        {/* Swoosh shadow/depth layer */}
        <linearGradient id={`${id}-swoosh2`} x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#1d4ed8" stopOpacity="0" />
          <stop offset="30%"  stopColor="#1d4ed8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
        </linearGradient>

        {/* Glow filter */}
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── A letterform — bold, clean, no serifs ── */}
      {/* Outer A shape (filled) */}
      <path
        d="M80 12 L18 148 L46 148 L62 108 L98 108 L114 148 L142 148 L80 12 Z"
        fill={`url(#${id}-body)`}
      />
      {/* Inner cutout triangle — creates the hollow of the A */}
      <path
        d="M80 50 L59 102 L101 102 Z"
        fill="#080808"
      />

      {/* ── Swoosh — main thick stroke ── */}
      <path
        d="M4 144 C28 110, 62 96, 86 106 C108 115, 122 132, 158 118"
        stroke={`url(#${id}-swoosh)`}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
        filter={`url(#${id}-glow)`}
      />

      {/* Swoosh — depth/shadow layer underneath */}
      <path
        d="M4 144 C28 112, 62 98, 86 108 C108 117, 122 134, 158 120"
        stroke={`url(#${id}-swoosh2)`}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Swoosh — thin highlight on top for 3D feel */}
      <path
        d="M18 136 C40 108, 68 97, 88 105 C110 113, 124 128, 155 116"
        stroke="rgba(147,197,253,0.35)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Curl at left end of swoosh ── */}
      <path
        d="M4 144 C-2 154, -2 163, 8 166 C16 169, 24 162, 18 153"
        stroke="#60a5fa"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />

      {/* ── Apex glow dot ── */}
      <circle cx="80" cy="12" r="4" fill="#93c5fd" opacity="0.9" />
      <circle cx="80" cy="12" r="7" fill="#3b82f6" opacity="0.2" />
    </svg>
  );
}
