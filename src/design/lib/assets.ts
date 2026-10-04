export const logos = {
  cube: "/brand/academe_cube.png",
  mark: "/brand/logo_mark.png",
} as const;

export type PebbyPose = {
  id: string;
  src: string;
  label: string;
  moment: string;
};

const pose = (id: string, label: string, moment: string): PebbyPose => ({
  id,
  src: `/pebby/${id}.png`,
  label,
  moment,
});

export const pebbyPoses: PebbyPose[] = [
  pose("wave", "Wave", "Welcome"),
  pose("happy", "Happy", "Good news"),
  pose("encourage", "Encourage", "Nudges, limits"),
  pose("reading", "Reading", "Lessons"),
  pose("chat", "Chat", "Ask Pebby"),
  pose("solving", "Solving", "Scan"),
  pose("idea", "Idea", "Here's why"),
  pose("focused", "Focused", "Folders, plan"),
  pose("determined", "Determined", "Revision, tests"),
  pose("celebrate", "Celebrate", "Lesson done"),
];

export const pebbyHero = "/pebby/wave.png";
export const pebbyMotion = "/pebby/celebrate.png";
