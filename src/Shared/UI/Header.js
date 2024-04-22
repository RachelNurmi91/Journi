import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Header({ title, icon, destination }) {
  const renderIcon = (icon) => {
    switch (icon) {
      case "add":
        return (
          <Link to={destination} className="btn-link">
            <FontAwesomeIcon
              icon="fa-solid fa-plus"
              size="2x"
              style={{ color: "#0BB6C0" }}
            />
          </Link>
        );
      default:
        return;
    }
  };

  return (
    <div className="row mt-2 mb-3">
      <div className="col">
        <h2 className="">{title}</h2>
      </div>
      <div className="col d-flex justify-content-end">
        {icon ? renderIcon(icon) : null}
      </div>
    </div>
  );
}

export default Header;
