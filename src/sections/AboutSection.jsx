import { motion } from "framer-motion";

// ─── Animation variants ─────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: {
    delay,
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
});

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function AboutSection() {
  return (
    <>
      <style>{`
        /* ─── Section ─── */
        .about-section {
          position: relative;
          width: 100%;
          background: #080808;
          padding: 6rem 1.25rem;
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .about-section { padding: 8rem 2rem; }
        }
        @media (min-width: 768px) {
          .about-section { padding: 10rem 2.5rem; }
        }

        /* ─── Inner container ─── */
        .about-inner {
          max-width: 64rem;
          margin: 0 auto;
        }

        /* ─── Badge ─── */
        .about-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(215, 226, 234, 0.45);
          margin-bottom: 1.5rem;
        }

        /* ─── Heading ─── */
        .about-heading {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          color: #D7E2EA;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin: 0 0 2rem;
          max-width: 48rem;
        }
        .about-heading-accent {
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ─── Description ─── */
        .about-description {
          font-size: clamp(0.95rem, 1.6vw, 1.2rem);
          font-weight: 300;
          line-height: 1.8;
          color: rgba(215, 226, 234, 0.5);
          max-width: 38rem;
          margin: 0 0 3rem;
        }

        /* ─── Divider ─── */
        .about-divider {
          width: 100%;
          height: 1px;
          background: rgba(215, 226, 234, 0.08);
          margin: 0 0 3rem;
        }

        /* ─── Stats row ─── */
        .about-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        @media (min-width: 640px) {
          .about-stats {
            grid-template-columns: repeat(4, 1fr);
            gap: 2.5rem;
          }
        }

        /* ─── Individual stat ─── */
        .about-stat {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .about-stat-value {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          color: #D7E2EA;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .about-stat-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(215, 226, 234, 0.3);
        }

        /* ─── Separator line between stats ─── */
        .about-stat-sep {
          display: none;
        }
        @media (min-width: 640px) {
          .about-stat-sep {
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 1px;
            background: rgba(215, 226, 234, 0.08);
          }
        }

        .about-stat-wrap {
          position: relative;
        }
      `}</style>

      <section id="about" className="about-section">
        <div className="about-inner">

          {/* Badge */}
          <motion.span className="about-badge" {...fadeUp(0)}>
            About Me
          </motion.span>

          {/* Heading */}
          <motion.h2 className="about-heading" {...fadeUp(0.1)}>
            I build{" "}
            <span className="about-heading-accent">modern</span> web
            experiences that are scalable, performant and production-ready.
          </motion.h2>

          {/* Description */}
          <motion.p className="about-description" {...fadeUp(0.2)}>
            I&apos;m a MERN Stack Developer focused on creating complete digital
            products — from interactive React frontends to secure Node.js
            backends with MongoDB. I care deeply about clean architecture,
            smooth user experiences and shipping code that actually works
            at scale.
          </motion.p>

          {/* Divider */}
          <motion.div className="about-divider" {...fadeUp(0.25)} />

          {/* Stats */}
          <div className="about-stats">
            {[
              { value: "3+", label: "Projects Shipped" },
              { value: "MERN", label: "Core Stack" },
              { value: "4mo", label: "Experience" },
              { value: "∞", label: "Problems Solved" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="about-stat-wrap"
                custom={i}
                variants={statVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <div className="about-stat">
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
                {i < 3 && <span className="about-stat-sep" />}
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
