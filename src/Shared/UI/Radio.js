import { useRef } from "react";

function Radio({ name, onChange, label, checked, id }) {
  const inputRef = useRef(null);

  return (
    <div>
      <input
        ref={inputRef}
        className="form-check-input"
        name={name}
        onChange={onChange}
        type="radio"
        checked={checked}
        id={id}
      />
      <label className="px-3" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default Radio;
