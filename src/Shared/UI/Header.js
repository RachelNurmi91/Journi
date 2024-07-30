import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

function Header({
  title,
  rightIcon,
  leftIcon,
  destination,
  props,
  subtitle,
  rightTitle,
}) {
  let navigate = useNavigate();

  const renderRightIcon = (icon) => {
    switch (icon) {
      case "add":
        return (
          <Link to={destination} className="btn-link">
            <FontAwesomeIcon
              icon="fa-solid fa-plus"
              size="lg"
              style={{ color: "#D87151" }}
            />
          </Link>
        );
      default:
        return;
    }
  };

  const renderLeftIcon = () => {
    return (
      <Link to={destination} className="btn-link" state={props}>
        <FontAwesomeIcon
          icon="fa-chevron-left"
          size="lg"
          style={{ color: "#D87151" }}
          onClick={() => navigate("/profile")}
          className="pl-0"
        />
      </Link>
    );
  };

  return (
    <div className="row mt-2 mb-3">
      {leftIcon ? (
        <div className="col-1 mt-1">{renderLeftIcon(leftIcon)}</div>
      ) : null}
      <div className={`${rightIcon || leftIcon ? "col-11" : "col-12"}`}>
        <h2 className=" mb-0">{title}</h2>
        <div className="subtitle mx-1 b13-mon">{subtitle}</div>
      </div>
      {rightIcon ? (
        <div className="col-1 d-flex justify-content-end align-items-center">
          {renderRightIcon("add")}
          <span className="link-action label b14-mon mx-2">{rightTitle}</span>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
