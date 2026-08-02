export type NavItem = {
  path: string;
  label: string;
  file: string;
};

export type NavSection = {
  id: string;
  label: string;
  blurb: string;
  items: NavItem[];
};

/** Mirrors design.duolingo.com pillars + product/agents */
export const nav: NavSection[] = [
  {
    id: "home",
    label: "Home",
    blurb: "Start here",
    items: [
      { path: "/", label: "Overview", file: "00-START-HERE.md" },
    ],
  },
  {
    id: "identity",
    label: "Identity",
    blurb: "Core brand elements and usage rules",
    items: [
      { path: "/identity", label: "Overview", file: "identity/overview.md" },
      { path: "/identity/color", label: "Color", file: "identity/color.md" },
      { path: "/identity/tokens", label: "Tokens", file: "identity/tokens.md" },
      { path: "/identity/logo", label: "Logo", file: "identity/logo.md" },
    ],
  },
  {
    id: "writing",
    label: "Writing",
    blurb: "Voice and messaging",
    items: [
      { path: "/writing", label: "Overview", file: "writing/overview.md" },
      { path: "/writing/voice", label: "Voice", file: "writing/voice.md" },
      { path: "/writing/messaging", label: "Messaging", file: "writing/messaging.md" },
    ],
  },
  {
    id: "illustration",
    label: "Illustration",
    blurb: "Shape language, mascot, motion",
    items: [
      { path: "/illustration", label: "Overview", file: "illustration/overview.md" },
      { path: "/illustration/shape-language", label: "Shape language", file: "illustration/shape-language.md" },
      { path: "/illustration/mascot", label: "Mascot", file: "illustration/mascot.md" },
      { path: "/illustration/motion", label: "Motion", file: "illustration/motion.md" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    blurb: "Showcase site and CTAs",
    items: [
      { path: "/marketing", label: "Overview", file: "marketing/overview.md" },
      { path: "/marketing/showcase", label: "Showcase site", file: "marketing/showcase-site.md" },
      { path: "/marketing/ctas", label: "CTAs & QR", file: "marketing/ctas.md" },
    ],
  },
  {
    id: "product",
    label: "Product",
    blurb: "Roadmap, checklist, app IA",
    items: [
      { path: "/product", label: "Overview", file: "product/overview.md" },
      { path: "/product/roadmap", label: "Roadmap", file: "product/roadmap.md" },
      { path: "/product/checklist", label: "Checklist", file: "product/checklist.md" },
      { path: "/product/app-ia", label: "App IA", file: "product/app-ia.md" },
    ],
  },
  {
    id: "agents",
    label: "Agents",
    blurb: "Guardrails for AI builders",
    items: [
      { path: "/agents", label: "Overview", file: "agents/overview.md" },
      { path: "/agents/guardrails", label: "Guardrails", file: "agents/guardrails.md" },
      { path: "/agents/architecture", label: "Architecture", file: "agents/architecture.md" },
      { path: "/agents/how-to-use", label: "How to use", file: "agents/how-to-use.md" },
    ],
  },
];

export function fileForPath(pathname: string): string {
  for (const section of nav) {
    for (const item of section.items) {
      if (item.path === pathname) return item.file;
    }
  }
  return "00-START-HERE.md";
}
