import { useRef } from "react";

function Textarea({ name, onChange, placeholder, label, value }) {
  const textRef = useRef(null);

  return (
    <div className="form-group my-2">
      <label htmlFor="textareaId" className="mb-2">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        name={name}
        id="textareaId"
        onChange={onChange}
        value={value}
        ref={textRef}
        className="form-control"
        rows="3"
      ></textarea>
    </div>
  );
}

export default Textarea;
