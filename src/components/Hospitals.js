import React from "react";

const Hospitals = () => {
  const hospitals = [
    { name: "General Hospital", address: "123 Main St" },
    { name: "City Clinic", address: "456 Oak St" },
    { name: "Health Center", address: "789 Pine St" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Nearby Hospitals</h1>
      <ul>
        {hospitals.map((hospital, index) => (
          <li key={index} className="mb-2">
            <strong>{hospital.name}</strong>: {hospital.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hospitals;
