import React, { useState, useRef, useEffect } from "react";
import { CountryList } from "../../Shared/Data/CountryList";
import { AirportList } from "../../Shared/Data/AirportList";

const AirportAutocomplete = ({ placeholder, onChange, value }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState("auto");

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(`${inputRef.current.offsetWidth}px`);
    }
  }, [value]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = AirportList.filter((item) =>
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
    <div
      className="autocomplete-container form-group"
      onMouseLeave={handleMouseLeave}
    >
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <ul className="autocomplete-input" style={{ width: inputWidth }}>
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

export default AirportAutocomplete;
