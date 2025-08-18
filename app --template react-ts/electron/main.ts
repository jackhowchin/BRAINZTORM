import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { execFile } from 'node:child_process'

// --- Fix __dirname for ESM ---
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let win: BrowserWindow | null = null

// In-memory project state
let currentProjectRoot: string | null = null
let suggestedTitle: string | undefined

function resolvePreloadPath() {
  // electron-vite often outputs preload.mjs (dev) and preload.js (prod) depending on config
  const mjs = path.join(__dirname, 'preload.mjs')
  const js = path.join(__dirname, 'preload.js')
  if (fs.existsSync(mjs)) return mjs
  if (fs.existsSync(js)) return js
  // Fallback using URL form (works in ESM too)
  return fileURLToPath(new URL('./preload.mjs', import.meta.url))
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      contextIsolation: true,
      preload: resolvePreloadPath(),
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    // dist layout: dist-electron/main.js next to ../renderer/index.html
    const indexHtml = path.join(__dirname, '../renderer/index.html')
    win.loadFile(indexHtml)
  }
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// --------- Helpers ----------
function sanitizeName(name: string) {
  return name.replace(/[^\w\- ]+/g, '').trim()
}
function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}
function writeJson(filePath: string, data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
function readJson<T = any>(filePath: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
  } catch {
    return null
  }
}

// Resolve .icns both in dev and packaged app
function getIcnsPath() {
  // When packaged, resourcesPath points to: <App>.app/Contents/Resources
  const prod = path.join(process.resourcesPath || '', 'assets', 'brainztorm-folder.icns')
  // During dev, use the source file
  const dev = path.join(app.getAppPath(), 'src', 'assets', 'brainztorm-folder.icns')
  return fs.existsSync(prod) ? prod : dev
}

// Apply a custom Finder icon to a folder using the `fileicon` CLI
function setFolderIcon(folderPath: string) {
  const icns = getIcnsPath()
  if (!fs.existsSync(icns)) {
    console.warn('Icon file not found:', icns)
    return
  }
  execFile('fileicon', ['set', folderPath, icns], (err) => {
    if (err) console.warn('fileicon set failed:', err.message)
  })
}

// ---------- IPC: New Project ----------
ipcMain.handle('project:new', async () => {
  const res = await dialog.showSaveDialog(win!, {
    title: 'Create New BRAINZTORM Project',
    defaultPath: path.join(app.getPath('documents'), 'My Brainztorm Project'),
    buttonLabel: 'Create Project',
    nameFieldLabel: 'Project Name',
    showsTagField: false,
  })
  if (res.canceled || !res.filePath) return false

  const folderPath = res.filePath
  ensureDir(folderPath)

  const project = {
    title: path.basename(folderPath),
    description: '',
    bpm: undefined as number | undefined,
    createdAt: new Date().toISOString(),
    version: 1,
  }
  writeJson(path.join(folderPath, 'project.json'), project)

  // Brand the folder with the custom icon (non-fatal if it fails)
  setFolderIcon(folderPath)

  currentProjectRoot = folderPath
  suggestedTitle = project.title
  return true
})

// Suggested title after creating a new project
ipcMain.on('project:suggestedTitle', (event) => {
  event.returnValue = suggestedTitle
})

// ---------- IPC: Open Existing ----------
ipcMain.handle('project:open', async () => {
  const res = await dialog.showOpenDialog(win!, {
    title: 'Open BRAINZTORM Project',
    properties: ['openDirectory'],
  })
  if (res.canceled || res.filePaths.length === 0) return false

  const folderPath = res.filePaths[0]
  const projPath = path.join(folderPath, 'project.json')
  const data = readJson(projPath)
  if (!data) {
    await dialog.showMessageBox(win!, {
      type: 'error',
      message: 'project.json not found in that folder.',
      detail: 'Select a valid BRAINZTORM project directory.',
    })
    return false
  }

  // Optionally brand existing folders too (safe to keep; remove if undesired)
  setFolderIcon(folderPath)

  currentProjectRoot = folderPath
  suggestedTitle = (data as any).title
  return true
})

// ---------- IPC: Save from Project Setup ----------
ipcMain.handle('project:save', async (_event, payload: { title: string; description: string; bpm?: number }) => {
  if (!currentProjectRoot) {
    await dialog.showMessageBox(win!, {
      type: 'error',
      message: 'No project opened/created.',
      detail: 'Use New Project or Open Project from the Start screen.',
    })
    return false
  }
  const projPath = path.join(currentProjectRoot, 'project.json')
  const existing = readJson(projPath) || {}

  const next = {
    ...existing,
    title: sanitizeName(payload.title || (existing as any).title || 'Untitled'),
    description: payload.description ?? (existing as any).description ?? '',
    bpm: payload.bpm ?? (existing as any).bpm ?? undefined,
    updatedAt: new Date().toISOString(),
  }

  writeJson(projPath, next)
  suggestedTitle = next.title
  return true
})

// ---------- IPC: Get current project (hydrate UI) ----------
ipcMain.handle('project:get', async () => {
  if (!currentProjectRoot) return null
  const projPath = path.join(currentProjectRoot, 'project.json')
  try {
    const data = JSON.parse(fs.readFileSync(projPath, 'utf-8'))
    return {
      title: data.title ?? '',
      description: data.description ?? '',
      bpm: typeof data.bpm === 'number' ? data.bpm : undefined,
      projectRoot: currentProjectRoot,
    }
  } catch {
    return null
  }
})
