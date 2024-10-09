import React, { useState, useRef, useEffect } from "react";
import { CountryList } from "../../Shared/Data/CountryList";
import { AirportList } from "../../Shared/Data/AirportList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AirportAutocomplete = ({
  placeholder,
  onChange,
  value,
  name,
  inputError,
  labelIcon,
  label,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState("auto");

  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(`${inputRef.current.offsetWidth}px`);
    }

    // If we are updating we want to set the value we are updating to the local state.
    if (value) {
      setInputValue(value);
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
    <div className="autocomplete-container" onMouseLeave={handleMouseLeave}>
      <label
        htmlFor={name}
        className={inputError?.includes(name) ? "error-color" : ""}
      >
        <div>
          <FontAwesomeIcon
            icon={`labelIcon ${labelIcon}`}
            style={{ color: "#0bb6c0" }}
          />
          <span
            className={
              inputError?.includes("airport")
                ? "label error-color mx-2"
                : "label mx-2"
            }
          >
            {label}
          </span>
        </div>
      </label>
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        name={name}
        style={{ width: "125px" }}
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
