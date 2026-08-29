import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactDock from "@/components/ContactDock";
import Hero from "@/components/sections/Hero";
import Clients from "@/components/sections/Clients";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import { personJsonLd } from "@/lib/schema";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <div className="mx-auto w-full max-w-6xl border-x border-panel-border">
        <Nav />
        <main className="relative">
          <Hero />
          <Clients />
          <div className="border-t border-panel-border">
            <About />
          </div>
          <div className="border-t border-panel-border">
            <Experience />
          </div>
          <div className="border-t border-panel-border">
            <Skills />
          </div>
          <div className="border-t border-panel-border">
            <Projects />
          </div>
          <div className="border-t border-panel-border">
            <Education />
          </div>
          <div className="border-t border-panel-border">
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
      <ContactDock />
    </>
  );
}
