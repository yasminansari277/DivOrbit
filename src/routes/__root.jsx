import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts, } from "@tanstack/react-router";
import { useEffect } from "react";
import appCss from "../styles.css?url";
function notifyError(error, context) {
    if (import.meta.env.DEV) {
        console.error("[Error]", context, error);
    }
}
function NotFoundComponent() {
    return (<div className="flex min-h-screen items-center justify-center bg-[#09090f] px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-white/80">Page not found</h2>
        <p className="mt-2 text-sm text-white/50">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-purple-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            Go home
          </Link>
        </div>
      </div>
    </div>);
}
function ErrorComponent({ error, reset }) {
    console.error(error);
    const router = useRouter();
    useEffect(() => {
        notifyError(error, { boundary: "root_error_component" });
    }, [error]);
    return (<div className="flex min-h-screen items-center justify-center bg-[#09090f] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => {
            router.invalidate();
            reset();
        }} className="inline-flex items-center justify-center rounded-full bg-purple-500 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-purple-400">
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-white/10">
            Go home
          </a>
        </div>
      </div>
    </div>);
}
export const Route = createRootRouteWithContext()({
    head: () => ({
        meta: [
            { charSet: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { title: "DevOrbit — Next-Gen Software Engineering Studio" },
            {
                name: "description",
                content: "DevOrbit is a high-performance software engineering studio building scalable web apps, cloud infrastructure, and intelligent digital products.",
            },
            { name: "author", content: "DevOrbit" },
            { property: "og:title", content: "DevOrbit — Next-Gen Software Engineering Studio" },
            {
                property: "og:description",
                content: "DevOrbit is a high-performance software engineering studio building scalable web apps, cloud infrastructure, and intelligent digital products.",
            },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "DevOrbit — Next-Gen Software Engineering Studio" },
            { name: "twitter:description", content: "DevOrbit is a high-performance software engineering studio building scalable web apps, cloud infrastructure, and intelligent digital products." },
            { name: "theme-color", content: "#09090f" },
        ],
        links: [
            { rel: "stylesheet", href: appCss },
            { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
            { rel: "preconnect", href: "https://fonts.googleapis.com" },
            { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
            },
        ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
});
function RootShell({ children }) {
    return (<html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>);
}
function RootComponent() {
    const { queryClient } = Route.useRouteContext();
    return (<QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>);
}
