import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
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
      </main>
    </>
  );
}
