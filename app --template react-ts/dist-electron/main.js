import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let win = null;
let currentProjectRoot = null;
let suggestedTitle;
function resolvePreloadPath() {
  const mjs = path.join(__dirname, "preload.mjs");
  const js = path.join(__dirname, "preload.js");
  if (fs.existsSync(mjs)) return mjs;
  if (fs.existsSync(js)) return js;
  return fileURLToPath(new URL("./preload.mjs", import.meta.url));
}
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      contextIsolation: true,
      preload: resolvePreloadPath()
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    const indexHtml = path.join(__dirname, "../renderer/index.html");
    win.loadFile(indexHtml);
  }
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
function sanitizeName(name) {
  return name.replace(/[^\w\- ]+/g, "").trim();
}
function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}
function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}
ipcMain.handle("project:new", async () => {
  const res = await dialog.showSaveDialog(win, {
    title: "Create New BRAINZTORM Project",
    defaultPath: path.join(app.getPath("documents"), "My Brainztorm Project"),
    buttonLabel: "Create Project",
    nameFieldLabel: "Project Name",
    showsTagField: false
  });
  if (res.canceled || !res.filePath) return false;
  const folderPath = res.filePath;
  ensureDir(folderPath);
  const project = {
    title: path.basename(folderPath),
    description: "",
    bpm: void 0,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    version: 1
  };
  writeJson(path.join(folderPath, "project.json"), project);
  currentProjectRoot = folderPath;
  suggestedTitle = project.title;
  return true;
});
ipcMain.on("project:suggestedTitle", (event) => {
  event.returnValue = suggestedTitle;
});
ipcMain.handle("project:open", async () => {
  const res = await dialog.showOpenDialog(win, {
    title: "Open BRAINZTORM Project",
    properties: ["openDirectory"]
  });
  if (res.canceled || res.filePaths.length === 0) return false;
  const folderPath = res.filePaths[0];
  const projPath = path.join(folderPath, "project.json");
  const data = readJson(projPath);
  if (!data) {
    await dialog.showMessageBox(win, {
      type: "error",
      message: "project.json not found in that folder.",
      detail: "Select a valid BRAINZTORM project directory."
    });
    return false;
  }
  currentProjectRoot = folderPath;
  suggestedTitle = data.title;
  return true;
});
ipcMain.handle("project:save", async (_event, payload) => {
  if (!currentProjectRoot) {
    await dialog.showMessageBox(win, {
      type: "error",
      message: "No project opened/created.",
      detail: "Use New Project or Open Project from the Start screen."
    });
    return false;
  }
  const projPath = path.join(currentProjectRoot, "project.json");
  const existing = readJson(projPath) || {};
  const next = {
    ...existing,
    title: sanitizeName(payload.title || existing.title || "Untitled"),
    description: payload.description ?? existing.description ?? "",
    bpm: payload.bpm ?? existing.bpm ?? void 0,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  writeJson(projPath, next);
  suggestedTitle = next.title;
  return true;
});
ipcMain.handle("project:get", async () => {
  if (!currentProjectRoot) return null;
  const projPath = path.join(currentProjectRoot, "project.json");
  try {
    const data = JSON.parse(fs.readFileSync(projPath, "utf-8"));
    return {
      title: data.title ?? "",
      description: data.description ?? "",
      bpm: typeof data.bpm === "number" ? data.bpm : void 0,
      projectRoot: currentProjectRoot
    };
  } catch {
    return null;
  }
});
