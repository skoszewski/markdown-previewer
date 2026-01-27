import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

import { docsDirPlugin } from "./src/docsDirPlugin";
import fs from "fs";

type Config = {
  relativeDocsPath?: string;
  port?: number;
};

// read relativeDocsPath from config.json if it exists
const config: Config = (() => {
  try {
    const raw = fs.readFileSync("config.json", "utf-8");
    const configObject = JSON.parse(raw) as Config;
    return configObject;
  } catch {
    return {};
  }
})();

const externalDir = resolve(__dirname, config.relativeDocsPath || ".");
const projectRoot = resolve(__dirname);

export default defineConfig({
  plugins: [
    react(),
    docsDirPlugin(externalDir, projectRoot),
  ],
  server: {
    port:  config.port || 5173,
    fs: {
      // include both the external folder and the project root so index.html and other project files are served
      allow: [externalDir, projectRoot],
    },
  },
});