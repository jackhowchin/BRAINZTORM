export default function Settings() {
  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-2xl font-semibold">Settings</h2>

      <label className="block">
        <span className="text-sm text-gray-600">OpenAI API Key</span>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="sk-..."
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Runway API Key</span>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="..."
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Meshy API Key</span>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="..."
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Blender Path</span>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="/Applications/Blender.app/Contents/MacOS/Blender"
        />
      </label>

      <button className="px-4 py-2 rounded bg-black text-white">
        Save Settings
      </button>
    </div>
  )
}
