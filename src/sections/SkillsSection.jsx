import { motion } from "framer-motion";

// ─── Data (from original SkillsSection) ─────────────────────────────────────
const skillRows = [
  {
    number: "01",
    category: "Frontend Development",
    description:
      "Building fast, responsive and interactive user interfaces using modern frontend technologies with a strong focus on performance, accessibility and user experience.",
    technologies: [
      "React.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Context API",
    ],
  },
  {
    number: "02",
    category: "Backend Development",
    description:
      "Developing secure and scalable REST APIs with authentication, business logic and clean architecture using Node.js and Express.",
    technologies: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT",
      "bcrypt",
      "MVC Architecture",
    ],
  },
  {
    number: "03",
    category: "Database",
    description:
      "Designing efficient database structures with optimized queries and scalable backend data models.",
    technologies: ["MongoDB", "Mongoose"],
  },
  {
    number: "04",
    category: "Tools & Workflow",
    description:
      "Using modern development tools for version control, API testing, deployment and efficient collaboration.",
    technologies: ["Git", "GitHub", "VS Code", "Postman", "Vercel"],
  },
];

// ─── Animation variants ─────────────────────────────────────────────────────
const rowVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const pillContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Technology Pill ─────────────────────────────────────────────────────────
function TechPill({ label }) {
  return (
    <motion.span className="sk-pill" variants={pillVariants} whileHover="hover">
      {label}
    </motion.span>
  );
}

// ─── Skill Row ───────────────────────────────────────────────────────────────
function SkillRow({ item, index, isLast }) {
  return (
    <motion.div
      className={`sk-row${isLast ? "" : " sk-row-border"}`}
      custom={index}
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Large number */}
      <div className="sk-number">{item.number}</div>

      {/* Content */}
      <div className="sk-content">
        <h3 className="sk-category">{item.category}</h3>
        <p className="sk-description">{item.description}</p>

        {/* Technology pills */}
        <motion.div
          className="sk-pills"
          variants={pillContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {item.technologies.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export default function SkillsSection() {
  return (
    <>
      <style>{`
        /* ─── Section ─── */
        .sk-section {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          border-radius: 40px 40px 0 0;
          padding: 5rem 1.25rem;
        }
        @media (min-width: 640px) {
          .sk-section {
            border-radius: 50px 50px 0 0;
            padding: 6rem 2rem;
          }
        }
        @media (min-width: 768px) {
          .sk-section {
            border-radius: 60px 60px 0 0;
            padding: 8rem 2.5rem;
          }
        }

        /* ─── Badge ─── */
        .sk-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(12, 12, 12, 0.45);
          margin-bottom: 1.2rem;
        }

        /* ─── Heading ─── */
        .sk-heading {
          font-size: clamp(3rem, 12vw, 160px);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          color: #0C0C0C;
          line-height: 0.95;
          margin: 0;
          text-align: center;
        }

        /* ─── Subtitle ─── */
        .sk-subtitle {
          text-align: center;
          color: rgba(12, 12, 12, 0.6);
          font-size: clamp(0.85rem, 1.6vw, 1.15rem);
          font-weight: 300;
          line-height: 1.7;
          max-width: 540px;
          margin: 1.5rem auto 0;
        }

        /* ─── Head wrap ─── */
        .sk-head {
          text-align: center;
          margin-bottom: 4rem;
        }
        @media (min-width: 640px) {
          .sk-head { margin-bottom: 5rem; }
        }
        @media (min-width: 768px) {
          .sk-head { margin-bottom: 7rem; }
        }

        /* ─── Rows container ─── */
        .sk-rows {
          max-width: 64rem;
          margin: 0 auto;
        }

        /* ─── Row ─── */
        .sk-row {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          padding: 2rem 0;
        }
        @media (min-width: 640px) {
          .sk-row { padding: 2.5rem 0; gap: 3rem; }
        }
        @media (min-width: 768px) {
          .sk-row { padding: 3rem 0; gap: 4rem; }
        }

        .sk-row-border {
          border-bottom: 1px solid rgba(12, 12, 12, 0.15);
        }

        /* First row gets top border */
        .sk-row:first-child {
          border-top: 1px solid rgba(12, 12, 12, 0.15);
        }

        /* ─── Number ─── */
        .sk-number {
          font-size: clamp(3rem, 10vw, 140px);
          font-weight: 900;
          color: #0C0C0C;
          line-height: 0.85;
          letter-spacing: -0.04em;
          flex-shrink: 0;
          min-width: 70px;
          user-select: none;
        }
        @media (min-width: 640px) {
          .sk-number { min-width: 100px; }
        }
        @media (min-width: 768px) {
          .sk-number { min-width: 160px; }
        }

        /* ─── Content ─── */
        .sk-content {
          flex: 1;
          padding-top: 0.5rem;
        }
        @media (min-width: 768px) {
          .sk-content { padding-top: 1.5rem; }
        }

        /* ─── Category ─── */
        .sk-category {
          font-size: clamp(1rem, 2.2vw, 2.1rem);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.01em;
          color: #0C0C0C;
          margin: 0 0 0.6rem;
          line-height: 1.2;
        }

        /* ─── Description ─── */
        .sk-description {
          font-size: clamp(0.85rem, 1.6vw, 1.25rem);
          font-weight: 300;
          line-height: 1.7;
          color: #0C0C0C;
          opacity: 0.65;
          max-width: 42rem;
          margin: 0 0 1.4rem;
        }

        /* ─── Pills container ─── */
        .sk-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        /* ─── Individual pill ─── */
        .sk-pill {
          display: inline-block;
          font-size: 13px;
          font-weight: 400;
          color: #0C0C0C;
          border: 1px solid rgba(12, 12, 12, 0.15);
          border-radius: 100px;
          padding: 0.45rem 1.1rem;
          background: rgba(12, 12, 12, 0.03);
          cursor: default;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease,
                      background 0.3s ease;
          letter-spacing: 0.01em;
          will-change: transform;
        }
        .sk-pill:hover {
          transform: translateY(-2px);
          border-color: rgba(12, 12, 12, 0.35);
          box-shadow: 0 4px 20px rgba(12, 12, 12, 0.08);
          background: rgba(12, 12, 12, 0.06);
        }

        /* ─── Mobile adjustments ─── */
        @media (max-width: 480px) {
          .sk-row {
            flex-direction: column;
            gap: 0.5rem;
          }
          .sk-number {
            min-width: unset;
          }
          .sk-content {
            padding-top: 0;
          }
        }
      `}</style>

      <section id="skills" className="sk-section">
        {/* Heading block */}
        <motion.div
          className="sk-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="sk-badge">What I Work With</span>
          <h2 className="sk-heading">Skills</h2>
          <p className="sk-subtitle">
            Technologies I use to build scalable, modern and production-ready
            full-stack applications.
          </p>
        </motion.div>

        {/* Skill rows */}
        <div className="sk-rows">
          {skillRows.map((item, i) => (
            <SkillRow
              key={item.number}
              item={item}
              index={i}
              isLast={i === skillRows.length - 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
