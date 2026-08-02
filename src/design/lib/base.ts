/**
 * Design app lives at `/design/*` in the main site (see App.tsx).
 *
 * Default is `/design` so production builds work even when `.env` is not
 * present (`.env` is gitignored; Vercel/CI often never set VITE_DESIGN_BASE).
 * Override with VITE_DESIGN_BASE only if you mount design somewhere else.
 */
export const DESIGN_BASE = (
  (import.meta.env.VITE_DESIGN_BASE as string | undefined) || "/design"
).replace(/\/$/, "");

/** Prefix an absolute app path with the design base (e.g. /foundations → /design/foundations) */
export function dpath(path: string): string {
  if (!path || path === "/") {
    return DESIGN_BASE || "/";
  }
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${DESIGN_BASE}${p}`;
}

/** Strip base for fileForPath / groupForPath matching (pathname → design-relative) */
export function stripDesignBase(pathname: string): string {
  if (!DESIGN_BASE) return pathname;
  if (pathname === DESIGN_BASE || pathname === `${DESIGN_BASE}/`) return "/";
  if (pathname.startsWith(`${DESIGN_BASE}/`)) {
    return pathname.slice(DESIGN_BASE.length) || "/";
  }
  return pathname;
}
