import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import Container from "../components/layout/Container.jsx";

gsap.registerPlugin(ScrollTrigger, Draggable);

// ── Accent config ─────────────────────────────────────────────────────────────
const ACCENTS = [
  { color: "#3b82f6", glow: "#3b82f640", border: "#3b82f650", tag: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { color: "#8b5cf6", glow: "#8b5cf640", border: "#8b5cf650", tag: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  { color: "#10b981", glow: "#10b98140", border: "#10b98150", tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
];

const STACK_OFFSET_Y  = 14;   // px per stacked layer
const STACK_SCALE_DEC = 0.05; // scale decrease per layer
const THROW_DISTANCE  = 1100; // px to throw dismissed card
const DRAG_THRESHOLD  = 100;  // px before snap-away fires

// ── Swipe hint overlay ────────────────────────────────────────────────────────
function SwipeHint({ dir }) {
  if (!dir) return null;
  const isLeft = dir === "left";
  return (
    <div
      className="pointer-events-none absolute inset-0 z-50 flex items-center rounded-2xl"
      style={{
        background: isLeft
          ? "linear-gradient(135deg,#ef444430 0%,transparent 60%)"
          : "linear-gradient(225deg,#22c55e30 0%,transparent 60%)",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        padding: "24px",
      }}
    >
      <span
        className="rounded-xl border-2 px-4 py-1.5 text-[13px] font-black uppercase tracking-widest"
        style={{
          borderColor: isLeft ? "#ef4444" : "#22c55e",
          color:       isLeft ? "#ef4444" : "#22c55e",
        }}
      >
        {isLeft ? "← Skip" : "View ✓"}
      </span>
    </div>
  );
}

// ── Single stacked card ───────────────────────────────────────────────────────
function StackCard({ project, stackIndex, totalVisible, onDismiss, isTop, dragEnabled }) {
  const accent  = ACCENTS[project._origIndex % ACCENTS.length];
  const cardRef = useRef(null);
  const dragRef = useRef(null);
  const [hint, setHint] = useState(null);

  const scaleVal   = 1 - stackIndex * STACK_SCALE_DEC;
  const yOffset    = stackIndex * STACK_OFFSET_Y;
  const brightness = 1 - stackIndex * 0.18;

  // Animate into stack position whenever depth changes
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: scaleVal, y: yOffset,
      filter: `brightness(${brightness})`,
      duration: 0.55, ease: "power3.out",
    });
  }, [stackIndex, scaleVal, yOffset, brightness]);

  // Drag — only top card
  useEffect(() => {
    if (!isTop || !cardRef.current || !dragEnabled) return;

    dragRef.current = Draggable.create(cardRef.current, {
      type: "x,y",
      inertia: false,
      onDrag() {
        gsap.set(this.target, { rotation: (this.x / DRAG_THRESHOLD) * 14 });
        if      (this.x >  50) setHint("right");
        else if (this.x < -50) setHint("left");
        else                   setHint(null);
      },
      onDragEnd() {
        if (Math.abs(this.x) > DRAG_THRESHOLD) {
          const dir = this.x > 0 ? 1 : -1;
          gsap.to(cardRef.current, {
            x: dir * THROW_DISTANCE, y: this.y + 100,
            rotation: dir * 30, opacity: 0,
            duration: 0.5, ease: "power3.in",
            onComplete: onDismiss,
          });
        } else {
          gsap.to(cardRef.current, {
            x: 0, y: yOffset, rotation: 0,
            duration: 0.7, ease: "elastic.out(1, 0.6)",
          });
          setHint(null);
        }
      },
    })[0];

    return () => { dragRef.current?.kill(); };
  }, [isTop, dragEnabled, onDismiss, yOffset]);

  return (
    <div
      ref={cardRef}
      className="absolute inset-x-0 mx-auto w-full max-w-3xl rounded-2xl border border-white/[0.08] bg-[#0f0f0f]"
      style={{
        cursor: isTop ? "grab" : "default",
        zIndex: totalVisible - stackIndex,
        transformOrigin: "50% 110%",
        boxShadow: isTop
          ? `0 0 0 1px ${accent.border}, 0 32px 80px ${accent.glow}, 0 16px 48px #00000090`
          : "0 8px 32px #00000070",
        willChange: "transform",
      }}
    >
      {isTop && <SwipeHint dir={hint} />}

      {/* Top bar */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-3">
        <span className="font-mono text-xl font-black" style={{ color: accent.color }}>
          {String(project._origIndex + 1).padStart(2, "0")}
        </span>
        <div className="h-4 w-px bg-white/10" />
        <span className="rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]"
          style={{ color: accent.color, background: accent.glow, borderColor: accent.border }}>
          Featured
        </span>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <a href={project.live} target="_blank" rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/50 transition hover:border-white/30 hover:text-white">
            Live ↗
          </a>
          <a href={project.github} target="_blank" rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold text-white/50 transition hover:border-white/30 hover:text-white">
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col gap-4 border-r border-white/[0.05] p-6 md:p-7">
          <h3 className="text-[22px] font-bold leading-snug tracking-tight text-white md:text-[26px]">
            {project.title}
          </h3>
          <p className="flex-1 text-[13px] leading-relaxed text-zinc-500">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span key={s}
                className={`rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] ${accent.tag}`}>
                {s}
              </span>
            ))}
          </div>
          <div className="flex gap-2 pt-1 md:hidden">
            <a href={project.live} target="_blank" rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-1 items-center justify-center rounded-xl py-2.5 text-[12px] font-bold text-white"
              style={{ background: accent.color }}>
              Live ↗
            </a>
            <a href={project.github} target="_blank" rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex flex-1 items-center justify-center rounded-xl border border-white/10 py-2.5 text-[12px] font-bold text-white/70">
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Right: code panel */}
        <div className="relative overflow-hidden p-4">
          <div className="relative z-10 h-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#080808]">
            <div className="flex items-center gap-2 border-b border-white/[0.05] bg-[#0c0c0c] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]/70" />
              <span className="ml-2 truncate font-mono text-[9px] text-white/20">
                {project.live.replace("https://", "")}
              </span>
            </div>
            <div className="p-3 font-mono text-[10px] leading-[1.8]">
              {[
                { t: `// ${project.title}`, dim: true },
                { t: `import { useState }`, kw: true },
                { t: `  from 'react'` },
                { t: `` },
                { t: `export default function App() {`, kw: true },
                { t: `  const [data, setData]` },
                { t: `    = useState(null)` },
                { t: `` },
                { t: `  return <Dashboard />`, kw: true },
                { t: `}` },
              ].map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-4 shrink-0 text-right text-[8px] text-white/10">{line.t ? i + 1 : ""}</span>
                  <span style={{ color: line.dim ? "#ffffff15" : line.kw ? accent.color : "#4b5563" }}>
                    {line.t || "\u00a0"}
                  </span>
                </div>
              ))}
              <div className="flex gap-3 pt-0.5">
                <span className="w-4 text-[8px] text-white/10">11</span>
                <span className="inline-block h-[12px] w-[6px] animate-pulse rounded-sm"
                  style={{ background: accent.color, opacity: 0.8 }} />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(circle at 60% 50%, ${accent.glow}, transparent 70%)` }} />
        </div>
      </div>

      <div className="h-px w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${accent.color}60, transparent)` }} />
    </div>
  );
}

