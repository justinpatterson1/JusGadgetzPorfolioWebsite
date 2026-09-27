export type Credential = {
  title: string;
  detail: string;
};

/**
 * Education & professional development — Prompt 17.
 *
 * **Completed and in-progress entries are separate lists on purpose**, and the
 * section renders them as visibly different things, so nothing unfinished can
 * read as earned.
 *
 * TODO(Justin): the university name and graduation year for the BSc, and the
 * exact official title of the IBM credential. Prompt 17 forbids inventing
 * either, so both are shown generically until supplied.
 */
export const COMPLETED: readonly Credential[] = [
  { title: "BSc in Computing", detail: "Undergraduate degree" },
  {
    title: "IBM Backend Development",
    detail: "Completed backend development training program",
  },
] as const;

/**
 * Learning in progress. If a certification exam is ever named here (AWS Cloud
 * Practitioner, CAPM), it stays in this list — labelled In Progress — until it
 * is actually earned.
 */
export const IN_PROGRESS: readonly Credential[] = [
  {
    title: "Cloud Architecture",
    detail: "AWS and cloud infrastructure fundamentals.",
  },
  {
    title: "Application Security",
    detail:
      "OWASP principles, secure application development and web security auditing concepts.",
  },
  {
    title: "System Design",
    detail:
      "Software architecture, design patterns and scalable system design.",
  },
] as const;
