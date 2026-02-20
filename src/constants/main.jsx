import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { PermissionsProvider } from "./context/PermissionsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PermissionsProvider>
      <App />
    </PermissionsProvider>
  </React.StrictMode>
);
