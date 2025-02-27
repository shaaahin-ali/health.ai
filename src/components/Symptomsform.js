// src/components/Symptomsform.js
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

const SymptomsForm = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Moved inside the component

  // Initialize Gemini API with your key
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Free tier model

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      alert("Please enter your symptoms.");
      return;
    }
    setLoading(true);
    setDiagnosis(""); // Clear previous diagnosis

    try {
      // New prompt
      const prompt = `You are a medical AI assistant. Analyze these symptoms: "${symptoms}". Give me 3 possible conditions in this format:
      1. [Condition]: [One short sentence explaining it.]
      2. [Condition]: [One short sentence explaining it.]
      3. [Condition]: [One short sentence explaining it.]
      Then add: "Always see a doctor for a real diagnosis."please be in a professional tone.`;

      // Call the Gemini API
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      setDiagnosis(response);
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
      setDiagnosis("Sorry, something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Health AI Assistant
      </h1>
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter your symptoms here (e.g., fever, cough)..."
          rows="4"
          className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-600 transition duration-200 font-semibold disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? "Processing..." : "Get Diagnosis"}
        </button>
        {diagnosis && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-inner">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              AI Response:
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{diagnosis}</p>
            <p className="text-red-500 text-sm mt-2">
              Note: This is a demo. Consult a doctor for real medical advice.
            </p>
            <button
              onClick={() => navigate("/hospitals")}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 font-semibold"
            >
              Find Nearby Hospitals
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomsForm;
