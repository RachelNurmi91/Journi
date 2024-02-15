import { useRef } from "react";

function Select({ title, options, onChange }) {
  const selectRef = useRef(null);

  return (
    <div className="mb-3 d-block">
      <select
        ref={selectRef}
        className="form-select"
        onChange={(event) => onChange(event)}
      >
        <option defaultValue>{title}</option>
        {options()}
      </select>
    </div>
  );
}

export default Select;
