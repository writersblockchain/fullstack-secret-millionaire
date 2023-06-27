import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Contexts
import { SecretjsContextProvider } from "./secretJs/SecretjsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SecretjsContextProvider>
    <App />
  </SecretjsContextProvider>
);
