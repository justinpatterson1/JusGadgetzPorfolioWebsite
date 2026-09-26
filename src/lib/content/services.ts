import type { ComponentType } from "react";

import {
  CardIcon,
  CodeIcon,
  GlobeIcon,
  PhoneIcon,
  ServerIcon,
  ShieldIcon,
  type IconProps,
} from "@/components/icons";

export type Service = {
  /** 1–3 words. */
  title: string;
  /** One sentence, ~15–25 words. */
  desc: string;
  /** The component itself, not a string name — no registry to keep in sync. */
  icon: ComponentType<IconProps>;
  /** The promoted card. Exactly one entry carries it. */
  featured?: boolean;
};

/**
 * Services — PRD 11, design-system.md §7.7.
 *
 * **`featured` sits on index 1 on purpose.** In the 3×2 grid that is the
 * top-row center — read first, flanked on both sides. It stays in the top row
 * at two columns and second from the top at one. Moving it to a corner weakens
 * it; featuring a second card cancels both out.
 *
 * Keep the count at six: it fills 3 × 2, 2 × 3 and 1 × 6 cleanly. Five or
 * seven leave an orphan in the last row at both multi-column breakpoints.
 */
export const SERVICES: readonly Service[] = [
  {
    title: "Web Development",
    desc: "Custom websites and web applications built with modern frameworks like React and Next.js for optimal performance.",
    icon: GlobeIcon,
  },
  {
    title: "Payment Integration",
    desc: "Seamless integration of payment gateways (Stripe, PayPal, Razorpay) ensuring secure and smooth transactions.",
    icon: CardIcon,
    featured: true,
  },
  {
    title: "Mobile Apps",
    desc: "Cross-platform mobile applications using React Native that provide a native-like experience on iOS and Android.",
    icon: PhoneIcon,
  },
  {
    title: "Backend Systems",
    desc: "Robust and scalable server-side architectures, API design, and database management.",
    icon: ServerIcon,
  },
  {
    title: "Security Audits",
    desc: "Identifying vulnerabilities and implementing best practices to keep your application and user data safe.",
    icon: ShieldIcon,
  },
  {
    title: "Technical Consulting",
    desc: "Expert advice on technology stack selection, architecture planning, and development best practices.",
    icon: CodeIcon,
  },
] as const;
