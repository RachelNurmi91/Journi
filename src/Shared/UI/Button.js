import { useRef } from "react";
import { Link } from "react-router-dom";

function Button({ destination = null, label, onClick = null }) {
  const btnRef = useRef(null);

  return (
    <>
      <button
        ref={btnRef}
        className="btn-style mt-3 w-100"
        type="button"
        onClick={onClick}
      >
        <Link to={destination} className="btn-link">
          {label}
        </Link>
      </button>
    </>
  );
}

export default Button;
