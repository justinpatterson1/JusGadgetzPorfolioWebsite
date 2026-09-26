import { ArrowIcon } from "@/components/icons";
import { Eyebrow, H2, Lede } from "@/components/ui";
import { SERVICES, type Service } from "@/lib/content/services";

/**
 * Section 05 — Services. Spec: context/features/06-services.md, with the
 * anatomy in context/features/design/11-services.md.
 *
 * Static markup, so it stays a server component and ships no JavaScript. The
 * card hover — lift, tint, border, left-edge bar, link reveal — is all CSS.
 *
 * The site's only centered header: `text-center` on the wrap centers the
 * eyebrow, headline and lede, and the grid resets to `text-left` for the cards.
 * The lede also needs `centered` (margin-inline: auto) — a max-width block does
 * not center from `text-align` alone.
 */
export function Services() {
  return (
    <section id="services" className="section section-ink scroll-mt-10">
      <div className="wrap text-center">
        <Eyebrow centered>What I Offer</Eyebrow>
        <H2>Services &amp; Solutions.</H2>
        <Lede centered>
          Specialized technical services tailored to your business needs.
        </Lede>

        {/* A list, so the six are announced as a set. */}
        <ul className="services-grid text-left">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * One service card.
 *
 * "Learn more" is a real link to `#contact` — open issue #10, decided
 * 2026-09-25. There is no per-service page to send anyone to, and the honest
 * next step after reading a service is to get in touch. Until the Contact
 * section lands (prompt 08) the target does not exist and the link only
 * changes the hash.
 *
 * All six links share a target and visible text, so each carries a hidden
 * " about {title}" — six identical "Learn more" entries in a screen reader's
 * links list are indistinguishable.
 */
function ServiceCard({ service }: { service: Service }) {
  const { title, desc, icon: Icon, featured } = service;

  return (
    <li className={featured ? "service featured" : "service"}>
      <div className="service-icon">
        <Icon className="size-5" />
      </div>
      <h3 className="service-title text-title-tight text-on-ink">{title}</h3>
      <p className="service-desc text-desc-loose text-on-ink-2">{desc}</p>
      <a href="#contact" className="service-link text-pill">
        Learn more
        <span className="sr-only"> about {title}</span>
        <ArrowIcon width={12} height={12} />
      </a>
    </li>
  );
}
