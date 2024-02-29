import React, { useState } from "react";
import { CountryList } from "../Data/CountryList";

const AutocompleteInput = ({ listData, inputExample, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = listData.filter((item) =>
      item.city.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (name, code, city, country) => {
    const value = city + " (" + code + ")";
    onChange(name, code, city, country);
    setInputValue(value);
    setSuggestions([]);
  };

  const handleMouseLeave = () => {
    setSuggestions([]);
  };

  const getCountryAbbr = (country) => {
    const matchingCountry = CountryList.find(
      (listItem) => listItem.country === country
    );
    return matchingCountry?.abbreviation;
  };

  return (
    <div className="autocomplete-container" onMouseLeave={handleMouseLeave}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={inputExample}
      />
      <ul className="autocomplete-input">
        {suggestions.map((item, index) => (
          <li
            className="autocomplete-item"
            key={index}
            onClick={() =>
              handleSelect(item.name, item.code, item.city, item.country)
            }
          >
            {item.city}, {getCountryAbbr(item.country)} ({item.code})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteInput;
