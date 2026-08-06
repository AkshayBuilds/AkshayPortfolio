export default function LiveProjectButton({
  href = "#",
  label = "Live Project",
  className = "",
  target = "_blank",
  rel = "noreferrer",
  onClick,
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 font-['Kanit'] text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      {label}
    </a>
  );
}
