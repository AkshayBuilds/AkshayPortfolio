import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import NoiseOverlay from "./components/NoiseOverlay.jsx";
import AboutSection from "./sections/AboutSection.jsx";
import ContactSection from "./sections/ContactSection.jsx";
import ExperienceSection from "./sections/ExperienceSection.jsx";
import FooterSection from "./sections/FooterSection.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import SkillsSection from "./sections/SkillsSection.jsx";
import WorkSection from "./sections/WorkSection.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);
  const [toast, setToast] = useState(null);


  const projects = useMemo(
    () => [
      {
        title: "Forever E-Commerce Platform",
        stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind", "JWT", "Razorpay"],
        description:
          "Production-deployed full-stack e-commerce platform supporting product browsing, cart management, and multi-step secure checkout with JWT auth + Razorpay server-side verification.",
        live: "https://forever-kappa-seven.vercel.app/",
        github: "https://github.com/AkshayBuilds/E-commerce",
      },
      {
        title: "N P Enterprise",
        stack: ["React.js", "Tailwind", "Performance", "SEO"],
        description:
          "Business website for N P Enterprise with a clean, fast UI, optimized assets, and production-ready deployment.",
        live: "https://npenterprise.co.in",
        github: "https://github.com/AkshayBuilds",
      },
      {
        title: "AuthFlow Authentication System",
        stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "bcrypt"],
        description:
          "Secure authentication system featuring JWT login/registration, OTP email verification, password reset flows, and a clean MVC backend architecture with global auth state via React Context across 8+ components.",
        live: "https://auth-frontend-umber-theta.vercel.app/",
        github: "https://github.com/AkshayBuilds/Auth-Frontend",
      },
    ],
    [],
  );

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    lenisRef.current?.scrollTo(el, { offset: 0, duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
  };

  // ── Lenis smooth scroll ───────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    let raf = 0;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);



  // ── Stack-card shrink effect ──────────────────────────────────────────────
  useEffect(() => {
    const cards = gsap.utils.toArray(".stack-card");
    const tweens = [];
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      const tween = gsap.to(card, {
        scale: 0.94,
        opacity: 0.78,
        ease: "none",
        scrollTrigger: {
          trigger: next.closest?.(".stack-item") ?? next,
          start: "top 78%",
          end: "top 24%",
          scrub: true,
        },
      });
      tweens.push(tween);
    });
    return () => {
      tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
    };
  }, [projects]);

  const copyField = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast(`${label} copied`);
    } catch {
      setToast("Copy failed");
    }
    window.setTimeout(() => setToast(null), 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#080808] font-sans text-white">
      <NoiseOverlay />

      <main className="relative">
        <HeroSection scrollToId={scrollToId} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <WorkSection projects={projects} />
        <ContactSection copyField={copyField} onToast={(m) => setToast(m)} />
        <FooterSection />
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-white/10 bg-black/70 px-5 py-3 text-[13px] font-semibold text-white/90 shadow-[0_0_30px_#000000aa] backdrop-blur-md">
          {toast}
        </div>
      )}
    </div>
  );
}
