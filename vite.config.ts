import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";

// SPA fallback: intercept .md file requests and serve index.html instead
const mdFallbackPlugin: Plugin = {
  name: "md-spa-fallback",
  apply: "serve",
  configureServer(server) {
    // Add middleware at the START of the chain (before file serving)
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.url || "";

      // Skip API requests
      if (url.startsWith("/api/")) {
        return next();
      }

      // Skip Vite internal requests
      if (url.includes("@vite") || url.includes("node_modules")) {
        return next();
      }

      // For .md files, serve index.html instead
      if (url.includes(".md")) {
        req.url = "/index.html";
      }

      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), mdFallbackPlugin],
  server: {
    port: 5173,
  },
});
