import type { Metadata } from "next";

import { Footer } from "@/components/home/footer";
import { ArrowIcon } from "@/components/icons";
import { Sidebar } from "@/components/layout/sidebar";
import { Cta, Eyebrow, H2, Lede } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/**
 * The 404 page — every unknown URL, including any `/work/…` slug that isn't in
 * `CASE_STUDIES` (that route sets `dynamicParams = false`).
 *
 * Same chrome as every other page, so a dead link still lands somewhere that
 * looks like the site: the rail's links already point back at the homepage's
 * sections off the homepage (`useSectionLink`), and the footer keeps the
 * contact details one scroll away.
 */
export default function NotFound() {
  return (
    <>
      <Sidebar />
      <main>
        <section className="section flex min-h-[70svh] items-center">
          <div className="wrap">
            <Eyebrow>Error 404</Eyebrow>
            <H2>This page doesn&apos;t exist.</H2>
            <Lede>
              The link may be out of date, or the address mistyped. Everything
              on the site is reachable from the homepage.
            </Lede>
            <div className="mt-8 flex flex-wrap gap-[14px]">
              <Cta variant="accent" href="/">
                Back to the homepage
                <ArrowIcon width={14} height={14} />
              </Cta>
              <Cta variant="ghost" href="/#work">
                See Selected Work
              </Cta>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
