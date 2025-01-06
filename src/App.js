// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SymptomsForm from "./components/Symptomsform"; // API-integrated SymptomsForm
import Hospitals from "./components/Hospitals";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/symptoms" element={<SymptomsForm />} />{" "}
        {/* OpenAI integrated form */}
        <Route path="/hospitals" element={<Hospitals />} />
      </Routes>
    </Router>
  );
}

export default App;
