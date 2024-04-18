import { useState } from "react";
import { connect } from "react-redux";
import TripSelector from "./TripSelector";
import { Link } from "react-router-dom";
import logo from "../Media/Images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeLoggedInUserData } from "../Redux/Actions/AccountActions";
import AddTrip from "../Trip/Trips/AddTrip";

function Navbar({ ...props }) {
  const [showSideBar, setShowSideBar] = useState(false);

  const logout = () => {
    localStorage.clear();
    props.removeLoggedInUserData();
  };

  const toggleSideNav = () => {
    setShowSideBar((prevState) => !prevState);
  };

  const navBar = () => {
    return (
      <>
        <div className="col align-self-center">
          <TripSelector />
        </div>
        <div className="col align-self-center">
          <Link to="/profile">
            <div className="float-end d-flex align-items-center" to="/profile">
              <div className="text-bold">{props.userData?.firstName}</div>
              <div className="profile-icon mx-2">
                {props.userData?.firstName?.slice(0, 1).toUpperCase()}
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  };

  const guestSideBar = () => {
    return (
      <>
        <div className="px-3">
          <ul className="sidenav-menu">
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

  const loggedInSideBar = () => {
    return (
      <>
        {" "}
        <div className="px-3 py-4 position-relative flex-grow-1">
          <ul className="sidenav-menu mt-5 align-items-center">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {props.activeTrip ? (
              <>
                <li>
                  <Link
                    to={
                      props.activeTrip?.hotels?.length > 0
                        ? "/hotels"
                        : "/hotels/add"
                    }
                    className="nav-link"
                  >
                    Hotels
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      props.activeTrip?.flights?.length > 0
                        ? "/flights"
                        : "/flights/add"
                    }
                    className="nav-link"
                  >
                    Flights
                  </Link>
                </li>
              </>
            ) : null}
            <li>
              <AddTrip />
            </li>
          </ul>
        </div>
        <div className="px-3">
          <ul className="sidenav-menu">
            <li>
              <div className="nav-link" onClick={() => logout()}>
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

  return (
    <div className="row mx-0">
      <div className="col-1 d-flex justify-content-center">
        <div
          id="mySidenav"
          className="sidenav"
          style={{ width: `${showSideBar ? "250px" : "0px"}` }}
        >
          <img className="logo" src={logo} alt="Journi logo" height="150px" />
          {props.userId ? loggedInSideBar() : guestSideBar()}
        </div>
      </div>
      <nav className="navbar primary-bg-color ">
        <div className="row w-100">
          <div className="col align-self-center">
            <div
              className="navbar-toggle"
              onClick={toggleSideNav}
              style={{ zIndex: 2 }}
            >
              {showSideBar ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-xmark"
                  style={{ color: "#fff" }}
                  size="2x"
                />
              ) : (
                <FontAwesomeIcon
                  icon="fa-solid fa-bars"
                  style={{ color: "#fff" }}
                  size="2x"
                />
              )}
            </div>
          </div>
          {props.userId ? navBar() : null}
        </div>
      </nav>
    </div>
  );

  // return (
  //   <nav className="navbar navbar-expand-lg navbar-body p-3 sticky-top">
  //     <div className="row w-100">{props.userId ? loggedIn() : null}</div>
  //   </nav>
  // );
}

function mapStateToProps(state) {
  return {
    userData: state.account?.userAccount,
    userId: state.account?.userAccount?.id,
    activeTrip: state.account?.activeTrip,
    account: state.account,
  };
}

const mapDispatchToProps = { removeLoggedInUserData };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
