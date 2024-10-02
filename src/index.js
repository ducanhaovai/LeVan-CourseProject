import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./hook/ErrorBoundary";
import { SoftUIControllerProvider } from "./context";
import "./style.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </SoftUIControllerProvider>
  </BrowserRouter>
);
