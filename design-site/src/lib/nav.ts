export type NavItem = {
  path: string;
  label: string;
  file?: string;
  description?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  description: string;
  items: NavItem[];
};

/** Simple map inspired by Material, Polaris, Carbon: few top items, clear sections */
export const navGroups: NavGroup[] = [
  {
    id: "start",
    label: "Start",
    description: "Where to begin",
    items: [
      { path: "/start", label: "Overview", file: "start/overview.md", description: "How this site works" },
      { path: "/start/checklist", label: "What next", file: "product/checklist.md", description: "Current tasks" },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    description: "Look and sound",
    items: [
      { path: "/brand/logo", label: "Logo", file: "identity/logo.md", description: "Marks and usage" },
      { path: "/brand/color", label: "Color", file: "identity/color.md", description: "Palettes" },
      { path: "/brand/type", label: "Type and space", file: "identity/tokens.md", description: "Tokens" },
      { path: "/brand/voice", label: "Voice", file: "writing/voice.md", description: "How we write" },
    ],
  },
  {
    id: "character",
    label: "Character",
    description: "Learning buddy assets",
    items: [
      { path: "/character", label: "Meet the buddy", file: "illustration/mascot.md", description: "Overview" },
      { path: "/character/expressions", label: "Expressions", file: "illustration/expressions.md", description: "Faces and moods" },
      { path: "/character/moments", label: "In the app", file: "illustration/moments.md", description: "Study moments" },
      { path: "/character/motion", label: "Motion", file: "illustration/motion.md", description: "Animation states" },
    ],
  },
  {
    id: "product",
    label: "Product",
    description: "What we ship",
    items: [
      { path: "/product/roadmap", label: "Roadmap", file: "product/roadmap.md", description: "Phase order" },
      { path: "/product/structure", label: "App structure", file: "product/app-ia.md", description: "Tabs and flow" },
    ],
  },
  {
    id: "build",
    label: "Build",
    description: "Rules for makers",
    items: [
      { path: "/build/rules", label: "Rules", file: "agents/guardrails.md", description: "Hard limits" },
      { path: "/build/architecture", label: "Architecture", file: "agents/architecture.md", description: "Code shape" },
      { path: "/build/agents", label: "For agents", file: "agents/how-to-use.md", description: "Read order" },
    ],
  },
];

export function fileForPath(pathname: string): string | null {
  if (pathname === "/" || pathname === "") return null;
  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.path === pathname && item.file) return item.file;
    }
  }
  return "start/overview.md";
}

export function labelForPath(pathname: string): string {
  for (const group of navGroups) {
    for (const item of group.items) {
      if (item.path === pathname) return item.label;
    }
  }
  return "Page";
}

export function groupForPath(pathname: string) {
  return navGroups.find((g) => g.items.some((i) => i.path === pathname));
}
