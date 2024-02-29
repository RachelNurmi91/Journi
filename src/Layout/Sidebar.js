import logo from "../Media/Images/logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";
import AddTrip from "../Trip/Trips/AddTrip";

function Sidebar({ ...props }) {
  const loggedIn = () => {
    return (
      <>
        {" "}
        <div className="px-3 py-4 position-relative flex-grow-1">
          <ul className="sidebar-menu mt-5 align-items-center">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/hotels" className="nav-link">
                Hotels
              </Link>
            </li>
            <li>
              <Link to="/flights" className="nav-link">
                Flights
              </Link>
            </li>
            <li>
              <AddTrip />
            </li>
          </ul>
        </div>
        <div className="px-3">
          <ul className="sidebar-menu">
            <li>
              <div
                className="nav-link"
                onClick={() => props.removeLoggedInUserData()}
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-arrow-right-from-bracket"
                  style={{ color: "#fff" }}
                />
                <span className="ms-2">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  };

  const guest = () => {
    return (
      <>
        <div className="px-3">
          <ul className="sidebar-menu">
            <li>
              <Link to="/login" className="nav-link">
                <FontAwesomeIcon
                  icon="fa-solid fa-right-to-bracket"
                  style={{ color: "#fff" }}
                />
                <span className="ms-2">Login</span>
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">
                <FontAwesomeIcon
                  icon="fa-solid fa-user-plus"
                  style={{ color: "#fff" }}
                />
                <span className="ms-2">Register</span>
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  };

  return (
    <div className="sidebar-body active d-flex flex-column">
      <img className="logo" src={logo} alt="Journi logo" height="150px" />
      {props.userId ? loggedIn() : guest()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userId: state.account?.userAccount?.id,
  };
}

const mapDispatchToProps = {
  removeLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
