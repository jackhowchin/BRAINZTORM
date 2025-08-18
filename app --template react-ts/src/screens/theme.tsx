// Centralized theme + shimmer utilities (TSX so we can return a <style> tag)

export const colors = {
  white: "#FFFFFF",
  textPrimary: "#0B0F12",
  textSecondary: "#4B5563",

  magenta: "#FF4FD8",
  blue: "#4FC3FF",
  blueDeep: "#0EA5E9",

  stroke: "rgba(0,0,0,0.12)",
  strokeStrong: "rgba(0,0,0,0.22)",

  startA: "#B3E5FF",
  startB: "#4FC3FF",
  startC: "#D6B4FF",
};

export const fonts = {
  display: "'Orbitron', system-ui, sans-serif",
  body: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
};

export const ui = {
  btnBase:
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 transition-all duration-150 " +
    "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_0_0_2px_rgba(0,0,0,0.18)] focus:outline-none",
  filledMagenta: "text-white",
  outlineBlue: "border border-black/10 bg-white text-black",
};

/**
 * ===== SHIMMER CONFIG (edit here) =====
 * Reduce |startXPercent|/|endXPercent| to keep the sweep tighter to the text.
 * Example tighter: -70 / 70; longer: -120 / 120
 */
export const shimmer = {
  startXPercent: -80,
  endXPercent: 60,
  durationMs: 3000,
  maskGradient:
    "linear-gradient(75deg, transparent 40%, black 50%, transparent 60%)",
  bgGradient:
    "linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.65), rgba(255,255,255,0.0))",
};

/** Inline style for the moving overlay span */
export function shimmerOverlayStyle(): React.CSSProperties {
  return {
    maskImage: shimmer.maskGradient,
    WebkitMaskImage: shimmer.maskGradient,
    background: shimmer.bgGradient,
    animation: `brainz-shimmer ${shimmer.durationMs}ms linear infinite`,
  };
}

/** Inject keyframes (include once per screen, or put in App.tsx to be global) */
export function ShimmerStyleTag() {
  const { startXPercent, endXPercent } = shimmer;
  return (
    <style>{`
      @keyframes brainz-shimmer {
        0%   { transform: translateX(${startXPercent}%); }
        100% { transform: translateX(${endXPercent}%); }
      }
    `}</style>
  );
}
