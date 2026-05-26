/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_PORT: number;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_BASE_API: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_TENANT_ENABLED?: string;
  readonly VITE_MOCK_DEV_SERVER: boolean;
  readonly VITE_APP_SSE_ENABLED?: string;
  readonly VITE_APP_SSE_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
