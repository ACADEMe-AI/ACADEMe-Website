/** Frame timeline @ 60fps conceptual — longer cube solve for loading */
export const FPS = 60;

export const TIMING = {
  /**
   * One full scramble + solve cycle (looped until assets ready).
   * ~2.4s per cycle at 60fps.
   */
  cubeEnd: 144,
  /** Short hold on solved cube before transform */
  pause: 10,
  /** Pieces begin logo transform */
  transformStart: 154,
  /** Logo form complete */
  transformEnd: 210,
  /** Settle hold */
  settleEnd: 222,
  /** Hold on formed logo before fly-to-pocket */
  holdEnd: 232,
} as const;

export const TOTAL_FRAMES = TIMING.holdEnd;
export const DURATION_SEC = TOTAL_FRAMES / FPS;
