import { useRef } from "react";

function Radio({ name, onChange, label }) {
  const inputRef = useRef(null);

  return (
    <div class="flex">
      <input
        ref={inputRef}
        class="form-check-input"
        name={name}
        onChange={onChange}
        type="radio"
      />
      <label className="px-3" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default Radio;
