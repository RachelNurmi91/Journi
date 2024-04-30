import React, { useState, useRef, useEffect } from "react";
import { CountryList } from "../../Shared/Data/CountryList";

const CountryAutocomplete = ({ onChange, value }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState("auto");

  useEffect(() => {
    // Calculate and set the width of the input dynamically
    if (inputRef.current) {
      setInputWidth(`${inputRef.current.offsetWidth}px`);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = CountryList.filter((country) =>
      country.country.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (country) => {
    onChange(country);
    setInputValue(country);
    setSuggestions([]);
  };

  const handleMouseLeave = () => {
    setSuggestions([]);
  };

  return (
    <div
      className="autocomplete-container form-group my-2"
      onMouseLeave={handleMouseLeave}
    >
      <label htmlFor="country" className="mb-2">
        Country
      </label>
      <input
        ref={inputRef}
        className="form-control"
        type="text"
        value={value ? value : inputValue}
        onChange={handleChange}
        placeholder="Country"
      />
      <ul className="autocomplete-input" style={{ width: inputWidth }}>
        {suggestions.map((country, index) => (
          <li
            className="autocomplete-item"
            key={index}
            onClick={() => handleSelect(country.country)}
          >
            {country.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryAutocomplete;
