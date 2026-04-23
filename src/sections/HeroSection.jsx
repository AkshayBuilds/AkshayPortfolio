import { Suspense } from "react";

export default function HeroSection({
  isMobile,
  HeroScene,
  heroSectionRef,
  heroLineRefs,
  heroSubtextRef,
  heroCtasRef,
  scrollToId,
}) {
  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#080808]"
    >
      <div className="absolute inset-0">
        {isMobile ? (
          <div
            className="h-full w-full bg-gradient-to-br from-[#0d0d0d] via-[#0f172a] to-[#0d0d0d]"
            style={{ backgroundSize: "300% 300%", animation: "ac-gradient-shift 18s ease-in-out infinite" }}
          />
        ) : (
          <Suspense fallback={<div className="h-full w-full bg-gradient-to-br from-[#0d0d0d] via-[#0b1220] to-[#0d0d0d]" />}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 w-full px-5 pt-24 md:px-10 md:pt-28 lg:px-14">
        <div className="flex w-full flex-col gap-7">
          <div className="flex flex-col gap-3">
            {["Hi, I’m Akshay.", "MERN Stack Developer.", "I build things for the web."].map((t, i) => (
              <h1
                key={t}
                ref={(el) => {
                  heroLineRefs.current[i] = el;
                }}
                className="font-display text-[9.5vw] font-semibold leading-[0.92] tracking-tight text-white md:text-[72px] lg:text-[86px]"
                style={{ opacity: 0 }}
              >
                {t}
              </h1>
            ))}
          </div>

          <p
            ref={heroSubtextRef}
            className="max-w-[56rem] font-sans text-[14px] leading-relaxed text-zinc-400 md:text-[15px]"
          >
            React · Node.js · MongoDB · Express — Full Stack, Production Ready.
          </p>

          <div ref={heroCtasRef} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => scrollToId("work")}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#3b82f6] px-6 py-3 font-sans text-[13px] font-semibold tracking-wide text-white shadow-[0_0_30px_#3b82f6a0] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              View My Work
            </button>
            <a
              href="/Akshay-Chaudhary-Resume.pdf"
              className="relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/0 px-6 py-3 font-sans text-[13px] font-semibold tracking-wide text-white/90 transition-all hover:text-white hover:shadow-[0_0_26px_#3b82f650] active:scale-[0.98]"
            >
              <span className="absolute inset-0 rounded-xl border border-[#3b82f6]/30" />
              <span className="relative">Download Resume</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="font-sans text-[11px] font-semibold tracking-[0.28em] text-white/60">SCROLL ↓</div>
          <div className="h-7 w-7 animate-bounce rounded-full border border-white/15 bg-black/30" />
        </div>
      </div>
    </section>
  );
}
