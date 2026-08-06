import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── Magnet Component ────────────────────────────────────────────────────────
function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < maxDist) {
        const factor = (1 - dist / maxDist) * strength;
        el.style.transition = activeTransition;
        el.style.transform = `translate(${dx * factor * 0.15}px, ${dy * factor * 0.15}px)`;
      } else {
        el.style.transition = inactiveTransition;
        el.style.transform = "translate(0px, 0px)";
      }
    };

    const onLeave = () => {
      el.style.transition = inactiveTransition;
      el.style.transform = "translate(0px, 0px)";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

// ─── Contact Button ──────────────────────────────────────────────────────────
function ContactButton({ scrollToId }) {
  return (
    <button
      type="button"
      onClick={() => scrollToId("contact")}
      className="hero-contact-btn"
    >
      <span className="hero-contact-btn-text">Let&apos;s Talk</span>
      <span className="hero-contact-btn-arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </span>
    </button>
  );
}

// ─── FadeIn wrapper ──────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, y = 30, x = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Hero Section ───────────────────────────────────────────────────────
export default function HeroSection({ scrollToId }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <>
      <style>{`
        /* ─── Section ─── */
        .hero-ms {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100vh;
          height: 100dvh;
          width: 100%;
          background: #080808;
          overflow-x: clip;
          overflow-y: hidden;
        }

        /* ─── Navbar ─── */
        .hero-nav {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.5rem 0;
          z-index: 30;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .hero-nav { padding: 2rem 2.5rem 0; }
        }

        .hero-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        @media (min-width: 768px) {
          .hero-nav-links { gap: 0.5rem; }
        }

        .hero-nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #D7E2EA;
          background: none;
          border: none;
          padding: 0.4rem 0.6rem;
          cursor: pointer;
          transition: opacity 200ms ease;
        }
        @media (min-width: 768px) {
          .hero-nav-link { font-size: 1.125rem; padding: 0.4rem 0.75rem; }
        }
        @media (min-width: 1024px) {
          .hero-nav-link { font-size: 1.4rem; padding: 0.4rem 1rem; }
        }
        .hero-nav-link:hover { opacity: 0.7; }

        /* Social buttons */
        .hero-nav-social {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hero-nav-social-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #D7E2EA;
          background: none;
          border: 1px solid rgba(215, 226, 234, 0.15);
          border-radius: 100px;
          padding: 0.45rem 1rem;
          cursor: pointer;
          transition: opacity 200ms ease, border-color 200ms ease;
          text-decoration: none;
        }
        .hero-nav-social-btn:hover {
          opacity: 0.7;
          border-color: rgba(215, 226, 234, 0.3);
        }
        @media (max-width: 639px) {
          .hero-nav-social-btn span { display: none; }
          .hero-nav-social-btn { padding: 0.45rem 0.65rem; }
        }

        /* ─── Hero Heading ─── */
        .hero-heading-wrap {
          position: relative;
          overflow: hidden;
          z-index: 20;
          margin-top: 1.5rem;
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .hero-heading-wrap { margin-top: 1rem; }
        }
        @media (min-width: 768px) {
          .hero-heading-wrap { margin-top: -1.25rem; }
        }

        .hero-h1 {
          font-size: 14vw;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          line-height: 0.9;
          white-space: nowrap;
          width: 100%;
          text-align: center;
          margin: 0;
          /* Gradient text */
          background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @media (min-width: 640px) {
          .hero-h1 { font-size: 8vw; }
        }
        @media (min-width: 768px) {
          .hero-h1 { font-size: 10vw; }
        }
        @media (min-width: 1024px) {
          .hero-h1 { font-size: 13vw; }
        }

        /* ─── Bottom Bar ─── */
        .hero-bottom {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding: 0 1.5rem 1.75rem;
          z-index: 20;
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .hero-bottom { padding: 0 2rem 2rem; }
        }
        @media (min-width: 768px) {
          .hero-bottom { padding: 0 2.5rem 2.5rem; }
        }

        .hero-bottom-text {
          color: #D7E2EA;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          line-height: 1.375;
          font-size: clamp(0.75rem, 1.4vw, 1.5rem);
          max-width: 160px;
        }
        @media (min-width: 640px) {
          .hero-bottom-text { max-width: 220px; }
        }
        @media (min-width: 768px) {
          .hero-bottom-text { max-width: 260px; }
        }

        /* ─── Contact Button ─── */
        .hero-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: 1px solid rgba(215, 226, 234, 0.2);
          border-radius: 100px;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: border-color 300ms ease, background 300ms ease;
        }
        .hero-contact-btn:hover {
          border-color: rgba(215, 226, 234, 0.4);
          background: rgba(215, 226, 234, 0.05);
        }
        .hero-contact-btn-text {
          font-size: clamp(0.85rem, 1.4vw, 1.25rem);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #D7E2EA;
        }
        .hero-contact-btn-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D7E2EA;
          transition: transform 300ms ease;
        }
        .hero-contact-btn:hover .hero-contact-btn-arrow {
          transform: translate(2px, -2px);
        }

        /* ─── Portrait ─── */
        .hero-portrait-wrap {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: 280px;
          /* Mobile: vertically centered */
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          pointer-events: none;
        }
        @media (min-width: 640px) {
          .hero-portrait-wrap {
            width: 360px;
            top: auto;
            bottom: 0;
            transform: translateX(-50%) translateY(0);
          }
        }
        @media (min-width: 768px) {
          .hero-portrait-wrap { width: 440px; }
        }
        @media (min-width: 1024px) {
          .hero-portrait-wrap { width: 520px; }
        }

        .hero-portrait-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          pointer-events: auto;
          user-select: none;
          filter: grayscale(15%) contrast(1.05);
        }

        /* ─── Mobile nav toggle ─── */
        .hero-nav-mobile-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: none;
          border: 1px solid rgba(215, 226, 234, 0.15);
          border-radius: 12px;
          cursor: pointer;
          transition: border-color 200ms ease;
        }
        .hero-nav-mobile-toggle:hover {
          border-color: rgba(215, 226, 234, 0.3);
        }
        @media (min-width: 768px) {
          .hero-nav-mobile-toggle { display: none; }
        }

        .hero-nav-desktop {
          display: none;
        }
        @media (min-width: 768px) {
          .hero-nav-desktop { display: flex; }
        }

        /* Mobile menu overlay */
        .hero-mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(8, 8, 8, 0.95);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          padding: 6rem 2rem 3rem;
          gap: 0.5rem;
        }
        .hero-mobile-menu-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border: 1px solid rgba(215, 226, 234, 0.1);
          border-radius: 16px;
          background: rgba(215, 226, 234, 0.03);
          color: #D7E2EA;
          font-size: 1.125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 200ms ease;
        }
        .hero-mobile-menu-link:hover {
          background: rgba(215, 226, 234, 0.06);
        }
        .hero-mobile-close {
          margin-top: auto;
          padding: 1rem;
          border: 1px solid rgba(215, 226, 234, 0.1);
          border-radius: 16px;
          background: none;
          color: #D7E2EA;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
        }
      `}</style>

      <section id="hero" className="hero-ms">

        {/* ─── Navbar ─── */}
        <FadeIn delay={0} y={-20}>
          <Nav scrollToId={scrollToId} />
        </FadeIn>

        {/* ─── Hero Heading ─── */}
        <FadeIn delay={0.15} y={40} className="hero-heading-wrap">
          <h1 className="hero-h1">
            Hi, i&apos;m Akshay
          </h1>
        </FadeIn>

        {/* ─── Portrait (centered absolutely) ─── */}
        <FadeIn delay={0.6} y={30}>
          <div className="hero-portrait-wrap">
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
            >
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                alt="Akshay Chaudhary portrait"
                className="hero-portrait-img"
                onLoad={() => setImgLoaded(true)}
                loading="eager"
                draggable={false}
              />
            </Magnet>
          </div>
        </FadeIn>

        {/* ─── Bottom Bar ─── */}
        <div className="hero-bottom">
          <FadeIn delay={0.35} y={20}>
            <p className="hero-bottom-text">
              Building full-stack products with React Node.js MongoDB — shipping fast, built to scale.
            </p>
          </FadeIn>

          <FadeIn delay={0.5} y={20}>
            <ContactButton scrollToId={scrollToId} />
          </FadeIn>
        </div>

      </section>
    </>
  );
}

