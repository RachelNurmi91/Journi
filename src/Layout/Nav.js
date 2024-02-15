import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";

function Nav({ ...props }) {
  const loggedInNav = () => {
    return (
      <>
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
      <nav id="navbar-container">
        <div className="navbar-body ">
          {props.userData ? loggedInNav() : guestNav()}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
