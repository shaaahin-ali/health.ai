import React from "react";

const Hospitals = () => {
  const hospitals = [
    {
      name: "sunrise",
      address: "kalamassery,kochi,kerala,ernakulam,PIN:675603",
    },
    {
      name: "Aster Medcity",
      address: "kalamassery,kochi,kerala,ernakulam,PIN:675603",
    },
    {
      name: "Health Center",
      address: "kalamassery,kochi,kerala,ernakulam,PIN:675603",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Nearby Hospitals
      </h1>
      <ul className="space-y-4 w-full max-w-md">
        {hospitals.map((hospital, index) => (
          <li
            key={index}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <strong className="text-lg text-blue-600 dark:text-blue-400">
              {hospital.name}
            </strong>
            <p className="text-gray-600 dark:text-gray-300">
              {hospital.address}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hospitals;
