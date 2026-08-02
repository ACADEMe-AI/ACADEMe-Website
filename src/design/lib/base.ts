/** Set in root `.env` as VITE_DESIGN_BASE=/design so routes stay under /design. */
export const DESIGN_BASE = (
  (import.meta.env.VITE_DESIGN_BASE as string | undefined) ?? ""
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
