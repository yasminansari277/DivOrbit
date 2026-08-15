import { useEffect, useState, useRef } from "react";
import { Github, Linkedin } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { motion } from "framer-motion";
const team = [
    {
        name: "Yasmin Ansari",
        role: "Co-Founder · Frontend Engineering",
        avatarUrl: "https://github.com/yasminansari277.png",
        githubUrl: "https://github.com/yasminansari277",
        linkedinUrl: "https://www.linkedin.com/in/yasminansari066?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        bio: "Focused on interfaces that feel considered — accessible, responsive, and paced to how people actually use them.",
        skills: ["React", "TypeScript", "Tailwind CSS", "Accessibility", "UI Systems"],
    },
    {
        name: "Ali Shaikh",
        role: "Co-Founder · Backend Engineering",
        avatarUrl: "https://github.com/developer-ali16.png",
        githubUrl: "https://github.com/developer-ali16",
        linkedinUrl: "https://www.linkedin.com/in/ali-shaikh-software-engineer/",
        bio: "Focused on building reliable APIs and data models that scale gracefully. Prefers boring, well-understood infrastructure over clever surprises.",
        skills: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "Backend Architecture"],
    },
];
function useTilt() {
    const ref = useRef(null);
    const [tiltStyle, setTiltStyle] = useState({});
    const onMouseMove = (e) => {
        const el = ref.current;
        if (!el)
            return;
        const { left, top, width, height } = el.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setTiltStyle({
            transform: `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.01)`,
        });
    };
    const onMouseLeave = () => {
        setTiltStyle({ transform: "perspective(900px) rotateX(0) rotateY(0) scale(1)" });
    };
    return { ref, tiltStyle, onMouseMove, onMouseLeave };
}
export function Team() {
    const ref = useReveal();
    return (<section className="relative py-20 sm:py-28" style={{ background: "linear-gradient(180deg, #0d0d1c 0%, #0a0a12 100%)" }}>
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07), transparent)" }}/>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
            The Team
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Two founders. One{" "}
            <span className="text-gradient-brand">shared standard</span>.
          </h2>
          <p className="mt-4 text-base text-white/55">
            DevOrbit is co-founded by a frontend and a backend engineer working directly
            on every project.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {team.map((m, i) => (<MemberCard key={m.name} member={m} delay={i * 0.12}/>))}
        </div>
      </div>
    </section>);
}
function MemberCard({ member, delay }) {
    const { ref, tiltStyle, onMouseMove, onMouseLeave } = useTilt();
    const [hovered, setHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) {
            return;
        }

        const mediaQuery = window.matchMedia("(hover: none)");
        const updateDeviceState = () => {
            setIsTouchDevice(mediaQuery.matches || window.innerWidth < 640);
        };

        updateDeviceState();

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", updateDeviceState);
        } else {
            mediaQuery.addListener(updateDeviceState);
        }

        window.addEventListener("resize", updateDeviceState);

        return () => {
            if (typeof mediaQuery.removeEventListener === "function") {
                mediaQuery.removeEventListener("change", updateDeviceState);
            } else {
                mediaQuery.removeListener(updateDeviceState);
            }
            window.removeEventListener("resize", updateDeviceState);
        };
    }, []);

    const showSocialLinks = hovered || isTouchDevice;
    return (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className="group">
      <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={() => { onMouseLeave(); setHovered(false); }} onMouseEnter={() => setHovered(true)} style={{
            ...tiltStyle,
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: hovered ? "1px solid rgba(124,58,237,0.25)" : "1px solid rgba(255,255,255,0.07)",
            boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.45)" : "0 2px 16px rgba(0,0,0,0.3)",
            transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.12s ease-out",
        }} className="relative overflow-hidden rounded-2xl p-6 sm:p-7">
        <div className="flex items-start gap-4">
          {/* Avatar with ring on hover */}
          <div className="relative shrink-0">
            <div className="absolute -inset-[2px] rounded-full transition-opacity duration-300" style={{
            opacity: hovered ? 1 : 0,
            background: "linear-gradient(135deg, #7c3aed, #0d9488)",
            padding: "1.5px",
        }}/>
            <div className="relative h-16 w-16 overflow-hidden rounded-full" style={{
            border: "2px solid rgba(255,255,255,0.08)",
            transition: "transform 0.25s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
        }}>
              <img src={member.avatarUrl} alt={member.name} className="h-full w-full object-cover"/>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-lg font-semibold text-white">{member.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-violet-400/80">{member.role}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/55">{member.bio}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {member.skills.map((s) => (<li key={s} className="rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white/50" style={{
                background: "rgba(13,148,136,0.08)",
                border: "1px solid rgba(13,148,136,0.18)",
            }}>
              {s}
            </li>))}
        </ul>

        {/* Social icons — fade in on hover or show on touch devices */}
        <div className="mt-5 flex flex-col gap-2.5 border-t border-white/[0.05] pt-4 opacity-100 transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100">
          <motion.a key="github" href={member.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on GitHub`} animate={{ opacity: showSocialLinks ? 1 : 0, y: showSocialLinks ? 0 : 6 }} transition={{ duration: 0.2 }} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="inline-flex h-9 sm:h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white/70 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-400">
            <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
            <span className="hidden sm:inline">View GitHub Profile</span>
            <span className="sm:hidden">GitHub</span>
          </motion.a>

          <motion.a key="linkedin" href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} animate={{ opacity: showSocialLinks ? 1 : 0, y: showSocialLinks ? 0 : 6 }} transition={{ duration: 0.25 }} whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="inline-flex h-9 sm:h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white/70 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-400">
            <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
            <span className="hidden sm:inline">View LinkedIn Profile</span>
            <span className="sm:hidden">LinkedIn</span>
          </motion.a>
        </div>
      </div>
    </motion.div>);
}
