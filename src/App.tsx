import MarkdownViewer from "./MarkdownViewer";

export default function App() {
  return <MarkdownViewer url="/docs/README.md" pollIntervalMs={1500} />;
}