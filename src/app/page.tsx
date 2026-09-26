import { About } from "@/components/home/about";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Services } from "@/components/home/services";
import { Skills } from "@/components/home/skills";
import { TechTicker } from "@/components/home/tech-ticker";
import { Sidebar } from "@/components/layout/sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <TechTicker />
      </main>

      <Footer />
    </>
  );
}
