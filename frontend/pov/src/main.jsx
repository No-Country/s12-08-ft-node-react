import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./normalize.css";
import "./index.css";
import AppRouter from "./router/AppRouter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
