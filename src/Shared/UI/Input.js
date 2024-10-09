import "./SegmentStyles.scss";
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
    // <div class="form-floating mb-3">
    //   <input
    //     ref={inputRef}
    //     type={type}
    //     class="form-control"
    //     id={name}
    //     placeholder={placeholder}
    //     onChange={onChange}
    //     value={value ? value : ""}
    //   />
    //   <label htmlFor={name}>{label}</label>
    // </div>
    <div className="form-group my-2">
      <label
        htmlFor={name}
        className={inputError?.includes(name) ? "error-color" : ""}
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
