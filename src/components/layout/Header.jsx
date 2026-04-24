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
          <button type="button" onClick={() => scrollToId("hero")} className="group relative flex items-center gap-3 cursor-pointer">
            <span className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-r from-[#3b82f620] via-transparent to-[#7c3aed20] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            <LogoMark />
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
              className="inline-flex min-h-[40px] gap-1.5 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 font-sans text-[12px] font-semibold tracking-wide text-white/80 transition-all hover:border-[#3b82f6]/40 hover:text-white hover:shadow-[0_0_18px_#3b82f640]"
              
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/akshay-web/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex gap-1.5 min-h-[40px] items-center justify-center rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#7c3aed] px-4 font-sans text-[12px] font-semibold tracking-wide text-white shadow-[0_0_22px_#3b82f650] transition-transform hover:scale-[1.02]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
              LinkedIn
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
