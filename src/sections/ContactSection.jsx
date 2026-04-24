import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "../components/forms/ContactForm.jsx";
import Container from "../components/layout/Container.jsx";

gsap.registerPlugin(ScrollTrigger);

// ── Contact data ──────────────────────────────────────────────────────────────
const CONTACT_ITEMS = [
  { label: "email",    icon: "✉",  value: "akshay.dev307@gmail.com",                     href: "mailto:akshay.dev307@gmail.com" },
  { label: "phone",    icon: "☎",  value: "+91 931-684-7190",                             href: "tel:+919316847190" },
  { label: "linkedin", icon: "in", value: "linkedin.com/in/akshay-web",                   href: "https://www.linkedin.com/in/akshay-web/" },
  { label: "github",   icon: "gh", value: "github.com/AkshayBuilds",                      href: "https://github.com/AkshayBuilds" },
  { label: "portfolio",icon: "◈",  value: "portfolio-blue-ten-46.vercel.app",             href: "https://portfolio-blue-ten-46.vercel.app/" },
];

// ── Animated beam background ──────────────────────────────────────────────────
function BeamBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, #3b82f618 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black, transparent)",
      }} />
      {/* Top glow bar */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      {/* Corner accent lines */}
      <div className="absolute left-0 top-0 h-24 w-px bg-gradient-to-b from-blue-500/30 to-transparent" />
      <div className="absolute right-0 top-0 h-24 w-px bg-gradient-to-b from-blue-500/30 to-transparent" />
      {/* Ambient orbs */}
      <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-600/[0.07] blur-[120px]" />
      <div className="absolute -right-20 top-10 h-[400px] w-[400px] rounded-full bg-indigo-600/[0.05] blur-[100px]" />
      {/* Scan line sweep */}
      <div className="scan-beam absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
    </div>
  );
}

