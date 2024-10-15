import "./SegmentStyles.scss";
import { usePlacesWidget } from "react-google-autocomplete";

function GoogleInput({
  name,
  onChange,
  placeholder,
  label,
  type = "text",
  inputError,
  searchTypes,
}) {
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
    onPlaceSelected: (place) => {
      onChange(place);
    },
    options: {
      types: searchTypes,
      fields: ["name", "formatted_address", "address_components"],
    },
  });

  return (
    <div className="form-group my-2">
      <label
        htmlFor={name}
        className={inputError?.includes(name) ? "error-color" : ""}
      >
        {label}
      </label>
      <input
        ref={ref}
        className="form-control"
        name={name}
        id={name}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}

export default GoogleInput;
