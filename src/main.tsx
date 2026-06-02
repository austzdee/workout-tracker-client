import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./main.css";
import App from "./App.tsx";

import { AuthProvider } from "./context/AuthContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 
      BrowserRouter provides routing context to the entire application.
      All route navigation, route matching, and router hooks depend on this.
    */}
    <BrowserRouter>
      {/* 
        AuthProvider manages authentication state and JWT persistence.
      */}
      <AuthProvider>
        {/* 
          ToastProvider manages global notification messages.
        */}
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);