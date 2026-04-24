import { Suspense, useEffect, useRef, useState } from "react";

function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute rounded-full" style={{ width:"70vw",height:"70vw",maxWidth:900,maxHeight:900,top:"-20%",left:"-10%",background:"radial-gradient(circle at 40% 40%, #1e3a8a18 0%, #3b82f610 40%, transparent 70%)",animation:"orb1 18s ease-in-out infinite",filter:"blur(40px)" }}/>
      <div className="absolute rounded-full" style={{ width:"50vw",height:"50vw",maxWidth:700,maxHeight:700,bottom:"-10%",right:"-5%",background:"radial-gradient(circle at 60% 60%, #0ea5e912 0%, #6366f10c 50%, transparent 70%)",animation:"orb2 22s ease-in-out infinite",filter:"blur(50px)" }}/>
      <div className="absolute rounded-full" style={{ width:"30vw",height:"30vw",maxWidth:500,maxHeight:500,top:"30%",right:"20%",background:"radial-gradient(circle, #3b82f60a 0%, transparent 70%)",animation:"orb3 14s ease-in-out infinite",filter:"blur(30px)" }}/>
      <style>{`
        @keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(4vw,6vh) scale(1.08)}66%{transform:translate(-3vw,3vh) scale(0.95)}}
        @keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-5vw,-4vh) scale(1.1)}70%{transform:translate(3vw,5vh) scale(0.92)}}
        @keyframes orb3{0%,100%{transform:translate(0,0) scale(1);opacity:0.6}50%{transform:translate(2vw,-3vh) scale(1.15);opacity:1}}
      `}</style>
    </div>
  );
}

function GridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{opacity:0.035}}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)"/>
      </svg>
    </div>
  );
}

