import React from "react";
import ReactDOM from "react-dom/client";

import Products from "./components/Products";
import "./index.scss";

const App = () => (
  <Products/>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)