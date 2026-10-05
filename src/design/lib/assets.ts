/** Official transparent assets for the design system site. */

/** Transparent PNG marks only (backgrounds removed). */
export const logos = {
  /** Light cube for dark surfaces — transparent */
  onDark: "/brand/logo-black-bg-removed.png",
  /** Dark cube for light surfaces — transparent (preferred default) */
  onLight: "/brand/logo-white-bg-removed.png",
  onDarkSource: "logo-black-bg-removed.png",
  onLightSource: "logo-white-bg-removed.png",
} as const;

export type MascotPose = {
  src: string;
  label: string;
  id: string;
};

export const expressions: MascotPose[] = [
  { id: "happy", src: "/mascot/happy.png", label: "Happy" },
  { id: "laughing", src: "/mascot/laughing.png", label: "Laughing" },
  { id: "excited", src: "/mascot/excited.png", label: "Excited" },
  { id: "cheering", src: "/mascot/cheering.png", label: "Cheering" },
  { id: "thinking", src: "/mascot/thinking.png", label: "Thinking" },
  { id: "focused", src: "/mascot/focused.png", label: "Focused" },
  { id: "confused", src: "/mascot/confused.png", label: "Confused" },
  { id: "surprised", src: "/mascot/surprised.png", label: "Surprised" },
  { id: "proud", src: "/mascot/proud.png", label: "Proud" },
  { id: "shy", src: "/mascot/shy.png", label: "Shy" },
  { id: "tired", src: "/mascot/tired.png", label: "Tired" },
  { id: "determined", src: "/mascot/determined.png", label: "Determined" },
  { id: "sad", src: "/mascot/sad.png", label: "Sad" },
  { id: "sleeping", src: "/mascot/sleeping.png", label: "Sleeping" },
  { id: "loved", src: "/mascot/loved.png", label: "Loved" },
  { id: "wow", src: "/mascot/wow.png", label: "Wow" },
];

export const actions: MascotPose[] = [
  { id: "act_reading", src: "/mascot/act_reading.png", label: "Reading" },
  { id: "act_studying", src: "/mascot/act_studying.png", label: "Studying" },
  { id: "act_idea", src: "/mascot/act_idea.png", label: "Got an idea" },
  { id: "act_solving", src: "/mascot/act_solving.png", label: "Solving" },
  { id: "act_achieved", src: "/mascot/act_achieved.png", label: "Achieved" },
  { id: "act_highfive", src: "/mascot/act_highfive.png", label: "High five" },
];

export const turnaround: MascotPose[] = [
  { id: "turn_front", src: "/mascot/turn_front.png", label: "Front" },
  { id: "turn_three_quarter", src: "/mascot/turn_three_quarter.png", label: "3/4" },
  { id: "turn_side", src: "/mascot/turn_side.png", label: "Side" },
  { id: "turn_back", src: "/mascot/turn_back.png", label: "Back" },
  {
    id: "turn_three_quarter_back",
    src: "/mascot/turn_three_quarter_back.png",
    label: "3/4 back",
  },
];

export const productPoses: MascotPose[] = [
  { id: "idle", src: "/mascot/idle.png", label: "Default" },
  { id: "thinking", src: "/mascot/thinking.png", label: "Thinking" },
  { id: "studying", src: "/mascot/studying.png", label: "Studying" },
  { id: "celebrate", src: "/mascot/celebrate.png", label: "Celebrate" },
  { id: "wave", src: "/mascot/wave.png", label: "Wave" },
];

export const heroSrc = "/mascot/hero.png";
