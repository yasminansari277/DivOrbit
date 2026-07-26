import { useState, useRef, useEffect } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  "Backend Development",
  "Frontend Development",
  "Full-Stack Web Development",
  "REST API Development",
  "Database Design & Integration",
  "Website Development",
  "Maintenance & Technical Support",
];

const budgets = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $40,000",
  "$40,000+",
  "Not sure yet",
];

/* ── Confetti / Crackers burst with smooth fade-out ── */
function Confetti({ active }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const frameRef = useRef(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (active) {
      setShouldRender(true);
    } else {
      const t = setTimeout(() => setShouldRender(false), 800);
      return () => clearTimeout(t);
    }
  }, [active]);

  useEffect(() => {
    if (!shouldRender) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const colors = ["#7c3aed", "#0d9488", "#8b5cf6", "#14b8a6", "#a78bfa", "#2dd4bf"];

    if (particles.current.length === 0) {
      particles.current = Array.from({ length: 50 }, () => ({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 9 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 5 + 3,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.25,
        opacity: 1,
      }));
    }

    let alive = true;
    function draw() {
      if (!alive || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98; // air friction
        p.rot += p.rotV;
        p.opacity = Math.max(0, p.opacity - 0.012); // gradual fade
      });

      particles.current = particles.current.filter((p) => p.y < canvas.height + 20 && p.opacity > 0);

      for (const p of particles.current) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.4);
        ctx.restore();
      }

      if (particles.current.length > 0 && alive) {
        frameRef.current = requestAnimationFrame(draw);
      }
    }

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      alive = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!active) {
      particles.current = [];
    }
  }, [active]);

  return (
    <canvas 
      ref={canvasRef} 
      className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700" 
      style={{ opacity: active ? 1 : 0 }} 
      aria-hidden 
    />
  );
}

export function Contact() {
  const [formState, setFormState] = useState("idle");
  const [confetti, setConfetti] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const formRef = useRef(null);
  const ref = useReveal();

  useEffect(() => {
    if (formState === "loading") {
      setIsFlying(true);
      const timer = setTimeout(() => {
        setIsFlying(false);
      }, 1400); // Orbit/revolve duration
      return () => clearTimeout(timer);
    }
  }, [formState]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormState("loading");

    // Revolve for 1.4s then fire success
    await new Promise((r) => setTimeout(r, 2200));

    setFormState("success");
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2500);

    setTimeout(() => {
      setFormState("idle");
      formRef.current?.reset();
    }, 4500);
  };

  const inputCls = "w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200";
  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  };
  const focusStyle = {
    border: "1px solid rgba(124,58,237,0.5)",
    boxShadow: "0 0 0 3px rgba(124,58,237,0.12)",
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28" style={{ background: "linear-gradient(180deg, #0d0d1c 0%, #0a0a12 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute left-1/4 top-0 h-80 w-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07), transparent)" }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Have an idea?{" "}
              <span className="text-gradient-brand">Let's build something meaningful.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              Tell us a little about the project. We'll get back to you within a few business days with next steps or clarifying questions.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-white/55">
              {[
                "No obligation — the first conversation is free.",
                "We'll be honest about fit before we take on the work.",
                "Clear scope and timeline before any code is written.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-600 text-white">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div
              className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              <Confetti active={confetti} />

              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1, ease: [0.175, 0.885, 0.32, 1.275] }}
                      className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-violet-600 text-white"
                      style={{ boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}
                    >
                      <Check className="h-8 w-8" strokeWidth={2.5} />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="mt-5 font-display text-xl font-bold text-white"
                    >
                      Message sent!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="mt-2 text-sm text-white/50"
                    >
                      We received your inquiry and will respond within a few business days.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    {/* Name */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/40">
                        Name <span className="text-violet-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className={inputCls}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/40">
                        Email <span className="text-violet-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className={inputCls}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/40">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        className={inputCls}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/40">
                        Service Required
                      </label>
                      <select
                        name="service"
                        defaultValue=""
                        className={inputCls + " cursor-pointer appearance-none"}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                      >
                        <option value="" disabled className="bg-[#12121e]">
                          Select…
                        </option>
                        {services.map((o) => (
                          <option key={o} value={o} className="bg-[#12121e]">
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/40">
                        Project Budget
                      </label>
                      <select
                        name="budget"
                        defaultValue=""
                        className={inputCls + " cursor-pointer appearance-none"}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                      >
                        <option value="" disabled className="bg-[#12121e]">
                          Select…
                        </option>
                        {budgets.map((o) => (
                          <option key={o} value={o} className="bg-[#12121e]">
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Empty col for alignment */}
                    <div className="hidden sm:block" />

                    {/* Description */}
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/40">
                        Project Description <span className="text-violet-400">*</span>
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        required
                        className={inputCls + " resize-none"}
                        style={inputStyle}
                        placeholder="Tell us about the problem you're solving..."
                        onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
                      />
                    </div>

                    {/* Morphing Submit Button with Revolving Orbit Arrow */}
                    <div className="sm:col-span-2">
                      <motion.button
                        type="submit"
                        disabled={formState === "loading"}
                        animate={{
                          width: formState === "loading" && isFlying ? 48 : 190,
                          borderRadius: formState === "loading" && isFlying ? "24px" : "12px",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 18,
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative flex h-12 items-center justify-center overflow-hidden text-sm font-semibold text-white transition-colors duration-300 ${
                          formState === "success"
                            ? "bg-emerald-600"
                            : "bg-violet-600 hover:bg-violet-500 shadow-md hover:shadow-violet-600/20"
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {formState === "loading" ? (
                            isFlying ? (
                              <motion.div
                                key="flying"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                {/* Orbit Ring Background */}
                                <div className="absolute h-9 w-9 rounded-full border border-dashed border-violet-400/20" />
                                
                                {/* Orbit Rotation Wrapper */}
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 0.9,
                                    ease: "linear",
                                  }}
                                  className="relative h-10 w-10 flex items-center justify-center"
                                >
                                  {/* Revolving Arrow */}
                                  <div className="absolute top-0 text-cyan-300">
                                    <Send className="h-3.5 w-3.5 rotate-[45deg]" />
                                  </div>
                                </motion.div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="loading"
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-2.5 text-white/90"
                              >
                                <Loader2 className="h-4 w-4 animate-spin text-violet-200" />
                                <span>Sending...</span>
                              </motion.div>
                            )
                          ) : formState === "success" ? (
                            <motion.div
                              key="success"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.25 }}
                              className="flex items-center gap-2 font-semibold text-white"
                            >
                              <Check className="h-4.5 w-4.5 stroke-[2.5]" />
                              <span>Message Sent</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="idle"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-2.5"
                            >
                              <span>Send Inquiry</span>
                              <Send className="h-4 w-4 text-violet-200 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
