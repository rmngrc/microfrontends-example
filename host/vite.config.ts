import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import pkg from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    federation({
      name: "host",
      remotes: {
        remote_navbar: {
          type: "module",
          name: "remote_navbar",
          entry: "http://localhost:3001/RemoteNavbar.js",
          entryGlobalName: "remote_navbar",
          shareScope: "default",
        },
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: pkg.dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: pkg.dependencies["react-dom"],
        },
      },
    }),
    react(),
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
  server: {
    origin: "http://localhost:3000",
  },
});
