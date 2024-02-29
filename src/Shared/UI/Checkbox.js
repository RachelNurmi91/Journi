import { useRef } from "react";

function Checkbox({ label, toggleCheckbox }) {
  const inputRef = useRef(null);

  return (
    <div>
      <input
        ref={inputRef}
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
        onClick={toggleCheckbox}
      />
      <label className="form-check-label px-2" htmlFor="flexCheckDefault">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
