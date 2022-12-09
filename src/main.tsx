import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BattleContextProvider } from "./context/BattleContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BattleContextProvider>
      <App />
    </BattleContextProvider>
  </React.StrictMode>
);
