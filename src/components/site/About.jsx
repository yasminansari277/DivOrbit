import { useReveal } from "@/hooks/use-reveal";
import { Compass, Users2, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
export function About() {
    const ref = useReveal();
    return (<section id="about" className="relative py-20 sm:py-28" style={{ background: "linear-gradient(180deg, #0a0a12 0%, #0d0d1c 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07), transparent)" }}/>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Left — text */}
        <div ref={ref} className="reveal lg:col-span-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
            About DevOrbit
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            A small studio built around{" "}
            <span className="text-gradient-brand">craft and collaboration</span>.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60">
            DevOrbit is a software development startup formed around the collaboration
            of frontend and backend expertise. Our goal is to help businesses and
            startups turn ideas into functional, reliable, and thoughtfully engineered
            digital products.
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/55">
            We are intentionally small. That lets us stay close to the code, close to
            the client, and honest about scope, timelines, and trade-offs.
          </p>
        </div>

        {/* Right — pillars */}
        <div className="flex flex-col gap-4 lg:col-span-6">
          {[
            { Icon: Compass, title: "Clear direction", color: "violet", body: "We help you shape the problem before writing the first line of code — so the product you ship is the product you actually needed." },
            { Icon: Users2, title: "Collaborative by design", color: "teal", body: "Frontend and backend engineers working side-by-side on the same problem, sharing decisions instead of throwing work over a wall." },
            { Icon: GitBranch, title: "Built to hand off", color: "violet", body: "Code, documentation, and infrastructure prepared so any capable team can take over — including yours — with confidence." },
        ].map(({ Icon, title, color, body }, i) => (<motion.div key={title} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }} className="group relative flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5" style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.25)",
            }} onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                    color === "violet" ? "rgba(124,58,237,0.25)" : "rgba(13,148,136,0.25)";
            }} onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            }}>
              <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 transition-colors duration-300 ${color === "violet"
                ? "bg-violet-600/12 ring-violet-500/20 group-hover:bg-violet-600/22"
                : "bg-teal-600/12 ring-teal-500/20 group-hover:bg-teal-600/22"}`}>
                <Icon className={`h-5 w-5 ${color === "violet" ? "text-violet-400" : "text-teal-400"}`} strokeWidth={1.75}/>
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-sm font-semibold text-white sm:text-base">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
