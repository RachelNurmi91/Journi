import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";
import TripSelector from "./TripSelector";

function Navbar({ ...props }) {
  const loggedInNav = () => {
    return (
      <>
        <TripSelector />
        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/hotels" className="nav-link">
          Hotels
        </Link>

        <Link to="/flights" className="nav-link">
          Flights
        </Link>

        <Link to="/trips/" className="nav-link">
          Trips
        </Link>
        <Link to="/trips/add" className="nav-link">
          New Trip
        </Link>

        <Link
          onClick={() => {
            props.removeLoggedInUserData();
          }}
          className="nav-link"
        >
          Logout
        </Link>
      </>
    );
  };

  const guestNav = () => {
    return (
      <>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-body p-3 sticky-top">
        <div className="row w-100">
          <div className="col align-self-center">
            <div className="w-50">
              <TripSelector />
            </div>
          </div>
          <div className="col align-self-center">
            <div className="float-end d-flex align-items-center">
              <div className="text-bold">{props.userData.firstName}</div>
              <div className="profile-icon mx-2">
                {props.userData.firstName.slice(0, 1).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        {/* <a className="navabar__menu position-relative d-inline-block" href="#">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </a> */}
      </nav>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
