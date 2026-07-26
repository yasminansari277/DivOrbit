import { useReveal } from "@/hooks/use-reveal";
import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket, TestTube2, HeartHandshake, Lightbulb, } from "lucide-react";
const steps = [
    { n: "01", title: "Discovery", body: "We listen. We ask the questions that shape scope before writing code.", Icon: Search },
    { n: "02", title: "Planning", body: "Timeline, milestones, and trade-offs — agreed in plain language.", Icon: Lightbulb },
    { n: "03", title: "Design & Architecture", body: "System boundaries, data models, and interface direction, defined early.", Icon: PenTool },
    { n: "04", title: "Development", body: "Iterative delivery with visible progress and short feedback loops.", Icon: Code },
    { n: "05", title: "Testing", body: "Automated and manual checks against real usage, not just happy paths.", Icon: TestTube2 },
    { n: "06", title: "Launch", body: "A careful, monitored release with a clear rollback plan.", Icon: Rocket },
    { n: "07", title: "Support", body: "Ongoing improvements, updates, and technical support after launch.", Icon: HeartHandshake },
];
// violet → teal interpolated per step
function stepColor(i, total) {
    const t = i / (total - 1);
    const r = Math.round(124 + (13 - 124) * t);
    const g = Math.round(58 + (148 - 58) * t);
    const b = Math.round(237 + (136 - 237) * t);
    return `rgb(${r},${g},${b})`;
}
export function Process() {
    const ref = useReveal();
    return (<section className="relative overflow-hidden py-20 sm:py-28" style={{ background: "linear-gradient(180deg, #0a0a12 0%, #0d0d1c 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-orbit-grid opacity-[0.025]"/>
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07), transparent)" }}/>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
            How We Work
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            A process built for{" "}
            <span className="text-gradient-brand">clarity, not surprises</span>.
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Vertical connector line */}
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.8, ease: "easeInOut" }} className="absolute left-5 top-5 bottom-5 w-px origin-top sm:left-6" style={{
            background: "linear-gradient(180deg, rgba(124,58,237,0.4) 0%, rgba(13,148,136,0.4) 100%)",
        }}/>

          <ol className="space-y-3">
            {steps.map((s, i) => {
            const Icon = s.Icon;
            const color = stepColor(i, steps.length);
            return (<motion.li key={s.n} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }} className="group relative flex items-start gap-4 sm:gap-5">
                  {/* Icon badge */}
                  <div className="relative z-10 shrink-0">
                    <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl text-white transition-transform duration-200 group-hover:scale-105" style={{
                    background: `${color}20`,
                    border: `1px solid ${color}40`,
                }}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color }} strokeWidth={1.75}/>
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -top-1 -right-1.5 h-4 w-4 rounded-full grid place-items-center text-[8px] font-bold text-white" style={{ background: color }}>
                      {i + 1}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-xl p-4 sm:p-5 transition-all duration-200 group-hover:-translate-y-0.5" style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                }} onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}30`;
                }} onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }}>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-sm font-semibold text-white sm:text-base">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">{s.body}</p>
                  </div>
                </motion.li>);
        })}
          </ol>
        </div>
      </div>
    </section>);
}
