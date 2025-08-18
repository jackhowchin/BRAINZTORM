import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors, fonts, ui, ShimmerStyleTag, shimmerOverlayStyle } from "./theme";

type SavePayload = { title: string; description: string; bpm?: number };

export default function ProjectSetup() {
  const navigate = useNavigate();
  const api = (window as any).api;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [bpm, setBpm] = useState<string>("");

  const initial = useRef<{ title: string; desc: string; bpm: string } | null>(null);

  useEffect(() => {
    let mounted = true;
    async function hydrate() {
      const loaded = await api?.getProject?.();
      if (mounted && loaded) {
        const loadedBpm = typeof loaded.bpm === "number" ? String(loaded.bpm) : "";
        setTitle(loaded.title || "");
        setDesc(loaded.description || "");
        setBpm(loadedBpm);
        initial.current = { title: loaded.title || "", desc: loaded.description || "", bpm: loadedBpm };
        return;
      }
      const suggested = api?.getSuggestedTitle?.();
      if (mounted) {
        setTitle(suggested || "");
        initial.current = { title: suggested || "", desc: "", bpm: "" };
      }
    }
    hydrate();
    return () => { mounted = false; };
  }, [api]);

  const isDirty = useMemo(() => {
    const snap = initial.current;
    if (!snap) return false;
    return title !== snap.title || desc !== snap.desc || (bpm || "") !== (snap.bpm || "");
  }, [title, desc, bpm]);

  const onSave = async () => {
    try {
      const ok = await api?.saveProject?.({ title, description: desc, bpm: bpm ? Number(bpm) : undefined } as SavePayload);
      if (ok) navigate("/sections");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      {/* Header with shimmering wordmark */}
      <div className="flex items-center justify-between">
        <div className="text-xl tracking-widest relative select-none" style={{ fontFamily: fonts.display }}>
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(90deg, ${colors.magenta}, ${colors.blue})` }}
          >
            BRAINZTORM
          </span>
          <span aria-hidden className="absolute inset-0 pointer-events-none" style={shimmerOverlayStyle()} />
        </div>

        <button
          className={`${ui.btnBase} ${ui.outlineBlue}`}
          style={{ fontFamily: fonts.body }}
          onClick={() => navigate("/sections")}
        >
          Skip to Sections
        </button>
      </div>

      {/* Form */}
      <div className="grid gap-4">
        <label className="block">
          <span className="text-sm text-gray-600" style={{ fontFamily: fonts.body }}>
            Project Title
          </span>
          <input
            className="mt-1 w-full border rounded-lg px-3 py-2"
            placeholder="My Video Project"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ fontFamily: fonts.body }}
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600" style={{ fontFamily: fonts.body }}>
            Overall Description
          </span>
          <textarea
            className="mt-1 w-full border rounded-lg px-3 py-2"
            rows={5}
            placeholder="Describe the concept, mood, and references..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{ fontFamily: fonts.body }}
          />
        </label>

        <div className="grid grid-cols-[auto_auto_1fr] gap-3 items-end">
          <label className="block">
            <span className="text-sm text-gray-600" style={{ fontFamily: fonts.body }}>
              Global BPM
            </span>
            <input
              type="number"
              className="mt-1 w-40 border rounded-lg px-3 py-2"
              placeholder="120"
              value={bpm}
              onChange={(e) => setBpm(e.target.value)}
              style={{ fontFamily: fonts.body }}
            />
          </label>

          <button
            className={`${ui.btnBase} ${ui.outlineBlue}`}
            style={{ fontFamily: fonts.body, whiteSpace: "nowrap" }}
            onClick={() => alert("BPM detection via audio: coming soon")}
          >
            or upload audio to identify bpm
          </button>

          <div className="h-0" />
        </div>
      </div>

      {/* Defaults / spec info */}
      <div className="rounded-lg p-3 border" style={{ borderColor: colors.stroke, fontFamily: fonts.body }}>
        <div className="text-sm text-gray-600">
          Defaults: 4K / 30fps · Blender BG 20s · LiDAR spin 6s · Hydra 8-beat.
          You can change section assets later.
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          className={ui.btnBase}
          onClick={onSave}
          style={{
            fontFamily: fonts.body,
            color: isDirty ? "#fff" : "#000",
            backgroundImage: isDirty
              ? `linear-gradient(180deg, ${colors.magenta}, #e13ac4)`
              : `linear-gradient(180deg, ${colors.blue}, #32b6fb)`,
          }}
        >
          Save & Continue
        </button>
      </div>

      {/* Keyframes once for this screen */}
      <ShimmerStyleTag />
    </div>
  );
}
