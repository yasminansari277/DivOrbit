import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { WhyChoose } from "@/components/site/WhyChoose";
import { About } from "@/components/site/About";
import { Work } from "@/components/site/Work";
import { Testimonials } from "@/components/site/Testimonials";
import { Team } from "@/components/site/Team";
import { Process } from "@/components/site/Process";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
export const Route = createFileRoute("/")(({
    component: Index,
}));
function Index() {
    return (<div className="min-h-screen bg-[#0a0a12] text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChoose />
        <About />
        <Work />
        <Testimonials />
        <Team />
        <Process />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>);
}
