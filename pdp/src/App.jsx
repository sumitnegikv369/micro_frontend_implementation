import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "shell/Header";
import Footer from "shell/Footer";

import PDP from "./components/PDP";

import "./index.scss";

const App = () => (
  <Router>
  <div className="text-3xl">
    <Header/>
      <Routes>
        <Route path="/product/:id" element={<PDP/>}/>
      </Routes>
    <Footer/>
  </div>
  </Router>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)