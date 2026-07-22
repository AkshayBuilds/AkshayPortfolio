import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../components/layout/Container.jsx";

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = [
  {
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.25)",
    border: "rgba(59, 130, 246, 0.4)",
    tag: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    color: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.25)",
    border: "rgba(139, 92, 246, 0.4)",
    tag: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.25)",
    border: "rgba(16, 185, 129, 0.4)",
    tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    gradient: "from-emerald-500 to-teal-600",
  },
];

// Helper to pad numbers (e.g. 1 -> 001)
const formatFrameNumber = (num, digits = 3) => String(num).padStart(digits, "0");

/**
 * Ultra-Smooth HTML5 Canvas Image Sequence Renderer
 */
function ProjectCanvasSequence({
  folder = "/frames/forever",
  frameCount = 151,
  prefix = "frame_",
  ext = ".png",
  digits = 3,
  currentFrameIndex = 0,
  accentColor = "#3b82f6",
  isLoadedCallback,
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]); // Caches ImageBitmap or HTMLImageElement
  const lastDrawnFrameRef = useRef(-1);
  const rafIdRef = useRef(null);
  const isComponentMounted = useRef(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // 1. Preload & Decode Images using createImageBitmap where available
  useEffect(() => {
    isComponentMounted.current = true;
    let loadedCount = 0;
    const cache = new Array(frameCount);
    imagesRef.current = cache;

    const loadImage = async (index) => {
      const frameNum = formatFrameNumber(index + 1, digits);
      const src = `${folder}/${prefix}${frameNum}${ext}`;

      try {
        if ("createImageBitmap" in window) {
          const response = await fetch(src);
          if (!response.ok) throw new Error(`HTTP error ${response.status}`);
          const blob = await response.blob();
          const bitmap = await createImageBitmap(blob);
          if (isComponentMounted.current) {
            cache[index] = bitmap;
          }
        } else {
          // Fallback to standard Image element
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              if (isComponentMounted.current) cache[index] = img;
              resolve();
            };
            img.onerror = reject;
            img.src = src;
          });
        }
      } catch (err) {
        const img = new Image();
        img.src = src;
        cache[index] = img;
      } finally {
        if (isComponentMounted.current) {
          loadedCount++;
          const pct = Math.floor((loadedCount / frameCount) * 100);
          setLoadProgress(pct);
          if (loadedCount >= Math.min(frameCount, 15) && !isPreloaded) {
            setIsPreloaded(true);
            isLoadedCallback?.();
          }
          if (loadedCount === frameCount) {
            setIsPreloaded(true);
            isLoadedCallback?.();
          }
        }
      }
    };

    const loadAll = async () => {
      const batchSize = 10;
      for (let i = 0; i < frameCount; i += batchSize) {
        if (!isComponentMounted.current) break;
        const promises = [];
        for (let j = i; j < Math.min(i + batchSize, frameCount); j++) {
          promises.push(loadImage(j));
        }
        await Promise.all(promises);
      }
    };

    loadAll();

    return () => {
      isComponentMounted.current = false;
      cache.forEach((item) => {
        if (item && typeof item.close === "function") {
          item.close();
        }
      });
      imagesRef.current = [];
    };
  }, [folder, frameCount, prefix, ext, digits]);

  // 2. High-DPI Canvas Draw Routine
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const imgWidth = img.width || 1920;
    const imgHeight = img.height || 1080;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = width / height;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasAspect > imgAspect) {
      drawWidth = width;
      drawHeight = width / imgAspect;
      drawX = 0;
      drawY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgAspect;
      drawX = (width - drawWidth) / 2;
      drawY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();

    lastDrawnFrameRef.current = frameIdx;
  }, []);

  // 3. Render loop triggered when currentFrameIndex prop changes
  useEffect(() => {
    const render = () => {
      const idx = Math.max(0, Math.min(frameCount - 1, Math.floor(currentFrameIndex)));
      if (idx !== lastDrawnFrameRef.current) {
        drawFrame(idx);
      }
    };

    rafIdRef.current = requestAnimationFrame(render);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [currentFrameIndex, drawFrame, frameCount]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (lastDrawnFrameRef.current >= 0) {
        drawFrame(lastDrawnFrameRef.current);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#080808]">
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover"
        style={{ display: "block" }}
      />

      {!isPreloaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative flex items-center justify-center">
            <div
              className="h-10 w-10 animate-spin rounded-full border-2 border-white/10"
              style={{ borderTopColor: accentColor }}
            />
            <span className="absolute font-mono text-[10px] font-bold text-white/70">
              {loadProgress}%
            </span>
          </div>
          <span className="mt-3 font-mono text-[11px] font-medium tracking-wider text-white/40 uppercase">
            Loading Frames...
          </span>
        </div>
      )}
    </div>
  );
}

