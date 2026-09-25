import { About } from "@/components/home/about";
import { Hero } from "@/components/home/hero";
import { Sidebar } from "@/components/layout/sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />

      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
