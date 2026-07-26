import { ExternalLink, FileText } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { motion } from "framer-motion";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
const projects = [
    {
        image: p1,
        name: "Analytics Dashboard",
        problem: "Give operations teams a single surface to track key metrics without spreadsheet gymnastics.",
        tech: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
        frontend: "Componentized dashboard, chart library integration, responsive layouts.",
        backend: "Aggregation endpoints, caching layer, role-based access control.",
    },
    {
        image: p2,
        name: "E-commerce Platform",
        problem: "Replace a slow legacy storefront with a modern, fast, mobile-first shopping experience.",
        tech: ["Next.js", "Tailwind", "Python", "PostgreSQL"],
        frontend: "Product catalog, checkout flow, motion-aware micro-interactions.",
        backend: "Inventory API, order pipeline, payment webhook handling.",
    },
    {
        image: p3,
        name: "API Developer Portal",
        problem: "Give third-party developers a clear, versioned reference for a growing REST API.",
        tech: ["React", "MDX", "FastAPI", "OpenAPI"],
        frontend: "Documentation UI, interactive code samples, dark-mode support.",
        backend: "Spec generation, key management, usage analytics.",
    },
];
export function Work() {
    const ref = useReveal();
    return (<section id="work" className="relative py-20 sm:py-28" style={{ background: "linear-gradient(180deg, #0d0d1c 0%, #0a0a12 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(13,148,136,0.07), transparent)" }}/>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
              Selected Work
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              A look at how we think about{" "}
              <span className="text-gradient-brand">product problems</span>.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-white/40">
            Real client projects will replace placeholders as they launch.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (<ProjectCard key={p.name} project={p} index={i}/>))}
        </div>
      </div>
    </section>);
}
function ProjectCard({ project, index }) {
    return (<motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: (index % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }} className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1" style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
        }} onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.45)";
        }} onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.3)";
        }}>
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
        <img src={project.image} alt={project.name} loading="lazy" width={800} height={500} className="h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"/>
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(10,10,18,0.88) 0%, transparent 60%)" }}>
          <button type="button" className="inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-violet-500">
            <ExternalLink className="h-3.5 w-3.5"/>
            View Project
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold text-white transition-colors duration-200 group-hover:text-violet-300">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/50">{project.problem}</p>

        {/* Tech tags */}
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (<li key={t} className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white/55" style={{
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.18)",
            }}>
              {t}
            </li>))}
        </ul>

        {/* Action buttons */}
        <div className="mt-auto flex items-center gap-2 pt-4">
          <button type="button" className="inline-flex items-center gap-1.5 rounded-full bg-violet-600/15 px-3.5 py-1.5 text-xs font-semibold text-violet-300 ring-1 ring-violet-500/25 transition-all hover:bg-violet-600/25">
            <ExternalLink className="h-3.5 w-3.5"/>
            View Project
          </button>
          <button type="button" className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white/50 ring-1 ring-white/10 transition-all hover:bg-white/[0.05] hover:text-white/75">
            <FileText className="h-3.5 w-3.5"/>
            Case Study
          </button>
        </div>
      </div>
    </motion.article>);
}
