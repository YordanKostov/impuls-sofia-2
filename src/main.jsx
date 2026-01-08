import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// Import the Provider
import { LanguageProvider } from "./context/LanguageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap everything inside LanguageProvider */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
