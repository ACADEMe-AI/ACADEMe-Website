export type Tile = {
  path: string;
  label: string;
  className: string;
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

export const tiles: Tile[] = [
  {
    path: "/foundations",
    label: "Framework",
    className: "t-framework",
    color: "#14161c",
    art: "nodes",
  },
  {
    path: "/foundations/voice",
    label: "Voice & Tone",
    className: "t-voice",
    color: "#f5a800",
    art: "quotes",
  },
  {
    path: "/foundations/logo",
    label: "Logo",
    className: "t-logo",
    color: "#564cf1",
    art: "mark",
  },
  {
    path: "/foundations/type",
    label: "Typography",
    className: "t-type",
    color: "#ff8a4c",
    art: "type",
  },
  {
    path: "/product/usps",
    label: "Product",
    className: "t-icon",
    color: "#3ddc97",
    art: "icons",
  },
  {
    path: "/foundations/color",
    label: "Color",
    className: "t-color",
    color: "#dcebff",
    art: "swatches",
  },
  {
    path: "/character",
    label: "Pebby",
    className: "t-imagery",
    color: "#8b8cf5",
    art: "photo",
  },
  {
    path: "/character/motion",
    label: "Motion",
    className: "t-motion",
    color: "#e7e6ff",
    art: "curve",
  },
];

export const navGroups: NavGroup[] = [
  {
    id: "foundations",
    label: "Foundations",
    description: "Logo, colour, type, tokens",
    items: [
      {
        path: "/foundations",
        label: "Overview",
        file: "identity/overview.md",
        description: "Taken from the app",
      },
      {
        path: "/foundations/logo",
        label: "Logo",
        file: "identity/logo.md",
        description: "Cube and wordmark",
      },
      {
        path: "/foundations/color",
        label: "Color",
        file: "identity/color.md",
        description: "Dark, light, status, Pebby, tints",
      },
      {
        path: "/foundations/type",
        label: "Type",
        file: "identity/type.md",
        description: "Baloo 2, Archivo, Noto Sans",
      },
      {
        path: "/foundations/tokens",
        label: "Tokens",
        file: "identity/tokens.md",
        description: "Radius, keycap, components",
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
    label: "Pebby",
    description: "The tutor and mascot",
    items: [
      {
        path: "/character",
        label: "Pebby",
        file: "illustration/mascot.md",
        description: "Who Pebby is",
      },
      {
        path: "/character/illustration",
        label: "Illustration",
        file: "illustration/overview.md",
        description: "Pebby, cube, real screens",
      },
      {
        path: "/character/expressions",
        label: "Poses",
        file: "illustration/expressions.md",
        description: "Ten poses for the web",
      },
      {
        path: "/character/actions",
        label: "Moments",
        file: "illustration/moments.md",
        description: "Which pose where",
      },
      {
        path: "/character/shape",
        label: "Shape",
        file: "illustration/shape-language.md",
        description: "How Pebby is built",
      },
      {
        path: "/character/motion",
        label: "Motion",
        file: "illustration/motion.md",
        description: "Rive and celebrations",
      },
    ],
  },
  {
    id: "product",
    label: "Product",
    description: "What ACADEMe is today",
    items: [
      {
        path: "/product",
        label: "Overview",
        file: "product/overview.md",
        description: "Five pillars",
      },
      {
        path: "/product/usps",
        label: "USPs",
        file: "product/usps.md",
        description: "Seven reasons, with proof",
      },
      {
        path: "/product/checklist",
        label: "Built",
        file: "product/checklist.md",
        description: "What the app does",
      },
      {
        path: "/product/roadmap",
        label: "Next",
        file: "product/roadmap.md",
        description: "What's coming",
      },
      {
        path: "/product/structure",
        label: "App structure",
        file: "product/app-ia.md",
        description: "Tabs and flows",
      },
    ],
  },
  {
    id: "writing",
    label: "Writing",
    description: "Voice and messaging",
    items: [
      {
        path: "/writing",
        label: "Overview",
        file: "writing/overview.md",
        description: "Principles",
      },
      {
        path: "/writing/voice",
        label: "Voice",
        file: "writing/voice.md",
        description: "Tone and naming",
      },
      {
        path: "/writing/messaging",
        label: "Messaging",
        file: "writing/messaging.md",
        description: "Lines by channel",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "academe.cc",
    items: [
      {
        path: "/marketing",
        label: "Overview",
        file: "marketing/overview.md",
        description: "Two sites, one repo",
      },
      {
        path: "/marketing/ctas",
        label: "CTAs",
        file: "marketing/ctas.md",
        description: "Google Play and QR",
      },
      {
        path: "/marketing/showcase",
        label: "Showcase site",
        file: "marketing/showcase-site.md",
        description: "The seven beats",
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
        description: "App and site",
      },
      {
        path: "/guides/agents",
        label: "For agents",
        file: "agents/how-to-use.md",
        description: "Read order",
      },
      {
        path: "/guides/agents-overview",
        label: "Agent rules",
        file: "agents/overview.md",
        description: "The short version",
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

export function colorForPath(pathname: string): string | null {
  const tile = tiles.find((t) => t.path === pathname);
  return tile?.color ?? null;
}
