export type Role = {
  title: string;
  /**
   * The sector, not the employer. Prompt 12: no company name unless one is
   * intentionally public, and none has been configured for public use.
   */
  sector: string;
  summary: string;
  /** Concise, achievement-oriented. Keep each to one line of thought. */
  highlights: readonly string[];
};

/**
 * Professional experience — Prompt 12.
 *
 * Copy is verbatim from the prompt. **Confidentiality is the constraint here**:
 * no employer name, internal server or database names, vendor configuration,
 * client or advisor data, or proprietary formulas — and no dates, since none
 * have been supplied and inventing them breaks the credibility rule.
 *
 * TODO(Justin): add a `period` (e.g. "2022 — Present") once you decide what to
 * show publicly; `<Experience>` has a slot for it.
 */
export const ROLES: readonly Role[] = [
  {
    title: "Systems Analyst / Software Developer",
    sector: "Financial Services",
    summary:
      "Develop and support software solutions, integrations and automated workflows supporting financial operations and internal business processes.",
    highlights: [
      "Develop SQL Server processes supporting financial data processing, reporting and operational workflows.",
      "Build and maintain integrations between external services, APIs, databases and internal applications.",
      "Automate recurring operational processes using scheduled jobs, scripts and database workflows.",
      "Translate complex business and financial rules into maintainable application and database logic.",
      "Troubleshoot production issues involving APIs, data feeds, database processes, scheduled jobs and third-party systems.",
      "Support application upgrades, testing, migration and production deployment.",
      "Develop validation and reconciliation processes to improve the reliability of operational data.",
    ],
  },
] as const;
