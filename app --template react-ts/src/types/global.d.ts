export {}

declare global {
  interface Window {
    api?: {
      newProject: () => Promise<boolean>
      openProject: () => Promise<boolean>
      getProject: () => Promise<{
        title: string
        description: string
        bpm?: number
        projectRoot: string
      } | null>
      getSuggestedTitle: () => string | undefined
      saveProject: (payload: { title: string; description: string; bpm?: number }) => Promise<boolean>
    }
  }
}
