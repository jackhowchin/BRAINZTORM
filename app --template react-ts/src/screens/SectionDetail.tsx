import { useParams } from 'react-router-dom'

export default function SectionDetail() {
  const { id } = useParams()

  return (
    <div className="max-w-2xl space-y-4">
      <h2 className="text-2xl font-semibold">Section {id}</h2>

      <label className="block">
        <span className="text-sm text-gray-600">Section Title</span>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="e.g., Dreamy Intro"
        />
      </label>

      <fieldset className="border rounded p-4">
        <legend className="text-sm text-gray-600 px-1">Assets</legend>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Blender Background Video
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Blender LiDAR 360 Spin
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Hydra (code + 8-beat video)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> AI Image/Texture
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> AI Video
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" /> AI 3D Model
          </label>
        </div>
      </fieldset>

      <fieldset className="border rounded p-4">
        <legend className="text-sm text-gray-600 px-1">References</legend>
        <div className="grid gap-3">
          <input
            className="border rounded px-3 py-2"
            placeholder="Colors (primary/secondary/accent)"
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Object refs / Sketch"
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Textures / LiDAR file"
          />
        </div>
      </fieldset>

      <button className="px-4 py-2 rounded bg-black text-white">
        Save Section
      </button>
    </div>
  )
}
