import { useRef } from "react";

function Select({ options, onChange, value, name }) {
  const selectRef = useRef(null);

  return (
    <div className="d-block">
      <select
        ref={selectRef}
        className="form-select"
        onChange={(event) => onChange(event)}
        value={value}
        name={name}
      >
        {options()}
      </select>
    </div>
  );
}

export default Select;
