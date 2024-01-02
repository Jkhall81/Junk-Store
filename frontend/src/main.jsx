import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./index.css";
import "./bootstrap.min.css";

const initialOptions = {
  clientId:
    "AUOYTSvgY-w86-vA1I7n_5as2LvIQ4if1yLiwgwTBLG_91UpPMluLDMb9pBO7bbx_nXsX123insde-MA",
  currency: "USD",
  intent: "capture",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);
