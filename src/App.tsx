import { useEffect, useState } from "react";
import MarkdownViewer from "./MarkdownViewer";

export default function App() {
  const [filePath, setFilePath] = useState<string>("/README.md");

  useEffect(() => {
    // Extract the requested file path from the URL
    const path = window.location.pathname;

    if (path === "/" || path === "") {
      // Root: request README.md (server will try README.md, then index.md)
      setFilePath("/");
    } else {
      // Use the path as-is (server handles directory/file resolution)
      setFilePath(path);
    }
  }, []);

  return <MarkdownViewer filePath={filePath} pollIntervalMs={1500} />;
}
