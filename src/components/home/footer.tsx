import { MailIcon } from "@/components/icons";
import { CONTACT_EMAIL, SOCIAL_LINKS, type SocialLink } from "@/lib/content/contact";
import { PERSON_NAME } from "@/lib/content/profile";

/**
 * Section 08 — Contact. Spec: context/features/19_CONTACT_AND_PLACEHOLDERS.md,
 * layered on the build from 08-footer-contact.md and design/13-footer.md.
 *
 * Static markup, so it stays a server component and ships no JavaScript.
 *
 * A `<footer>`, not a `.section`: it declares its own asymmetric padding
 * (110px top, 36px bottom) and is the page's contentinfo landmark. It also
 * carries `id="contact"`, the target of the sidebar's Contact item, its CTA
 * arrow, and the six Services "Learn more" links. Case-study pages render it
 * too, so the contact details are one scroll away everywhere.
 *
 * The headline is a plain `<h2>` on the `text-h2-lg` token rather than the
 * `H2` primitive — it is one step larger than every section headline, being
 * the page's closing statement.
 */
export function Footer() {
  return (
    <footer id="contact" className="footer scroll-mt-10">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            {/* The accented word carries its period, as before — the whole
                word is the payoff. */}
            <h2 className="footer-title text-h2-lg text-balance">
              Let&apos;s build something{" "}
              <span className="text-accent">useful.</span>
            </h2>
            <p className="footer-lede">
              Have a project, workflow or system that could benefit from better
              software? Let&apos;s talk.
            </p>
            {/* Only once a real address is configured (Prompt 19) — never a
                placeholder. See CONTACT_EMAIL. */}
            {CONTACT_EMAIL !== null && (
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-mail">
                <MailIcon width={16} height={16} />
                {CONTACT_EMAIL}
              </a>
            )}
          </div>

          <ul className="footer-links">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 {PERSON_NAME}. All rights reserved.
          </p>
          {/* Name the stack this site is actually built on (open issue #13).
              The glyph is hidden and spoken as "love" — a screen reader would
              otherwise announce "black heart suit". */}
          <p>
            Made with{" "}
            <span className="footer-heart" aria-hidden>
              ♥
            </span>
            <span className="sr-only">love</span> using Next.js &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

/** One directory row: label left, icon right, a hairline beneath. */
function FooterLink({ link }: { link: SocialLink }) {
  const { label, href, icon: Icon, external } = link;

  return (
    <a
      href={href}
      className="footer-link"
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <span>
        {label}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </span>
      <Icon width={14} height={14} />
    </a>
  );
}
