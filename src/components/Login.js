import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple check for this example
    if (name && password) {
      navigate("/symptoms");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-5xl font-bold mb-6 animate-bounce">Health.ai</h1>
      <p className="text-xl mb-8">Welcome to Health.ai</p>
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-80">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 border border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 border border-gray-600 rounded-lg p-3 w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </div>
      <p className="mt-6 text-sm text-gray-400">Created by Shah</p>
    </div>
  );
};

export default Login;
