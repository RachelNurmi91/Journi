import logo from "../Media/Images/logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
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
              <Link to="/trips/" className="nav-link">
                Trips
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
                Logout
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
                Login
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
      {props.userData ? loggedIn() : guest()}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
  };
}

const mapDispatchToProps = {
  removeLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
