import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./normalize.css";
import "./index.css";
import AppRouter from "./router/AppRouter.jsx";
import store from "./slices/store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

