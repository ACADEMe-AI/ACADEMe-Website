/**
 * Shared geometry for the home-start cube mark and the navbar→home fly animation.
 * Scales slightly on small viewports so handoff still matches the hero mark.
 */
function isNarrow() {
  return typeof window !== "undefined" && window.innerWidth <= 900;
}

export const HERO_MARK = {
  get imgSize() {
    return isNarrow() ? 72 : 98;
  },
  get box() {
    return isNarrow() ? 96 : 132;
  },
  get lift() {
    return isNarrow() ? 72 : 108;
  },
};

/** CSS left/top for a fixed element of `size` matching the hero mark center */
export function heroMarkFixedStyle(size?: number) {
  const s = size ?? HERO_MARK.imgSize;
  const lift = HERO_MARK.lift;
  return {
    left: `calc(50vw - ${s / 2}px)`,
    top: `calc(50vh - ${s / 2}px - ${lift}px)`,
    width: s,
    height: s,
  } as const;
}
