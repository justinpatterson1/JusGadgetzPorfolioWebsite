import { About } from "@/components/home/about";
import { Education } from "@/components/home/education";
import { Experience } from "@/components/home/experience";
import { Footer } from "@/components/home/footer";
import { Hero } from "@/components/home/hero";
import { Services } from "@/components/home/services";
import { Skills } from "@/components/home/skills";
import { Work } from "@/components/home/work";
import { Sidebar } from "@/components/layout/sidebar";

/**
 * The homepage, in Prompt 20's narrative order: who Justin is, the problems he
 * solves, professional evidence, project evidence, the supporting stack,
 * services, education, then how to get in touch. Keep NAV_ITEMS in the same
 * order — the scrollspy depends on it.
 */
export default function Home() {
  return (
    <>
      <Sidebar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Services />
        <Education />
      </main>

      <Footer />
    </>
  );
}
