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
