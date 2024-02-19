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
        {title ? <option defaultValue>{title}</option> : null}
        {options()}
      </select>
    </div>
  );
}

export default Select;
