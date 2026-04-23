import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

// ─── Data ──────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    title: "Frontend",
    color: "#60a5fa",        // blue-400
    glow: "#3b82f6",
    icon: "◈",
    items: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Context API"],
  },
  {
    title: "Backend",
    color: "#a78bfa",        // violet-400
    glow: "#8b5cf6",
    icon: "◉",
    items: ["Node.js", "Express.js", "REST APIs", "JWT", "bcrypt", "MVC"],
  },
  {
    title: "Database",
    color: "#34d399",        // emerald-400
    glow: "#10b981",
    icon: "◎",
    items: ["MongoDB", "Mongoose"],
  },
  {
    title: "Tools",
    color: "#fb923c",        // orange-400
    glow: "#f97316",
    icon: "◇",
    items: ["Git", "GitHub", "Postman", "VS Code", "Vercel"],
  },
];

// ─── Floating Particle ──────────────────────────────────────────────────────
function Particle({ color }) {
  const style = {
    position: "absolute",
    width: `${Math.random() * 3 + 1}px`,
    height: `${Math.random() * 3 + 1}px`,
    borderRadius: "50%",
    background: color,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.5 + 0.1,
    animation: `float-particle ${Math.random() * 6 + 5}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 5}s`,
  };
  return <span style={style} />;
}

// ─── Skill Pill ─────────────────────────────────────────────────────────────
function SkillPill({ label, color, delay }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: dx * 0.25,
      y: dy * 0.25,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="skill-pill"
      style={{
        "--pill-color": color,
        animationDelay: `${delay}s`,
      }}
    >
      {label}
    </span>
  );
}

