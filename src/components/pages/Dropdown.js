import React, { useState } from "react";

const Dropdown = ({ selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Hardcoded options
  const options = ["Admin", "Viewer", "Editor"];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none"
        onClick={toggleDropdown}
      >
        {selectedOption || "Select an option"}
        <svg
          className="w-4 h-4 ml-2 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option, index) => (
            <button
              key={index}
              className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
