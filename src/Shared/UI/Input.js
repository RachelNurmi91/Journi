import { useRef } from "react";

function Input({
  name,
  onChange,
  placeholder,
  label,
  type = "text",
  value,
  inputError,
}) {
  const inputRef = useRef(null);
  return (
    <div className="form-group my-2">
      <label
        htmlFor={name}
        className={inputError?.includes(name) ? "error-color mb-2" : "mb-2"}
      >
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
