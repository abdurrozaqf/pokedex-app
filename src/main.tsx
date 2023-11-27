import App from "./routers/index.tsx";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./utils/contexts/theme-provider.tsx";

import { Toaster } from "./components/ui/toaster.tsx";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    <Toaster />
  </ThemeProvider>
);
