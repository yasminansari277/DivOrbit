import { useEffect, useRef } from "react";
export function useReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el)
            return;
        if (typeof IntersectionObserver === "undefined") {
            el.classList.add("is-visible");
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("is-visible");
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return ref;
}
