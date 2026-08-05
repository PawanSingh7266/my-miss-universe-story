// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    build: {
      // Inline the gallery photos into the bundle so they are always served with
      // the app itself (works on Lovable, Vercel, GitHub Pages — no static-asset
      // hosting assumptions, no 404s on hashed asset URLs).
      assetsInlineLimit: (filePath: string) =>
        /src[\\/]assets[\\/]photo\d+\.jpg$/.test(filePath) ? true : undefined,
    },
  },
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});
