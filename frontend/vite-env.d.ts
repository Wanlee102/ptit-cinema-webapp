/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_CLIENT_ID: string
    readonly VITE_API_URL: string
    readonly VITE_LLM_URL: string
    readonly VITE_BASE_URL: string
    // more env variables...
  }

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
