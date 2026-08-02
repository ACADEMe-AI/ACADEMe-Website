import { createContext, useContext } from "react";

export type ExpandPayload = {
  path: string;
  label: string;
  color: string;
  fg?: string;
  rect: DOMRect;
};

export type ExpandContextValue = {
  startExpand: (payload: ExpandPayload) => void;
  /** Navbar logo → home (cube flies to center) */
  goHome: (logoRect: DOMRect) => void;
  /** Hamburger “Back to home” → cards fly in and reassemble */
  goHomeCards: () => void;
  landingColor: string | null;
  clearLanding: () => void;
  homeHandoff: "off" | "hide-mark" | "crossfade";
  /** Home should land on full board (skip intro scroll) */
  preferAssembledBoard: boolean;
  clearPreferAssembled: () => void;
};

export const ExpandContext = createContext<ExpandContextValue | null>(null);

export function useExpand() {
  const ctx = useContext(ExpandContext);
  if (!ctx) throw new Error("useExpand must be used within ExpandProvider");
  return ctx;
}