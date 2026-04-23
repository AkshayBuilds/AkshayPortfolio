import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../components/layout/Container.jsx";

gsap.registerPlugin(ScrollTrigger);

const experienceBullets = [
  {
    text: "Engineered responsive React.js interfaces, improving component clarity and layout consistency across devices",
    tag: "UI/UX",
    icon: "▲",
  },
  {
    text: "Architected 10+ reusable modular components, increasing maintainability and cutting feature dev time ~30%",
    tag: "Architecture",
    icon: "◈",
  },
  {
    text: "Integrated REST APIs to enable real-time data flow, eliminating stale-data issues across key views",
    tag: "API",
    icon: "⟳",
  },
  {
    text: "Optimised rendering performance with lazy loading and memoisation to improve page load efficiency",
    tag: "Performance",
    icon: "⚡",
  },
  {
    text: "Collaborated using Git and GitHub with clean branching strategies and participated in code reviews",
    tag: "DevOps",
    icon: "⎇",
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);
  const bulletsRef = useRef([]);
  const lineRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    const card = cardRef.current;
    const bullets = bulletsRef.current;
    const line = lineRef.current;
    const badge = badgeRef.current;

    gsap.set([heading, badge], { opacity: 0, y: 50 });
    gsap.set(card, { opacity: 0, y: 80 });
    gsap.set(bullets, { opacity: 0, x: -30 });
    gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

    const timer = window.setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
            refreshPriority: -1,
          },
        });

        tl.to(badge,   { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
          .to(heading, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
          .to(card,    { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.4")
          .to(line,    { scaleY: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.5")
          .to(bullets, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }, "-=0.4");
      }, sectionRef);

      return () => ctx.revert();
    }, 350);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        /* ── Scan line animation ── */
        @keyframes scan {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(600%); opacity: 0; }
        }

        /* ── Blink ── */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── Corner pulse ── */
        @keyframes corner-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }

        /* ── Number count up ── */
        @keyframes ticker {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Section ─── */
        .exp-section {
          position: relative;
          width: 100%;
          background: #080808;
          padding: 8rem 0;
          overflow: hidden;
        }

        /* Grid pattern background */
        .exp-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(#3b82f608 1px, transparent 1px),
            linear-gradient(90deg, #3b82f608 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }

        /* Ambient glow */
        .exp-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .exp-glow-1 {
          width: 500px; height: 300px;
          left: -100px; top: 10%;
          background: #3b82f612;
        }
        .exp-glow-2 {
          width: 400px; height: 400px;
          right: -80px; bottom: 10%;
          background: #8b5cf610;
        }

        /* Big bg text */
        .exp-bg-text {
          position: absolute;
          bottom: -2rem;
          right: -2rem;
          font-size: clamp(80px, 14vw, 180px);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: transparent;
          -webkit-text-stroke: 1px #ffffff04;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }

        /* ─── Eyebrow badge ─── */
        .exp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #60a5fa;
          border: 1px solid #3b82f625;
          border-radius: 4px;
          padding: 6px 14px;
          background: #3b82f608;
          margin-bottom: 1.2rem;
        }
        .exp-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #3b82f6;
          animation: blink 1.4s ease-in-out infinite;
        }

        /* ─── Heading ─── */
        .exp-heading {
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.1;
          margin: 0 0 3rem;
        }
        .exp-heading span { color: #60a5fa; }

        /* ─── Main card ─── */
        .exp-card {
          position: relative;
          border-radius: 16px;
          border: 1px solid #ffffff0d;
          background: #0c0c0c;
          overflow: hidden;
        }

        /* Scan line on card */
        .exp-card::after {
          content: "";
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #3b82f640, #3b82f6, #3b82f640, transparent);
          animation: scan 5s ease-in-out infinite;
          pointer-events: none;
        }

        /* Corner brackets */
        .exp-corner {
          position: absolute;
          width: 20px; height: 20px;
          pointer-events: none;
          animation: corner-pulse 3s ease-in-out infinite;
        }
        .exp-corner-tl { top: 12px; left: 12px; border-top: 1.5px solid #3b82f6; border-left: 1.5px solid #3b82f6; }
        .exp-corner-tr { top: 12px; right: 12px; border-top: 1.5px solid #3b82f6; border-right: 1.5px solid #3b82f6; animation-delay: 0.5s; }
        .exp-corner-bl { bottom: 12px; left: 12px; border-bottom: 1.5px solid #3b82f6; border-left: 1.5px solid #3b82f6; animation-delay: 1s; }
        .exp-corner-br { bottom: 12px; right: 12px; border-bottom: 1.5px solid #3b82f6; border-right: 1.5px solid #3b82f6; animation-delay: 1.5s; }

        /* ─── Card header ─── */
        .exp-card-header {
          padding: 1.8rem 2rem 1.4rem;
          border-bottom: 1px solid #ffffff08;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          background: linear-gradient(135deg, #3b82f606, transparent);
        }

        .exp-role {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.3;
          margin: 0 0 6px;
        }
        .exp-company {
          font-size: 13px;
          font-weight: 600;
          color: #60a5fa;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* Status badge */
        .exp-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #34d399;
          background: #34d39912;
          border: 1px solid #34d39925;
          border-radius: 100px;
          padding: 5px 12px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .exp-status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #34d399;
          animation: blink 1.2s ease-in-out infinite;
        }

        /* Date row */
        .exp-date-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.9rem 2rem;
          border-bottom: 1px solid #ffffff06;
          background: #ffffff02;
        }
        .exp-date-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffffff30;
        }
        .exp-date-value {
          font-size: 12px;
          font-weight: 600;
          color: #ffffff60;
          font-variant-numeric: tabular-nums;
        }
        .exp-date-sep {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #3b82f620, transparent);
        }

        /* ─── Timeline bullets ─── */
        .exp-bullets {
          padding: 1.6rem 2rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }

        /* Vertical line */
        .exp-timeline-line {
          position: absolute;
          left: 2.75rem;
          top: 1.6rem;
          bottom: 2rem;
          width: 1px;
          background: linear-gradient(180deg, #3b82f640, #3b82f620, transparent);
        }

        .exp-bullet-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 0.85rem 0;
          position: relative;
          cursor: default;
          transition: background 0.2s;
          border-radius: 8px;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        .exp-bullet-item:hover {
          background: #3b82f606;
        }

        /* Node */
        .exp-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
          width: 28px;
          padding-top: 2px;
        }
        .exp-node-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #3b82f6;
          border: 1.5px solid #1d4ed8;
          box-shadow: 0 0 8px #3b82f660;
          flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .exp-bullet-item:hover .exp-node-dot {
          transform: scale(1.4);
          box-shadow: 0 0 16px #3b82f6;
        }

        /* Tag + text */
        .exp-bullet-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .exp-bullet-top {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .exp-bullet-icon {
          font-size: 11px;
          color: #3b82f6;
          opacity: 0.8;
        }
        .exp-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #60a5fa;
          background: #3b82f610;
          border: 1px solid #3b82f620;
          border-radius: 3px;
          padding: 2px 7px;
        }
        .exp-bullet-text {
          font-size: 13.5px;
          line-height: 1.65;
          color: #9ca3af;
          transition: color 0.2s;
        }
        .exp-bullet-item:hover .exp-bullet-text {
          color: #d1d5db;
        }

        /* ─── Stats row ─── */
        .exp-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid #ffffff08;
        }
        .exp-stat {
          padding: 1.2rem 1.5rem;
          text-align: center;
          border-right: 1px solid #ffffff08;
          position: relative;
          overflow: hidden;
        }
        .exp-stat:last-child { border-right: none; }
        .exp-stat::before {
          content: "";
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #3b82f640, transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .exp-stat:hover::before { opacity: 1; }
        .exp-stat-num {
          font-size: 26px;
          font-weight: 800;
          color: #60a5fa;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 4px;
        }
        .exp-stat-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ffffff30;
        }

        @media (max-width: 640px) {
          .exp-card-header { flex-direction: column; }
          .exp-stats { grid-template-columns: repeat(3, 1fr); }
          .exp-stat-num { font-size: 20px; }
          .exp-bullets { padding: 1.2rem 1rem 1.5rem; }
          .exp-timeline-line { left: 2.25rem; }
        }
      `}</style>

      <section ref={sectionRef} id="experience" className="exp-section">

        {/* Ambient glows */}
        <div className="exp-glow exp-glow-1" />
        <div className="exp-glow exp-glow-2" />

        {/* Big bg text */}
        <div className="exp-bg-text">EXP</div>

        <Container style={{ position: "relative" }}>

          {/* Eyebrow */}
          <div ref={badgeRef} className="exp-eyebrow">
            <span className="exp-eyebrow-dot" />
            Career Timeline
          </div>

          {/* Heading */}
          <h2 ref={headingRef} className="exp-heading">
            Where I've <span>Been</span>
          </h2>

          {/* Card */}
          <div ref={cardRef} className="exp-card">

            {/* Corner brackets */}
            <div className="exp-corner exp-corner-tl" />
            <div className="exp-corner exp-corner-tr" />
            <div className="exp-corner exp-corner-bl" />
            <div className="exp-corner exp-corner-br" />

            {/* Header */}
            <div className="exp-card-header">
              <div>
                <h3 className="exp-role">React.js Developer Intern</h3>
                <div className="exp-company">Pyonix Technology</div>
              </div>
              <div className="exp-status">
                <span className="exp-status-dot" />
                Completed
              </div>
            </div>

            {/* Date row */}
            <div className="exp-date-row">
              <span className="exp-date-label">Duration</span>
              <span className="exp-date-value">Nov 2025 — Feb 2026</span>
              <div className="exp-date-sep" />
              <span className="exp-date-label">Type</span>
              <span className="exp-date-value">Full-time Internship</span>
            </div>

            {/* Bullets */}
            <div className="exp-bullets">
              <div ref={lineRef} className="exp-timeline-line" />
              {experienceBullets.map((b, i) => (
                <div
                  key={i}
                  ref={(el) => (bulletsRef.current[i] = el)}
                  className="exp-bullet-item"
                >
                  <div className="exp-node">
                    <div className="exp-node-dot" />
                  </div>
                  <div className="exp-bullet-content">
                    <div className="exp-bullet-top">
                      <span className="exp-bullet-icon">{b.icon}</span>
                      <span className="exp-tag">{b.tag}</span>
                    </div>
                    <p className="exp-bullet-text">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="exp-stats">
              <div className="exp-stat">
                <div className="exp-stat-num">10+</div>
                <div className="exp-stat-label">Components</div>
              </div>
              <div className="exp-stat">
                <div className="exp-stat-num">~30%</div>
                <div className="exp-stat-label">Faster Dev</div>
              </div>
              <div className="exp-stat">
                <div className="exp-stat-num">3mo</div>
                <div className="exp-stat-label">Duration</div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
