export default function ProjectSetup() {
  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-2xl font-semibold">Project Setup</h2>

      <label className="block">
        <span className="text-sm text-gray-600">Title</span>
        <input
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="My Video Project"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Description</span>
        <textarea
          className="mt-1 w-full border rounded px-3 py-2"
          rows={4}
          placeholder="What is this about?"
        />
      </label>

      <label className="block">
        <span className="text-sm text-gray-600">Global BPM</span>
        <input
          type="number"
          className="mt-1 w-40 border rounded px-3 py-2"
          placeholder="120"
        />
      </label>

      <button className="px-4 py-2 rounded bg-black text-white">
        Save
      </button>
    </div>
  )
}
