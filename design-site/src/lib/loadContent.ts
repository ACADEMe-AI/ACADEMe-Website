const modules = import.meta.glob("../../content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export function loadContent(relativePath: string): string {
  const norm = relativePath.replace(/^\//, "");
  const key = Object.keys(modules).find(
    (k) => k.endsWith(`/content/${norm}`) || k.endsWith(`content/${norm}`) || k.includes(`content/${norm}`)
  );
  if (!key) {
    const available = Object.keys(modules).slice(0, 5).join(", ");
    return `# Missing\n\nContent file not found: \`${relativePath}\`\n\nSample keys: ${available}`;
  }
  return modules[key];
}

export function allContentPaths(): string[] {
  return Object.keys(modules).map((k) => {
    const i = k.indexOf("/content/");
    return i >= 0 ? k.slice(i + "/content/".length) : k;
  });
}
