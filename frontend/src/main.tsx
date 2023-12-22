"use client";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { Main, Product, SignIn, Settings, Shopping } from "./pages";
import { Header } from "./components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/shopping" element={<Shopping />} />
        </Routes>
      </BrowserRouter>
    </App>
  </React.StrictMode>
);