// ─── Category Card ──────────────────────────────────────────────────────────
function CategoryCard({ group, index }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const particlesRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${x}%`);
    el.style.setProperty("--mouse-y", `${y}%`);
    const rotX = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    gsap.to(el, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`category-card card-${index}`}
      style={{ "--accent": group.color, "--glow": group.glow }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* spotlight */}
      <div className="card-spotlight" />

      {/* top bar */}
      <div className="card-header">
        <div className="card-icon" style={{ color: group.color }}>
          {group.icon}
        </div>
        <div>
          <p className="card-category-label">CATEGORY</p>
          <h3 className="card-title" style={{ color: group.color }}>
            {group.title}
          </h3>
        </div>
        <div
          className="card-count"
          style={{ background: `${group.color}18`, color: group.color, borderColor: `${group.color}30` }}
        >
          {group.items.length}
        </div>
      </div>

      {/* divider */}
      <div className="card-divider" style={{ background: `linear-gradient(90deg, ${group.color}60, transparent)` }} />

      {/* skill pills */}
      <div className="card-pills">
        {group.items.map((item, i) => (
          <SkillPill key={item} label={item} color={group.color} delay={i * 0.06} />
        ))}
      </div>

      {/* corner accent */}
      <div className="card-corner" style={{ borderColor: `${group.color}40` }} />

      {/* particles */}
      {hovered && (
        <div ref={particlesRef} className="card-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <Particle key={i} color={group.color} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // line draw
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );

      // Cards stagger
      gsap.from(cardsRef.current, {
        y: 100,
        opacity: 0,
        rotateX: 20,
        duration: 0.9,
        stagger: { each: 0.15, ease: "power2.out" },
        ease: "power3.out",
        transformPerspective: 800,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        /* ── Floating particle keyframe ── */
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-18px) scale(1.4); opacity: 0.7; }
        }

        /* ── Background orbit rings ── */
        @keyframes orbit-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* ── Pill shimmer ── */
        @keyframes pill-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* ── Glitch on heading ── */
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 96% 0); transform: translate(-2px, 0); }
          20%       { clip-path: inset(40% 0 40% 0); transform: translate(2px, 0); }
          40%       { clip-path: inset(80% 0 5% 0); transform: translate(-1px, 0); }
        }
        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(80% 0 2% 0); transform: translate(2px, 0); }
          30%       { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 0); }
          60%       { clip-path: inset(50% 0 30% 0); transform: translate(1px, 0); }
        }

        /* ─────────────── Section ─────────────── */
        .skills-section {
          position: relative;
          width: 100%;
          background: #080808;
          padding: 9rem 0;
          overflow: hidden;
        }

        /* Ambient orbs */
        .skills-section::before,
        .skills-section::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .skills-section::before {
          width: 600px; height: 600px;
          left: -10%; top: -10%;
          background: radial-gradient(circle, #3b82f620 0%, transparent 70%);
          filter: blur(60px);
        }
        .skills-section::after {
          width: 500px; height: 500px;
          right: -8%; bottom: 5%;
          background: radial-gradient(circle, #8b5cf620 0%, transparent 70%);
          filter: blur(60px);
        }

        /* Orbit rings decoration */
        .orbit-ring {
          position: absolute;
          left: 50%; top: 50%;
          border-radius: 50%;
          border: 1px solid;
          pointer-events: none;
          animation: orbit-spin linear infinite;
        }
        .orbit-ring-1 {
          width: 700px; height: 700px;
          border-color: #ffffff05;
          animation-duration: 40s;
        }
        .orbit-ring-2 {
          width: 1000px; height: 1000px;
          border-color: #3b82f608;
          animation-duration: 60s;
          animation-direction: reverse;
        }
        .orbit-ring-3 {
          width: 1300px; height: 1300px;
          border-color: #8b5cf605;
          animation-duration: 90s;
        }

        /* Background BIG text */
        .bg-word {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(100px, 16vw, 220px);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px #ffffff06;
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        /* ─────────────── Heading ─────────────── */
        .skills-heading-wrap {
          text-align: center;
          margin-bottom: 4.5rem;
          position: relative;
        }
        .skills-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #60a5fa;
          margin-bottom: 1.2rem;
          padding: 6px 18px;
          border: 1px solid #3b82f630;
          border-radius: 100px;
          background: #3b82f608;
        }
        .skills-h2 {
          position: relative;
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.05;
          margin: 0 0 1rem;
        }
        /* glitch layers */
        .skills-h2::before,
        .skills-h2::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .skills-h2::before {
          color: #60a5fa;
          animation: glitch-1 5s steps(1) infinite;
          animation-delay: 2s;
          opacity: 0.7;
        }
        .skills-h2::after {
          color: #a78bfa;
          animation: glitch-2 7s steps(1) infinite;
          animation-delay: 3.5s;
          opacity: 0.7;
        }
        .skills-sub {
          color: #ffffff55;
          font-size: 15px;
          letter-spacing: 0.01em;
        }
        .skills-line {
          display: block;
          height: 1px;
          width: 80px;
          margin: 1.5rem auto 0;
          background: linear-gradient(90deg, transparent, #60a5fa, transparent);
          transform-origin: left;
        }

        /* ─────────────── Cards grid ─────────────── */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr; }
        }

        /* ─────────────── Card ─────────────── */
        .category-card {
          position: relative;
          border-radius: 20px;
          border: 1px solid #ffffff0f;
          background: #0f0f0f;
          padding: 2rem;
          overflow: hidden;
          cursor: default;
          transform-style: preserve-3d;
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          will-change: transform;
        }
        .category-card:hover {
          border-color: var(--accent, #60a5fa)30;
          box-shadow: 0 0 60px var(--glow, #3b82f6)15,
                      0 20px 80px #00000060;
        }

        /* Mouse-following spotlight */
        .card-spotlight {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            260px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            var(--accent, #60a5fa)0a 0%,
            transparent 80%
          );
          pointer-events: none;
          transition: opacity 0.3s;
          opacity: 0;
        }
        .category-card:hover .card-spotlight { opacity: 1; }

        /* Corner accent */
        .card-corner {
          position: absolute;
          top: 0; right: 0;
          width: 60px; height: 60px;
          border-top: 1px solid;
          border-right: 1px solid;
          border-radius: 0 20px 0 0;
          pointer-events: none;
        }

        /* Header */
        .card-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 1.2rem;
        }
        .card-icon {
          font-size: 28px;
          line-height: 1;
          flex-shrink: 0;
        }
        .card-category-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #ffffff30;
          margin: 0 0 2px;
        }
        .card-title {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .card-count {
          margin-left: auto;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid;
          border-radius: 100px;
          padding: 3px 11px;
          flex-shrink: 0;
        }

        /* Divider */
        .card-divider {
          height: 1px;
          width: 100%;
          margin-bottom: 1.4rem;
        }

        /* Pills container */
        .card-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* Individual pill */
        .skill-pill {
          position: relative;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #ffffffcc;
          border: 1px solid #ffffff12;
          border-radius: 100px;
          padding: 6px 15px;
          background: #ffffff05;
          cursor: default;
          transition: color 0.3s, border-color 0.3s, background 0.3s, transform 0.15s;
          overflow: hidden;
        }
        .skill-pill::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            var(--pill-color, #60a5fa)28 50%,
            transparent 60%
          );
          background-size: 200% auto;
          animation: pill-shimmer 3s linear infinite;
          animation-play-state: paused;
          border-radius: inherit;
        }
        .category-card:hover .skill-pill::before {
          animation-play-state: running;
        }
        .skill-pill:hover {
          color: var(--pill-color, #60a5fa);
          border-color: var(--pill-color, #60a5fa)50;
          background: var(--pill-color, #60a5fa)10;
        }

        /* Floating particles layer */
        .card-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: inherit;
        }

        /* ─── Marquee ticker ─── */
        .skills-ticker {
          margin-top: 4rem;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          gap: 0;
          animation: ticker-scroll 18s linear infinite;
          width: max-content;
        }
        .ticker-track:hover { animation-play-state: paused; }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 28px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff22;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ticker-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>

      <section ref={sectionRef} id="skills" className="skills-section">

        {/* Orbit rings */}
        <div className="orbit-ring orbit-ring-1" />
        <div className="orbit-ring orbit-ring-2" />
        <div className="orbit-ring orbit-ring-3" />

        {/* BG text */}
        <div className="bg-word">SKILLS</div>

        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* Heading */}
          <div ref={headingRef} className="skills-heading-wrap">
            <span className="skills-eyebrow">What I work with</span>
            <h2 className="skills-h2" data-text="My Tech Stack">
              My Tech Stack
            </h2>
            <p className="skills-sub">
              Technologies I use to build scalable full-stack applications
            </p>
            <span ref={lineRef} className="skills-line" />
          </div>

          {/* Cards */}
          <div className="skills-grid">
            {skillGroups.map((group, i) => (
              <div
                key={group.title}
                ref={(el) => (cardsRef.current[i] = el)}
              >
                <CategoryCard group={group} index={i} />
              </div>
            ))}
          </div>

          {/* Ticker */}
          <div className="skills-ticker">
            <div className="ticker-track">
              {[...skillGroups.flatMap((g) => g.items), ...skillGroups.flatMap((g) => g.items)].map(
                (item, i) => {
                  const color = skillGroups[i % skillGroups.length].color;
                  return (
                    <span key={i} className="ticker-item">
                      <span className="ticker-dot" style={{ background: color }} />
                      {item}
                    </span>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
