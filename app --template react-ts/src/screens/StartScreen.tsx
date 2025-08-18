import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors, fonts, ui, ShimmerStyleTag, shimmerOverlayStyle } from "./theme";

export default function StartScreen() {
  const navigate = useNavigate();
  const api = (window as any).api;

  // Prevent scrolling while StartScreen is shown
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const onNewProject = useCallback(async () => {
    try {
      const ok = await api?.newProject?.();
      if (ok) navigate("/project");
    } catch (e) {
      console.error(e);
    }
  }, [api, navigate]);

  const onOpenProject = useCallback(async () => {
    try {
      const ok = await api?.openProject?.();
      if (ok) navigate("/project");
    } catch (e) {
      console.error(e);
    }
  }, [api, navigate]);

  return (
    // This wrapper fills the main content area; App.tsx sidebar remains separate
    <div className="relative w-full h-screen overflow-hidden" style={{ fontFamily: fonts.display }}>
      {/* Background MP4 (HD). 'object-cover' ensures it fills the area on any window size */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
      >
        <source src="/start-bg.mp4" type="video/mp4" />
      </video>

      {/* Optional veil for readability */}
      <div className="absolute inset-0 bg-white/10 z-0" />

      {/* Foreground content */}
      <div className="relative z-10 flex items-center justify-center min-h-full">
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
              className="text-4xl sm:text-5xl font-black tracking-widest relative select-none"
              style={{ fontFamily: fonts.display }}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${colors.magenta}, ${colors.blue})` }}
              >
                BRAINZTORM
              </span>
              {/* Centralized shimmer overlay */}
              <span aria-hidden className="absolute inset-0 pointer-events-none" style={shimmerOverlayStyle()} />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-center mb-8 text-gray-600" style={{ fontFamily: fonts.body }}>
            AI-powered asset generator for YouTube, social media & music videos
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              className={`${ui.btnBase} ${ui.filledMagenta}`}
              style={{ backgroundImage: `linear-gradient(180deg, ${colors.magenta}, #e13ac4)`, fontFamily: fonts.body }}
              onClick={onNewProject}
            >
              New Project
            </button>

            <button
              className={`${ui.btnBase} ${ui.outlineBlue}`}
              style={{ fontFamily: fonts.body }}
              onClick={onOpenProject}
            >
              Open Project
            </button>
          </div>
        </div>
      </div>

      {/* Shimmer keyframes (pulled from centralized theme.tsx) */}
      <ShimmerStyleTag />
    </div>
  );
}
