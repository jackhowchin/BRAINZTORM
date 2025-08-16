import { HashRouter, Routes, Route, NavLink } from 'react-router-dom'
import StartScreen from './screens/StartScreen'
import ProjectSetup from './screens/ProjectSetup'
import Sections from './screens/Sections'
import SectionDetail from './screens/SectionDetail'
import Settings from './screens/Settings'

function App() {
  return (
    <HashRouter>
      <div className="h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 border-r p-4 space-y-3">
          <h1 className="text-xl font-semibold">BRAINZTORM</h1>
          <nav className="flex flex-col gap-1">
            <NavLink className="px-3 py-2 rounded hover:bg-gray-100" to="/">Start</NavLink>
            <NavLink className="px-3 py-2 rounded hover:bg-gray-100" to="/project">Project Setup</NavLink>
            <NavLink className="px-3 py-2 rounded hover:bg-gray-100" to="/sections">Sections</NavLink>
            <NavLink className="px-3 py-2 rounded hover:bg-gray-100" to="/settings">Settings</NavLink>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto bg-white">
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/project" element={<ProjectSetup />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/sections/:id" element={<SectionDetail />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

export default App
