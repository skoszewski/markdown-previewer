// Declarations for plugins without types to satisfy TypeScript and VS Code
declare module "vite-plugin-static-copy" {
  import { Plugin } from "vite";
  export function viteStaticCopy(options: any): Plugin;
}

declare module "serve-static" {
  // minimal typing to avoid pulling in express types
  function serveStatic(root: string, options?: any): any;
  export = serveStatic;
}