// ── Single Project Item Component (Full-Screen Canvas + Top Details) ─────────
function ProjectScrollSection({
  project,
  index,
  totalProjects,
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);

  const currentFrameRef = useRef(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);

  const folderPath = project.folder || "/frames/forever";
  const frameCount = project.frameCount || 151;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // GSAP ScrollTrigger with extended scroll distance (+=500%) for smooth slow frame progression
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=500%", // Longer pin duration so frames trigger slowly and smoothly
        pin: stickyRef.current,
        pinSpacing: true,
        scrub: 0.6, // Smooth out trackpad/wheel scrubbing
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          const frameIndex = Math.floor(progress * (frameCount - 1));
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            setActiveFrameIndex(frameIndex);
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, [frameCount]);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#080808]"
    >
      <div
        ref={stickyRef}
        className="flex min-h-screen w-full flex-col justify-center py-6 lg:py-10"
      >
        <Container>
          <div className="flex flex-col gap-6">
            {/* ── TOP SECTION: Project Details & Specs ── */}
            <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Left: Badge + Counter */}
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-2xl font-black tracking-tight"
                    style={{ color: accent.color }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/30">
                    / {String(totalProjects).padStart(2, "0")}
                  </span>
                  <div className="h-4 w-px bg-white/10" />
                  <span
                    className={`rounded border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${accent.tag}`}
                  >
                    Featured Project
                  </span>
                </div>

                {/* Right: CTA Buttons */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-5 py-2.5 font-sans text-xs font-bold tracking-wide text-white transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, ${accent.color} 0%, #1d4ed8 100%)`,
                      boxShadow: `0 0 25px ${accent.glow}`,
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Live Demo
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        <path
                          d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-5 py-2.5 font-sans text-xs font-bold tracking-wide text-white/80 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    Source Code
                  </a>
                </div>
              </div>

              {/* Title & Description Grid */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start lg:gap-8">
                <div className="lg:col-span-6">
                  <h3 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-3 lg:col-span-6">
                  <p className="font-sans text-xs leading-relaxed text-zinc-400 sm:text-sm">
                    {project.description}
                  </p>
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── FULL SCREEN CANVAS FRAME SEQUENCE CONTAINER ── */}
            <div className="w-full">
              <div
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-2xl transition-all duration-500 hover:border-white/20"
                style={{
                  boxShadow: `0 25px 70px -15px ${accent.glow}, 0 0 0 1px ${accent.border}`,
                }}
              >
                {/* Browser Chrome Top Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#141414] px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-4 py-1 font-mono text-[11px] text-white/50">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span className="truncate max-w-[200px] sm:max-w-[320px]">
                      {project.live.replace("https://", "")}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] font-semibold text-white/40 uppercase tracking-widest">
                    Frame {activeFrameIndex + 1} / {frameCount}
                  </div>
                </div>

                {/* Large Full-Screen Viewport Height Canvas Box */}
                <div className="relative h-[55vh] sm:h-[62vh] md:h-[68vh] lg:h-[72vh] w-full bg-[#080808]">
                  <ProjectCanvasSequence
                    folder={folderPath}
                    frameCount={frameCount}
                    prefix={project.prefix || "frame_"}
                    ext={project.ext || ".png"}
                    digits={project.digits || 3}
                    currentFrameIndex={activeFrameIndex}
                    accentColor={accent.color}
                  />
                </div>

                {/* Bottom Scrubbing Progress Line */}
                <div className="h-1 w-full bg-white/5">
                  <div
                    className="h-full transition-all duration-75"
                    style={{
                      width: `${((activeFrameIndex + 1) / frameCount) * 100}%`,
                      background: accent.color,
                      boxShadow: `0 0 12px ${accent.color}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

// ── Main Work Section ─────────────────────────────────────────────────────────
export default function WorkSection({ projects: rawProjects }) {
  const sectionHeaderRef = useRef(null);

  const projectsData = [
    {
      title: "Forever E-Commerce Platform",
      folder: "/frames/forever",
      frameCount: 151,
      prefix: "frame_",
      ext: ".png",
      digits: 3,
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind", "JWT", "Razorpay"],
      description:
        "Production-deployed full-stack e-commerce platform supporting product browsing, cart management, and multi-step secure checkout with JWT auth + Razorpay server-side verification.",
      features: [
        "Interactive Product Catalog",
        "Multi-step Cart & Checkout",
        "Razorpay Payment Gateway",
        "JWT Session Management",
      ],
      live: "https://forever-kappa-seven.vercel.app/",
      github: "https://github.com/AkshayBuilds/E-commerce",
    },
    {
      title: "N P Enterprise",
      folder: "/frames/forever",
      frameCount: 151,
      prefix: "frame_",
      ext: ".png",
      digits: 3,
      stack: ["React.js", "Tailwind", "Performance", "SEO"],
      description:
        "Business website for N P Enterprise with a clean, fast UI, optimized assets, and production-ready deployment showcasing edible eco-friendly tea cups.",
      features: [
        "100% Edible Eco Tea Cups",
        "Lighthouse 95+ SEO & Speed",
        "Responsive Grid Layout",
        "Bulk Commercial Contact",
      ],
      live: "https://npenterprise.co.in",
      github: "https://github.com/AkshayBuilds",
    },
    {
      title: "AuthFlow Authentication System",
      folder: "/frames/forever",
      frameCount: 151,
      prefix: "frame_",
      ext: ".png",
      digits: 3,
      stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "bcrypt"],
      description:
        "Secure authentication system featuring JWT login/registration, OTP email verification, password reset flows, and a clean MVC backend architecture with global auth state via React Context across 8+ components.",
      features: [
        "OTP Email Verification",
        "Secure Password Hashing",
        "Global Auth Context State",
        "MVC Node/Express Backend",
      ],
      live: "https://auth-frontend-umber-theta.vercel.app/",
      github: "https://github.com/AkshayBuilds/Auth-Frontend",
    },
  ];

  return (
    <section id="work" className="relative w-full bg-[#080808]">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#3b82f606 1px,transparent 1px),linear-gradient(90deg,#3b82f606 1px,transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%,black,transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%,black,transparent)",
        }}
      />

      {/* Background glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-[500px] rounded-full bg-blue-500/[0.05] blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-violet-500/[0.05] blur-[120px]" />

      {/* Section Header */}
      <div ref={sectionHeaderRef} className="pt-24 pb-8">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-8">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded border border-blue-500/20 bg-blue-500/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                Featured Portfolio Work
              </div>
              <h2
                className="font-display font-extrabold leading-tight tracking-tight text-white"
                style={{ fontSize: "clamp(32px,4.5vw,56px)" }}
              >
                Scroll-Driven <span className="text-blue-400">Showcase</span>
              </h2>
            </div>
            <a
              href="https://github.com/AkshayBuilds?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-semibold text-white/70 transition-all hover:border-blue-500/40 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            >
              All Repositories ↗
            </a>
          </div>
        </Container>
      </div>

      {/* Render Each Project as a Full-Screen Pinned Canvas Scroll Section */}
      <div className="relative">
        {projectsData.map((project, idx) => (
          <ProjectScrollSection
            key={project.title}
            project={project}
            index={idx}
            totalProjects={projectsData.length}
          />
        ))}
      </div>
    </section>
  );
}
