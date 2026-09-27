import { CapIcon } from "@/components/icons";
import { Eyebrow, H2 } from "@/components/ui";
import {
  COMPLETED,
  IN_PROGRESS,
  type Credential,
} from "@/lib/content/education";

/**
 * Section 07 — Education & Professional Development. Spec:
 * context/features/17_EDUCATION_AND_DEVELOPMENT.md.
 *
 * Between Services and Contact, and deliberately concise: two lists, no
 * imagery. It is reachable at `#education` but is not a rail item (see
 * `NAV_ITEMS`).
 *
 * **The two lists must never look alike.** Completed entries are solid tiles
 * with an icon well; in-progress entries sit under their own heading on a
 * dashed, unfilled tile with an explicit "In progress" badge, so nothing
 * unfinished can pass for an earned credential at a glance (Prompt 17). The
 * badge is real text, not a color, so it survives a screen reader and
 * grayscale alike.
 */
export function Education() {
  return (
    <section id="education" className="section scroll-mt-10">
      <div className="wrap">
        <Eyebrow>Learning</Eyebrow>
        <H2>Education &amp; Professional Development.</H2>

        <div className="edu-grid">
          <div>
            <h3 className="edu-group-title text-card-tag">Completed</h3>
            <ul className="edu-list">
              {COMPLETED.map((item) => (
                <li key={item.title} className="edu-item">
                  <div className="edu-icon">
                    <CapIcon className="size-5" />
                  </div>
                  <CredentialText item={item} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="edu-group-title text-card-tag">
              Currently developing
            </h3>
            <ul className="edu-list">
              {IN_PROGRESS.map((item) => (
                <li key={item.title} className="edu-item edu-item-progress">
                  <CredentialText item={item} />
                  <span className="edu-badge text-tag">In progress</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredentialText({ item }: { item: Credential }) {
  return (
    <div className="min-w-0 flex-1">
      <h4 className="text-title-tight text-ink">{item.title}</h4>
      <p className="mt-1 text-desc text-ink-3">{item.detail}</p>
    </div>
  );
}
