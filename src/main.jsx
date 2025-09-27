import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// Supports weights 100-900
import "@fontsource-variable/inter";
import { Toaster } from "react-hot-toast";
import { AppKitProvider } from "./provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppKitProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <App />
    </AppKitProvider>
  </StrictMode>
);
