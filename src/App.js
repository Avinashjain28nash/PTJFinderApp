import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Add Navigate import
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./Home/Home";
import "./App.css";

function App() {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect to login if not authenticated */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
