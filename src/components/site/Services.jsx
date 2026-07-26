import { Server, Layout, Layers, Plug, Database, Globe, LifeBuoy, Smartphone, Cloud, ShoppingCart, } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { motion } from "framer-motion";
const services = [
  {
    icon: Server,
    title: "Backend Development",
    description: "Scalable APIs, business logic, database integration, authentication, and backend architecture.",
  },
  {
    icon: Layout,
    title: "Frontend Development",
    description: "Modern, responsive, accessible, and interactive web interfaces built with care.",
  },
  {
    icon: Layers,
    title: "Full-Stack Web Development",
    description: "Complete web applications combining frontend and backend technologies end-to-end.",
  },
  {
    icon: Plug,
    title: "REST API Development",
    description: "Secure, documented, maintainable, and scalable API solutions built for growth.",
  },
  {
    icon: Database,
    title: "Database Design & Integration",
    description: "Structured database architecture and reliable application integration.",
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Professional websites for startups, businesses, and organizations.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Cross-platform mobile applications that deliver native-like experiences.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Automated deployments, CI/CD pipelines, and scalable cloud infrastructure.",
  },
  {
    icon: LifeBuoy,
    title: "Maintenance & Technical Support",
    description: "Bug fixes, improvements, updates, and ongoing technical support.",
  },
];
export function Services() {
  const ref = useReveal();
  return (<section id="services" className="relative py-20 sm:py-28" style={{ background: "linear-gradient(180deg, #0a0a12 0%, #0d0d1c 100%)" }}>
    {/* Subtle blob */}
    <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08), transparent)" }} />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div ref={ref} className="reveal max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
          What We Do
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Engineering services from{" "}
          <span className="text-gradient-brand">first line to launch</span>.
        </h2>
        <p className="mt-4 text-base text-white/55 sm:text-lg">
          A focused set of services covering the full development lifecycle, delivered
          by a small team that cares about maintainable code.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (<ServiceCard key={s.title} service={s} index={i} />))}
      </div>
    </div>
  </section>);
}
function ServiceCard({ service, index }) {
  const Icon = service.icon;
  return (<motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }} className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1" style={{
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.07)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
  }} onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.4), 0 0 0 0 transparent";
  }} onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
    e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.3)";
  }}>
    {/* Icon */}
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/15 ring-1 ring-violet-500/20 transition-colors duration-300 group-hover:bg-violet-600/25">
      <Icon className="h-5 w-5 text-violet-400" strokeWidth={1.75} />
    </span>

    <h3 className="mt-4 font-display text-base font-semibold text-white">{service.title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-white/50">{service.description}</p>

  </motion.article>);
}
