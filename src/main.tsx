import { ThemeProvider } from "./utils/contexts/theme-provider.tsx";
import ReactDOM from "react-dom/client";
import App from "./routers/index.tsx";
import "@/styles/index.css";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    <Toaster />
  </ThemeProvider>
);
