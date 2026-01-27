import fs from "fs";
import path from "path";
import serveStatic from "serve-static";
import type { ViteDevServer } from "vite";

export function docsDirPlugin(externalDir: string, projectRoot: string) {
  return {
    name: "docs-dir",
    configureServer(server: ViteDevServer) {
      // smart middleware: serve README.md at root and resolve extensionless paths to .md files
      server.middlewares.use(async (req, res, next) => {
        try {
          if (req.method && req.method.toUpperCase() !== "GET") return next();
          const accept = (req.headers && (req.headers.accept as string)) || "";
          if (accept.includes("text/html")) return next();

          const orig = req.url || "/";
          const pathname = decodeURIComponent((orig.split("?")[0] || "/").split("#")[0]);

          const existsFile = (p: string) => {
            try {
              return fs.existsSync(p) && fs.statSync(p).isFile();
            } catch {
              return false;
            }
          };

          // root -> prefer project README.md then external README.md
          if (pathname === "/" || pathname === "") {
            const projReadme = path.join(projectRoot, "README.md");
            const extReadme = path.join(externalDir, "README.md");
            if (existsFile(projReadme)) {
              req.url = "/" + path.relative(projectRoot, projReadme).replace(/\\\\/g, "/");
              return next();
            }
            if (existsFile(extReadme)) {
              req.url = "/docs/README.md";
              return next();
            }
            return next();
          }

          // if request has extension, pass through (static assets)
          if (path.extname(pathname)) return next();

          // try project-root .md or index.md
          const projCandidates = [
            path.join(projectRoot, pathname + ".md"),
            path.join(projectRoot, pathname, "index.md"),
          ];
          for (const c of projCandidates) {
            if (existsFile(c)) {
              req.url = "/" + path.relative(projectRoot, c).replace(/\\\\/g, "/");
              return next();
            }
          }

          // try external dir and map to /docs mount
          const extCandidates = [
            path.join(externalDir, pathname + ".md"),
            path.join(externalDir, pathname, "index.md"),
          ];
          for (const c of extCandidates) {
            if (existsFile(c)) {
              const rel = path.relative(externalDir, c).replace(/\\\\/g, "/");
              req.url = "/docs/" + rel;
              return next();
            }
          }

          return next();
        } catch (e) {
          return next();
        }
      });

      // mount external folder at /docs
      server.middlewares.use("/docs", serveStatic(externalDir));
    },
  };
}
