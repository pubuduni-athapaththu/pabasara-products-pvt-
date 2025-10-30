/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // add more env variables here if needed, e.g.:
  // readonly VITE_OTHER_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
