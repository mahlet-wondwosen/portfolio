import ScrollProgress from "@/components/ScrollProgress";
import Toaster from "@/components/Toaster";
import CommandPalette from "@/components/CommandPalette";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Thesis from "@/components/Thesis";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Preloader />
      <Nav />
      <ScrollProgress />
      <Toaster />
      <CommandPalette />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Thesis />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
