export type NavItem = {
  path: string;
  label: string;
  file: string;
  description?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  description: string;
  items: NavItem[];
};

/**
 * Human-clear IA:
 * Brand  → how we look & sound
 * Product → what we build & in what order
 * Build  → rules for agents/engineers
 * Visual → mascot, shape language, motion
 */
export const navGroups: NavGroup[] = [
  {
    id: "brand",
    label: "Brand",
    description: "How ACADEMe looks and sounds",
    items: [
      { path: "/brand/color", label: "Color", file: "identity/color.md", description: "Dark & light palettes" },
      { path: "/brand/tokens", label: "Tokens", file: "identity/tokens.md", description: "Spacing, type, motion" },
      { path: "/brand/logo", label: "Logo", file: "identity/logo.md", description: "Wordmark & app icon" },
      { path: "/brand/voice", label: "Voice", file: "writing/voice.md", description: "Tone of copy" },
      { path: "/brand/messaging", label: "Messaging", file: "writing/messaging.md", description: "Pitches & CTAs" },
    ],
  },
  {
    id: "product",
    label: "Product",
    description: "What to build and when",
    items: [
      { path: "/product/roadmap", label: "Roadmap", file: "product/roadmap.md", description: "Phase order" },
      { path: "/product/checklist", label: "Checklist", file: "product/checklist.md", description: "What to do next" },
      { path: "/product/app-ia", label: "App structure", file: "product/app-ia.md", description: "Tabs & flows" },
    ],
  },
  {
    id: "build",
    label: "Build",
    description: "Rules for agents & engineers",
    items: [
      { path: "/build/start", label: "Start here", file: "agents/how-to-use.md", description: "How to use this system" },
      { path: "/build/guardrails", label: "Guardrails", file: "agents/guardrails.md", description: "Hard product rules" },
      { path: "/build/architecture", label: "Architecture", file: "agents/architecture.md", description: "Code structure" },
    ],
  },
  {
    id: "visual",
    label: "Visual",
    description: "Mascot, illustration, motion",
    items: [
      { path: "/visual/mascot", label: "Mascot", file: "illustration/mascot.md", description: "Character sheet" },
      { path: "/visual/shape-language", label: "Shape language", file: "illustration/shape-language.md", description: "How we draw" },
      { path: "/visual/motion", label: "Motion", file: "illustration/motion.md", description: "Animation states" },
    ],
  },
];

export function fileForPath(pathname: string): string | null {
  if (pathname === "/" || pathname === "") return null;
  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.path === pathname) return item.file;
    }
  }
  // legacy paths
  const legacy: Record<string, string> = {
    "/identity": "identity/overview.md",
    "/identity/color": "identity/color.md",
    "/identity/tokens": "identity/tokens.md",
    "/identity/logo": "identity/logo.md",
    "/writing": "writing/overview.md",
    "/writing/voice": "writing/voice.md",
    "/writing/messaging": "writing/messaging.md",
    "/illustration": "illustration/overview.md",
    "/illustration/shape-language": "illustration/shape-language.md",
    "/illustration/mascot": "illustration/mascot.md",
    "/illustration/motion": "illustration/motion.md",
    "/marketing": "marketing/overview.md",
    "/marketing/showcase": "marketing/showcase-site.md",
    "/marketing/ctas": "marketing/ctas.md",
    "/product": "product/overview.md",
    "/product/roadmap": "product/roadmap.md",
    "/product/checklist": "product/checklist.md",
    "/product/app-ia": "product/app-ia.md",
    "/agents": "agents/overview.md",
    "/agents/guardrails": "agents/guardrails.md",
    "/agents/architecture": "agents/architecture.md",
    "/agents/how-to-use": "agents/how-to-use.md",
  };
  return legacy[pathname] ?? "00-START-HERE.md";
}

export function labelForPath(pathname: string): string {
  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.path === pathname) return item.label;
    }
  }
  return "Docs";
}
