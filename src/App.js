import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm"; // Updated Login -> AuthForm
import SymptomsForm from "./components/Symptomsform";
import Hospitals from "./components/Hospitals";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/symptoms" element={<SymptomsForm />} />
        <Route path="/hospitals" element={<Hospitals />} />
      </Routes>
    </Router>
  );
}

export default App;
