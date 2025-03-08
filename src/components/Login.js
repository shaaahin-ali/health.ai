import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorldMap from "./ui/world-map"; // Adjusted path

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name || !password) {
      alert("Please enter both name and password.");
      return;
    }

    if (password === "health123") {
      navigate("/symptoms");
    } else {
      alert("Incorrect password! Please try again.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden px-6 py-12">
      <div className="absolute inset-0 z-0">
        <WorldMap
          dots={[
            {
              start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
              end: { lat: 40.7128, lng: -74.006, label: "New York" },
            },
          ]}
          lineColor="#0ea5e9"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/30"></div>
      </div>

      <div className="relative z-10 bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-700/50">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-blue-400 animate-pulse drop-shadow-lg">
          Health.ai
        </h1>
        <p className="text-xl mb-8 text-center text-gray-200 font-light tracking-wide">
          Welcome to Your Health Companion
        </p>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 border border-gray-600/50 rounded-lg p-4 w-full bg-gray-700/50 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 border border-gray-600/50 rounded-lg p-4 w-full bg-gray-700/50 text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white p-4 rounded-lg w-full hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </div>
      <p className="mt-8 text-sm text-gray-500 font-light tracking-tight">
        © 2025 Shah • Health.ai
      </p>
    </div>
  );
};

export default Login;
