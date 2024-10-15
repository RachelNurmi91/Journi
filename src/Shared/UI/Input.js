import "./Styles.scss";
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
    <div class="form-floating my-2">
      <input
        ref={inputRef}
        type={type}
        class="form-control"
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value ? value : ""}
      />
      <label
        htmlFor={name}
        className={inputError?.includes(name) ? "error-color" : ""}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
