import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { colors, fonts, ui } from "./theme";

// NOTE: Put your logo files in /public for easy referencing.
// Brain icon: /public/BRAINZTORM_DEMO_LOGO_V1.png

export default function StartScreen() {
  const navigate = useNavigate();

  const onNewProject = useCallback(async () => {
    try {
      // Bridge to Electron (we’ll implement in preload/main later)
      const ok = await (window as any)?.api?.newProject?.();
      if (ok) navigate("/project");
    } catch (e) {
      console.error(e);
      // Optionally show a toast/alert
    }
  }, [navigate]);

  const onOpenProject = useCallback(async () => {
    try {
      const ok = await (window as any)?.api?.openProject?.();
      if (ok) navigate("/project");
    } catch (e) {
      console.error(e);
    }
  }, [navigate]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        // Only the opening page gets the trancey gradient
        background:
          `radial-gradient(1200px 800px at 50% 30%, ${colors.startB}22 0%, transparent 60%),` +
          `radial-gradient(800px 600px at 20% 80%, ${colors.startC}33 0%, transparent 60%),` +
          `linear-gradient(160deg, ${colors.startA} 0%, ${colors.white} 40%, ${colors.startB} 100%)`,
      }}
    >
      <div className="w-full max-w-3xl mx-auto px-6 py-12 rounded-2xl bg-white/70 backdrop-blur-sm border border-black/10 shadow-xl">
        {/* Logo Row */}
        <div className="flex items-center justify-center gap-5 mb-8">
          <img
            src="/BRAINZTORM_DEMO_LOGO_V1.png"
            alt="BRAINZTORM brain"
            className="w-20 h-20 drop-shadow"
            draggable={false}
          />
          <div
            className="text-4xl sm:text-5xl font-black tracking-widest"
            style={{ fontFamily: fonts.display, position: "relative" }}
          >
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${colors.magenta}, ${colors.blue})`,
              }}
            >
              BRAINZTORM
            </span>
            {/* Subtle animated shimmer overlay */}
            <span
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                maskImage:
                  "linear-gradient(75deg, transparent 40%, black 50%, transparent 60%)",
                WebkitMaskImage:
                  "linear-gradient(75deg, transparent 40%, black 50%, transparent 60%)",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.65), rgba(255,255,255,0.0))",
                animation: "shimmer 3s linear infinite",
              }}
            />
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-center mb-8 text-gray-600"
          style={{ fontFamily: fonts.body }}
        >
          AI-powered asset generator for YouTube, social media & music videos
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-3">
          {/* New Project (Magenta) */}
          <button
            className={`${ui.btnBase} ${ui.filledMagenta}`}
            style={{
              backgroundImage: `linear-gradient(180deg, ${colors.magenta}, #e13ac4)`,
              fontFamily: fonts.body,
            }}
            onClick={onNewProject}
          >
            New Project
          </button>

          {/* Open Project (Light Blue outline) */}
          <button
            className={`${ui.btnBase} ${ui.outlineBlue}`}
            style={{ fontFamily: fonts.body }}
            onClick={onOpenProject}
          >
            Open Project
          </button>
        </div>
      </div>

      {/* keyframes for shimmer */}
      <style>
        {`
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        `}
      </style>
    </div>
  );
}
