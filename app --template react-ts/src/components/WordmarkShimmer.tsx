import { colors, fonts, ShimmerStyleTag, shimmerOverlayStyle } from "../screens/theme";

type Props = { size?: "sm" | "md" | "lg"; className?: string };

export default function WordmarkShimmer({ size = "md", className = "" }: Props) {
  const fontSize =
    size === "lg" ? "text-3xl sm:text-4xl" :
    size === "sm" ? "text-base sm:text-lg" :
    "text-xl sm:text-2xl";

  return (
    <div
      className={`relative select-none tracking-widest ${fontSize} ${className}`}
      style={{ fontFamily: fonts.display }}
    >
      <span
        className="bg-clip-text text-transparent"
        style={{ backgroundImage: `linear-gradient(90deg, ${colors.magenta}, ${colors.blue})` }}
      >
        BRAINZTORM
      </span>

      {/* Shimmer overlay, centralized via theme.ts */}
      <span aria-hidden className="absolute inset-0 pointer-events-none" style={shimmerOverlayStyle()} />

      {/* Inject keyframes for this view */}
      <ShimmerStyleTag />
    </div>
  );
}
