import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { motion, AnimatePresence } from "framer-motion";
const testimonials = [
    {
        name: "Amelia Novak",
        location: "Berlin, Germany",
        role: "Product Lead, Sample Co.",
        initials: "AN",
        quote: "DevOrbit approached our product like it was their own. The frontend polish and backend reliability set a new bar for what we expect from an external team.",
    },
    {
        name: "Rahul Mehta",
        location: "Bengaluru, India",
        role: "Founder, Sample Startup",
        initials: "RM",
        quote: "Clear communication, honest scoping, and code we can actually maintain. Exactly the collaboration a small team hopes for.",
    },
    {
        name: "Sofia Alvarez",
        location: "Madrid, Spain",
        role: "CTO, Sample Labs",
        initials: "SA",
        quote: "The API architecture they designed still holds up as we've grown. Thoughtful decisions in the early weeks paid off for months.",
    },
    {
        name: "Kenji Watanabe",
        location: "Tokyo, Japan",
        role: "Engineering Manager, Sample Group",
        initials: "KW",
        quote: "Frontend and backend moved in lockstep. It felt like one team, not two disciplines shouting across a wall.",
    },
];
export function Testimonials() {
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(1);
    const ref = useReveal();
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches)
            return;
        const t = setInterval(() => {
            setDir(1);
            setIndex((i) => (i + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(t);
    }, []);
    const nav = (d) => {
        setDir(d);
        setIndex((i) => (i + d + testimonials.length) % testimonials.length);
    };
    const cur = testimonials[index];
    return (<section id="testimonials" className="relative overflow-hidden py-20 sm:py-28" style={{ background: "linear-gradient(180deg, #0a0a12 0%, #0d0d1c 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-orbit-grid opacity-[0.025]"/>
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07), transparent)" }}/>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Voices from the{" "}
            <span className="text-gradient-brand">people we work with</span>.
          </h2>
          <p className="mt-3 text-xs text-white/30">
            Sample testimonials shown for layout demonstration.
          </p>
        </div>

        {/* Card */}
        <div className="mt-12 overflow-hidden rounded-2xl p-7 sm:p-10" style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}>
          <Quote className="h-7 w-7 text-violet-500/60" aria-hidden/>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote key={cur.name} custom={dir} variants={{
            enter: (d) => ({ x: d * 30, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d) => ({ x: d * -30, opacity: 0 }),
        }} initial="enter" animate="center" exit="exit" transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="mt-5 font-display text-xl leading-relaxed text-white/90 sm:text-2xl">
              "{cur.quote}"
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <AnimatePresence mode="wait">
              <motion.div key={cur.name + "-meta"} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex items-center gap-3">
                <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #0d9488)" }}>
                  {cur.initials}
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-white">{cur.name}</p>
                  <p className="text-xs text-white/45">{cur.role} · {cur.location}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-violet-400 text-violet-400" aria-hidden/>))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button type="button" onClick={() => nav(-1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-white/20 hover:text-white" aria-label="Previous testimonial">
            <ChevronLeft className="h-4 w-4"/>
          </button>
          <div className="flex items-center gap-1.5" role="tablist">
            {testimonials.map((t, i) => (<button key={t.name} type="button" onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }} aria-label={`Show testimonial ${i + 1}`} aria-selected={i === index} className={`rounded-full transition-all duration-300 ${i === index ? "h-1.5 w-6 bg-violet-500" : "h-1.5 w-1.5 bg-white/20 hover:bg-white/35"}`}/>))}
          </div>
          <button type="button" onClick={() => nav(1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-white/20 hover:text-white" aria-label="Next testimonial">
            <ChevronRight className="h-4 w-4"/>
          </button>
        </div>
      </div>
    </section>);
}
