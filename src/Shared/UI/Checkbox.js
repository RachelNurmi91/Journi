import { useRef } from "react";

function Checkbox({ name, label, toggleCheckbox, checked }) {
  const inputRef = useRef(null);

  return (
    <div>
      <input
        ref={inputRef}
        className="form-check-input"
        type="checkbox"
        value=""
        id="checkBoxId"
        onClick={toggleCheckbox}
        name={name}
        checked={checked}
      />
      <label className="form-check-label px-2" htmlFor="checkBoxId">
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
