// Minimal, safe bridge from renderer → main via IPC.
import { contextBridge, ipcRenderer } from 'electron'

type SavePayload = { title: string; description: string; bpm?: number }
type ProjectData = { title: string; description: string; bpm?: number; projectRoot: string }

contextBridge.exposeInMainWorld('api', {
  // Create a new project (Save dialog)
  newProject: async (): Promise<boolean> => {
    return await ipcRenderer.invoke('project:new')
  },

  // Open an existing project (folder picker)
  openProject: async (): Promise<boolean> => {
    return await ipcRenderer.invoke('project:open')
  },

  // Retrieve current project.json (if a project is open)
  getProject: async (): Promise<ProjectData | null> => {
    return await ipcRenderer.invoke('project:get')
  },

  // Suggested title after creating a new project (from folder name)
  getSuggestedTitle: (): string | undefined => {
    return ipcRenderer.sendSync('project:suggestedTitle')
  },

  // Save updates from Project Setup
  saveProject: async (payload: SavePayload): Promise<boolean> => {
    return await ipcRenderer.invoke('project:save', payload)
  },
})
