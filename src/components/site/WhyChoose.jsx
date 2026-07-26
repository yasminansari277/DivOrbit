import { Code2, ShieldCheck, Boxes, MessagesSquare, Smartphone, Rocket, } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { motion } from "framer-motion";
const items = [
    { icon: Boxes, title: "Frontend + Backend Expertise", body: "One team covering both sides of the stack — fewer handoffs, tighter integration." },
    { icon: Code2, title: "Clean & Maintainable Code", body: "Readable, tested, and structured for the team that inherits it after launch." },
    { icon: ShieldCheck, title: "Scalable Architecture", body: "Foundations designed to grow with your product, not against it." },
    { icon: MessagesSquare, title: "Transparent Communication", body: "Honest updates, clear timelines, and no jargon walls between us and you." },
    { icon: Smartphone, title: "Responsive Design", body: "Interfaces that feel considered on every screen size, from phone to desktop." },
    { icon: Rocket, title: "Modern Development Practices", body: "Version control, code review, CI, and thoughtful tooling — as standard." },
];
export function WhyChoose() {
    const ref = useReveal();
    return (<section className="relative overflow-hidden py-20 sm:py-28" style={{ background: "linear-gradient(180deg, #0d0d1c 0%, #0a0a12 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-orbit-grid opacity-[0.035]"/>
      <div aria-hidden className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.09), transparent)" }}/>
      <div aria-hidden className="pointer-events-none absolute right-0 bottom-16 h-60 w-60 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(13,148,136,0.08), transparent)" }}/>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-400">
            Why DevOrbit
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            A small team, held to a{" "}
            <span className="text-gradient-brand">high standard</span>.
          </h2>
          <p className="mt-4 text-base text-white/55 sm:text-lg">
            We work with a limited number of clients at a time so every project gets
            focused attention, senior involvement, and thoughtful engineering.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (<motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }} className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1" style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
                }} onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(13,148,136,0.3)";
                }} onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600/12 ring-1 ring-teal-500/20 transition-colors duration-300 group-hover:bg-teal-600/22">
                  <Icon className="h-5 w-5 text-teal-400" strokeWidth={1.75}/>
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.body}</p>
              </motion.div>);
        })}
        </div>
      </div>
    </section>);
}
