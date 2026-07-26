import { useEffect, useState } from "react";
import { Menu, X, Orbit } from "lucide-react";
import { cn } from "@/lib/utils";
const links = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
];
export function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (<header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled
            ? "border-b border-white/[0.06] bg-[#0c0c14]/90 backdrop-blur-xl"
            : "bg-transparent")}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#home" className="flex min-w-0 items-center gap-2.5" aria-label="DevOrbit home">
          <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-600 text-white shadow-lg">
            <Orbit className="h-5 w-5" strokeWidth={2.25}/>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
            Dev<span className="text-violet-400">Orbit</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (<li key={l.href}>
              <a href={l.href} className="rounded-full px-3.5 py-2 text-sm font-medium text-white/75 transition-all duration-200 hover:bg-white/[0.06] hover:text-white">
                {l.label}
              </a>
            </li>))}
        </ul>

        {/* CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#contact" className="group relative inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-[0_4px_20px_rgba(124,58,237,0.25)]">
            <span className="relative">Start a Project</span>
            <span aria-hidden className="relative inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button type="button" onClick={() => setOpen((v) => !v)} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/75 hover:bg-white/[0.06] lg:hidden" aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (<div className="border-t border-white/[0.06] bg-[#0c0c14]/90 backdrop-blur-xl lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {links.map((l) => (<li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-base font-medium text-white/75 hover:bg-white/[0.06] hover:text-white transition-all">
                  {l.label}
                </a>
              </li>))}
            <li className="pt-2">
              <a href="#contact" onClick={() => setOpen(false)} className="block rounded-full bg-violet-600 px-5 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-[0_4px_20px_rgba(124,58,237,0.25)]">
                Start a Project
              </a>
            </li>
          </ul>
        </div>)}
    </header>);
}