// ─── Nav sub-component ───────────────────────────────────────────────────────
function Nav({ scrollToId }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Work", id: "work" },
    { label: "Contact", id: "contact" },
  ];

  const handleNav = (id) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <nav className="hero-nav">
        {/* Desktop links */}
        <div className="hero-nav-desktop hero-nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="hero-nav-link"
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Social buttons */}
        <div className="hero-nav-desktop hero-nav-social">
          <a
            href="https://github.com/AkshayBuilds"
            target="_blank"
            rel="noreferrer"
            className="hero-nav-social-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/akshay-web/"
            target="_blank"
            rel="noreferrer"
            className="hero-nav-social-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="hero-nav-mobile-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D7E2EA" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="hero-mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="hero-mobile-menu-link"
              onClick={() => handleNav(item.id)}
            >
              {item.label}
              <span style={{ opacity: 0.5 }}>↗</span>
            </button>
          ))}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <a
              href="https://github.com/AkshayBuilds"
              target="_blank"
              rel="noreferrer"
              className="hero-mobile-menu-link"
              style={{ flex: 1, justifyContent: "center", gap: "8px" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/akshay-web/"
              target="_blank"
              rel="noreferrer"
              className="hero-mobile-menu-link"
              style={{ flex: 1, justifyContent: "center", gap: "8px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
          <button
            type="button"
            className="hero-mobile-close"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
