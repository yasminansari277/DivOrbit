import { useReveal } from "@/hooks/use-reveal";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import i1 from "@/assets/gallery/image1.jpeg";
import i2 from "@/assets/gallery/image2.jpeg";
import i3 from "@/assets/gallery/image3.jpeg";
import i4 from "@/assets/gallery/image4.jpeg";
import i5 from "@/assets/gallery/image5.jpeg";
import i6 from "@/assets/gallery/image6.jpeg";
import i7 from "@/assets/gallery/image7.jpeg";
import i8 from "@/assets/gallery/image8.jpeg";
const images = [
    { src: i1, alt: "Orchestrating seamless deployments and cloud infrastructure" },
    { src: i2, alt: "Immersive development environments tailored for deep focus" },
    { src: i3, alt: "Engineering robust API integrations and complex architectures" },
    { src: i4, alt: "Late-night problem solving in our dark-mode command center" },
    { src: i5, alt: "Collaborative engineering sprints in our modern workspace" },
    { src: i6, alt: "Remote engineering sessions crafting scalable backend systems" },
    { src: i7, alt: "Developing high-performance TypeScript microservices and APIs" },
    { src: i8, alt: "Crafting seamless native iOS experiences with Swift and SwiftUI" },
];
export function Gallery() {
    const ref = useReveal();
    const scrollRef = useRef(null);
    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.clientWidth * 0.6;
            current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { current } = scrollRef;
                if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
                    current.scrollTo({ left: 0, behavior: "smooth" });
                }
                else {
                    current.scrollBy({ left: current.clientWidth * 0.5, behavior: "smooth" });
                }
            }
        }, 3500); // Auto-scroll every 3.5 seconds
        return () => clearInterval(interval);
    }, []);
    return (<section id="gallery" className="relative py-20 sm:py-28" style={{ background: "linear-gradient(180deg, #0a0a12 0%, #0d0d1c 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07), transparent)" }}/>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
              Behind the Scenes
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              A glimpse into our <span className="text-gradient-brand">workspace</span>.
            </h2>
          </div>
          
          <p className="text-sm text-white/40">
            Where the magic happens.
          </p>
        </div>

        <div className="group relative mt-12">
          {/* Left Navigation Arrow */}
          <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 p-3 text-white opacity-0 backdrop-blur-md transition-all hover:bg-black/80 hover:text-violet-400 group-hover:opacity-100 sm:-left-6 sm:flex lg:-left-8" aria-label="Scroll left">
            <ChevronLeft className="h-6 w-6"/>
          </button>
          
          {/* Right Navigation Arrow */}
          <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 p-3 text-white opacity-0 backdrop-blur-md transition-all hover:bg-black/80 hover:text-violet-400 group-hover:opacity-100 sm:-right-6 sm:flex lg:-right-8" aria-label="Scroll right">
            <ChevronRight className="h-6 w-6"/>
          </button>

          <div ref={scrollRef} className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-12 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden">
            {images.map((img, i) => (<GalleryImage key={i} src={img.src} alt={img.alt} index={i}/>))}
          </div>
        </div>
      </div>
    </section>);
}
function GalleryImage({ src, alt, index }) {
    return (<motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: (index % 5) * 0.1, ease: [0.22, 1, 0.36, 1] }} className="group relative h-[300px] shrink-0 snap-center overflow-hidden rounded-2xl sm:h-[400px]" style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-auto max-w-none object-cover transition-transform duration-700 ease-out group-hover:scale-105"/>
      <div className="absolute inset-0 flex flex-col items-start justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(10,10,18,0.95) 0%, rgba(10,10,18,0.4) 40%, transparent 100%)" }}>
        <p className="translate-y-4 font-display text-sm font-medium text-white transition-transform duration-300 group-hover:translate-y-0">
          {alt}
        </p>
      </div>
    </motion.div>);
}
