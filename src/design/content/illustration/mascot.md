# Pebby

Pebby is ACADEMe's tutor and mascot, and Pebby is the product name. Students "Ask Pebby" in ASKMe, on every lesson card and after every scan. Use the name in the app, on the site and in the store listing.

## Who Pebby is

A soft purple study buddy with a white face panel, three leaf-like tufts on top and short feet. Curious, patient, encouraging. Pebby explains like a good older cousin, gives a hint before the answer and is happy when you get it.

## Where the art comes from

| Place | What |
|-------|------|
| The app | `assets/academe/mascot/animations/pebby.riv`, a Rive state machine (`PebbySM`) driven by a pose number. Widget: `Pebby(pose: PebbyPose.encourage)` |
| The website and this site | 10 transparent PNG poses in `/pebby/`, exported from the same art |

Only use these files. Don't redraw Pebby, trace it, or generate new poses with an image tool.

## Colours

Pebby's body uses the three Pebby colours from `app_theme.dart`: #A2A4FB (light), #8B8CF5 (mid), #6E71D6 (deep). Face panel white, eyes and mouth `lightText`. Same in Light and Dark.

## Do

- Pair Pebby with one short line of copy
- Pick the pose that matches the moment (see [Moments](/design/character/actions))
- Keep Pebby the same size within a screen or section
- Let Pebby sit on the surface with its soft ground shadow

## Don't

- Recolour, stretch, crop off the feet or rotate Pebby
- Put Pebby on every screen. Lists, settings and forms usually don't need it
- Give Pebby props, outfits or other characters
- Show a live Pebby reply on the website. Pebby can be unavailable when the AI service is out of credits
