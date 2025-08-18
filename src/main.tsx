
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from "./App.tsx";
import "./index.css";

// Initialize PWA elements for camera functionality
defineCustomElements(window);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
