import { useRef } from "react";

function Input({ name, onChange, placeholder, label, type = "text", value }) {
  const inputRef = useRef(null);

  return (
    <div className="form-group my-2">
      <label htmlFor={name} className="mb-2">
        {label}
      </label>
      <input
        ref={inputRef}
        className="form-control"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        value={value ? value : ""}
      />
    </div>
  );
}

export default Input;
