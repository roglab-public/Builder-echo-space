import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { setupConsoleFilters } from "./config/console-config";

// 불필요한 콘솔 경고 필터링 설정
setupConsoleFilters();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
