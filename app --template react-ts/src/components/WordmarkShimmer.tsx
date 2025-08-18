import { colors, fonts } from "../screens/theme";

type Props = { size?: "sm" | "md" | "lg"; className?: string };

export default function WordmarkShimmer({ size = "md", className = "" }: Props) {
  const fontSize =
    size === "lg" ? "text-3xl sm:text-4xl" :
    size === "sm" ? "text-base sm:text-lg" :
    "text-xl sm:text-2xl";

  return (
    <div className={`relative select-none tracking-widest ${fontSize} ${className}`} style={{ fontFamily: fonts.display }}>
      <span
        className="bg-clip-text text-transparent"
        style={{ backgroundImage: `linear-gradient(90deg, ${colors.magenta}, ${colors.blue})` }}
      >
        BRAINZTORM
      </span>
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "linear-gradient(75deg, transparent 40%, black 50%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(75deg, transparent 40%, black 50%, transparent 60%)",
          background: "linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.65), rgba(255,255,255,0.0))",
          animation: "shimmer 3s linear infinite",
        }}
      />
      <style>
        {`@keyframes shimmer{0%{transform:translateX(-120%)}100%{transform:translateX(120%)}}`}
      </style>
    </div>
  );
}