// ── Terminal contact row ───────────────────────────────────────────────────────
function TerminalRow({ item, copyField, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyField(item.label, item.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="terminal-row group flex items-center gap-0 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-blue-500/25 hover:bg-blue-500/[0.04]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Line number gutter */}
      <div className="flex h-full w-10 shrink-0 items-center justify-center border-r border-white/[0.05] bg-white/[0.02] py-3.5">
        <span className="font-mono text-[10px] text-white/15">{String(index + 1).padStart(2, "0")}</span>
      </div>

      {/* Prompt */}
      <div className="flex shrink-0 items-center gap-1.5 border-r border-white/[0.05] px-3 py-3.5">
        <span className="font-mono text-[10px] font-bold text-blue-400/70">~</span>
        <span className="font-mono text-[10px] text-blue-400/50">$</span>
        <span className="font-mono text-[10px] font-semibold text-blue-300/80">{item.label}</span>
      </div>

      {/* Value */}
      <a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
        className="flex-1 truncate px-3 py-3.5 font-mono text-[11px] text-zinc-400 transition-colors group-hover:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {item.value}
      </a>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="flex shrink-0 items-center gap-1.5 border-l border-white/[0.05] px-3.5 py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all"
        style={{ color: copied ? "#22c55e" : "#ffffff20" }}
      >
        {copied ? (
          <span className="font-mono text-[10px] text-emerald-400">✓ ok</span>
        ) : (
          <span className="font-mono opacity-0 transition-opacity group-hover:opacity-100">cp</span>
        )}
      </button>
    </div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
        Available for work
      </span>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function ContactSection({ copyField, onToast }) {
  const sectionRef  = useRef(null);
  const leftRef     = useRef(null);
  const rightRef    = useRef(null);
  const headingRef  = useRef(null);
  const rowsRef     = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor on heading
  useEffect(() => {
    const iv = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(iv);
  }, []);

  // GSAP scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [
        leftRef.current,
        rightRef.current,
        headingRef.current,
      ].filter(Boolean);
  
      gsap.set(els, { opacity: 0, y: 48 });
  
      const rows = rowsRef.current?.querySelectorAll(".terminal-row") ?? [];
      gsap.set(rows, { opacity: 0, x: -24 });
  
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 68%",
          toggleActions: "play none none none",
        },
      });
  
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .to(
          leftRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          rows,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.07,
          },
          "-=0.5"
        )
        .to(
          rightRef.current,
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        );
    }, sectionRef);
  
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative w-full overflow-hidden bg-[#080808] py-28">
      <style>{`
        @keyframes scanBeam {
          0%   { transform: translateY(0); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .scan-beam { animation: scanBeam 8s linear infinite; }
      `}</style>

      <BeamBackground />

      <Container style={{ position: "relative" }}>

        {/* ── Section label ── */}
        <div ref={headingRef} className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <StatusBadge />
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
          </div>

          <div className="flex items-end gap-1">
            <h2
              className="font-bold leading-[1.05] tracking-tight text-white"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Let's Build
              <br />
              <span
                className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent"
              >
                Something
              </span>{" "}
              <span className="text-white">Real.</span>
            </h2>
            {/* Blinking cursor */}
            <span
              className="mb-2 ml-1 inline-block h-[0.6em] w-[3px] rounded-sm bg-blue-400 align-bottom"
              style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.08s" }}
            />
          </div>

          <p className="mt-4 max-w-md font-mono text-[13px] leading-relaxed text-zinc-500">
            <span className="text-blue-400/60">{"// "}</span>
            MERN stack · React UI · Full-stack features · shipped fast.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">

          {/* LEFT — terminal contact panel */}
          <div ref={leftRef} className="flex flex-col gap-6">

            {/* Terminal window chrome */}
            <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0a0a]">
              {/* Chrome bar */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0d0d0d] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                <span className="ml-3 font-mono text-[10px] text-white/20">contact.sh</span>
                <div className="ml-auto font-mono text-[9px] text-white/10">zsh</div>
              </div>

              {/* Terminal intro line */}
              <div className="border-b border-white/[0.04] px-4 py-3">
                <span className="font-mono text-[11px] text-zinc-600">
                  <span className="text-blue-400/60">akshay@dev</span>
                  <span className="text-white/20">:</span>
                  <span className="text-indigo-400/50">~/contact</span>
                  <span className="text-white/20"> $ </span>
                  <span className="text-zinc-400">cat info.json</span>
                </span>
              </div>

              {/* Rows */}
              <div ref={rowsRef} className="flex flex-col gap-1 p-3">
                {CONTACT_ITEMS.map((item, i) => (
                  <TerminalRow
                    key={item.label}
                    item={item}
                    copyField={copyField}
                    index={i}
                  />
                ))}
              </div>

              {/* Terminal footer */}
              <div className="border-t border-white/[0.04] px-4 py-2.5">
                <span className="font-mono text-[10px] text-zinc-700">
                  click value to open · click <span className="text-blue-400/50">cp</span> to copy
                </span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="mailto:akshay.dev307@gmail.com"
                className="group relative flex min-h-[52px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-6 font-mono text-[12px] font-bold tracking-wide text-white transition-all hover:bg-blue-500"
                style={{ boxShadow: "0 0 32px #3b82f650, inset 0 1px 0 #ffffff20" }}
              >
                <span className="text-blue-200 opacity-70">✉</span>
                Email Me
                {/* Shimmer */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>
              <a
                href="https://www.linkedin.com/in/akshay-web/"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 font-mono text-[12px] font-bold tracking-wide text-white/70 transition-all hover:border-blue-500/30 hover:bg-blue-500/[0.06] hover:text-white"
              >
                <span className="text-[11px] font-black">in</span>
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* RIGHT — contact form */}
          <div ref={rightRef}>
            <div
              className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0a0a] p-7"
              style={{ boxShadow: "0 0 0 1px #3b82f610, 0 40px 80px #00000060" }}
            >
              {/* Corner accent */}
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full"
                style={{ background: "radial-gradient(circle at top right, #3b82f610, transparent 70%)" }} />

              {/* Form header */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-400/60">
                    {"// new_message"}
                  </div>
                  <h3 className="text-[20px] font-bold tracking-tight text-white">
                    Drop a message
                  </h3>
                  <p className="mt-1 font-mono text-[12px] text-zinc-600">
                    I reply within 24h usually.
                  </p>
                </div>
                {/* Response time badge */}
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-center">
                  <div className="font-mono text-[18px] font-black text-white">24h</div>
                  <div className="font-mono text-[8px] uppercase tracking-widest text-zinc-600">avg reply</div>
                </div>
              </div>

              {/* Divider */}
              <div className="mb-6 h-px bg-gradient-to-r from-blue-500/20 via-white/5 to-transparent" />

              <ContactForm onToast={onToast} />
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.04] pt-8">
          <span className="font-mono text-[11px] text-zinc-700">
            © {new Date().getFullYear()} Akshay · Built with React + GSAP
          </span>
          <div className="flex items-center gap-4">
            {["GitHub", "LinkedIn", "Email"].map((s) => (
              <a
                key={s}
                href={
                  s === "GitHub"   ? "https://github.com/AkshayBuilds" :
                  s === "LinkedIn" ? "https://www.linkedin.com/in/akshay-web/" :
                  "mailto:akshay.dev307@gmail.com"
                }
                target={s !== "Email" ? "_blank" : undefined}
                rel="noreferrer"
                className="font-mono text-[11px] text-zinc-600 transition hover:text-blue-400"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
