# Rive assets (`mee.riv`)

Drop production files here:

| File | Purpose |
|------|---------|
| `mee.riv` | Mascot state machine `MeeSM` |

## Build notes

1. Trace `../../svg/mee.svg` in [rive.app](https://rive.app)
2. Layer names: `body`, `eye_l`, `eye_r`, `pupil_l`, `pupil_r`, `mouth`, `ribbon`, `arm_l`, `arm_r`
3. Triggers must match `../catalog.json` state `id`s
4. Copy to Flutter: `assets/rive/mee.riv`

## Flutter

```yaml
dependencies:
  rive: # pin stable
```

```dart
// Single integration point — do not load raw Rive in random screens
MeeView(state: MeeState.idle)
```

Until `mee.riv` exists, use CSS/SVG preview or static PNG from concepts.
