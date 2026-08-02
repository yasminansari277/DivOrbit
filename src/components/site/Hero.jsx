import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import hero1 from "../../assets/gallery/image1.jpeg";
import hero2 from "../../assets/gallery/image2.jpeg";
import hero3 from "../../assets/gallery/image3.jpeg";
import hero4 from "../../assets/gallery/image4.jpeg";
import hero5 from "../../assets/gallery/image5.jpeg";
import hero6 from "../../assets/gallery/image6.jpeg";
import hero7 from "../../assets/gallery/image7.jpeg";
import hero8 from "../../assets/gallery/image8.jpeg";
/* 3D object removed — using subtle image slideshow instead */

function Slideshow({ images = [], interval = 6000 }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!images || images.length <= 1)
      return;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images, interval]);
  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (<img key={i} src={src} alt="" aria-hidden className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`} />))}
    </div>
  );
}
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});
export function Hero() {
    return (<section id="home" className="relative overflow-hidden bg-gradient-hero pb-24 pt-28 sm:pb-32 sm:pt-36 lg:pt-40">
      {/* Subtle grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-orbit-grid opacity-[0.035]"/>

            {/* Background video — full width */}
            {/* Subtle slideshow of programming images (non-flashy) */}
            <div aria-hidden className="absolute inset-0 z-0 h-full w-full overflow-hidden">
              <Slideshow images={[hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8]} interval={6000} />
              <div className="absolute inset-0 bg-black/80 pointer-events-none opacity-100" />
            </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ textShadow: "0 6px 20px rgba(0,0,0,0.75)" }}>
        {/* Text area — max 60% width on large screens to not overlap 3D */}
        <div className="max-w-xl lg:max-w-2xl">
          {/* Badge */}
          <motion.div {...fadeUp(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/80">
            <Sparkles className="h-3.5 w-3.5 text-violet-400"/>
            Software Development Studio
          </motion.div>

          {/* Heading */}
          <motion.h1 {...fadeUp(0.1)} className="font-display text-4xl font-bold leading-[1.07] tracking-tight text-white sm:text-5xl md:text-6xl">
            We build digital products that{" "}
            <span className="text-gradient-brand">move businesses</span>{" "}
            forward.
          </motion.h1>

          {/* Subtext */}
          <motion.p {...fadeUp(0.22)} className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
            DevOrbit helps businesses transform ideas into reliable, scalable, and
            modern digital products through frontend and backend engineering.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.34)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="group inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-500 hover:shadow-[0_4px_20px_rgba(124,58,237,0.3)] active:translate-y-px">
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"/>
            </a>
            <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/75 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
              Explore Services
            </a>
          </motion.div>

          {/* Stats */}
          <motion.dl {...fadeUp(0.46)} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/[0.07] pt-8">
            {[
            { k: "Frontend", v: "Modern & responsive" },
            { k: "Backend", v: "Scalable & secure" },
            { k: "Full-Stack", v: "End-to-end delivery" },
        ].map((s) => (<div key={s.k}>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
                  {s.k}
                </dt>
                <dd className="mt-1 text-xs text-white/70 sm:text-sm">{s.v}</dd>
              </div>))}
          </motion.dl>
        </div>
      </div>

      {/* Fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#0a0a12]"/>
    </section>);
}
