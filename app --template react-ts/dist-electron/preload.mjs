"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  // Create a new project (Save dialog)
  newProject: async () => {
    return await electron.ipcRenderer.invoke("project:new");
  },
  // Open an existing project (folder picker)
  openProject: async () => {
    return await electron.ipcRenderer.invoke("project:open");
  },
  // Retrieve current project.json (if a project is open)
  getProject: async () => {
    return await electron.ipcRenderer.invoke("project:get");
  },
  // Suggested title after creating a new project (from folder name)
  getSuggestedTitle: () => {
    return electron.ipcRenderer.sendSync("project:suggestedTitle");
  },
  // Save updates from Project Setup
  saveProject: async (payload) => {
    return await electron.ipcRenderer.invoke("project:save", payload);
  }
});
