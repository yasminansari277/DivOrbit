import { Orbit, Github, Linkedin, Mail } from "lucide-react";
const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
];
const services = [
    "Backend Development",
    "Frontend Development",
    "Full-Stack Web Development",
    "REST API Development",
    "Database Design",
    "Website Development",
    "Maintenance & Support",
];
export function Footer() {
    return (<footer className="relative overflow-hidden" style={{
            background: "#07070f",
            borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-orbit-grid opacity-[0.025]"/>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5">
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-violet-600 text-white shadow-sm">
                <Orbit className="h-4.5 w-4.5" strokeWidth={2.25}/>
              </span>
              <span className="font-display text-lg font-bold text-white">
                Dev<span className="text-violet-400">Orbit</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              A software development studio building reliable, scalable frontend and
              backend systems for startups and businesses that care about craft.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
            { href: "#", label: "GitHub", Icon: Github },
            { href: "#", label: "LinkedIn", Icon: Linkedin },
            { href: "mailto:hello@devorbit.dev", label: "Email", Icon: Mail },
        ].map(({ href, label, Icon }) => (<a key={label} href={href} aria-label={label} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/40 transition-all duration-200 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-400">
                  <Icon className="h-4 w-4"/>
                </a>))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:col-span-2 lg:col-span-7 lg:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {quickLinks.map((l) => (<li key={l.href}>
                    <a href={l.href} className="text-white/40 transition-colors duration-150 hover:text-white/75">
                      {l.label}
                    </a>
                  </li>))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                Services
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {services.map((s) => (<li key={s}>
                    <a href="#services" className="text-white/40 transition-colors duration-150 hover:text-white/75">
                      {s}
                    </a>
                  </li>))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                Get in Touch
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-white/40">
                <li>
                  <a href="mailto:hello@devorbit.dev" className="transition-colors duration-150 hover:text-white/75">
                    hello@devorbit.dev
                  </a>
                </li>
                <li><a href="#" className="transition-colors duration-150 hover:text-white/75">GitHub</a></li>
                <li><a href="#" className="transition-colors duration-150 hover:text-white/75">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.05] pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DevOrbit. All rights reserved.</p>
          <p>Built with care by the DevOrbit team.</p>
        </div>
      </div>
    </footer>);
}
