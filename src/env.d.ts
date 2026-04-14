type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface Env {
  CLIPS_KV: KVNamespace;
  ADMIN_PASSWORD: string;
  ASSETS: Fetcher;
}