// ── Work Section ──────────────────────────────────────────────────────────────
export default function WorkSection({ projects: rawProjects }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const badgeRef   = useRef(null);
  const deckRef    = useRef(null);

  const tagged = rawProjects.map((p, i) => ({ ...p, _origIndex: i }));

  const [stack,     setStack]     = useState(tagged);
  const [dismissed, setDismissed] = useState([]);
  const [dragEnabled, setDragEnabled] = useState(true);

  const handleDismiss = useCallback(() => {
    setStack((prev) => {
      const [top, ...rest] = prev;
      setDismissed((d) => [top, ...d]);
      return rest;
    });
  }, []);

  const handleUndo = useCallback(() => {
    setDismissed((prev) => {
      if (!prev.length) return prev;
      const [last, ...rest] = prev;
      setStack((s) => [last, ...s]);
      return rest;
    });
  }, []);

  const handleReset = useCallback(() => {
    setDismissed([]);
    setStack(tagged);
  }, []);

  // Keyboard: → next, ← undo
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" && stack.length && dragEnabled) {
        const topWrapper = deckRef.current?.querySelector("[data-top]");
        if (!topWrapper) return;
        setDragEnabled(false);
        gsap.to(topWrapper, {
          x: THROW_DISTANCE, y: 80, rotation: 25, opacity: 0,
          duration: 0.5, ease: "power3.in",
          onComplete: () => { handleDismiss(); setDragEnabled(true); },
        });
      }
      if (e.key === "ArrowLeft") handleUndo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stack.length, handleDismiss, handleUndo, dragEnabled]);

  // Scroll reveal
  useEffect(() => {
    gsap.set([badgeRef.current, headingRef.current], { opacity: 0, y: 40 });
    gsap.set(deckRef.current, { opacity: 0, y: 60 });
    const t = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none none" },
        });
        tl.to(badgeRef.current,   { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
          .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
          .to(deckRef.current,    { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, "-=0.4");
      }, sectionRef);
      return () => ctx.revert();
    }, 350);
    return () => clearTimeout(t);
  }, []);

  const visible = stack.slice(0, 3);

  return (
    <section ref={sectionRef} id="work" className="relative w-full overflow-hidden bg-[#080808] py-28">

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "linear-gradient(#3b82f606 1px,transparent 1px),linear-gradient(90deg,#3b82f606 1px,transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%,black,transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%,black,transparent)",
      }} />

      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-[500px] rounded-full bg-blue-500/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-violet-500/[0.06] blur-[100px]" />

      <div className="pointer-events-none absolute right-0 top-6 select-none font-black leading-none tracking-tighter text-transparent"
        style={{ fontSize: "clamp(70px,14vw,180px)", WebkitTextStroke: "1px #ffffff04" }}>
        WORK
      </div>

      <Container style={{ position: "relative" }}>
        {/* Header */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div ref={badgeRef}
              className="mb-3 inline-flex items-center gap-2 rounded border border-blue-500/20 bg-blue-500/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
              Selected Projects
            </div>
            <h2 ref={headingRef}
              className="font-bold leading-tight tracking-tight text-white"
              style={{ fontSize: "clamp(32px,4.5vw,52px)" }}>
              Things I've <span className="text-blue-400">Built</span>
            </h2>
          </div>
          <a href="https://github.com/AkshayBuilds?tab=repositories" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12px] font-semibold text-white/60 transition-all hover:border-blue-500/30 hover:text-white hover:shadow-[0_0_20px_#3b82f625]">
            All on GitHub ↗
          </a>
        </div>

        {/* Deck area — extra bottom padding for the stacked cards peeking below */}
        <div ref={deckRef} className="relative mx-auto" style={{ height: "520px", maxWidth: "768px" }}>
          {stack.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="text-center">
                <p className="mt-2 text-[15px] font-semibold text-white/50">You've seen them all!</p>
                <p className="mt-1 text-[12px] text-white/25">All projects reviewed</p>
              </div>
              <button onClick={handleReset}
                className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-6 py-2.5 text-[13px] font-bold text-blue-400 transition hover:bg-blue-500/20">
                ↺ See again
              </button>
            </div>
          ) : (
            // Render bottom → top so top card sits on top in DOM stacking
            [...visible].reverse().map((project, revIdx) => {
              const stackIndex = visible.length - 1 - revIdx;
              const isTop = stackIndex === 0;
              return (
                <div
                  key={project.title}
                  data-top={isTop ? "true" : undefined}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <StackCard
                    project={project}
                    stackIndex={stackIndex}
                    totalVisible={visible.length}
                    onDismiss={handleDismiss}
                    isTop={isTop}
                    dragEnabled={dragEnabled}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-center gap-5">
          <button onClick={handleUndo} disabled={dismissed.length === 0}
            title="Undo (←)"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[16px] text-white/30 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-20">
            ←
          </button>

          {/* Progress pips */}
          <div className="flex items-center gap-2">
            {rawProjects.map((_, i) => {
              const isDone  = dismissed.some((d) => d._origIndex === i);
              const isTop   = stack[0]?._origIndex === i;
              return (
                <div key={i} className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width:      isTop ? "28px" : "8px",
                    background: isDone ? "#ffffff12" : ACCENTS[i % ACCENTS.length].color,
                    boxShadow:  isTop  ? `0 0 10px ${ACCENTS[i % ACCENTS.length].color}` : "none",
                    opacity:    isDone ? 0.3 : 1,
                  }} />
              );
            })}
          </div>

          <button
            title="Next (→)"
            disabled={stack.length === 0 || !dragEnabled}
            onClick={() => {
              if (!stack.length || !dragEnabled) return;
              const topWrapper = deckRef.current?.querySelector("[data-top]");
              if (!topWrapper) return;
              setDragEnabled(false);
              gsap.to(topWrapper, {
                x: THROW_DISTANCE, y: 80, rotation: 25, opacity: 0,
                duration: 0.5, ease: "power3.in",
                onComplete: () => { handleDismiss(); setDragEnabled(true); },
              });
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[16px] text-white/30 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-20">
            →
          </button>
        </div>

        <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-white/15">
          Drag card · ← → keys · click ← to bring back
        </p>
      </Container>
    </section>
  );
}
