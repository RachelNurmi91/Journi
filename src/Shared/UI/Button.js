import { useRef } from "react";
import { Link } from "react-router-dom";

function Button({ destination = null, label, onClick = null, style = {} }) {
  const btnRef = useRef(null);

  return (
    <>
      <button
        ref={btnRef}
        className="btn-style w-100"
        type="button"
        onClick={onClick}
        style={{
          ...style,
        }}
      >
        <Link to={destination} className="btn-link">
          {label}
        </Link>
      </button>
    </>
  );
}

export default Button;
