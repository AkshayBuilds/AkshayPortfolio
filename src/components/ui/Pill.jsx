export default function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-[13px] font-medium text-white/90 transition-all duration-300 hover:border-[#3b82f6] hover:text-[#93c5fd] hover:shadow-[0_0_12px_#3b82f6]">
      {children}
    </span>
  );
}
