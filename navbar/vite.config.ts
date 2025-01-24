import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: "navbar",
      filename: "RemoteNavbar.js",
      exposes: {
        "./Navbar": "./src/Navbar.tsx",
      },
    }),
    react(),
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
  server: { origin: "http://localhost:3001" },
});
