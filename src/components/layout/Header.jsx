import LogoMark from "../ui/LogoMark.jsx";

function NavLink({ label, targetId, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(targetId)}
      className="relative px-3 py-2 font-sans text-[13px] font-medium tracking-wide text-white/90 transition-colors hover:text-white after:absolute after:left-3 after:right-3 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[#3b82f6] after:shadow-[0_0_16px_#3b82f6] after:transition-all after:duration-300 hover:after:w-[calc(100%-1.5rem)]"
    >
      {label}
    </button>
  );
}

function IconHamburger({ open }) {
  return (
    <div className="relative h-10 w-10">
      <span
        className={`absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 bg-white transition-transform duration-300 ${
          open ? "translate-y-0 rotate-45" : "-translate-y-2 rotate-0"
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 bg-white transition-all duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 bg-white transition-transform duration-300 ${
          open ? "translate-y-0 -rotate-45" : "translate-y-2 rotate-0"
        }`}
      />
    </div>
  );
}

export default function Header({ navSolid, menuOpen, setMenuOpen, scrollToId }) {
  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        navSolid ? "bg-black/55 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="relative w-full px-5 py-4 md:px-10 lg:px-14">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/25 to-transparent" />

        <div className="flex w-full items-center justify-between">
          <button type="button" onClick={() => scrollToId("hero")} className="group relative flex items-center gap-3">
            <span className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-r from-[#3b82f620] via-transparent to-[#7c3aed20] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <LogoMark />
            <span className="font-display text-[18px] font-semibold tracking-tight text-white drop-shadow-[0_0_14px_#3b82f680]">
              Akshay<span className="text-white/90">.</span>
            </span>
            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 font-sans text-[11px] font-semibold tracking-wide text-white/70 md:inline-flex">
              MERN · Full Stack
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink label="About" targetId="about" onClick={scrollToId} />
            <NavLink label="Skills" targetId="skills" onClick={scrollToId} />
            <NavLink label="Work" targetId="work" onClick={scrollToId} />
            <NavLink label="Contact" targetId="contact" onClick={scrollToId} />

            <div className="ml-2 h-6 w-px bg-white/10" />

            <a
              href="https://github.com/AkshayBuilds"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 font-sans text-[12px] font-semibold tracking-wide text-white/80 transition-all hover:border-[#3b82f6]/40 hover:text-white hover:shadow-[0_0_18px_#3b82f640]"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/akshay-web/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] px-4 font-sans text-[12px] font-semibold tracking-wide text-white shadow-[0_0_22px_#3b82f650] transition-transform hover:scale-[1.02]"
            >
              LinkedIn ↗
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/10 bg-black/30 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <IconHamburger open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg md:hidden">
          <div className="flex h-full flex-col px-6 pb-10 pt-24">
            <div className="flex flex-col gap-3">
              {[
                { id: "about", label: "About" },
                { id: "skills", label: "Skills" },
                { id: "work", label: "Work" },
                { id: "contact", label: "Contact" },
              ].map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => scrollToId(l.id)}
                  className="flex min-h-[54px] items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 font-display text-[18px] font-semibold text-white"
                >
                  {l.label}
                  <span className="text-white/60">↘</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="mt-auto inline-flex min-h-[50px] items-center justify-center rounded-2xl border border-white/10 bg-black/40 font-sans text-[13px] font-semibold tracking-wide text-white/90"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
