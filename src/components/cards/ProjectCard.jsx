export default function ProjectCard({ project }) {
  return (
    <article className="group relative w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 backdrop-blur-md md:p-8">
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#3b82f610] via-transparent to-[#7c3aed10] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-[22px] font-semibold tracking-tight text-white md:text-[28px]">
              {project.title}
            </h3>
            <p className="max-w-3xl font-sans text-[14px] leading-relaxed text-zinc-400 md:text-[15px]">
              {project.description}
            </p>
          </div>
          <div className="hidden flex-col items-end gap-2 md:flex">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-black/30 px-4 py-2 text-[13px] font-medium text-white/90 transition-all hover:border-[#3b82f6] hover:text-white hover:shadow-[0_0_18px_#3b82f6]"
            >
              Live Demo <span className="text-white/70">↗</span>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-black/30 px-4 py-2 text-[13px] font-medium text-white/90 transition-all hover:border-[#3b82f6] hover:text-white hover:shadow-[0_0_18px_#3b82f6]"
            >
              GitHub <span className="text-white/70">↗</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-zinc-800 bg-black/30 px-3 py-1 text-[12px] font-medium text-white/80"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-3 md:hidden">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#3b82f6] px-4 py-3 text-[13px] font-semibold text-white shadow-[0_0_22px_#3b82f680] transition-transform active:scale-[0.98]"
          >
            Live Demo <span className="text-white/85">↗</span>
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-transparent px-4 py-3 text-[13px] font-semibold text-white/90 active:scale-[0.98]"
          >
            GitHub <span className="text-white/70">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
