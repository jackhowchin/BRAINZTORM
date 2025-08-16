import { Link } from 'react-router-dom'

export default function Sections() {
  const sections = [
    { id: 1, name: 'Intro' },
    { id: 2, name: 'Verse A' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Sections</h2>
        <button className="px-3 py-2 rounded bg-black text-white">
          Add Section
        </button>
      </div>

      <ul className="divide-y">
        {sections.map((s) => (
          <li key={s.id} className="py-3 flex items-center justify-between">
            <div className="font-medium">{s.name}</div>
            <div className="flex gap-2">
              <Link
                to={`/sections/${s.id}`}
                className="px-3 py-1 rounded border"
              >
                Edit
              </Link>
              <button className="px-3 py-1 rounded border">↑</button>
              <button className="px-3 py-1 rounded border">↓</button>
              <button className="px-3 py-1 rounded border text-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
