import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypingCard from "../components/about/TypingCard.jsx";
import Container from "../components/layout/Container.jsx";
import Pill from "../components/ui/Pill.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const heading = headingRef.current;
    const para = paraRef.current;
    const card = cardRef.current;

    if (!heading || !para || !card) return;

    // Hide everything immediately — before any scroll trigger fires
    gsap.set([heading, para], { opacity: 0, y: 100 });
    gsap.set(card, { opacity: 0, scale: 0.9, y: 120 });

    let ctx;

    // Delay registration so Lenis + hero pin finish calculating scroll space first
    const timer = window.setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
            refreshPriority: -1,   // register after hero pin
          },
        });

        tl.to(heading, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
          .to(para,    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
          .to(card,    { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }, "-=0.5");

        // parallax on card
        gsap.to(card, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            refreshPriority: -1,
          },
        });
      }, sectionRef);
    }, 350); // wait for Lenis + ScrollTrigger.refresh() to settle

    return () => {
      window.clearTimeout(timer);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#0d0d0d] py-40 overflow-hidden"
    >
      {/* BIG BACKGROUND TEXT */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
        <h1 className="text-[18vw] font-black text-white/5 tracking-tight">
          ABOUT
        </h1>
      </div>

      {/* glow */}
      <div className="absolute left-1/2 top-24 -translate-x-1/2 h-[400px] w-[400px] bg-blue-500/10 blur-[120px]" />

      <Container>
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">

          {/* LEFT */}
          <div className="flex flex-col gap-8">
            <h2
              ref={headingRef}
              className="font-display text-[48px] font-bold leading-tight md:text-[68px]"
            >
              I build <span className="text-[#3b82f6]">modern</span> web
              experiences.
            </h2>

            <p
              ref={paraRef}
              className="max-w-xl text-[17px] text-zinc-400 leading-relaxed"
            >
              I'm a MERN Stack Developer focused on creating scalable,
              production-ready applications with smooth UI/UX. From frontend
              interactions to backend architecture, I craft complete digital
              experiences.
            </p>

            <div className="flex flex-wrap gap-3">
              <Pill>React</Pill>
              <Pill>Node.js</Pill>
              <Pill>MongoDB</Pill>
              <Pill>Express</Pill>
            </div>
          </div>

          {/* RIGHT */}
          <div
            ref={cardRef}
            className="relative rounded-2xl border border-blue-500/20 bg-black/40 p-6 backdrop-blur-md shadow-[0_0_40px_#3b82f640]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />

            <div className="relative flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-white/50">akshay@dev</span>
            </div>

            <TypingCard />
          </div>

        </div>
      </Container>
    </section>
  );
}
