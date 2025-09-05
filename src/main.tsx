import React from "react";
import ReactDOM from "react-dom/client";
import DashboardWrapper from "./dashboardWrappers.tsx";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DashboardWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DashboardWrapper>
  </React.StrictMode>
);
