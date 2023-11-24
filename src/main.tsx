import { ThemeProvider } from "./utils/contexts/theme-provider.tsx";
import ReactDOM from "react-dom/client";
import App from "./routes";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>
);