function FloatingBadge({ children, style, delay = 0 }) {
  return (
    <div
      className="pointer-events-none absolute hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-md"
      style={{ animation:`badgeFloat 6s ease-in-out ${delay}s infinite`, ...style }}
    >
      <span className="text-[11px] font-mono font-medium tracking-widest text-white/40">{children}</span>
      <style>{`@keyframes badgeFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
    </div>
  );
}

function MagneticButton({ children, onClick, href, primary = false }) {
  const ref    = useRef(null);
  const rafRef = useRef(null);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const dx   = e.clientX - (r.left + r.width / 2);
    const dy   = e.clientY - (r.top + r.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const s    = dist < 80 ? ((80 - dist) / 80) * 0.35 : 0;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (ref.current) ref.current.style.transform = `translate(${dx * s}px,${dy * s}px)`;
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
    ref.current.style.transform  = "translate(0px,0px)";
    setTimeout(() => { if (ref.current) ref.current.style.transition = ""; }, 500);
  };

  const base = "relative inline-flex min-h-[50px] items-center justify-center rounded-xl px-7 py-3 font-sans text-[13px] font-semibold tracking-wide transition-all duration-200 active:scale-[0.97] select-none cursor-pointer";
  const pCls = " text-white hover:shadow-[0_0_40px_#3b82f660]";
  const gCls = " border border-white/15 bg-transparent text-white/80 hover:text-white hover:border-white/30 hover:bg-white/[0.04]";

  const inner = (
    <>
      {primary && (
        <span className="absolute inset-0 rounded-xl overflow-hidden">
          <span className="absolute inset-0" style={{background:"linear-gradient(135deg,#3b82f6 0%,#2563eb 50%,#1d4ed8 100%)"}}/>
        </span>
      )}
      <span className="relative">{children}</span>
    </>
  );

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{display:"inline-block"}}>
      {href
        ? <a href={href} className={base + gCls}>{inner}</a>
        : <button type="button" onClick={onClick} className={base + (primary ? pCls : gCls)}>{inner}</button>
      }
    </div>
  );
}

function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-start gap-0.5">
      <span className="font-mono text-[18px] font-bold text-white leading-none sm:text-[22px]">{value}</span>
      <span className="text-[10px] font-medium tracking-widest text-white/35 uppercase sm:text-[11px]">{label}</span>
    </div>
  );
}

function ScrollIndicator() {
  return (
    // Only shown on large screens where the pin/scroll effect is active
    <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 pointer-events-none hidden lg:block">
      <div className="flex flex-col items-center gap-3">
        <span className="font-mono text-[10px] font-semibold tracking-[0.35em] text-white/30 uppercase">Scroll</span>
        <div className="relative h-10 w-[1.5px] overflow-hidden rounded-full" style={{background:"rgba(255,255,255,0.08)"}}>
          <div className="absolute top-0 left-0 w-full rounded-full" style={{height:"40%",background:"linear-gradient(to bottom,transparent,rgba(59,130,246,0.7))",animation:"scrollLine 1.8s ease-in-out infinite"}}/>
        </div>
        <style>{`@keyframes scrollLine{0%{transform:translateY(-100%);opacity:0}30%{opacity:1}100%{transform:translateY(350%);opacity:0}}`}</style>
      </div>
    </div>
  );
}

export default function HeroSection({
  isMobile,
  HeroScene,
  heroSectionRef,
  heroLineRefs,
  heroSubtextRef,
  heroCtasRef,
  scrollToId,
  animateHero = false, // true only on desktop (≥1024px) — drives initial hidden state
}) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e) =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Initial styles ────────────────────────────────────────────────────────
  // animateHero=true  → element starts hidden (GSAP will reveal it step-by-step)
  // animateHero=false → element starts fully visible (CSS fade-in instead)
  const gsapInitial = animateHero
    ? { opacity: 0, transform: "translateY(80px)", willChange: "transform, opacity" }
    : {};

  // CSS fade-up for non-animated (mobile/tablet) elements
  const cssReveal = (delay = 0) =>
    !animateHero
      ? { opacity: 0, animation: `hFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards` }
      : {};

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {isMobile ? (
          <div className="h-full w-full" style={{
            background: "radial-gradient(ellipse at 30% 20%, #1e3a8a18 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #0ea5e910 0%, transparent 60%), #080808"
          }}/>
        ) : (
          <Suspense fallback={
            <div className="h-full w-full" style={{
              background: "radial-gradient(ellipse at 30% 30%, #1e3a8a18 0%, transparent 60%), #080808"
            }}/>
          }>
            <HeroScene />
          </Suspense>
        )}
      </div>

      <GridLines />
      <GradientOrbs />

      {/* Mouse parallax — desktop only to avoid pointless repaints on touch */}
      {!isMobile && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(59,130,246,0.045) 0%, transparent 55%)`,
            transition: "background 0.1s",
          }}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      {/* Floating badges — desktop only */}
      <FloatingBadge style={{top:"22%",right:"8%"}}  delay={0}>React.js</FloatingBadge>
      <FloatingBadge style={{top:"55%",right:"5%"}}  delay={2}>Node.js</FloatingBadge>
      <FloatingBadge style={{top:"38%",right:"18%"}} delay={1}>MongoDB</FloatingBadge>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full px-5 pt-24 md:px-10 md:pt-28 lg:px-16">
        <div className="flex w-full max-w-[1100px] flex-col gap-5 md:gap-7">

          {/* EYEBROW — always CSS-only */}
          <div
            className="flex items-center gap-3"
            style={{ opacity: 0, animation: "hFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s forwards" }}
          >
            <span className="h-px w-8 bg-[#3b82f6]/60" />
            <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-[#3b82f6]/70 uppercase sm:text-[11px]">
              Full Stack Developer
            </span>
          </div>

          {/* HEADLINE LINES */}
          <div className="flex flex-col gap-0 md:gap-1">
            {[
              { text: "Hi, I'm Akshay.", idx: 0 },
              { text: "MERN Stack",      idx: 1 },
              { text: "Developer.",      idx: 2 },
            ].map(({ text, idx }) => (
              <h1
                key={idx}
                ref={(el) => { heroLineRefs.current[idx] = el; }}
                className="font-display tracking-tight text-white"
                style={{
                  fontSize: "clamp(38px, 9vw, 108px)",
                  fontWeight: 700,
                  lineHeight: 0.92,
                  letterSpacing: "-0.025em",
                  // line0 always visible; lines 1+2 depend on animateHero
                  ...(idx === 0
                    ? { opacity: 1, transform: "translateY(0px)", willChange: "transform, opacity" }
                    : animateHero
                      ? gsapInitial
                      : cssReveal(0.1 + idx * 0.12)   // staggered CSS reveal on mobile
                  ),
                }}
              >
                {idx === 1 ? (
                  <>
                    <span>MERN</span>
                    <span className="ml-3 md:ml-4" style={{
                      WebkitTextStroke: "1px rgba(255,255,255,0.18)",
                      WebkitTextFillColor: "transparent",
                    }}>
                      Stack
                    </span>
                  </>
                ) : text}
              </h1>
            ))}
          </div>

          {/* SUBTEXT */}
          <p
            ref={heroSubtextRef}
            className="max-w-[50rem] font-sans text-[13px] leading-relaxed text-zinc-400 md:text-[15px]"
            style={animateHero ? gsapInitial : cssReveal(0.45)}
          >
            Building{" "}
            <span className="text-[#3b82f6]/80 font-medium">full-stack</span> products with{" "}
            <span className="font-mono text-zinc-300 text-[12px] bg-white/[0.05] rounded px-1.5 py-0.5 md:text-[13px]">React</span>{" "}
            <span className="font-mono text-zinc-300 text-[12px] bg-white/[0.05] rounded px-1.5 py-0.5 md:text-[13px]">Node.js</span>{" "}
            <span className="font-mono text-zinc-300 text-[12px] bg-white/[0.05] rounded px-1.5 py-0.5 md:text-[13px]">MongoDB</span>{" "}
            — shipping fast, built to scale.
          </p>

          {/* CTAs */}
          <div
            ref={heroCtasRef}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            style={animateHero ? gsapInitial : cssReveal(0.55)}
          >
            <MagneticButton primary onClick={() => scrollToId("work")}>
              <span className="mr-2">View My Work</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MagneticButton>
            <MagneticButton href="/Akshay-Chaudhary-Resume.pdf">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="mr-2">
                <path d="M6.5 1v8M3 6.5l3.5 3.5L10 6.5M1 11.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Resume
            </MagneticButton>
          </div>

          {/* STATS — always CSS-only */}
          <div
            className="mt-2 flex items-center gap-5 border-t border-white/[0.06] pt-5 sm:gap-8"
            style={{ opacity: 0, animation: "hFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s forwards" }}
          >
            <StatPill value="3+" label="Projects shipped" />
            <div className="h-8 w-px bg-white/10" />
            <StatPill value="MERN" label="Core stack" />
            <div className="h-8 w-px bg-white/10" />
            <StatPill value="∞" label="Problems solved" />
          </div>

        </div>
      </div>

      <ScrollIndicator />

      <style>{`
        @keyframes hFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
