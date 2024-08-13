import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { LoggedInProvider } from "./context/loggedInContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <LoggedInProvider>
      <App />
    </LoggedInProvider>
  </>
);
