import React, { useState } from "react";

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const handleSubmit = () => {
    // Simple mock diagnosis logic
    if (symptoms) {
      setDiagnosis("Possible condition based on your symptoms...");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Enter Your Symptoms</h1>
      <textarea
        rows="4"
        placeholder="Describe your symptoms..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="mb-4 border rounded p-2 w-1/2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Diagnose
      </button>
      {diagnosis && <p className="mt-4">{diagnosis}</p>}
    </div>
  );
};

export default Symptoms;
