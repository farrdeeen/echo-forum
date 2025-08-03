/* ─────────── src/main.tsx (or index.tsx) ─────────── */
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

/* Strict mode is optional but recommended */
createRoot(document.getElementById("root")!).render(<App />);
