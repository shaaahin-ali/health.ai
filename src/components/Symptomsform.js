// src/components/SymptomsForm.js
import React, { useState } from "react";
import axios from "axios";

const SymptomsForm = () => {
  const [symptoms, setSymptoms] = useState(""); // Holds user symptoms
  const [diagnosis, setDiagnosis] = useState(""); // Holds AI diagnosis
  const [loading, setLoading] = useState(false); // Show loading while awaiting response

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading spinner
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003", // OpenAI model
          prompt: `Diagnose these symptoms: ${symptoms}`,
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `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`, // Replace with your actual OpenAI API key
            "Content-Type": "application/json",
          },
        }
      );
      setDiagnosis(response.data.choices[0].text); // Store AI response in diagnosis state
    } catch (error) {
      console.error("Error fetching diagnosis", error);
      setDiagnosis("Sorry, something went wrong.");
    }
    setLoading(false); // Stop loading spinner
  };

  return (
    <div className="symptoms-form p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Health Diagnosis</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms here..."
          className="w-full h-32 p-4 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Symptoms"}
        </button>
      </form>

      {/* Display the diagnosis */}
      {diagnosis && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Diagnosis:</h2>
          <p className="mt-2 text-gray-700">{diagnosis}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomsForm;
