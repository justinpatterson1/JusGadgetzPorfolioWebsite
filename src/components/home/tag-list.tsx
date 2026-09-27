/**
 * Technology tags — design-system.md §7.6.
 *
 * A `<ul>` so assistive tech announces the count. Deliberately unlike `.chip`:
 * 6px radius rather than a pill, accent-tinted rather than neutral, and no
 * hover — tags are metadata, chips are a browsable inventory.
 *
 * Shared by the Selected Work cards and the case-study pages, so a project's
 * stack looks the same in both places.
 */
export function TagList({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="project-tags">
      {tags.map((tag) => (
        <li key={tag} className="project-tag text-tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}
