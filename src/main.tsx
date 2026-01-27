import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// Apply MDPREVIEW_WIDTH environment variable to CSS custom property
const width = (window as any).__MDPREVIEW_WIDTH__ || '900px';
document.documentElement.style.setProperty('--markdown-max-width', width);

const el = document.getElementById("root");
if (el) createRoot(el).render(<App />);
