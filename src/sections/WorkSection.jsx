import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiveProjectButton from "../components/ui/LiveProjectButton.jsx";
import FadeIn from "../components/ui/FadeIn.jsx";

const PROJECTS = [
  {
    number: "01",
    title: "TaskBridge Project Management Platform",
    category: "SAAS PLATFORM & TEAM COLLABORATION",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Node.js",
      "Express.js",
      "MongoDB"
    ],
    description:
      "Enterprise-grade Jira-inspired project management platform built with a scalable multi-tenant architecture. Features workspace management, organization onboarding, role-based access control (RBAC), project and task management, client portal, notifications, authentication, and an optimized frontend architecture using Next.js App Router, TanStack Query, and TypeScript.",
    live: "",
    github: "",
    col1Img1: "/frames/taskbridge/3.png",
    col1Img2: "/frames/taskbridge/2.png",
    col2Img: "/frames/taskbridge/1.png",
  },
  {
    number: "02",
    title: "Forever E-Commerce Platform",
    category: "FULL-STACK E-COMMERCE PLATFORM",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind", "JWT", "Razorpay"],
    description:
      "Production-deployed full-stack e-commerce platform supporting product browsing, cart management, and multi-step secure checkout with JWT auth + Razorpay server-side verification.",
    live: "https://forever-kappa-seven.vercel.app/",
    github: "https://github.com/AkshayBuilds/E-commerce",
    col1Img1: "/frames/forever/1.png",
    col1Img2: "/frames/forever/2.png",
    col2Img: "/frames/forever/3.png",
  },
  {
    number: "03",
    title: "N P Enterprise",
    category: "COMMERCIAL CLIENT WEBSITE",
    stack: ["React.js", "Tailwind CSS", "Lighthouse 95+", "SEO & Speed", "Eco Tea Cups"],
    description:
      "Business website for N P Enterprise with a clean, fast UI, optimized assets, and production-ready deployment showcasing 100% edible eco-friendly tea cups.",
    live: "https://npenterprise.co.in",
    github: "https://github.com/AkshayBuilds",
    col1Img1: "/frames/npenterprise/1.png",
    col1Img2: "/frames/npenterprise/2.png",
    col2Img: "/frames/npenterprise/3.png",
  },
];

function Card({ project, index, totalCards, progress }) {
  const containerRef = useRef(null);
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  const scale = useTransform(
    progress,
    [index * (1 / totalCards), 1],
    [1, targetScale]
  );

  return (
    <div
      ref={containerRef}
      className="sticky top-20 sm:top-24 md:top-28 flex items-center justify-center min-h-[85vh] py-6"
      style={{ top: `${index * 28 + 90}px` }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full max-w-7xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300"
      >
        {/* Subtle ambient glow behind card */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#BBCCD7]/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#646973]/5 blur-3xl" />

        {/* ── TOP ROW ── */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[#D7E2EA]/15 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Massive Index Number */}
            <span className="font-['Kanit'] text-5xl sm:text-7xl md:text-8xl font-black text-[#D7E2EA] tracking-tighter leading-none">
              {project.number}
            </span>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#BBCCD7] animate-pulse" />
                <span className="font-['Kanit'] text-xs sm:text-sm font-semibold tracking-widest text-[#D7E2EA]/70 uppercase">
                  {project.category}
                </span>
              </div>
              <h3 className="font-['Kanit'] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#D7E2EA]">
                {project.title}
              </h3>
              <p className="max-w-2xl font-sans text-xs sm:text-sm font-light leading-relaxed text-[#D7E2EA]/80 mt-1">
                {project.description}
              </p>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            <LiveProjectButton href={project.live} label="Live Project" />
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-white/[0.04] px-6 py-3 font-['Kanit'] text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-all duration-300 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 hover:scale-[1.02]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Code
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-4 pb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[#D7E2EA]/20 bg-white/[0.04] px-3.5 py-1 font-['Kanit'] text-[11px] sm:text-xs font-medium uppercase tracking-wider text-[#D7E2EA]/90"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── BOTTOM ROW: Two-Column Image Grid ── */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 items-stretch">
          {/* Left Column (40% width): 2 Stacked Images */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {/* Left Top Image */}
            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/10 bg-black/40">
              <img
                src={project.col1Img1}
                alt={`${project.title} screenshot 1`}
                className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] transition-transform duration-700 hover:scale-105"
                style={{ height: "clamp(130px, 16vw, 230px)" }}
              />
            </div>
            {/* Left Bottom Image */}
            <div className="overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/10 bg-black/40">
              <img
                src={project.col1Img2}
                alt={`${project.title} screenshot 2`}
                className="w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] transition-transform duration-700 hover:scale-105"
                style={{ height: "clamp(160px, 22vw, 340px)" }}
              />
            </div>
          </div>

          {/* Right Column (60% width): 1 Tall Image */}
          <div className="lg:col-span-7 h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/10 bg-black/40">
            <img
              src={project.col2Img}
              alt={`${project.title} featured showcase`}
              className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WorkSection() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative z-10 w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-4 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32 overflow-x-clip"
    >
      {/* Background Subtle Grid Texture */}
      <div
        className="pointer-events-none absolute inset-0 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(215, 226, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(215, 226, 234, 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 20%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 20%, black, transparent)",
        }}
      />

      {/* Section Heading */}
      <div className="mb-12 sm:mb-16 md:mb-20 text-center">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-['Kanit'] font-black uppercase tracking-tight leading-none text-center select-none text-[12vw] sm:text-[14vw] md:text-[130px] lg:text-[160px]">
            Project
          </h2>
        </FadeIn>
      </div>

      {/* 3 Sticky-Stacking Project Cards */}
      <div className="relative flex flex-col items-center">
        {PROJECTS.map((project, idx) => (
          <Card
            key={project.title}
            project={project}
            index={idx}
            totalCards={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
