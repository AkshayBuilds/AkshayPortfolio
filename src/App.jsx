import { lazy, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import NoiseOverlay from "./components/NoiseOverlay.jsx";
import Header from "./components/layout/Header.jsx";
import { useIsMobile } from "./lib/useIsMobile.js";
import AboutSection from "./sections/AboutSection.jsx";
import ContactSection from "./sections/ContactSection.jsx";
import ExperienceSection from "./sections/ExperienceSection.jsx";
import FooterSection from "./sections/FooterSection.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import SkillsSection from "./sections/SkillsSection.jsx";
import WorkSection from "./sections/WorkSection.jsx";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = lazy(() => import("./components/HeroScene.jsx"));

export default function App() {
  const isMobile = useIsMobile(768);
  const lenisRef = useRef(null);
  const heroLineRefs = useRef([]);
  const heroSectionRef = useRef(null);
  const heroSubtextRef = useRef(null);
  const heroCtasRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navSolid, setNavSolid] = useState(false);
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
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    lenisRef.current?.scrollTo(el, { offset: -84, duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 3) });
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

  // ── Hero scroll-step animation — DESKTOP ONLY (≥ 1024px) ─────────────────
  // On mobile & tablet we skip the pinning + wheel hijack entirely.
  // All hero elements are shown immediately (handled in HeroSection via
  // the `animateHero` prop being false).
  useEffect(() => {
    const isLargeScreen = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      const [line1, line2, line3] = heroLineRefs.current;
      const sub  = heroSubtextRef.current;
      const ctas = heroCtasRef.current;

      if (!line1 || !line2 || !line3 || !sub || !ctas) return;

      // ── Mobile / tablet: reveal everything immediately, no pin ──
      if (!isLargeScreen) {
        gsap.set([line1, line2, line3, sub, ctas], { opacity: 1, y: 0, clearProps: "willChange" });
        return;
      }

      // ── Desktop: step-by-step scroll reveal ──
      gsap.set([line2, line3, sub, ctas], { opacity: 0, y: 80 });
      gsap.set(line1, { opacity: 1, y: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.addLabel("step0")
        .to(line1, { opacity: 1, y: 0, duration: 0.5 })
        .addLabel("step1")
        .to(line2, { opacity: 1, y: 0, duration: 0.5 })
        .addLabel("step2")
        .to(line3, { opacity: 1, y: 0, duration: 0.5 })
        .addLabel("step3")
        .to(sub,  { opacity: 1, y: 0, duration: 0.4 })
        .to(ctas, { opacity: 1, y: 0, duration: 0.4 })
        .addLabel("step4");

      const steps = ["step0","step1","step2","step3","step4"];
      let currentStep = 0;
      let isAnimating  = false;
      let heroActive   = false;
      let isLocked     = false;
      let wheelQueue   = 0;

      const goToStep = (index) => {
        if (isAnimating) return;
        if (index < 0 || index >= steps.length) return;
        isAnimating = true;
        tl.tweenTo(steps[index], {
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => { currentStep = index; isAnimating = false; },
        });
      };

      const processScroll = () => {
        if (isLocked || wheelQueue === 0) return;
        isLocked = true;
        const direction = wheelQueue > 0 ? 1 : -1;
        wheelQueue = 0;
        if (direction > 0 && currentStep < steps.length - 1) goToStep(currentStep + 1);
        else if (direction < 0 && currentStep > 0) goToStep(currentStep - 1);
        window.setTimeout(() => { isLocked = false; processScroll(); }, 550);
      };

      const onWheel = (e) => {
        if (!heroActive) return;
        const down = e.deltaY > 0;
        if (currentStep < steps.length - 1 || !down) e.preventDefault();
        wheelQueue += down ? 1 : -1;
        processScroll();
      };

      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        invalidateOnRefresh: true,
        onEnter:     () => (heroActive = true),
        onEnterBack: () => (heroActive = true),
        onLeave:     () => (heroActive = false),
        onLeaveBack: () => (heroActive = false),
      });

      window.addEventListener("wheel", onWheel, { passive: false });
      return () => window.removeEventListener("wheel", onWheel);
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // ── Nav solid on scroll ───────────────────────────────────────────────────
  useEffect(() => {
    const update = () => setNavSolid((window.scrollY || 0) > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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

  // Passed to HeroSection — false on mobile/tablet so elements start visible
  const animateHero = typeof window !== "undefined" && window.innerWidth >= 1024;

  return (
    <div className="relative min-h-screen bg-[#080808] font-sans text-white">
      <NoiseOverlay />
      <Header
        navSolid={navSolid}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollToId={scrollToId}
      />

      <main className="relative">
        <HeroSection
          isMobile={isMobile}
          HeroScene={HeroScene}
          heroSectionRef={heroSectionRef}
          heroLineRefs={heroLineRefs}
          heroSubtextRef={heroSubtextRef}
          heroCtasRef={heroCtasRef}
          scrollToId={scrollToId}
          animateHero={animateHero}   // ← NEW prop
        />
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
