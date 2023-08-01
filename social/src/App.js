import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import Feed from "./pages/Feed/Feed";
import "./App.css";

function App() {
  const isUserLogin = localStorage.getItem('User');
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login  isUserLogin={isUserLogin} />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/feed" element={<Feed />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
