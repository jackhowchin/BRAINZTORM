export default function StartScreen() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Welcome</h2>
      <p className="text-gray-600">
        Create a new BRAINZTORM project or open an existing one.
      </p>
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded bg-black text-white">
          New Project
        </button>
        <button className="px-4 py-2 rounded border">
          Open Project
        </button>
      </div>
    </div>
  )
}
