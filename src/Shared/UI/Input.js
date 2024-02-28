import { useRef } from "react";

function Input({ name, onChange, placeholder, label, type = "text" }) {
  const inputRef = useRef(null);

  return (
    <div className="form-group my-3">
      <label htmlFor={name} className="my-2">
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
      />
    </div>
  );
}

export default Input;
