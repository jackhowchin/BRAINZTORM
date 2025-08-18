// Centralized theme tokens so you can tweak the vibe quickly.
export const colors = {
  white: "#FFFFFF",
  textPrimary: "#0B0F12",
  textSecondary: "#4B5563",

  magenta: "#FF4FD8",    // Primary action (New Project, Save when dirty)
  blue: "#4FC3FF",       // Secondary action (Open, Save when clean)
  blueDeep: "#0EA5E9",

  // For subtle outlines/inner-stroke effects
  stroke: "rgba(0,0,0,0.12)",
  strokeStrong: "rgba(0,0,0,0.22)",

  // Start screen gradient stops (trancey)
  startA: "#B3E5FF",
  startB: "#4FC3FF",
  startC: "#D6B4FF",
};

export const fonts = {
  display: "'Orbitron', system-ui, sans-serif",
  body: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
};

// Simple class helpers
export const ui = {
  // Button base + hover inner stroke using inset shadow
  btnBase:
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 transition-all duration-150 " +
    "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.18)] focus:outline-none",

  // Filled + Outline button variants we’ll compose onto btnBase
  filledMagenta: "text-white",
  outlineBlue: "border border-black/10 bg-white text-black",
};
