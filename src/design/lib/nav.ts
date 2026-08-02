export type Tile = {
  /** Destination = v1 content route */
  path: string;
  label: string;
  className: string;
  /** Solid fill used for expand-to-fullscreen */
  color: string;
  art: "nodes" | "quotes" | "mark" | "type" | "icons" | "swatches" | "photo" | "curve";
};

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

/**
 * Home tile board (v2 interaction) → lands on v1 content routes.
 * Framework maps to Foundations; Iconography to Product structure.
 */
export const tiles: Tile[] = [
  {
    path: "/foundations",
    label: "Framework",
    className: "t-framework",
    color: "#1c1f2e",
    art: "nodes",
  },
  {
    path: "/foundations/voice",
    label: "Voice & Tone",
    className: "t-voice",
    color: "#f0d45c",
    art: "quotes",
  },
  {
    path: "/foundations/logo",
    label: "Logo",
    className: "t-logo",
    color: "#6ec8ff",
    art: "mark",
  },
  {
    path: "/foundations/type",
    label: "Typography",
    className: "t-type",
    color: "#ff6a3d",
    art: "type",
  },
  {
    path: "/product/structure",
    label: "Iconography",
    className: "t-icon",
    color: "#b8e03a",
    art: "icons",
  },
  {
    path: "/foundations/color",
    label: "Color",
    className: "t-color",
    color: "#ff9a2e",
    art: "swatches",
  },
  {
    path: "/character",
    label: "Mascot",
    className: "t-imagery",
    color: "#6b3d8c",
    art: "photo",
  },
  {
    path: "/character/motion",
    label: "Motion",
    className: "t-motion",
    color: "#b8a0f0",
    art: "curve",
  },
];

/** Full v1 site map — markdown guidelines */
export const navGroups: NavGroup[] = [
  {
    id: "foundations",
    label: "Foundations",
    description: "Marks, color, type",
    items: [
      {
        path: "/foundations",
        label: "Overview",
        file: "identity/overview.md",
        description: "Brand basics",
      },
      {
        path: "/foundations/logo",
        label: "Logo",
        file: "identity/logo.md",
        description: "Cube mark files",
      },
      {
        path: "/foundations/color",
        label: "Color",
        file: "identity/color.md",
        description: "Palettes",
      },
      {
        path: "/foundations/type",
        label: "Type",
        file: "identity/tokens.md",
        description: "Type and space",
      },
      {
        path: "/foundations/voice",
        label: "Voice",
        file: "writing/voice.md",
        description: "How we write",
      },
    ],
  },
  {
    id: "character",
    label: "Mascot",
    description: "Learning buddy assets",
    items: [
      {
        path: "/character",
        label: "Overview",
        file: "illustration/mascot.md",
        description: "Meet the buddy",
      },
      {
        path: "/character/illustration",
        label: "Illustration",
        file: "illustration/overview.md",
        description: "Visual system",
      },
      {
        path: "/character/expressions",
        label: "Expressions",
        file: "illustration/expressions.md",
        description: "16 faces",
      },
      {
        path: "/character/actions",
        label: "In action",
        file: "illustration/moments.md",
        description: "Study moments",
      },
      {
        path: "/character/turnaround",
        label: "Turnaround",
        file: "illustration/shape-language.md",
        description: "Five angles",
      },
      {
        path: "/character/motion",
        label: "Motion",
        file: "illustration/motion.md",
        description: "States in UI",
      },
    ],
  },
  {
    id: "product",
    label: "Product",
    description: "What we ship next",
    items: [
      {
        path: "/product",
        label: "Overview",
        file: "product/overview.md",
        description: "Direction",
      },
      {
        path: "/product/checklist",
        label: "What next",
        file: "product/checklist.md",
        description: "Current tasks",
      },
      {
        path: "/product/roadmap",
        label: "Roadmap",
        file: "product/roadmap.md",
        description: "Phase order",
      },
      {
        path: "/product/structure",
        label: "App structure",
        file: "product/app-ia.md",
        description: "Tabs and flow",
      },
    ],
  },
  {
    id: "writing",
    label: "Writing",
    description: "Messaging and voice",
    items: [
      {
        path: "/writing",
        label: "Overview",
        file: "writing/overview.md",
        description: "How we write",
      },
      {
        path: "/writing/voice",
        label: "Voice",
        file: "writing/voice.md",
        description: "Tone pillars",
      },
      {
        path: "/writing/messaging",
        label: "Messaging",
        file: "writing/messaging.md",
        description: "Key lines",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Site and CTAs",
    items: [
      {
        path: "/marketing",
        label: "Overview",
        file: "marketing/overview.md",
        description: "Marketing surfaces",
      },
      {
        path: "/marketing/ctas",
        label: "CTAs",
        file: "marketing/ctas.md",
        description: "Buttons and asks",
      },
      {
        path: "/marketing/showcase",
        label: "Showcase site",
        file: "marketing/showcase-site.md",
        description: "Marketing site notes",
      },
    ],
  },
  {
    id: "guides",
    label: "Guides",
    description: "Rules for builders",
    items: [
      {
        path: "/guides",
        label: "Start here",
        file: "start/overview.md",
        description: "How to use this site",
      },
      {
        path: "/guides/rules",
        label: "Rules",
        file: "agents/guardrails.md",
        description: "Hard limits",
      },
      {
        path: "/guides/architecture",
        label: "Architecture",
        file: "agents/architecture.md",
        description: "Code shape",
      },
      {
        path: "/guides/agents",
        label: "For agents",
        file: "agents/how-to-use.md",
        description: "Read order",
      },
      {
        path: "/guides/agents-overview",
        label: "Agent system",
        file: "agents/overview.md",
        description: "Agent roles",
      },
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

/** Accent color for a path (from home tile if any) */
export function colorForPath(pathname: string): string | null {
  const tile = tiles.find((t) => t.path === pathname);
  return tile?.color ?? null;
}
