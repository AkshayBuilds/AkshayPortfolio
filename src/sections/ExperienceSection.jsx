import { motion } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────
const experienceItems = [
  {
    text: "Engineered responsive React.js interfaces, improving component clarity and layout consistency across devices",
    tag: "UI/UX",
  },
  {
    text: "Architected 10+ reusable modular components, increasing maintainability and cutting feature dev time ~30%",
    tag: "Architecture",
  },
  {
    text: "Integrated REST APIs to enable real-time data flow, eliminating stale-data issues across key views",
    tag: "API",
  },
  {
    text: "Optimised rendering performance with lazy loading and memoisation to improve page load efficiency",
    tag: "Performance",
  },
  {
    text: "Collaborated using Git and GitHub with clean branching strategies and participated in code reviews",
    tag: "DevOps",
  },
];

// ─── Animation ───────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: {
    delay,
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
});

const bulletVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4 + i * 0.12,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// ─── Main Section ────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  return (
    <>
      <style>{`
        /* ─── Section ─── */
        .xp-section {
          position: relative;
          width: 100%;
          background: #080808;
          border-radius: 40px 40px 0 0;
          padding: 5rem 1.25rem;
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .xp-section {
            border-radius: 50px 50px 0 0;
            padding: 6rem 2rem;
          }
        }
        @media (min-width: 768px) {
          .xp-section {
            border-radius: 60px 60px 0 0;
            padding: 8rem 2.5rem;
          }
        }

        /* Subtle grid texture */
        .xp-section::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background-image:
            linear-gradient(rgba(215, 226, 234, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(215, 226, 234, 0.025) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 70% 50% at 50% 30%, black, transparent);
          -webkit-mask-image: radial-gradient(ellipse 70% 50% at 50% 30%, black, transparent);
          pointer-events: none;
        }

        /* Ambient glow */
        .xp-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(100px);
        }
        .xp-glow-1 {
          width: 500px;
          height: 400px;
          left: -10%;
          top: 10%;
          background: rgba(100, 105, 115, 0.06);
        }
        .xp-glow-2 {
          width: 400px;
          height: 400px;
          right: -8%;
          bottom: 15%;
          background: rgba(187, 204, 215, 0.04);
        }

        /* ─── Inner ─── */
        .xp-inner {
          position: relative;
          max-width: 72rem;
          margin: 0 auto;
        }

        /* ─── Badge ─── */
        .xp-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(215, 226, 234, 0.4);
          margin-bottom: 1.2rem;
        }

        /* ─── Heading ─── */
        .xp-heading {
          font-size: clamp(3rem, 12vw, 160px);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height: 0.95;
          margin: 0;
          text-align: center;
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ─── Subtitle ─── */
        .xp-subtitle {
          text-align: center;
          color: rgba(215, 226, 234, 0.45);
          font-size: clamp(0.85rem, 1.6vw, 1.15rem);
          font-weight: 300;
          line-height: 1.7;
          max-width: 480px;
          margin: 1.5rem auto 0;
        }

        /* ─── Head wrap ─── */
        .xp-head {
          text-align: center;
          margin-bottom: 4rem;
        }
        @media (min-width: 640px) {
          .xp-head { margin-bottom: 5rem; }
        }
        @media (min-width: 768px) {
          .xp-head { margin-bottom: 6rem; }
        }

        /* ─── Main card ─── */
        .xp-card {
          position: relative;
          max-width: 64rem;
          margin: 0 auto;
          border-radius: 24px;
          border: 1px solid rgba(215, 226, 234, 0.08);
          background: rgba(215, 226, 234, 0.02);
          backdrop-filter: blur(8px);
          overflow: hidden;
        }

        /* Scan line animation on card */
        @keyframes xp-scan {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(800%); opacity: 0; }
        }
        .xp-card::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(187, 204, 215, 0.25), rgba(187, 204, 215, 0.5), rgba(187, 204, 215, 0.25), transparent);
          animation: xp-scan 6s ease-in-out infinite;
          pointer-events: none;
          z-index: 5;
        }

        /* ─── Card header ─── */
        .xp-card-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 2rem 1.5rem;
          border-bottom: 1px solid rgba(215, 226, 234, 0.06);
          background: linear-gradient(135deg, rgba(100, 105, 115, 0.04), transparent);
        }
        @media (min-width: 640px) {
          .xp-card-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 2rem 2.5rem;
          }
        }

        .xp-role {
          font-size: clamp(1.1rem, 2.2vw, 1.6rem);
          font-weight: 700;
          color: #D7E2EA;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.3;
        }
        .xp-company {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(187, 204, 215, 0.6);
          margin: 0.25rem 0 0;
        }

        .xp-duration-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(187, 204, 215, 0.7);
          border: 1px solid rgba(215, 226, 234, 0.1);
          border-radius: 100px;
          padding: 0.45rem 1rem;
          background: rgba(215, 226, 234, 0.03);
          white-space: nowrap;
          flex-shrink: 0;
        }
        @keyframes xp-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .xp-duration-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #BBCCD7;
          animation: xp-pulse 2s ease-in-out infinite;
        }

        /* ─── Bullet items ─── */
        .xp-bullets {
          padding: 0.5rem 1.5rem 1.5rem;
        }
        @media (min-width: 640px) {
          .xp-bullets { padding: 0.5rem 2.5rem 2rem; }
        }

        .xp-bullet {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.25rem 0.75rem;
          border-bottom: 1px solid rgba(215, 226, 234, 0.04);
          border-radius: 12px;
          cursor: default;
          transition: background 300ms ease;
          position: relative;
        }
        @media (min-width: 640px) {
          .xp-bullet { gap: 1.25rem; padding: 1.25rem 1rem; }
        }
        .xp-bullet:last-child {
          border-bottom: none;
        }
        .xp-bullet:hover {
          background: rgba(215, 226, 234, 0.03);
        }

        /* Hover accent line */
        .xp-bullet::before {
          content: "";
          position: absolute;
          left: 0;
          top: 20%;
          bottom: 20%;
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, rgba(187, 204, 215, 0.5), transparent);
          opacity: 0;
          transition: opacity 300ms ease;
        }
        .xp-bullet:hover::before {
          opacity: 1;
        }

        /* Tag */
        .xp-bullet-tag {
          display: inline-flex;
          align-items: center;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(187, 204, 215, 0.5);
          border: 1px solid rgba(215, 226, 234, 0.08);
          border-radius: 6px;
          padding: 0.3rem 0.65rem;
          flex-shrink: 0;
          min-width: 70px;
          justify-content: center;
          transition: border-color 300ms ease, color 300ms ease, background 300ms ease;
        }
        @media (min-width: 640px) {
          .xp-bullet-tag { min-width: 90px; }
        }
        .xp-bullet:hover .xp-bullet-tag {
          border-color: rgba(187, 204, 215, 0.2);
          color: rgba(187, 204, 215, 0.8);
          background: rgba(187, 204, 215, 0.05);
        }

        /* Text */
        .xp-bullet-text {
          font-size: clamp(0.85rem, 1.4vw, 1rem);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(215, 226, 234, 0.5);
          margin: 0;
          transition: color 300ms ease;
        }
        .xp-bullet:hover .xp-bullet-text {
          color: rgba(215, 226, 234, 0.8);
        }

        /* ─── Stats bar ─── */
        .xp-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(215, 226, 234, 0.06);
        }

        .xp-stat {
          padding: 1.5rem 1rem;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: background 300ms ease;
          cursor: default;
        }
        .xp-stat:not(:last-child) {
          border-right: 1px solid rgba(215, 226, 234, 0.06);
        }
        .xp-stat:hover {
          background: rgba(215, 226, 234, 0.02);
        }

        /* Bottom glow on hover */
        .xp-stat::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(187, 204, 215, 0.4), transparent);
          opacity: 0;
          transition: opacity 300ms ease;
        }
        .xp-stat:hover::after {
          opacity: 1;
        }

        .xp-stat-value {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 800;
          color: #D7E2EA;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 0.3rem;
        }
        .xp-stat-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(215, 226, 234, 0.25);
        }

        @media (max-width: 480px) {
          .xp-stat { padding: 1.2rem 0.5rem; }
          .xp-stat-value { font-size: 1.25rem; }
        }
      `}</style>

      <section id="experience" className="xp-section">
        {/* Ambient glows */}
        <div className="xp-glow xp-glow-1" />
        <div className="xp-glow xp-glow-2" />

        <div className="xp-inner">

          {/* Heading */}
          <motion.div className="xp-head" {...fadeUp(0)}>
            <span className="xp-badge">Career</span>
            <h2 className="xp-heading">Experience</h2>
            <p className="xp-subtitle">
              Professional experience building production-grade React
              applications and contributing to real-world products.
            </p>
          </motion.div>

          {/* Experience card */}
          <motion.div className="xp-card" {...fadeUp(0.1)}>

            {/* Header */}
            <div className="xp-card-header">
              <div>
                <h3 className="xp-role">React.js Developer Intern</h3>
                <p className="xp-company">Pyonix Technology</p>
              </div>
              <span className="xp-duration-badge">
                <span className="xp-duration-dot" />
                Nov 2025 — Feb 2026
              </span>
            </div>

            {/* Bullets */}
            <div className="xp-bullets">
              {experienceItems.map((item, i) => (
                <motion.div
                  key={item.tag}
                  className="xp-bullet"
                  custom={i}
                  variants={bulletVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                >
                  <span className="xp-bullet-tag">{item.tag}</span>
                  <p className="xp-bullet-text">{item.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="xp-stats">
              {[
                { value: "10+", label: "Components" },
                { value: "~30%", label: "Faster Dev" },
                { value: "3mo", label: "Duration" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="xp-stat"
                  custom={i}
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                >
                  <div className="xp-stat-value">{stat.value}</div>
                  <div className="xp-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </section>
    </>
  );
}
