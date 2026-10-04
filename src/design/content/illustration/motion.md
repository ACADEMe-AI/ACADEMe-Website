# Motion

## In the app

| Piece | How |
|-------|-----|
| Pebby | Rive, `pebby.riv`, state machine `PebbySM`. Inputs: `pose` (a number), `reduceMotion`, `appear` |
| Wins | `Celebration` widgets: `Burst`, `PopIn`, `Shake`, `FloatUp`, `CountUp` |
| Buttons | The keycap press, 90 ms |
| Lessons | Swipe cards |

The app picks a pose with a named constant, for example `PebbyPose.celebrateSmall`. Screens never load the Rive file themselves; they use the `Pebby` widget.

## Rules

- Celebrate real wins only: a right quick check (+5 XP), a lesson done, a test passed, setup steps (+25 XP)
- One big celebration at a time. Small ones can stack (XP flying into the chip)
- Everything is skippable and never blocks the next tap
- When the phone asks for less motion, Pebby holds a still pose and bursts are skipped

## On the website

- Pebby is a still PNG pose next to each heading, with a short fade or rise as the heading comes in
- No Rive on the site for now
- The 3D phone, the floating chapter cards and the cube loader keep their existing motion
- Respect `prefers-reduced-motion`
