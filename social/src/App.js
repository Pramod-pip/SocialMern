import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Feed from "./pages/Feed/Feed";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/feed" element={<Feed />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
