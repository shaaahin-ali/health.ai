// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import WorldMap from "./ui/world-map";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/symptoms");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden px-6 py-12">
      <div className="absolute inset-0 z-0">
        <WorldMap
          dots={[
            {
              start: { lat: 37.7749, lng: -122.4194 },
              end: { lat: 40.7128, lng: -74.006 },
            },
          ]}
          lineColor="#0ea5e9"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/30"></div>
      </div>

      <div className="relative z-10 bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-700/50">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-400">
          Fiza
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 border border-gray-600/50 rounded-lg p-4 w-full bg-gray-700/50 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 border border-gray-600/50 rounded-lg p-4 w-full bg-gray-700/50 text-white"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white p-4 rounded-lg w-full hover:bg-blue-700"
        >
          Login
        </button>
      </div>
      <p className="mt-8 text-sm text-gray-500">© registered to fiza</p>
    </div>
  );
};

export default Login;
