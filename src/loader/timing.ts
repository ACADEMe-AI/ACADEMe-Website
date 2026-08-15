export const FPS = 60;

export const TIMING = {
    cubeEnd: 144,
    pause: 10,
    transformStart: 154,
    transformEnd: 210,
    settleEnd: 222,
    holdEnd: 232,
} as const;

export const TOTAL_FRAMES = TIMING.holdEnd;
export const DURATION_SEC = TOTAL_FRAMES / FPS;
