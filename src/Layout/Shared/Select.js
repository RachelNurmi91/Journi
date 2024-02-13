import { useRef } from "react";

function Select({ category, onChange }) {
  const selectRef = useRef(null);

  const generateOptions = () => {
    return category.map((item, index) => (
      <option value={index + 1}>{item}</option>
    ));
  };

  return (
    <div className="mb-3 d-block">
      <select
        ref={selectRef}
        class="form-select"
        onChange={(event) => onChange(event.target.value)}
      >
        <option selected>Choose a country</option>
        {generateOptions()}
      </select>
    </div>
  );
}

export default Select;
