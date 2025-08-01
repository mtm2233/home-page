/// <reference types="vite/client" />

type DefineEnv = Readonly<{
  VITE_SERVE_URL: string

  VITE_OAUTH_CLIENT_ID?: string
  VITE_OAUTH_REDIRECT_URI?: string
}>

// loadEnv(mode, process.cwd()) || import.meta.env
type LoadViteEnv = {
  readonly [P in keyof DefineEnv]: string
}

interface ImportMetaEnv extends LoadViteEnv {}

interface ViteEnv extends DefineEnv, ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
