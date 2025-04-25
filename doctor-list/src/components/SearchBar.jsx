import React, { useState, useEffect, useRef } from "react";

export default function SearchBar({ searchText, setSearchText, suggestions }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!searchText) return setShowSuggestions(false);
    const matches = suggestions
      .filter((doc) =>
        doc.name.toLowerCase().includes(searchText.toLowerCase())
      )
      .slice(0, 3);
    setFilteredSuggestions(matches);
    setShowSuggestions(matches.length > 0);
  }, [searchText, suggestions]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Search doctors..."
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        data-testid="autocomplete-input"
        ref={inputRef}
      />
      {showSuggestions && (
        <ul className="absolute bg-white border w-full mt-1 z-10">
          {filteredSuggestions.map((doc, idx) => (
            <li
              key={idx}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSearchText(doc.name);
                setShowSuggestions(false);
              }}
              data-testid="suggestion-item"
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
