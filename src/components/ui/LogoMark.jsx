export default function LogoMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_14px_#3b82f660]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ac_logo_g" x1="10" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00F0FF" />
          <stop offset="0.55" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="48" height="48" rx="14" fill="#080808" />
      <rect x="10" y="10" width="44" height="44" rx="13" stroke="url(#ac_logo_g)" strokeOpacity="0.6" strokeWidth="2" />
      <path
        d="M18 46L30.5 18.5C31.1 17.2 32.9 17.2 33.5 18.5L46 46M24.5 36.5H39.5"
        stroke="url(#ac_logo_g)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
