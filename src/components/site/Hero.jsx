import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
/* ── 3D Wireframe Sphere Canvas ── */
function ThreeDObject() {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const frame = useRef(0);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        let animId;
        let t = 0;
        const resize = () => {
            const parent = canvas.parentElement;
            const size = Math.min(parent?.clientWidth ?? 480, 480);
            canvas.width = size;
            canvas.height = size;
        };
        resize();
        const ro = new ResizeObserver(resize);
        if (canvas.parentElement)
            ro.observe(canvas.parentElement);
        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMouseMove, { passive: true });
        const rows = 16;
        const cols = 24;
        const R = 0.36;
        function project(x, y, z, w, h) {
            const fov = 3.5;
            const s = fov / (fov + z);
            return [x * s * w * 0.5 + w / 2, y * s * h * 0.5 + h / 2, s];
        }
        function rotY(x, y, z, a) {
            return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
        }
        function rotX(x, y, z, a) {
            return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
        }
        function draw() {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            const angleY = t * 0.35 + mouse.current.x * 0.5;
            const angleX = mouse.current.y * 0.3;
            // latitude rings
            for (let ri = 0; ri <= rows; ri++) {
                const phi = (ri / rows) * Math.PI;
                const pts = [];
                for (let ci = 0; ci <= cols; ci++) {
                    const theta = (ci / cols) * Math.PI * 2;
                    let x = R * Math.sin(phi) * Math.cos(theta);
                    let y = R * Math.cos(phi);
                    let z = R * Math.sin(phi) * Math.sin(theta);
                    [x, y, z] = rotY(x, y, z, angleY);
                    [x, y, z] = rotX(x, y, z, angleX);
                    pts.push(project(x, y, z, w, h));
                }
                ctx.beginPath();
                pts.forEach(([px, py], i) => { if (i === 0)
                    ctx.moveTo(px, py);
                else
                    ctx.lineTo(px, py); });
                const avgZ = pts.reduce((a, p) => a + p[2], 0) / pts.length;
                const alpha = 0.06 + avgZ * 0.28;
                const p = ri / rows;
                // violet → teal gradient
                const r1 = Math.round(167 + (45 - 167) * p);
                const g1 = Math.round(139 + (212 - 139) * p);
                const b1 = Math.round(250 + (191 - 250) * p);
                ctx.strokeStyle = `rgba(${r1},${g1},${b1},${alpha})`;
                ctx.lineWidth = avgZ * 1.1;
                ctx.stroke();
            }
            // longitude rings
            for (let ci = 0; ci < cols; ci += 2) {
                const theta = (ci / cols) * Math.PI * 2;
                const pts = [];
                for (let ri = 0; ri <= rows; ri++) {
                    const phi = (ri / rows) * Math.PI;
                    let x = R * Math.sin(phi) * Math.cos(theta);
                    let y = R * Math.cos(phi);
                    let z = R * Math.sin(phi) * Math.sin(theta);
                    [x, y, z] = rotY(x, y, z, angleY);
                    [x, y, z] = rotX(x, y, z, angleX);
                    pts.push(project(x, y, z, w, h));
                }
                ctx.beginPath();
                pts.forEach(([px, py], i) => { if (i === 0)
                    ctx.moveTo(px, py);
                else
                    ctx.lineTo(px, py); });
                const avgZ = pts.reduce((a, p) => a + p[2], 0) / pts.length;
                const alpha = 0.04 + avgZ * 0.18;
                const p = ci / cols;
                const r1 = Math.round(167 + (45 - 167) * p);
                const g1 = Math.round(139 + (212 - 139) * p);
                const b1 = Math.round(250 + (191 - 250) * p);
                ctx.strokeStyle = `rgba(${r1},${g1},${b1},${alpha})`;
                ctx.lineWidth = avgZ * 0.7;
                ctx.stroke();
            }
            // Subtle center glow
            const [cx, cy] = project(0, 0, 0, w, h);
            const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.14);
            grd.addColorStop(0, "rgba(124,58,237,0.18)");
            grd.addColorStop(0.5, "rgba(13,148,136,0.07)");
            grd.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.arc(cx, cy, w * 0.14, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
            // Orbiting particles (subtle)
            for (let pi = 0; pi < 4; pi++) {
                const orbitAngle = t * 0.7 + (pi / 4) * Math.PI * 2;
                const orbitR = R * 1.1;
                const tiltX = 0.35 + pi * 0.08;
                let px = orbitR * Math.cos(orbitAngle);
                let py = orbitR * Math.sin(orbitAngle) * Math.sin(tiltX);
                let pz = orbitR * Math.sin(orbitAngle) * Math.cos(tiltX);
                [px, py, pz] = rotY(px, py, pz, angleY);
                [px, py, pz] = rotX(px, py, pz, angleX);
                const [ppx, ppy, ps] = project(px, py, pz, w, h);
                if (ps < 0.5)
                    continue;
                const isViolet = pi % 2 === 0;
                ctx.beginPath();
                ctx.arc(ppx, ppy, ps * 3, 0, Math.PI * 2);
                ctx.fillStyle = isViolet ? `rgba(139,92,246,${ps * 0.8})` : `rgba(45,212,191,${ps * 0.8})`;
                ctx.fill();
                const grdP = ctx.createRadialGradient(ppx, ppy, 0, ppx, ppy, ps * 12);
                grdP.addColorStop(0, isViolet ? "rgba(139,92,246,0.25)" : "rgba(45,212,191,0.25)");
                grdP.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(ppx, ppy, ps * 12, 0, Math.PI * 2);
                ctx.fillStyle = grdP;
                ctx.fill();
            }
            t += 0.007;
            frame.current = requestAnimationFrame(draw);
        }
        draw();
        return () => {
            cancelAnimationFrame(frame.current);
            ro.disconnect();
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);
    return <canvas ref={canvasRef} className="h-full w-full" aria-hidden/>;
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

      {/* 3D object — right half, desktop only */}
      <motion.div aria-hidden className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block" style={{ width: "clamp(380px, 44vw, 520px)", height: "clamp(380px, 44vw, 520px)" }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
        <ThreeDObject />
        {/* Very subtle radial behind sphere */}
        <div className="pointer-events-none absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 65%)" }}/>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Text area — max 60% width on large screens to not overlap 3D */}
        <div className="max-w-xl lg:max-w-2xl">
          {/* Badge */}
          <motion.div {...fadeUp(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/60">
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
          <motion.p {...fadeUp(0.22)} className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
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
                <dd className="mt-1 text-xs text-white/55 sm:text-sm">{s.v}</dd>
              </div>))}
          </motion.dl>
        </div>
      </div>

      {/* Fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#0a0a12]"/>
    </section>);
}
