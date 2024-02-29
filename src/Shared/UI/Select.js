import { useRef } from "react";

function Select({ options, onChange }) {
  const selectRef = useRef(null);

  return (
    <div className="d-block">
      <select
        ref={selectRef}
        className="form-select"
        onChange={(event) => onChange(event)}
      >
        {options()}
      </select>
    </div>
  );
}

export default Select;
