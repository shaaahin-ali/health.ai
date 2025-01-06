import React, { useState } from "react";
import axios from "axios";

const SymptomAI = () => {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Use the desired model (e.g., GPT-4 if available)
          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI health assistant. Provide health advice based on symptoms.",
            },
            {
              role: "user",
              content: `My symptoms are: ${symptoms}`,
            },
          ],
          max_tokens: 200,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_API_KEY`, // Replace with your OpenAI API key
          },
        }
      );
      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Health AI Assistant</h1>
      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Enter your symptoms here..."
        rows="4"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      ></textarea>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Processing..." : "Get Diagnosis"}
      </button>
      {response && (
        <div className="mt-4 p-4 bg-white border rounded shadow">
          <h2 className="text-lg font-semibold mb-2">AI Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomAI;
